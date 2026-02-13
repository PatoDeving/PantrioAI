/**
 * Vercel Serverless Function: /api/horarios
 * Returns available time slots for a specific date
 * Replaces the Python version (horarios.py)
 */

const HORARIO_INICIO = 9;  // 09:00
const HORARIO_FIN = 18;    // 18:00
const MAX_CITAS_POR_HORA = 1;

const DIAS_SEMANA = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

/**
 * Generate all possible time slots for a day
 */
function generarHorariosDia() {
  const horarios = [];
  for (let h = HORARIO_INICIO; h < HORARIO_FIN; h++) {
    horarios.push(`${String(h).padStart(2, '0')}:00`);
  }
  return horarios;
}

/**
 * Get events from Google Calendar for a specific date
 */
async function getCalendarEvents(fecha) {
  try {
    if (!process.env.GOOGLE_CREDENTIALS_JSON) {
      return [];
    }

    const { google } = await import('googleapis');
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    const calendar = google.calendar({ version: 'v3', auth });
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
    const timezone = process.env.GOOGLE_CALENDAR_TIMEZONE || 'America/Mexico_City';

    const timeMin = `${fecha}T00:00:00`;
    const timeMax = `${fecha}T23:59:59`;

    const response = await calendar.events.list({
      calendarId,
      timeMin: new Date(timeMin).toISOString(),
      timeMax: new Date(timeMax).toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      timeZone: timezone,
    });

    const events = response.data.items || [];
    const horasOcupadas = [];

    for (const event of events) {
      const start = event.start?.dateTime;
      if (start) {
        const date = new Date(start);
        const hora = `${String(date.getHours()).padStart(2, '0')}:00`;
        horasOcupadas.push(hora);
      }
    }

    return horasOcupadas;
  } catch (error) {
    console.error('Error getting calendar events:', error);
    return [];
  }
}

/**
 * Get booked appointments from Google Sheets for a specific date
 */
async function getSheetsAppointments(fecha) {
  try {
    if (!process.env.GOOGLE_CREDENTIALS_JSON || !process.env.GOOGLE_SHEET_ID) {
      return [];
    }

    const { google } = await import('googleapis');
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const sheetId = process.env.GOOGLE_SHEET_ID;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Citas!A:H',
    });

    const rows = response.data.values || [];
    const horasOcupadas = [];

    // Skip header row
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length >= 8) {
        const fechaCita = (row[5] || '').trim();
        const horaCita = (row[6] || '').trim();
        const estado = (row[7] || '').trim().toLowerCase();

        if (fechaCita === fecha && estado === 'confirmada' && horaCita) {
          // Normalize hour format
          const parts = horaCita.replace(/\s*(AM|PM)\s*/gi, '').split(':');
          if (parts.length >= 1) {
            const h = parseInt(parts[0], 10);
            if (!isNaN(h)) {
              horasOcupadas.push(`${String(h).padStart(2, '0')}:00`);
            }
          }
        }
      }
    }

    return horasOcupadas;
  } catch (error) {
    console.error('Error getting sheets appointments:', error);
    return [];
  }
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const fecha = url.searchParams.get('fecha');

    if (!fecha) {
      return res.status(400).json({
        error: 'Parámetro "fecha" requerido (formato: YYYY-MM-DD)'
      });
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(fecha)) {
      return res.status(400).json({
        error: 'Formato de fecha inválido. Usa YYYY-MM-DD'
      });
    }

    const fechaDate = new Date(fecha + 'T12:00:00');
    const now = new Date();

    // Check if date is in the past
    if (fechaDate.toISOString().split('T')[0] < now.toISOString().split('T')[0]) {
      return res.status(200).json({
        fecha,
        horarios_disponibles: [],
        mensaje: 'No se pueden agendar citas en fechas pasadas'
      });
    }

    // Get all possible time slots
    const todosHorarios = generarHorariosDia();

    // Get occupied hours from Google Calendar and Sheets in parallel
    const [calendarHours, sheetsHours] = await Promise.all([
      getCalendarEvents(fecha),
      getSheetsAppointments(fecha)
    ]);

    // Count appointments per hour
    const citasPorHorario = {};
    for (const hora of [...calendarHours, ...sheetsHours]) {
      citasPorHorario[hora] = (citasPorHorario[hora] || 0) + 1;
    }

    // Filter available time slots
    let horariosDisponibles = [];
    for (const horario of todosHorarios) {
      const citasEnHorario = citasPorHorario[horario] || 0;
      if (citasEnHorario < MAX_CITAS_POR_HORA) {
        horariosDisponibles.push({
          hora: horario,
          espacios_disponibles: MAX_CITAS_POR_HORA - citasEnHorario
        });
      }
    }

    // If today, filter past hours
    const todayStr = now.toISOString().split('T')[0];
    if (fecha === todayStr) {
      const currentHour = now.getHours();
      horariosDisponibles = horariosDisponibles.filter(h => {
        const hour = parseInt(h.hora.split(':')[0], 10);
        return hour > currentHour;
      });
    }

    const diaSemana = DIAS_SEMANA[fechaDate.getDay()];

    return res.status(200).json({
      fecha,
      dia_semana: diaSemana,
      horarios_disponibles: horariosDisponibles,
      total_horarios: horariosDisponibles.length
    });

  } catch (error) {
    console.error('Error getting horarios:', error);
    return res.status(500).json({
      error: `Error obteniendo horarios: ${error.message}`
    });
  }
}

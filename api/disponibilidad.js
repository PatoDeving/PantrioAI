/**
 * Vercel Serverless Function: /api/disponibilidad
 * Returns availability for the next 14 days
 * Replaces the Python version (disponibilidad.py)
 */

const HORARIO_INICIO = 9;
const HORARIO_FIN = 18;
const MAX_CITAS_POR_HORA = 1;
const DIAS_SEMANA = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

function generarTodosHorarios() {
  const horarios = [];
  for (let h = HORARIO_INICIO; h < HORARIO_FIN; h++) {
    horarios.push(`${String(h).padStart(2, '0')}:00`);
  }
  return horarios;
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Get all booked hours from Google Calendar for a date range
 */
async function getCalendarEventsRange(startDate, endDate) {
  try {
    if (!process.env.GOOGLE_CREDENTIALS_JSON) return {};

    const { google } = await import('googleapis');
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    const calendar = google.calendar({ version: 'v3', auth });
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
    const timezone = process.env.GOOGLE_CALENDAR_TIMEZONE || 'America/Mexico_City';

    const response = await calendar.events.list({
      calendarId,
      timeMin: new Date(`${startDate}T00:00:00`).toISOString(),
      timeMax: new Date(`${endDate}T23:59:59`).toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      timeZone: timezone,
    });

    const eventsByDate = {};
    for (const event of (response.data.items || [])) {
      const start = event.start?.dateTime;
      if (start) {
        const date = new Date(start);
        const dateStr = formatDate(date);
        const hora = `${String(date.getHours()).padStart(2, '0')}:00`;
        if (!eventsByDate[dateStr]) eventsByDate[dateStr] = [];
        eventsByDate[dateStr].push(hora);
      }
    }
    return eventsByDate;
  } catch (error) {
    console.error('Error getting calendar events:', error);
    return {};
  }
}

/**
 * Get all booked appointments from Google Sheets
 */
async function getSheetsAppointmentsAll() {
  try {
    if (!process.env.GOOGLE_CREDENTIALS_JSON || !process.env.GOOGLE_SHEET_ID) return {};

    const { google } = await import('googleapis');
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Citas!A:H',
    });

    const rows = response.data.values || [];
    const appointmentsByDate = {};

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length >= 8) {
        const fechaCita = (row[5] || '').trim();
        const horaCita = (row[6] || '').trim();
        const estado = (row[7] || '').trim().toLowerCase();

        if (fechaCita && estado === 'confirmada' && horaCita) {
          const parts = horaCita.replace(/\s*(AM|PM)\s*/gi, '').split(':');
          if (parts.length >= 1) {
            const h = parseInt(parts[0], 10);
            if (!isNaN(h)) {
              const normalizedHora = `${String(h).padStart(2, '0')}:00`;
              if (!appointmentsByDate[fechaCita]) appointmentsByDate[fechaCita] = [];
              appointmentsByDate[fechaCita].push(normalizedHora);
            }
          }
        }
      }
    }

    return appointmentsByDate;
  } catch (error) {
    console.error('Error getting sheets appointments:', error);
    return {};
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
    const hoy = new Date();
    const todosHorarios = generarTodosHorarios();

    // Calculate date range
    const startDate = formatDate(hoy);
    const endDateObj = new Date(hoy);
    endDateObj.setDate(endDateObj.getDate() + 13);
    const endDate = formatDate(endDateObj);

    // Get all occupied hours from both sources in parallel
    const [calendarEvents, sheetsAppointments] = await Promise.all([
      getCalendarEventsRange(startDate, endDate),
      getSheetsAppointmentsAll()
    ]);

    // Build availability for each of the next 14 days
    const disponibilidad = {};

    for (let i = 0; i < 14; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(fecha.getDate() + i);
      const fechaStr = formatDate(fecha);

      // Merge occupied hours from both sources
      const horasOcupadas = [
        ...(calendarEvents[fechaStr] || []),
        ...(sheetsAppointments[fechaStr] || [])
      ];

      // Count per hour
      const citasPorHorario = {};
      for (const hora of horasOcupadas) {
        citasPorHorario[hora] = (citasPorHorario[hora] || 0) + 1;
      }

      // Determine available and occupied
      const horariosOcupados = [];
      const horariosDisponibles = [];

      for (const horario of todosHorarios) {
        const count = citasPorHorario[horario] || 0;
        if (count >= MAX_CITAS_POR_HORA) {
          horariosOcupados.push(horario);
        } else {
          horariosDisponibles.push(horario);
        }
      }

      // If today, filter past hours from available
      if (i === 0) {
        const currentHour = hoy.getHours();
        const filteredDisponibles = horariosDisponibles.filter(h => {
          const hour = parseInt(h.split(':')[0], 10);
          return hour > currentHour;
        });

        disponibilidad[fechaStr] = {
          fecha: fechaStr,
          dia_semana: DIAS_SEMANA[fecha.getDay()],
          horarios_ocupados: horariosOcupados,
          horarios_disponibles: filteredDisponibles
        };
      } else {
        disponibilidad[fechaStr] = {
          fecha: fechaStr,
          dia_semana: DIAS_SEMANA[fecha.getDay()],
          horarios_ocupados: horariosOcupados,
          horarios_disponibles: horariosDisponibles
        };
      }
    }

    return res.status(200).json({
      desde: startDate,
      hasta: endDate,
      disponibilidad
    });

  } catch (error) {
    console.error('Error getting disponibilidad:', error);
    return res.status(500).json({
      error: `Error obteniendo disponibilidad: ${error.message}`
    });
  }
}

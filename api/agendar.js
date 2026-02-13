/**
 * Vercel Serverless Function: /api/agendar
 * Creates appointments in Google Calendar and logs to Google Sheets
 * Replaces the Python version (agendar.py) to avoid 250MB dependency bloat
 */

/**
 * Initialize Google Auth client
 */
async function getGoogleAuth() {
  if (!process.env.GOOGLE_CREDENTIALS_JSON) {
    throw new Error('GOOGLE_CREDENTIALS_JSON environment variable is not set');
  }

  const { google } = await import('googleapis');
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });

  return { auth, google };
}

/**
 * Create event in Google Calendar
 */
async function createCalendarEvent(google, auth, eventData) {
  const calendar = google.calendar({ version: 'v3', auth });

  const { nombre, email, telefono, fecha, hora, notas, prototipo } = eventData;

  const [year, month, day] = fecha.split('-');
  const [hours, minutes] = hora.split(':');

  const timezone = process.env.GOOGLE_CALENDAR_TIMEZONE || 'America/Mexico_City';

  const startDateTime = new Date(year, month - 1, day, hours, minutes);
  const endDateTime = new Date(startDateTime);
  endDateTime.setHours(endDateTime.getHours() + 2);

  let description = `CITA - TORRE DE PIEDRA ZARÚ\n\n`;
  description += `Cliente: ${nombre}\n`;
  description += `Teléfono: ${telefono}\n`;
  description += `Email: ${email}\n`;
  if (prototipo) {
    description += `Prototipo de interés: ${prototipo}\n`;
  }
  if (notas) {
    description += `\nNotas adicionales:\n${notas}`;
  }
  description += `\n\n---\nPantrio AI - Asistente de Agendamiento Inteligente`;

  const event = {
    summary: `Cita - ${nombre} - Torre de Piedra`,
    description: description,
    location: 'Torre de Piedra Zarú, Desarrollo Zarú, Querétaro, México',
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: timezone,
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: timezone,
    },
    attendees: email ? [{ email }] : [],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 60 },
      ],
    },
    colorId: '9',
  };

  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
  const response = await calendar.events.insert({
    calendarId,
    resource: event,
    sendUpdates: 'all',
  });

  return {
    success: true,
    eventId: response.data.id,
    eventLink: response.data.htmlLink,
  };
}

/**
 * Log appointment to Google Sheets
 */
async function logToGoogleSheets(google, auth, eventData) {
  const sheets = google.sheets({ version: 'v4', auth });

  const { nombre, email, telefono, fecha, hora, notas, prototipo } = eventData;

  const timestamp = new Date().toLocaleString('es-MX', {
    timeZone: process.env.GOOGLE_CALENDAR_TIMEZONE || 'America/Mexico_City'
  });

  const rowData = [
    timestamp,
    nombre,
    telefono,
    email,
    'Torre de Piedra',
    fecha,
    hora,
    'confirmada'
  ];

  const sheetId = process.env.GOOGLE_SHEET_ID;

  // Ensure headers exist
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: 'Citas!A1:H1',
      valueInputOption: 'RAW',
      resource: {
        values: [[
          'Fecha Registro',
          'Nombre',
          'Teléfono',
          'Email',
          'Ubicación',
          'Fecha Cita',
          'Hora',
          'Estado'
        ]]
      },
    });
  } catch (headerError) {
    // Headers might already exist
  }

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Citas!A:H',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [rowData]
    },
  });

  return {
    success: true,
    updatedRange: response.data.updates?.updatedRange,
  };
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ exito: false, error: 'Method not allowed' });
  }

  try {
    const { user_id, nombre, telefono, email, fecha, hora, notas, prototipo } = req.body;

    // Validate required fields
    const camposRequeridos = { user_id, nombre, telefono, email, fecha, hora };
    for (const [campo, valor] of Object.entries(camposRequeridos)) {
      if (!valor) {
        return res.status(400).json({
          exito: false,
          error: `Campo requerido faltante: ${campo}`
        });
      }
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        exito: false,
        error: 'Email inválido'
      });
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(fecha)) {
      return res.status(400).json({
        exito: false,
        error: 'Formato de fecha inválido. Usa YYYY-MM-DD'
      });
    }

    // Validate time format
    const timeRegex = /^\d{2}:\d{2}$/;
    if (!timeRegex.test(hora)) {
      return res.status(400).json({
        exito: false,
        error: 'Formato de hora inválido. Usa HH:MM'
      });
    }

    // Validate phone
    const telefonoClean = telefono.replace(/\D/g, '');
    if (telefonoClean.length < 10) {
      return res.status(400).json({
        exito: false,
        error: 'Teléfono inválido. Debe tener al menos 10 dígitos'
      });
    }

    // Validate future date
    const appointmentDate = new Date(`${fecha}T${hora}:00`);
    if (appointmentDate < new Date()) {
      return res.status(400).json({
        exito: false,
        error: 'La fecha y hora de la cita debe ser en el futuro'
      });
    }

    // Create appointment in Google services
    const { auth, google } = await getGoogleAuth();

    const appointmentData = { nombre, email, telefono, fecha, hora, notas, prototipo };

    const [calendarResult, sheetsResult] = await Promise.all([
      createCalendarEvent(google, auth, appointmentData).catch(e => {
        console.error('Calendar error:', e);
        return { success: false, error: e.message };
      }),
      logToGoogleSheets(google, auth, appointmentData).catch(e => {
        console.error('Sheets error:', e);
        return { success: false, error: e.message };
      })
    ]);

    // Build cita response object
    const cita = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user_id,
      nombre,
      telefono,
      email,
      fecha,
      hora,
      estado: 'confirmada',
      fecha_creacion: new Date().toISOString()
    };

    return res.status(200).json({
      exito: true,
      mensaje: `Cita agendada exitosamente para el ${fecha} a las ${hora}`,
      cita,
      calendar: calendarResult.success ? {
        eventId: calendarResult.eventId,
        eventLink: calendarResult.eventLink
      } : undefined,
      sheets: {
        logged: sheetsResult.success
      }
    });

  } catch (error) {
    console.error('Scheduling error:', error);
    return res.status(500).json({
      exito: false,
      error: `Error al agendar cita: ${error.message}`
    });
  }
}

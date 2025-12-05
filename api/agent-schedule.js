/**
 * Vercel Serverless Function: Agent Schedule
 * Creates appointments in Google Calendar and logs to Google Sheets
 */

/**
 * Initialize Google Auth client
 */
async function getGoogleAuth() {
  try {
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
  } catch (error) {
    console.error('Error initializing Google Auth:', error);
    throw new Error('Failed to initialize Google authentication');
  }
}

/**
 * Create event in Google Calendar
 */
async function createCalendarEvent(google, auth, eventData) {
  const calendar = google.calendar({ version: 'v3', auth });

  const { nombre, email, telefono, fecha, hora, notas, prototipo } = eventData;

  // Parse date and time
  const [year, month, day] = fecha.split('-');
  const [hours, minutes] = hora.split(':');

  const timezone = process.env.GOOGLE_CALENDAR_TIMEZONE || 'America/Mexico_City';

  // Create start and end datetime (1 hour appointment)
  const startDateTime = new Date(year, month - 1, day, hours, minutes);
  const endDateTime = new Date(startDateTime);
  endDateTime.setHours(endDateTime.getHours() + 1);

  // Build event description
  let description = \`Cita agendada mediante Pantrio.dev - Torre de Piedra Zarú

\`;
  description += \`Cliente: \${nombre}
\`;
  description += \`Teléfono: \${telefono}
\`;
  description += \`Email: \${email}
\`;
  if (prototipo) {
    description += \`Prototipo de interés: \${prototipo}
\`;
  }
  if (notas) {
    description += \`
Notas adicionales:
\${notas}\`;
  }

  const event = {
    summary: \`Cita Torre de Piedra Zarú - \${nombre}\`,
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
    attendees: email ? [{ email: email }] : [],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 60 },
      ],
    },
    colorId: '9',
  };

  try {
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    const response = await calendar.events.insert({
      calendarId: calendarId,
      resource: event,
      sendUpdates: 'all',
    });

    return {
      success: true,
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
    };
  } catch (error) {
    console.error('Calendar API error:', error);
    throw error;
  }
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
    fecha,
    hora,
    nombre,
    telefono,
    email,
    prototipo || 'N/A',
    notas || '',
    'Agente Digital',
    'Pendiente'
  ];

  try {
    const sheetId = process.env.GOOGLE_SHEET_ID;

    try {
      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: 'Citas!A1:J1',
        valueInputOption: 'RAW',
        resource: {
          values: [[
            'Fecha Registro',
            'Fecha Cita',
            'Hora',
            'Nombre',
            'Teléfono',
            'Email',
            'Prototipo',
            'Notas',
            'Fuente',
            'Estado'
          ]]
        },
      });
    } catch (headerError) {
      // Headers might already exist
    }

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Citas!A:J',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [rowData]
      },
    });

    return {
      success: true,
      updatedRange: response.data.updates.updatedRange,
    };
  } catch (error) {
    console.error('Sheets API error:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { nombre, telefono, email, fecha, hora, notas, prototipo } = req.body;

    if (!nombre || !telefono || !email || !fecha || !hora) {
      return res.status(400).json({
        success: false,
        error: 'Faltan campos requeridos',
        required: ['nombre', 'telefono', 'email', 'fecha', 'hora']
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Formato de email inválido'
      });
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(fecha)) {
      return res.status(400).json({
        success: false,
        error: 'Formato de fecha inválido. Use YYYY-MM-DD'
      });
    }

    const timeRegex = /^\d{2}:\d{2}$/;
    if (!timeRegex.test(hora)) {
      return res.status(400).json({
        success: false,
        error: 'Formato de hora inválido. Use HH:MM'
      });
    }

    const appointmentDate = new Date(\`\${fecha}T\${hora}:00\`);
    if (appointmentDate < new Date()) {
      return res.status(400).json({
        success: false,
        error: 'La fecha y hora de la cita debe ser en el futuro'
      });
    }

    const { auth, google } = await getGoogleAuth();

    const [calendarResult, sheetsResult] = await Promise.all([
      createCalendarEvent(google, auth, req.body),
      logToGoogleSheets(google, auth, req.body)
    ]);

    return res.status(200).json({
      success: true,
      message: 'Cita agendada exitosamente',
      appointment: {
        nombre,
        fecha,
        hora,
        telefono,
        email
      },
      calendar: {
        eventId: calendarResult.eventId,
        eventLink: calendarResult.eventLink
      },
      sheets: {
        logged: sheetsResult.success
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Scheduling error:', error);

    if (error.message.includes('authentication')) {
      return res.status(500).json({
        success: false,
        error: 'Error de autenticación con Google',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Error al agendar la cita',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

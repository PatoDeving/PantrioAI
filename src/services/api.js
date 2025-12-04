/**
 * API Service - Handles all backend API calls
 * All endpoints are relative to /api/
 */

const API_BASE = '/api';

/**
 * GET /api/prototipos
 * Fetch all available property prototypes
 */
export const getPrototipos = async () => {
  try {
    const response = await fetch(`${API_BASE}/prototipos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching prototipos:', error);
    return { success: false, error: error.message };
  }
};

/**
 * GET /api/horarios?fecha=YYYY-MM-DD
 * Fetch available time slots for a specific date
 * @param {string} fecha - Date in YYYY-MM-DD format
 */
export const getHorarios = async (fecha) => {
  try {
    const response = await fetch(`${API_BASE}/horarios?fecha=${fecha}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching horarios:', error);
    return { success: false, error: error.message };
  }
};

/**
 * GET /api/disponibilidad
 * Fetch general availability information
 */
export const getDisponibilidad = async () => {
  try {
    const response = await fetch(`${API_BASE}/disponibilidad`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching disponibilidad:', error);
    return { success: false, error: error.message };
  }
};

/**
 * POST /api/chat
 * Send a message to the AI chatbot agent
 * @param {string} mensaje - User message
 * @param {string} userId - User identifier (optional, defaults to 'anonymous')
 */
export const sendChatMessage = async (mensaje, userId = 'anonymous') => {
  try {
    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mensaje,
        user_id: userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error sending chat message:', error);
    return { success: false, error: error.message };
  }
};

/**
 * POST /api/agendar
 * Schedule an appointment
 * @param {Object} citaData - Appointment data
 * @param {string} citaData.user_id - User identifier
 * @param {string} citaData.nombre - Client name
 * @param {string} citaData.telefono - Client phone
 * @param {string} citaData.email - Client email
 * @param {string} citaData.fecha - Date in YYYY-MM-DD format
 * @param {string} citaData.hora - Time in HH:MM format
 * @param {string} citaData.prototipo - Property prototype (optional)
 * @param {string} citaData.notas - Additional notes (optional)
 */
export const agendarCita = async (citaData) => {
  try {
    const response = await fetch(`${API_BASE}/agendar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(citaData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error agendando cita:', error);
    return { success: false, error: error.message };
  }
};

export default {
  getPrototipos,
  getHorarios,
  getDisponibilidad,
  sendChatMessage,
  agendarCita,
};

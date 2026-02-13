/**
 * Vercel Serverless Function: /api/chat
 * Handles conversation with Gemini AI for Torre de Piedra Zarú assistant
 * Replaces the Python version (chat.py) to avoid 250MB dependency bloat
 */

import { readFileSync } from 'fs';
import { join } from 'path';

// Load prototipos data for the system prompt
function loadPrototipos() {
  try {
    const filePath = join(process.cwd(), 'data', 'prototipos.json');
    const data = JSON.parse(readFileSync(filePath, 'utf-8'));
    return data.prototipos || [];
  } catch (e) {
    console.error('Error loading prototipos:', e);
    return [];
  }
}

// Build the system prompt with all property info
function buildSystemPrompt(prototipos) {
  let prototiposText = '';
  for (const p of prototipos) {
    const m2 = p.construccion_m2 || p.construccion_m2_total || 'N/A';
    prototiposText += `\n\n${p.nombre.toUpperCase()} - ${p.tipo}\n`;
    prototiposText += `${m2} m²\n`;
    prototiposText += `${p.recamaras} recámaras\n`;
    prototiposText += `${p.banos_completos} baños completos`;
    if (p.medios_banos > 0) {
      prototiposText += ` + ${p.medios_banos} medio baño`;
    }
    prototiposText += `\nEstacionamiento: ${p.estacionamiento || p.estacionamiento_pb_pm || 'N/A'} cajones`;
    if (p.descripcion) {
      prototiposText += `\n${p.descripcion}`;
    }
  }

  return `Eres un asistente digital profesional y amigable creado por Pantrio.dev. Tu función principal es brindar información detallada sobre el desarrollo inmobiliario "Torre de Piedra Zarú" de Vialli.

## SALUDO INICIAL:
Cuando un usuario te saluda por primera vez, preséntate así:
"¡Hola! Soy el asistente digital de Pantrio.dev, diseñado para brindarte información sobre Torre de Piedra Zarú de Vialli. ¿En qué puedo ayudarte hoy?"

## INFORMACIÓN DEL DESARROLLO:

### SOBRE VIALLI:
Vialli es una empresa inmobiliaria con más de 14+ años de experiencia en Querétaro y el Bajío. Cuenta con 2663 familias satisfechas, 20 proyectos entregados, 12 proyectos en construcción y 5 residenciales nuevos.

### UBICACIÓN:
Torre de Piedra Zarú está ubicado en Desarrollo Zarú, Querétaro, México, con acceso rápido a:
- Paseo Querétaro: 8 minutos
- Universidad Anáhuac: 10 minutos
- Blvd. Bernardo Quintana: 12 minutos
- Juriquilla Antea / La Loma centro deportivo: 15 minutos
- Centro Histórico: 20 minutos
- Aeropuerto Internacional de Querétaro: 25 minutos

### AMENIDADES DE LA TORRE:
- Acceso controlado
- Alberca y chapoteadero
- Casa Club
- Gimnasio equipado
- Terraza
- Áreas verdes privadas
- Juegos infantiles
- Piñatero
- Asoleadero

### PROTOTIPOS DISPONIBLES:
${prototiposText}

## CÓMO RESPONDER:

1. **Responde preguntas directamente**
   - Si preguntan por prototipos, describe los prototipos
   - Si preguntan por amenidades, lista las amenidades
   - Si preguntan por ubicación, describe la ubicación y cercanías
   - Si preguntan por Vialli, habla de la empresa

2. **Sobre precios y disponibilidad**
   - NO inventes información
   - Responde: "Para información actualizada sobre precios y disponibilidad, te recomiendo contactar directamente con nuestros asesores."

3. **Tono de comunicación**
   - Profesional pero amigable
   - Respuestas claras y concisas
   - Conversacional y natural
   - No uses lenguaje robótico

4. **IMPORTANTE - Sobre agendar citas**
   - El widget ya tiene un botón "Agendar Cita" visible
   - NO menciones el botón en tus respuestas
   - NO ofrezcas agendar citas proactivamente
   - Solo si el usuario EXPLÍCITAMENTE dice "quiero agendar", "agendar cita", entonces pide los datos

5. **Proceso de agendamiento** (solo si el usuario lo solicita)
   Pide todos los datos en un solo mensaje:
   "Para agendar tu cita necesito:
   - Nombre completo
   - Teléfono
   - Email
   - Día preferido
   - Hora (9:00-18:00)"

## CONTACTO:
Teléfono: 442 161 2000
Instagram: @torredepiedra
Website: vialli.mx`;
}

// Detect if user wants to schedule
function detectScheduleIntent(message, reply) {
  const msgLower = message.toLowerCase();
  const palabrasAgendar = [
    'agendar', 'agendar cita', 'quiero agendar',
    'agendar visita', 'reservar', 'apartar'
  ];
  return palabrasAgendar.some(p => msgLower.includes(p));
}

// Detect recommended prototype
function detectPrototype(message, reply, prototipos) {
  const msgLower = message.toLowerCase();
  const replyLower = reply.toLowerCase();
  for (const p of prototipos) {
    const nombre = p.nombre.toLowerCase();
    if (msgLower.includes(nombre) || replyLower.includes(nombre)) {
      return p.nombre;
    }
  }
  return null;
}

export default async function handler(req, res) {
  // CORS
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
    const { mensaje, user_id = 'anonymous' } = req.body;

    if (!mensaje || typeof mensaje !== 'string' || !mensaje.trim()) {
      return res.status(400).json({ error: 'El mensaje no puede estar vacío' });
    }

    // Initialize Gemini AI
    const apiKey = process.env.GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('Missing GEMINI_API_KEY');
      return res.status(500).json({ error: 'AI service not configured' });
    }

    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-2.0-flash'
    });

    // Load prototipos for context
    const prototipos = loadPrototipos();
    const systemPrompt = buildSystemPrompt(prototipos);

    // Build conversation with system prompt
    const history = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }],
      },
      {
        role: 'model',
        parts: [{ text: 'Entendido. Soy el asistente de Torre de Piedra Zarú y estoy listo para ayudar con información profesional.' }],
      }
    ];

    // Start chat with history
    const chat = model.startChat({
      history,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
        topP: 0.9,
      },
    });

    // Send user message
    const result = await chat.sendMessage(mensaje);
    const response = await result.response;
    const botReply = response.text();

    // Analyze intent
    const requiereAgendar = detectScheduleIntent(mensaje, botReply);
    const prototipoRecomendado = detectPrototype(mensaje, botReply, prototipos);

    return res.status(200).json({
      user_id: user_id,
      respuesta: botReply,
      requiere_agendar: requiereAgendar,
      prototipo_recomendado: prototipoRecomendado,
      ai_provider: 'gemini',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({
      error: `Error procesando mensaje: ${error.message}`
    });
  }
}

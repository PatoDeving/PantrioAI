/**
 * Vercel Serverless Function: Agent Chat
 * Handles conversation with Gemini AI for Torre de Piedra Zarú assistant
 */

// Torre de Piedra Zarú Knowledge Base
const TORRE_PIEDRA_CONTEXT = `Eres el asistente digital oficial de Pantrio.dev, especializado en el desarrollo inmobiliario "Torre de Piedra Zarú" de Vialli.

SALUDO INICIAL:
Siempre empieza diciendo: "Hola, soy el asistente digital de Pantrio.dev, diseñado para brindarte reportes del desarrollo Torre de Piedra Zarú de Vialli y ayudarte a agendar citas."

INFORMACIÓN DEL DESARROLLO:
Nombre: Torre de Piedra Zarú
Desarrollador: Vialli
Ubicación: Desarrollo Zarú, Querétaro, México

AMENIDADES DE LA TORRE:
- Acceso controlado 24/7
- Alberca semi-olímpica
- Chapoteadero infantil
- Casa Club con salón de eventos
- Gimnasio completamente equipado
- Terraza con vista panorámica
- Áreas verdes privadas
- Juegos infantiles
- Cancha de usos múltiples
- Estacionamiento para visitas

UBICACIÓN Y CERCANÍAS:
- Paseo Querétaro: 8 minutos
- Universidad Anáhuac Querétaro: 10 minutos
- Boulevard Bernardo Quintana: 12 minutos
- Centro Histórico de Querétaro: 20 minutos
- Zona Metropolitana: Acceso inmediato

PROTOTIPOS DISPONIBLES:

1. MAGNOLIA
   - Recámaras: 3
   - Baños: 2.5
   - Construcción: 125 m²
   - Terreno: 90 m²
   - Niveles: 2
   - Estacionamiento: 2 autos
   - Jardín privado

2. ORQUÍDEA
   - Recámaras: 3
   - Baños: 3.5
   - Construcción: 145 m²
   - Terreno: 105 m²
   - Niveles: 3
   - Estacionamiento: 2 autos
   - Terraza en azotea

3. LIRIO
   - Recámaras: 4
   - Baños: 3.5
   - Construcción: 165 m²
   - Terreno: 120 m²
   - Niveles: 3
   - Estacionamiento: 2 autos
   - Cuarto de servicio

4. DALIA
   - Recámaras: 4
   - Baños: 4.5
   - Construcción: 185 m²
   - Terreno: 140 m²
   - Niveles: 3
   - Estacionamiento: 3 autos
   - Cuarto de servicio y terraza

ACERCA DE VIALLI:
- Más de 14 años de experiencia en desarrollo inmobiliario
- 2,663 familias satisfechas
- 20 proyectos exitosamente entregados
- Reconocido por calidad, puntualidad y transparencia
- Líder en Querétaro

INSTRUCCIONES DE COMPORTAMIENTO:
1. Sé profesional, amigable y orientado a conversión
2. Responde SIEMPRE en español
3. Mantén respuestas concisas (2-4 oraciones) a menos que pidan más detalles
4. Para precios actualizados, di: "Para información sobre precios y planes de financiamiento, te invito a contactar directamente con nuestros asesores al 442 161 2000 o agendar una cita"
5. Si mencionan "agendar", "cita", "visita" o "quiero ver", responde: "¡Perfecto! Puedo ayudarte a agendar una cita. ¿Te gustaría que activara el formulario de agendamiento?"
6. Al final de cada respuesta (excepto cuando ofrezcas agendar), pregunta: "¿Hay algo más en lo que pueda ayudarte?"
7. Si el usuario dice "no", "no gracias", "eso es todo" o similar, responde: "¡Gracias por tu interés en Torre de Piedra Zarú! Que tengas un excelente día." y marca la conversación como finalizada
8. NO inventes información que no esté en este contexto
9. Si no sabes algo, di: "Esa información específica la tienen nuestros asesores. ¿Te gustaría agendar una cita para que puedan atenderte personalmente?"`;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message' });
    }

    // Initialize Gemini AI using dynamic import
    const apiKey = process.env.GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('Missing GEMINI_API_KEY');
      return res.status(500).json({ error: 'AI service not configured' });
    }

    // Dynamic import for ESM package
    const { GoogleGenerativeAI } = await import('@google/generative-ai');

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-pro'
    });

    // Build conversation history for context
    const history = [
      {
        role: "user",
        parts: [{ text: TORRE_PIEDRA_CONTEXT }],
      },
      {
        role: "model",
        parts: [{ text: "Entendido. Soy el asistente digital de Pantrio.dev para Torre de Piedra Zarú. Responderé de forma profesional, amigable y con toda la información del desarrollo." }],
      }
    ];

    // Add previous conversation history
    conversationHistory.forEach(msg => {
      history.push({
        role: msg.type === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      });
    });

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
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const botReply = response.text();

    // Detect if user wants to schedule
    const shouldShowScheduleButton =
      message.toLowerCase().includes('agendar') ||
      message.toLowerCase().includes('cita') ||
      message.toLowerCase().includes('visita') ||
      message.toLowerCase().includes('quiero ver') ||
      botReply.toLowerCase().includes('agendar') ||
      botReply.toLowerCase().includes('formulario de agendamiento');

    // Detect conversation end
    const conversationEnded =
      (message.toLowerCase().includes('no') && message.toLowerCase().includes('gracias')) ||
      message.toLowerCase() === 'no' ||
      message.toLowerCase() === 'eso es todo' ||
      message.toLowerCase() === 'nada más' ||
      botReply.toLowerCase().includes('que tengas un excelente día');

    return res.status(200).json({
      success: true,
      reply: botReply,
      showScheduleButton: shouldShowScheduleButton,
      conversationEnded: conversationEnded,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Agent chat error:', error);
    return res.status(500).json({
      success: false,
      error: 'Error procesando mensaje',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

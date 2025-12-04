import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SecretAgentWidget = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    fecha: '',
    hora: '',
    notas: '',
  });
  const messagesEndRef = useRef(null);

  // Debug and validate API key
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  console.log('API Key exists:', !!apiKey);
  console.log('API Key length:', apiKey?.length);

  const [genAI] = useState(() => {
    if (!apiKey) {
      console.error('REACT_APP_GEMINI_API_KEY is not defined');
      return null;
    }
    return new GoogleGenerativeAI(apiKey);
  });
  const [model] = useState(() => genAI?.getGenerativeModel({ model: "gemini-1.5-flash" }));
  const [chat, setChat] = useState(null);
  const [initError, setInitError] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Verificar que tenemos el API key y model
    if (!apiKey) {
      setInitError('Error: Falta la configuración de API. Por favor, contacta al administrador.');
      console.error('Missing REACT_APP_GEMINI_API_KEY');
      return;
    }

    if (!genAI || !model) {
      setInitError('Error: No se pudo inicializar el servicio de IA. Por favor, recarga la página.');
      console.error('GenAI or model not initialized');
      return;
    }

    try {
      // Inicializar el chat con el system prompt
      const systemPrompt = `Eres un asistente digital profesional y amigable para "Torre de Piedra Zarú" de Vialli.

INFORMACIÓN IMPORTANTE:
- Torre de Piedra Zarú está ubicado en Desarrollo Zarú, Querétaro, México
- Vialli tiene más de 14 años de experiencia
- 2,663 familias satisfechas
- 20 proyectos entregados

AMENIDADES DE LA TORRE:
- Acceso controlado
- Alberca y chapoteadero
- Casa Club
- Gimnasio equipado
- Terraza
- Áreas verdes privadas
- Juegos infantiles

UBICACIÓN - Cercanías:
- Paseo Querétaro: 8 minutos
- Universidad Anáhuac: 10 minutos
- Blvd. Bernardo Quintana: 12 minutos
- Centro Histórico: 20 minutos

CÓMO RESPONDER:
1. Responde preguntas sobre el desarrollo, amenidades, y ubicación
2. Sé profesional pero amigable
3. Responde en español
4. Si preguntan por precios, di: "Para información actualizada sobre precios, te recomiendo contactar con nuestros asesores al 442 161 2000"
5. Si el usuario dice "quiero agendar" o "agendar cita", ofrece ayudarle a agendar

IMPORTANTE: Mantén las respuestas concisas (2-3 oraciones máximo) a menos que te pidan más detalles.`;

      const initialChat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: systemPrompt }],
          },
          {
            role: "model",
            parts: [{ text: "Entendido. Soy el asistente de Torre de Piedra Zarú y estoy listo para ayudar." }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      });

      setChat(initialChat);

      // Mensaje de bienvenida
      setMessages([
        {
          type: 'bot',
          text: '¡Hola! Soy el asistente virtual de Torre de Piedra Zarú de Vialli. ¿En qué puedo ayudarte hoy?',
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error initializing chat:', error);
      setInitError('Error al inicializar el chat. Por favor, recarga la página.');
    }
  }, [model, genAI, apiKey]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading || !chat) return;

    const userMessage = {
      type: 'user',
      text: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const result = await chat.sendMessage(currentInput);
      const response = await result.response;
      const botText = response.text();

      const botMessage = {
        type: 'bot',
        text: botText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // Detectar si el usuario quiere agendar
      const lowerInput = currentInput.toLowerCase();
      const lowerResponse = botText.toLowerCase();
      if (lowerInput.includes('agendar') || lowerInput.includes('cita') ||
          lowerResponse.includes('agendar') || lowerResponse.includes('cita')) {
        setShowScheduleForm(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScheduleFormChange = (e) => {
    const { name, value } = e.target;
    setScheduleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();

    // Guardar en localStorage (ya que no tenemos backend)
    const appointment = {
      ...scheduleData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };

    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    setMessages((prev) => [
      ...prev,
      {
        type: 'bot',
        text: `¡Perfecto! He registrado tu solicitud de cita para el ${scheduleData.fecha} a las ${scheduleData.hora}. Te contactaremos pronto al ${scheduleData.telefono} para confirmar. ¡Gracias!`,
        timestamp: new Date(),
        isSuccess: true,
      },
    ]);

    setShowScheduleForm(false);
    setScheduleData({
      nombre: '',
      telefono: '',
      email: '',
      fecha: '',
      hora: '',
      notas: '',
    });
  };

  return (
    <div className="flex flex-col h-screen bg-bg-dark text-white">
      {/* Header */}
      <div className="bg-surface border-b border-border p-4">
        <h1 className="text-2xl font-bold text-primary">Asistente Virtual - Torre de Piedra Zarú</h1>
        <p className="text-text-secondary text-sm">Estoy aquí para ayudarte con información sobre nuestro desarrollo</p>
      </div>

      {/* Error Display */}
      {initError && (
        <div className="bg-red-900/30 border-l-4 border-red-500 p-4 m-4">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold">Error de Inicialización</p>
              <p className="text-sm">{initError}</p>
              <p className="text-xs mt-2 opacity-75">Código de error: API_KEY_MISSING</p>
            </div>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-primary text-white'
                  : msg.isError
                  ? 'bg-red-900/30 border border-red-500'
                  : msg.isSuccess
                  ? 'bg-green-900/30 border border-green-500'
                  : 'bg-card border border-border'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
              <span className="text-xs opacity-60 mt-1 block">
                {msg.timestamp.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-card border border-border p-3 rounded-lg">
              <p className="text-text-secondary">Escribiendo...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Schedule Form */}
      {showScheduleForm && (
        <div className="bg-surface border-t border-border p-4">
          <h3 className="text-lg font-semibold mb-3 text-primary">Agendar Cita</h3>
          <form onSubmit={handleScheduleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={scheduleData.nombre}
                onChange={handleScheduleFormChange}
                required
                className="bg-card border border-border rounded px-3 py-2 text-white placeholder-text-secondary focus:outline-none focus:border-primary"
              />
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                value={scheduleData.telefono}
                onChange={handleScheduleFormChange}
                required
                className="bg-card border border-border rounded px-3 py-2 text-white placeholder-text-secondary focus:outline-none focus:border-primary"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={scheduleData.email}
              onChange={handleScheduleFormChange}
              required
              className="w-full bg-card border border-border rounded px-3 py-2 text-white placeholder-text-secondary focus:outline-none focus:border-primary"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                name="fecha"
                value={scheduleData.fecha}
                onChange={handleScheduleFormChange}
                required
                className="bg-card border border-border rounded px-3 py-2 text-white focus:outline-none focus:border-primary"
              />
              <input
                type="time"
                name="hora"
                value={scheduleData.hora}
                onChange={handleScheduleFormChange}
                required
                className="bg-card border border-border rounded px-3 py-2 text-white focus:outline-none focus:border-primary"
              />
            </div>
            <textarea
              name="notas"
              placeholder="Notas adicionales (opcional)"
              value={scheduleData.notas}
              onChange={handleScheduleFormChange}
              rows="2"
              className="w-full bg-card border border-border rounded px-3 py-2 text-white placeholder-text-secondary focus:outline-none focus:border-primary resize-none"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Enviar Solicitud
              </button>
              <button
                type="button"
                onClick={() => setShowScheduleForm(false)}
                className="bg-card hover:bg-surface border border-border text-white py-2 px-4 rounded transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-surface border-t border-border p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            disabled={isLoading}
            className="flex-1 bg-card border border-border rounded-lg px-4 py-2 text-white placeholder-text-secondary focus:outline-none focus:border-primary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default SecretAgentWidget;

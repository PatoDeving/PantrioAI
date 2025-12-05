import React, { useState, useEffect, useRef } from 'react';

/**
 * Torre de Piedra Zarú Digital Assistant
 * Modern, serverless-based chat widget for Hidden1 page
 */
const TorrePiedraAgent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [conversationEnded, setConversationEnded] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    fecha: '',
    hora: '',
    prototipo: '',
    notas: '',
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial welcome message
  useEffect(() => {
    const welcomeMessage = {
      type: 'bot',
      text: 'Hola, soy el asistente digital de Pantrio.dev, diseñado para brindarte reportes del desarrollo Torre de Piedra Zarú de Vialli y ayudarte a agendar citas. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading || conversationEnded) return;

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
      // Call serverless API
      const response = await fetch('/api/agent-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          conversationHistory: messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Error en la respuesta');
      }

      const botMessage = {
        type: 'bot',
        text: data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // Show schedule button if AI suggests it
      if (data.showScheduleButton) {
        setShowScheduleForm(true);
      }

      // End conversation if detected
      if (data.conversationEnded) {
        setConversationEnded(true);
      }

    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo o contacta directamente al 442 161 2000.',
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
    setIsLoading(true);

    try {
      const response = await fetch('/api/agent-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleData),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Error al agendar');
      }

      // Success message
      const successMsg = {
        type: 'bot',
        text: `¡Perfecto! He agendado tu cita para el ${scheduleData.fecha} a las ${scheduleData.hora}. Recibirás una confirmación por email a ${scheduleData.email} y te contactaremos al ${scheduleData.telefono}. ¡Gracias por tu interés en Torre de Piedra Zarú!`,
        timestamp: new Date(),
        isSuccess: true,
      };

      setMessages((prev) => [...prev, successMsg]);

      // Reset form
      setShowScheduleForm(false);
      setScheduleData({
        nombre: '',
        telefono: '',
        email: '',
        fecha: '',
        hora: '',
        prototipo: '',
        notas: '',
      });

      // Add follow-up message
      setTimeout(() => {
        const followUpMsg = {
          type: 'bot',
          text: '¿Hay algo más en lo que pueda ayudarte?',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, followUpMsg]);
      }, 1000);

    } catch (error) {
      console.error('Scheduling error:', error);
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: `Error al agendar la cita: ${error.message}. Por favor, intenta de nuevo o contacta al 442 161 2000.`,
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min date
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="flex flex-col h-screen bg-bg-dark text-white">
      {/* Header */}
      <div className="bg-surface border-b border-border p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-glow">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">Torre de Piedra Zarú</h1>
            <p className="text-text-secondary text-sm">Asistente Digital de Pantrio.dev</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] p-4 rounded-lg shadow-md ${
                msg.type === 'user'
                  ? 'bg-primary text-white rounded-br-none'
                  : msg.isError
                  ? 'bg-red-900/30 border border-red-500 rounded-bl-none'
                  : msg.isSuccess
                  ? 'bg-green-900/30 border border-green-500 rounded-bl-none'
                  : 'bg-card border border-border rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
              <span className="text-xs opacity-60 mt-2 block">
                {msg.timestamp.toLocaleTimeString('es-MX', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-card border border-border p-4 rounded-lg rounded-bl-none shadow-md">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-text-secondary text-sm ml-2">Escribiendo...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Schedule Form */}
      {showScheduleForm && !conversationEnded && (
        <div className="bg-surface border-t-2 border-primary p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Agendar Cita
            </h3>
            <button
              onClick={() => setShowScheduleForm(false)}
              className="text-text-secondary hover:text-white transition-colors"
              title="Cerrar formulario"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleScheduleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo *"
                value={scheduleData.nombre}
                onChange={handleScheduleFormChange}
                required
                className="bg-card border border-border rounded-lg px-4 py-2.5 text-white placeholder-text-secondary focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono (10 dígitos) *"
                value={scheduleData.telefono}
                onChange={handleScheduleFormChange}
                pattern="[0-9]{10}"
                required
                className="bg-card border border-border rounded-lg px-4 py-2.5 text-white placeholder-text-secondary focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Correo electrónico *"
              value={scheduleData.email}
              onChange={handleScheduleFormChange}
              required
              className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-white placeholder-text-secondary focus:outline-none focus:border-primary transition-colors"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-text-secondary mb-1 ml-1">Fecha de cita *</label>
                <input
                  type="date"
                  name="fecha"
                  value={scheduleData.fecha}
                  onChange={handleScheduleFormChange}
                  min={getTodayDate()}
                  required
                  className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1 ml-1">Hora *</label>
                <input
                  type="time"
                  name="hora"
                  value={scheduleData.hora}
                  onChange={handleScheduleFormChange}
                  min="09:00"
                  max="18:00"
                  required
                  className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <select
              name="prototipo"
              value={scheduleData.prototipo}
              onChange={handleScheduleFormChange}
              className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors"
            >
              <option value="">Selecciona un prototipo (opcional)</option>
              <option value="Magnolia">Magnolia - 3 rec, 125m²</option>
              <option value="Orquídea">Orquídea - 3 rec, 145m²</option>
              <option value="Lirio">Lirio - 4 rec, 165m²</option>
              <option value="Dalia">Dalia - 4 rec, 185m²</option>
            </select>

            <textarea
              name="notas"
              placeholder="Notas adicionales (opcional)"
              value={scheduleData.notas}
              onChange={handleScheduleFormChange}
              rows="2"
              className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-white placeholder-text-secondary focus:outline-none focus:border-primary transition-colors resize-none"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-glow hover:shadow-glow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'Agendando...' : 'Confirmar Cita'}
            </button>
          </form>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-surface border-t border-border p-4">
        {conversationEnded ? (
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-3">
              Conversación finalizada. ¡Gracias por tu interés!
            </p>
            <button
              onClick={() => {
                setMessages([{
                  type: 'bot',
                  text: 'Hola, soy el asistente digital de Pantrio.dev, diseñado para brindarte reportes del desarrollo Torre de Piedra Zarú de Vialli y ayudarte a agendar citas. ¿En qué puedo ayudarte hoy?',
                  timestamp: new Date(),
                }]);
                setConversationEnded(false);
                setShowScheduleForm(false);
              }}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Nueva Conversación
            </button>
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
              disabled={isLoading}
              className="flex-1 bg-card border border-border rounded-lg px-4 py-2.5 text-white placeholder-text-secondary focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TorrePiedraAgent;

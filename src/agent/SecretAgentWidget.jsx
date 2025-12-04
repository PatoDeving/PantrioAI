import React, { useState, useEffect, useRef } from 'react';
import { sendChatMessage, agendarCita, getHorarios } from '../services/api';

const SecretAgentWidget = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    fecha: '',
    hora: '',
    prototipo: '',
    notas: '',
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Mensaje de bienvenida inicial
    setMessages([
      {
        type: 'bot',
        text: '¡Hola! Soy el asistente virtual de Torre de Piedra Zarú. ¿En qué puedo ayudarte hoy?',
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      text: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const result = await sendChatMessage(inputMessage, userId);

      if (result.success) {
        const botMessage = {
          type: 'bot',
          text: result.data.respuesta,
          timestamp: new Date(),
          requiere_agendar: result.data.requiere_agendar,
          prototipo_recomendado: result.data.prototipo_recomendado,
        };

        setMessages((prev) => [...prev, botMessage]);

        // Si requiere agendar, mostrar el formulario
        if (result.data.requiere_agendar) {
          setShowScheduleForm(true);
          if (result.data.prototipo_recomendado) {
            setScheduleData((prev) => ({
              ...prev,
              prototipo: result.data.prototipo_recomendado,
            }));
          }
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: 'bot',
            text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
            timestamp: new Date(),
            isError: true,
          },
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: 'Lo siento, hubo un error de conexión. Por favor, intenta de nuevo.',
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

    // Si cambia la fecha, obtener horarios disponibles
    if (name === 'fecha' && value) {
      fetchAvailableSlots(value);
    }
  };

  const fetchAvailableSlots = async (fecha) => {
    try {
      const result = await getHorarios(fecha);
      if (result.success && result.data.horarios_disponibles) {
        setAvailableSlots(result.data.horarios_disponibles);
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const citaData = {
        ...scheduleData,
        user_id: userId,
      };

      const result = await agendarCita(citaData);

      if (result.success && result.data.exito) {
        setMessages((prev) => [
          ...prev,
          {
            type: 'bot',
            text: result.data.mensaje || '¡Cita agendada exitosamente! Recibirás una confirmación por correo.',
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
          prototipo: '',
          notas: '',
        });
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: 'bot',
            text: result.data?.error || 'Hubo un error al agendar la cita. Por favor, intenta de nuevo.',
            timestamp: new Date(),
            isError: true,
          },
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: 'Lo siento, hubo un error al agendar la cita. Por favor, intenta de nuevo.',
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-bg-dark text-white">
      {/* Header */}
      <div className="bg-surface border-b border-border p-4">
        <h1 className="text-2xl font-bold text-primary">Asistente Virtual - Torre de Piedra Zarú</h1>
        <p className="text-text-secondary text-sm">Estoy aquí para ayudarte con información sobre nuestros prototipos</p>
      </div>

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
              {availableSlots.length > 0 ? (
                <select
                  name="hora"
                  value={scheduleData.hora}
                  onChange={handleScheduleFormChange}
                  required
                  className="bg-card border border-border rounded px-3 py-2 text-white focus:outline-none focus:border-primary"
                >
                  <option value="">Seleccionar hora</option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="time"
                  name="hora"
                  value={scheduleData.hora}
                  onChange={handleScheduleFormChange}
                  required
                  className="bg-card border border-border rounded px-3 py-2 text-white focus:outline-none focus:border-primary"
                />
              )}
            </div>
            <input
              type="text"
              name="prototipo"
              placeholder="Prototipo de interés (opcional)"
              value={scheduleData.prototipo}
              onChange={handleScheduleFormChange}
              className="w-full bg-card border border-border rounded px-3 py-2 text-white placeholder-text-secondary focus:outline-none focus:border-primary"
            />
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
                disabled={isLoading}
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Agendando...' : 'Agendar Cita'}
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

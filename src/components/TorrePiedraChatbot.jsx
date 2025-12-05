import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendChatMessage, agendarCita, getHorarios } from '../services/api';

/**
 * Torre de Piedra Zarú AI Chatbot
 * Full-featured chatbot with appointment scheduling
 */
const TorrePiedraChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const [scheduleData, setScheduleData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    fecha: '',
    hora: '',
    prototipo: '',
    notas: '',
  });

  const [availableHorarios, setAvailableHorarios] = useState([]);
  const [loadingHorarios, setLoadingHorarios] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize conversation when chatbot opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(
        '¡Hola! Soy el asistente virtual de Torre de Piedra Zarú de Vialli. ¿En qué puedo ayudarte hoy?'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const addBotMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        type: 'bot',
        text,
        timestamp: new Date(),
      },
    ]);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        type: 'user',
        text,
        timestamp: new Date(),
      },
    ]);
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMsg = inputMessage.trim();
    addUserMessage(userMsg);
    setInputMessage('');
    setIsLoading(true);

    try {
      const result = await sendChatMessage(userMsg, userId);

      if (result.success) {
        addBotMessage(result.data.respuesta);

        // Check if user wants to schedule an appointment
        if (result.data.requiere_agendar) {
          setTimeout(() => {
            setShowScheduleForm(true);
          }, 500);
        }
      } else {
        addBotMessage(
          'Lo siento, hubo un problema al procesar tu mensaje. ¿Podrías intentarlo de nuevo?'
        );
      }
    } catch (error) {
      console.error('Error:', error);
      addBotMessage(
        'Lo siento, ocurrió un error. Por favor intenta de nuevo o contacta directamente al 442 161 2000.'
      );
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

    // Load available time slots when date is selected
    if (name === 'fecha' && value) {
      loadHorarios(value);
    }
  };

  const loadHorarios = async (fecha) => {
    setLoadingHorarios(true);
    try {
      const result = await getHorarios(fecha);
      if (result.success) {
        setAvailableHorarios(result.data.horarios_disponibles || []);
      } else {
        setAvailableHorarios([]);
      }
    } catch (error) {
      console.error('Error loading horarios:', error);
      setAvailableHorarios([]);
    } finally {
      setLoadingHorarios(false);
    }
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!scheduleData.nombre || !scheduleData.telefono || !scheduleData.email ||
        !scheduleData.fecha || !scheduleData.hora) {
      addBotMessage('Por favor completa todos los campos requeridos.');
      return;
    }

    setIsLoading(true);

    try {
      const citaData = {
        user_id: userId,
        nombre: scheduleData.nombre,
        telefono: scheduleData.telefono,
        email: scheduleData.email,
        fecha: scheduleData.fecha,
        hora: scheduleData.hora,
        prototipo: scheduleData.prototipo,
        notas: scheduleData.notas,
      };

      const result = await agendarCita(citaData);

      if (result.success) {
        addBotMessage(
          `¡Perfecto! He agendado tu cita para el ${scheduleData.fecha} a las ${scheduleData.hora}. ` +
          `Te contactaremos pronto al ${scheduleData.telefono} para confirmar. ¡Gracias!`
        );

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
        setAvailableHorarios([]);
      } else {
        addBotMessage(
          `Lo siento, no pude agendar la cita: ${result.error || 'Error desconocido'}. ` +
          `Por favor intenta con otro horario o contacta al 442 161 2000.`
        );
      }
    } catch (error) {
      console.error('Error:', error);
      addBotMessage(
        'Ocurrió un error al agendar la cita. Por favor contacta directamente al 442 161 2000.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([]);
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
    setAvailableHorarios([]);
    addBotMessage(
      '¡Hola! Soy el asistente virtual de Torre de Piedra Zarú de Vialli. ¿En qué puedo ayudarte hoy?'
    );
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="mb-4 w-80 sm:w-96 bg-dark-card border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: showScheduleForm ? '600px' : '500px' }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-neon-blue to-neon-purple p-4 flex justify-between items-center flex-shrink-0">
              <div>
                <h3 className="font-bold text-white">Torre de Piedra Zarú</h3>
                <p className="text-xs text-gray-200 opacity-90">Asistente Virtual</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetChat}
                  className="text-white hover:text-gray-200 transition-colors"
                  title="Reiniciar conversación"
                >
                  <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto bg-dark-bg">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg max-w-[80%] ${
                      message.type === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-dark-card border border-gray-700 text-gray-300'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <span className="text-xs opacity-60 mt-1 block">
                      {message.timestamp.toLocaleTimeString('es-MX', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-gray-500"
                >
                  <div className="flex gap-1">
                    <motion.div
                      className="w-2 h-2 bg-gray-500 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-gray-500 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-gray-500 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    />
                  </div>
                  <span className="text-sm">Escribiendo...</span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Schedule Form */}
            {showScheduleForm && (
              <div className="bg-surface border-t border-gray-800 p-4 max-h-64 overflow-y-auto">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-primary">Agendar Cita</h3>
                  <button
                    onClick={() => setShowScheduleForm(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleScheduleSubmit} className="space-y-3">
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre completo *"
                    value={scheduleData.nombre}
                    onChange={handleScheduleFormChange}
                    required
                    className="w-full bg-dark-bg border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      name="telefono"
                      placeholder="Teléfono *"
                      value={scheduleData.telefono}
                      onChange={handleScheduleFormChange}
                      required
                      className="bg-dark-bg border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      value={scheduleData.email}
                      onChange={handleScheduleFormChange}
                      required
                      className="bg-dark-bg border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                    />
                  </div>
                  <input
                    type="date"
                    name="fecha"
                    value={scheduleData.fecha}
                    onChange={handleScheduleFormChange}
                    min={getMinDate()}
                    required
                    className="w-full bg-dark-bg border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                  />
                  {loadingHorarios && (
                    <p className="text-sm text-gray-400">Cargando horarios disponibles...</p>
                  )}
                  {scheduleData.fecha && availableHorarios.length > 0 && (
                    <select
                      name="hora"
                      value={scheduleData.hora}
                      onChange={handleScheduleFormChange}
                      required
                      className="w-full bg-dark-bg border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                    >
                      <option value="">Selecciona un horario *</option>
                      {availableHorarios.map((h) => (
                        <option key={h.hora} value={h.hora}>
                          {h.hora} ({h.espacios_disponibles} disponible{h.espacios_disponibles > 1 ? 's' : ''})
                        </option>
                      ))}
                    </select>
                  )}
                  {scheduleData.fecha && !loadingHorarios && availableHorarios.length === 0 && (
                    <p className="text-sm text-yellow-500">No hay horarios disponibles para esta fecha.</p>
                  )}
                  <select
                    name="prototipo"
                    value={scheduleData.prototipo}
                    onChange={handleScheduleFormChange}
                    className="w-full bg-dark-bg border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                  >
                    <option value="">Prototipo de interés (opcional)</option>
                    <option value="Magnolia">Magnolia - 4 recámaras</option>
                    <option value="Orquídea">Orquídea - 3 recámaras</option>
                    <option value="Lirio">Lirio - Cuádruplex</option>
                    <option value="Dalia">Dalia - Séxtuplex</option>
                  </select>
                  <textarea
                    name="notas"
                    placeholder="Notas adicionales (opcional)"
                    value={scheduleData.notas}
                    onChange={handleScheduleFormChange}
                    rows="2"
                    className="w-full bg-dark-bg border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !scheduleData.fecha || !scheduleData.hora}
                    className="w-full bg-primary hover:bg-opacity-80 text-white font-semibold py-2 px-4 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Agendando...' : 'Agendar Cita'}
                  </button>
                </form>
              </div>
            )}

            {/* Chat Input */}
            {!showScheduleForm && (
              <div className="p-4 border-t border-gray-800 flex-shrink-0">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe tu mensaje..."
                    disabled={isLoading}
                    className="flex-1 bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors disabled:opacity-50"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-neon-blue text-black px-4 py-2 rounded-lg font-semibold hover:bg-opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      'Enviar'
                    )}
                  </button>
                </div>
                <button
                  onClick={() => setShowScheduleForm(true)}
                  className="w-full mt-2 bg-dark-card border border-primary text-primary py-2 px-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all text-sm"
                >
                  Agendar Cita
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-neon-blue to-neon-purple text-white p-4 rounded-full shadow-2xl"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: isOpen
            ? '0 0 0 0 rgba(0, 243, 255, 0)'
            : [
                '0 0 0 0 rgba(0, 243, 255, 0.4)',
                '0 0 0 20px rgba(0, 243, 255, 0)',
              ],
        }}
        transition={{
          boxShadow: {
            repeat: Infinity,
            duration: 2,
          },
        }}
      >
        <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          )}
        </svg>
      </motion.button>
    </div>
  );
};

export default TorrePiedraChatbot;

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [conversationState, setConversationState] = useState('initial');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredTime: '',
    inquiryType: ''
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage("Hello! I'm your Pantrio AI assistant. How can I help you today?");
      setTimeout(() => {
        addBotMessage("Please choose an option:", true);
      }, 800);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const addBotMessage = (text, showOptions = false) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot',
        text,
        showOptions,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 500);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, {
      type: 'user',
      text,
      timestamp: new Date()
    }]);
  };

  const handleOptionClick = (option) => {
    addUserMessage(option);

    switch(option) {
      case 'Schedule a Call':
        setUserData(prev => ({ ...prev, inquiryType: 'Schedule a Call' }));
        setConversationState('collectName');
        setTimeout(() => {
          addBotMessage("Great! I'll help you schedule a call. What's your name?");
        }, 500);
        break;

      case 'Ask a Question':
        setUserData(prev => ({ ...prev, inquiryType: 'Ask a Question' }));
        setConversationState('collectName');
        setTimeout(() => {
          addBotMessage("I'd be happy to help! What's your name?");
        }, 500);
        break;

      case 'View Services':
        setTimeout(() => {
          addBotMessage("We offer a wide range of AI and technology solutions:");
          setTimeout(() => {
            addBotMessage("AI & Machine Learning\nWeb Development\nMobile Development\nCloud Solutions\nAutomation & DevOps\nData Analytics\nUI/UX Design");
            setTimeout(() => {
              addBotMessage("Would you like to schedule a call to discuss any of these services?", true);
            }, 1000);
          }, 600);
        }, 500);
        break;

      default:
        break;
    }
  };

  const handleUserInput = (input) => {
    if (!input.trim()) return;

    addUserMessage(input);
    setUserInput('');

    switch(conversationState) {
      case 'collectName':
        setUserData(prev => ({ ...prev, name: input }));
        setConversationState('collectEmail');
        setTimeout(() => {
          addBotMessage(`Nice to meet you, ${input}! What's your email address?`);
        }, 500);
        break;

      case 'collectEmail':
        if (!validateEmail(input)) {
          setTimeout(() => {
            addBotMessage("Please enter a valid email address.");
          }, 500);
          return;
        }
        setUserData(prev => ({ ...prev, email: input }));
        setConversationState('collectPhone');
        setTimeout(() => {
          addBotMessage("Great! What's your phone number?");
        }, 500);
        break;

      case 'collectPhone':
        setUserData(prev => ({ ...prev, phone: input }));
        if (userData.inquiryType === 'Schedule a Call') {
          setConversationState('collectTime');
          setTimeout(() => {
            addBotMessage("Perfect! What's your preferred time for the call? (e.g., 'Tomorrow at 2 PM' or 'Next Monday morning')");
          }, 500);
        } else {
          setConversationState('collectQuestion');
          setTimeout(() => {
            addBotMessage("What question would you like to ask us?");
          }, 500);
        }
        break;

      case 'collectTime':
        setUserData(prev => ({ ...prev, preferredTime: input }));
        setConversationState('sending');
        sendEmail({ ...userData, preferredTime: input });
        break;

      case 'collectQuestion':
        setUserData(prev => ({ ...prev, question: input }));
        setConversationState('sending');
        sendEmail({ ...userData, question: input });
        break;

      default:
        break;
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const sendEmail = async (data) => {
    setIsSending(true);
    addBotMessage("Processing your request...");

    try {
      const templateParams = {
        to_email: 'patodinkmedia@gmail.com',
        inquiry_type: data.inquiryType,
        user_name: data.name,
        user_email: data.email,
        user_phone: data.phone,
        preferred_time: data.preferredTime || 'N/A',
        question: data.question || 'N/A',
        timestamp: new Date().toLocaleString()
      };

      await emailjs.send(
        'service_p579v5u',
        'template_msezgd8',
        templateParams,
        'ELgEBh_c-dvvojtLW'
      );

      setIsSending(false);
      setConversationState('success');
      setTimeout(() => {
        addBotMessage("Thank you! Your request has been sent successfully. We'll get back to you within 24 hours.");
        setTimeout(() => {
          addBotMessage("Is there anything else I can help you with?", true);
        }, 1000);
      }, 500);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setIsSending(false);
      setConversationState('error');
      setTimeout(() => {
        addBotMessage("Sorry, there was an error sending your request. Please try again or contact us directly at patodinkmedia@gmail.com");
        setTimeout(() => {
          addBotMessage("Would you like to try again?", true);
        }, 1000);
      }, 500);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setUserData({
      name: '',
      email: '',
      phone: '',
      preferredTime: '',
      inquiryType: ''
    });
    setConversationState('initial');
    setUserInput('');
    addBotMessage("Hello! I'm your Pantrio AI assistant. How can I help you today?");
    setTimeout(() => {
      addBotMessage("Please choose an option:", true);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUserInput(userInput);
    }
  };

  const handleSendClick = () => {
    handleUserInput(userInput);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-4 w-80 sm:w-96 h-[500px] bg-codex-card border border-white/[0.06] rounded-2xl shadow-card overflow-hidden flex flex-col"
          >
            {/* Chat Header */}
            <div className="bg-codex-green p-4 flex justify-between items-center flex-shrink-0">
              <h3 className="font-semibold text-white text-sm">Pantrio AI Assistant</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetChat}
                  className="text-white/80 hover:text-white transition-colors duration-150"
                  title="Reset conversation"
                >
                  <svg className="h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors duration-150"
                >
                  <svg className="h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto bg-codex-bg">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg max-w-[80%] ${
                      message.type === 'user'
                        ? 'bg-codex-green text-white'
                        : 'bg-codex-card border border-white/[0.06] text-codex-text-muted'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>

                  {message.showOptions && message.type === 'bot' && (
                    <motion.div
                      className="mt-3 space-y-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      {conversationState === 'initial' && (
                        <>
                          <button
                            onClick={() => handleOptionClick('Schedule a Call')}
                            className="block w-full text-left px-4 py-2 bg-codex-card border border-codex-green/30 hover:bg-codex-green/10 rounded-lg transition-colors duration-150 text-sm text-codex-text-muted"
                          >
                            Schedule a Call
                          </button>
                          <button
                            onClick={() => handleOptionClick('Ask a Question')}
                            className="block w-full text-left px-4 py-2 bg-codex-card border border-codex-green/30 hover:bg-codex-green/10 rounded-lg transition-colors duration-150 text-sm text-codex-text-muted"
                          >
                            Ask a Question
                          </button>
                          <button
                            onClick={() => handleOptionClick('View Services')}
                            className="block w-full text-left px-4 py-2 bg-codex-card border border-codex-green/30 hover:bg-codex-green/10 rounded-lg transition-colors duration-150 text-sm text-codex-text-muted"
                          >
                            View Services
                          </button>
                        </>
                      )}
                      {(conversationState === 'success' || conversationState === 'error') && (
                        <>
                          <button
                            onClick={() => handleOptionClick('Schedule a Call')}
                            className="block w-full text-left px-4 py-2 bg-codex-card border border-codex-green/30 hover:bg-codex-green/10 rounded-lg transition-colors duration-150 text-sm text-codex-text-muted"
                          >
                            Schedule Another Call
                          </button>
                          <button
                            onClick={() => handleOptionClick('Ask a Question')}
                            className="block w-full text-left px-4 py-2 bg-codex-card border border-codex-green/30 hover:bg-codex-green/10 rounded-lg transition-colors duration-150 text-sm text-codex-text-muted"
                          >
                            Ask a Question
                          </button>
                        </>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-codex-text-dim"
                >
                  <div className="flex gap-1">
                    <motion.div
                      className="w-1.5 h-1.5 bg-codex-text-dim rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 bg-codex-text-dim rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 bg-codex-text-dim rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                    />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-white/[0.06] flex-shrink-0">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    conversationState === 'initial'
                      ? 'Choose an option above...'
                      : 'Type your message...'
                  }
                  className="flex-1 bg-codex-bg border border-white/[0.08] rounded-lg px-4 py-2 text-sm text-codex-text focus:outline-none focus:border-codex-green/50 transition-colors duration-150 placeholder:text-codex-text-dim"
                  disabled={isSending || conversationState === 'initial'}
                />
                <button
                  onClick={handleSendClick}
                  disabled={isSending || conversationState === 'initial' || !userInput.trim()}
                  className="bg-codex-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-codex-green-light transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    'Send'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-codex-green text-white p-3.5 rounded-full shadow-card hover:shadow-card-hover transition-shadow duration-150"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
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

export default Chatbot;

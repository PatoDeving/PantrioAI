import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Floating Chatbot Component (Placeholder)
 * Features:
 * - Floating button in bottom-right corner
 * - Expandable chat window
 * - Smooth animations
 * 
 * TODO: Integrate with actual chatbot API or service
 */
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="mb-4 w-80 h-96 bg-dark-card border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-neon-blue to-neon-purple p-4 flex justify-between items-center">
              <h3 className="font-bold text-white">Pantrio AI Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 h-64 overflow-y-auto bg-dark-bg">
              <div className="bg-dark-card p-3 rounded-lg mb-3 border border-gray-700">
                <p className="text-sm text-gray-300">
                  Hello! I'm your AI assistant. How can I help you today?
                </p>
              </div>
              <div className="text-center text-gray-500 text-xs mt-4">
                Chatbot integration coming soon...
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors"
                  disabled
                />
                <button
                  className="bg-neon-blue text-black px-4 py-2 rounded-lg font-semibold hover:bg-opacity-80 transition-all disabled:opacity-50"
                  disabled
                >
                  Send
                </button>
              </div>
            </div>
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

export default Chatbot;

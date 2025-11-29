import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated Card Component with Framer Motion hover effects
 * 
 * Props:
 * - title: Card title/heading
 * - description: Card description text
 * - icon: Icon or emoji to display
 * - className: Additional custom classes
 */
const Card = ({ title, description, icon, className = '' }) => {
  return (
    <motion.div
      className={`bg-dark-card border border-gray-800 rounded-xl p-8 relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -10,
        borderColor: '#00f3ff',
        boxShadow: '0 10px 40px rgba(0, 243, 255, 0.2)'
      }}
    >
      {/* Gradient background on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(0,243,255,0.1) 0%, rgba(191,0,255,0.1) 100%)'
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10">
        {/* Icon */}
        {icon && (
          <motion.div 
            className="text-6xl mb-6"
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {icon}
          </motion.div>
        )}
        
        {/* Title */}
        <motion.h3 
          className="text-2xl font-bold mb-4 text-neon-blue"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>
        
        {/* Description */}
        <p className="text-gray-400 leading-relaxed">
          {description}
        </p>
        
        {/* Animated corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-20 h-20"
          style={{
            background: 'linear-gradient(135deg, transparent 50%, rgba(0,243,255,0.1) 50%)'
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default Card;

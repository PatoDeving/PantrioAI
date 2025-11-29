import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated Button Component with Framer Motion hover effects
 * 
 * Props:
 * - children: Button text/content
 * - onClick: Click handler function
 * - variant: 'primary' (neon blue) or 'secondary' (neon purple)
 * - className: Additional custom classes
 */
const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseClasses = 'px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 relative overflow-hidden';
  
  const variantClasses = {
    primary: 'bg-neon-blue text-black hover:bg-opacity-80',
    secondary: 'bg-neon-purple text-white hover:bg-opacity-80',
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        boxShadow: variant === 'primary' 
          ? '0 0 25px rgba(0, 243, 255, 0.6)' 
          : '0 0 25px rgba(191, 0, 255, 0.6)'
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <motion.span
        className="relative z-10"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      
      {/* Animated background glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0"
        style={{
          background: variant === 'primary'
            ? 'radial-gradient(circle, rgba(0,243,255,0.4) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(191,0,255,0.4) 0%, transparent 70%)'
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default Button;

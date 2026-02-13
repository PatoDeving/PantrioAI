import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium text-sm transition-all duration-150 relative overflow-hidden';

  const variantClasses = {
    primary: 'bg-codex-green text-white hover:bg-codex-green-light',
    secondary: 'bg-white/[0.08] text-codex-text hover:bg-white/[0.12] border border-white/[0.06]',
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;

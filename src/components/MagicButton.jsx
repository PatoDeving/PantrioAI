import React from 'react';
import { motion } from 'framer-motion';

const MagicButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  const variants = {
    primary: 'bg-codex-green text-white hover:bg-codex-green-light shadow-green-sm hover:shadow-green',
    secondary: 'bg-white/[0.08] text-codex-text hover:bg-white/[0.12] border border-white/[0.06]',
    outline: 'bg-transparent border border-codex-green/40 text-codex-green hover:bg-codex-green/10 hover:border-codex-green/60',
  };

  const variantStyle = variants[variant] || variants.primary;

  return (
    <motion.button
      onClick={onClick}
      className={`
        ${sizeClasses[size]}
        ${variantStyle}
        rounded-lg font-medium
        transition-all duration-150 ease-out
        ${className}
      `}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default MagicButton;

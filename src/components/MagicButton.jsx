import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * MagicButton - Premium interactive button with glow effects
 * Inspired by Huly.io's "See in Action" button
 *
 * Features:
 * - Radial gradient glow that follows mouse position
 * - Smooth hover animations
 * - Blur effect backdrop
 * - Customizable colors and styles
 */
const MagicButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  // Size variants
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // Variant styles
  const variants = {
    primary: {
      bg: 'bg-primary',
      hover: 'hover:bg-primary-light',
      glow: 'shadow-glow hover:shadow-glow-lg',
      text: 'text-white',
    },
    secondary: {
      bg: 'bg-accent-1',
      hover: 'hover:bg-accent-1/80',
      glow: 'shadow-glow-accent',
      text: 'text-dark-bg',
    },
    outline: {
      bg: 'bg-transparent border-2 border-primary',
      hover: 'hover:bg-primary/10',
      glow: 'hover:shadow-glow',
      text: 'text-primary',
    },
  };

  const variantStyle = variants[variant] || variants.primary;

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={`
        relative overflow-hidden
        ${sizeClasses[size]}
        ${variantStyle.bg}
        ${variantStyle.text}
        ${variantStyle.glow}
        rounded-lg font-semibold
        transition-all duration-300 ease-out
        ${variantStyle.hover}
        transform hover:scale-105
        ${className}
      `}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {/* Radial gradient glow that follows mouse */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(51, 102, 255, 0.4), transparent 80%)`,
        }}
      />

      {/* Blur glow effect behind button */}
      <div className="absolute -inset-1 bg-primary/30 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10" />

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default MagicButton;

import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ title, description, icon, className = '' }) => {
  return (
    <motion.div
      className={`bg-codex-card border border-white/[0.06] rounded-xl p-8 ${className}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{
        y: -4,
        borderColor: 'rgba(51, 102, 255, 0.3)',
      }}
    >
      {icon && (
        <div className="text-4xl mb-5">
          {icon}
        </div>
      )}

      <h3 className="text-lg font-semibold mb-3 text-codex-text">
        {title}
      </h3>

      <p className="text-codex-text-muted text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default Card;

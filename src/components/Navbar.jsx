import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { name: t('Home', 'Inicio'), path: '/' },
    { name: t('Portfolio', 'Portafolio'), path: '/portfolio' },
    { name: t('About', 'Nosotros'), path: '/about' },
    { name: t('Contact', 'Contacto'), path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-codex-bg/80 backdrop-blur-xl border-b border-white/[0.06]"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center hover:opacity-80 transition-opacity duration-150">
              <img
                src="/logo.svg"
                alt="Pantrio AI"
                className="h-14 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <div
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                    isActive(link.path)
                      ? 'text-codex-green'
                      : 'text-codex-text-muted hover:text-codex-text hover:bg-white/[0.04]'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-codex-green rounded-full"
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              </Link>
            ))}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="ml-3 px-3 py-1.5 rounded-md text-xs font-medium border border-white/[0.08] text-codex-text-muted hover:text-codex-text hover:bg-white/[0.04] transition-colors duration-150 uppercase tracking-wider"
              title={language === 'en' ? 'Cambiar a espa\u00f1ol' : 'Switch to English'}
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>
          </div>

          {/* Mobile: Language toggle + menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-md text-xs font-medium border border-white/[0.08] text-codex-text-muted hover:text-codex-text transition-colors duration-150 uppercase tracking-wider"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-codex-text-muted hover:text-codex-text p-2 rounded-md hover:bg-white/[0.04] transition-colors duration-150"
            >
              <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className="md:hidden"
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <div className="px-3 pt-2 pb-3 space-y-1 bg-codex-surface border-t border-white/[0.06]">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
              <div
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  isActive(link.path)
                    ? 'text-codex-green bg-codex-green/10'
                    : 'text-codex-text-muted hover:text-codex-text hover:bg-white/[0.04]'
                }`}
              >
                {link.name}
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const CALENDLY_URL = 'https://calendly.com/hectorpatricio1518/30min';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            {t('Get in', 'Ponte en')} <span className="text-codex-green">{t('Touch', 'contacto')}</span>
          </h1>
          <p className="text-lg text-codex-text-muted max-w-2xl mx-auto">
            {t(
              'Ready to transform your business? Book a free discovery call with our team.',
              '\u00bfListo para transformar tu negocio? Agenda una llamada gratis con nuestro equipo.'
            )}
          </p>
        </motion.div>

        {/* ===== CALENDLY CTA SECTION ===== */}
        <motion.div
          className="max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.5 }}
        >
          <div className="bg-codex-card border border-codex-green/20 rounded-xl p-8 md:p-10 text-center relative overflow-hidden">
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(51, 102, 255, 0.08) 0%, transparent 60%)',
              }}
            />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-codex-green/20 bg-codex-green/5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-codex-green animate-pulse" />
                <span className="text-xs font-medium text-codex-green tracking-wide">
                  {t('Available now', 'Disponible ahora')}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-codex-text">
                {t('Book a Free 30-Min Discovery Call', 'Agenda una llamada gratis de 30 min')}
              </h2>
              <p className="text-codex-text-muted mb-8 max-w-lg mx-auto">
                {t(
                  'We\u2019ll analyze your current workflow, identify automation opportunities, and show you how AI can save you time and money \u2014 no strings attached.',
                  'Analizaremos tu flujo de trabajo actual, identificaremos oportunidades de automatizaci\u00f3n y te mostraremos c\u00f3mo la IA puede ahorrarte tiempo y dinero \u2014 sin compromiso.'
                )}
              </p>

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-codex-green hover:bg-codex-green-light text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-150 text-base"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {t('Schedule on Calendly', 'Agendar en Calendly')}
              </a>

              <div className="flex flex-wrap justify-center gap-6 mt-8 text-xs text-codex-text-dim">
                <div className="flex items-center gap-1.5">
                  <span className="text-codex-green">{'\u2713'}</span>
                  {t('30 minutes', '30 minutos')}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-codex-green">{'\u2713'}</span>
                  {t('100% free', '100% gratis')}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-codex-green">{'\u2713'}</span>
                  {t('No commitment', 'Sin compromiso')}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-codex-green">{'\u2713'}</span>
                  {t('English or Spanish', 'Ingl\u00e9s o espa\u00f1ol')}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== CONTACT INFO CARDS ===== */}
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Phone */}
            <motion.a
              href="tel:+524462421428"
              className="bg-codex-card border border-white/[0.06] rounded-xl p-6 text-center hover:border-codex-green/30 transition-colors duration-150"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              whileHover={{ y: -3 }}
            >
              <div className="text-2xl mb-3">{'\uD83D\uDCDE'}</div>
              <h3 className="text-sm font-semibold text-codex-text mb-1">{t('Call Us', 'Ll\u00e1manos')}</h3>
              <p className="text-codex-green text-sm">+52 (446) 242-1428</p>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/524462421428"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-codex-card border border-white/[0.06] rounded-xl p-6 text-center hover:border-[#25D366]/30 transition-colors duration-150"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ y: -3 }}
            >
              <div className="text-2xl mb-3">{'\uD83D\uDCAC'}</div>
              <h3 className="text-sm font-semibold text-codex-text mb-1">WhatsApp</h3>
              <p className="text-[#25D366] text-sm">{t('Message us', 'Escr\u00edbenos')}</p>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:hello@pantrio.dev"
              className="bg-codex-card border border-white/[0.06] rounded-xl p-6 text-center hover:border-codex-green/30 transition-colors duration-150"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              whileHover={{ y: -3 }}
            >
              <div className="text-2xl mb-3">{'\u2709\uFE0F'}</div>
              <h3 className="text-sm font-semibold text-codex-text mb-1">Email</h3>
              <p className="text-codex-green text-sm">hello@pantrio.dev</p>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

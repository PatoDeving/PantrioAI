import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const quickLinks = [
    { name: t('Home', 'Inicio'), path: '/' },
    { name: t('Portfolio', 'Portafolio'), path: '/portfolio' },
    { name: t('About', 'Nosotros'), path: '/about' },
    { name: t('Contact', 'Contacto'), path: '/contact' },
  ];

  return (
    <footer className="relative z-10 bg-codex-surface border-t border-white/[0.06] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <img
                src="/logo.svg"
                alt="Pantrio AI"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-codex-text-dim text-sm leading-relaxed max-w-md">
              {t(
                'Transforming businesses with cutting-edge AI solutions, web development, and cloud automation services.',
                'Transformamos empresas con soluciones de IA de vanguardia, desarrollo web y servicios de automatizaci\u00f3n en la nube.'
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-codex-text uppercase tracking-wider">
              {t('Quick Links', 'Enlaces r\u00e1pidos')}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-codex-text-dim text-sm hover:text-codex-green transition-colors duration-150"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-codex-text uppercase tracking-wider">
              {t('Contact', 'Contacto')}
            </h4>
            <ul className="space-y-2 text-codex-text-dim text-sm">
              <li>{t('Email', 'Correo')}: <a href="mailto:hello@pantrio.dev" className="hover:text-codex-green transition-colors duration-150">hello@pantrio.dev</a></li>
              <li>{t('Phone', 'Tel\u00e9fono')}: <a href="tel:+524462421428" className="hover:text-codex-green transition-colors duration-150">+52 (446) 242-1428</a></li>
              <li>{t('Location', 'Ubicaci\u00f3n')}: Interlomas, Edo. M\u00e9x.</li>
              <li>
                <a
                  href="https://calendly.com/hectorpatricio1518/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-codex-green hover:text-codex-green-light transition-colors duration-150"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {t('Book a Call', 'Agendar llamada')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
            <p className="text-codex-text-dim text-xs">
              &copy; {currentYear} Pantrio AI. {t('All rights reserved.', 'Todos los derechos reservados.')}
            </p>
            <Link
              to="/privacy"
              className="text-codex-text-dim text-xs hover:text-codex-green transition-colors duration-150"
            >
              {t('Privacy Notice', 'Aviso de Privacidad')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

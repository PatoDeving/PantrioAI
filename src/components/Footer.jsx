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
              <li>{t('Email', 'Correo')}: patodinkmedia@gmail.com</li>
              <li>{t('Phone', 'Tel\u00e9fono')}: +52 (446) 242-1428</li>
              <li>{t('Location', 'Ubicaci\u00f3n')}: Interlomas, Edo. M\u00e9x.</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/[0.06]">
          <p className="text-center text-codex-text-dim text-xs">
            &copy; {currentYear} Pantrio AI. {t('All rights reserved.', 'Todos los derechos reservados.')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

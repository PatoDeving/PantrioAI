import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
              Transforming businesses with cutting-edge AI solutions, web development,
              and cloud automation services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-codex-text uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Services', 'Portfolio', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-codex-text-dim text-sm hover:text-codex-green transition-colors duration-150"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-codex-text uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-codex-text-dim text-sm">
              <li>Email: patodinkmedia@gmail.com</li>
              <li>Phone: +52 (446) 242-1428</li>
              <li>Location: Interlomas, Edo.Mex.</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/[0.06]">
          <p className="text-center text-codex-text-dim text-xs">
            &copy; {currentYear} Pantrio AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

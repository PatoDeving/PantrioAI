import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Privacy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative z-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-codex-text">
            {t('Privacy Notice', 'Aviso de Privacidad')}
          </h1>

          <div className="prose-invert space-y-6 text-codex-text-muted text-sm leading-relaxed">
            <p className="text-xs text-codex-text-dim">
              {t('Last updated: March 2026', '\u00daltima actualizaci\u00f3n: marzo 2026')}
            </p>

            <section>
              <h2 className="text-lg font-semibold text-codex-text mb-3">
                {t('1. Data Controller', '1. Responsable de los datos')}
              </h2>
              <p>
                {t(
                  'Pantrio AI, located in Interlomas, Estado de M\u00e9xico, Mexico, is the data controller responsible for the treatment of your personal data. You can contact us at hello@pantrio.dev.',
                  'Pantrio AI, con domicilio en Interlomas, Estado de M\u00e9xico, M\u00e9xico, es el responsable del tratamiento de sus datos personales. Puede contactarnos en hello@pantrio.dev.'
                )}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-codex-text mb-3">
                {t('2. Personal Data Collected', '2. Datos personales recabados')}
              </h2>
              <p>
                {t(
                  'We may collect the following personal data: name, email address, phone number, company name, and any additional information you provide through our contact forms or chatbot.',
                  'Podemos recabar los siguientes datos personales: nombre, correo electr\u00f3nico, n\u00famero telef\u00f3nico, nombre de empresa y cualquier informaci\u00f3n adicional que proporcione a trav\u00e9s de nuestros formularios de contacto o chatbot.'
                )}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-codex-text mb-3">
                {t('3. Purpose of Data Collection', '3. Finalidad del tratamiento')}
              </h2>
              <p>
                {t(
                  'Your personal data will be used for: (a) responding to your inquiries, (b) scheduling calls and meetings, (c) providing information about our services, and (d) sending relevant communications about our projects and offerings.',
                  'Sus datos personales ser\u00e1n utilizados para: (a) responder a sus consultas, (b) agendar llamadas y reuniones, (c) brindar informaci\u00f3n sobre nuestros servicios, y (d) enviar comunicaciones relevantes sobre nuestros proyectos y ofertas.'
                )}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-codex-text mb-3">
                {t('4. Data Protection', '4. Protecci\u00f3n de datos')}
              </h2>
              <p>
                {t(
                  'We implement administrative, technical, and physical security measures to protect your personal data against damage, loss, alteration, destruction, or unauthorized use, access, or treatment, in accordance with the Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP) of Mexico.',
                  'Implementamos medidas de seguridad administrativas, t\u00e9cnicas y f\u00edsicas para proteger sus datos personales contra da\u00f1o, p\u00e9rdida, alteraci\u00f3n, destrucci\u00f3n o uso, acceso o tratamiento no autorizado, de conformidad con la Ley Federal de Protecci\u00f3n de Datos Personales en Posesi\u00f3n de los Particulares (LFPDPPP) de M\u00e9xico.'
                )}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-codex-text mb-3">
                {t('5. ARCO Rights', '5. Derechos ARCO')}
              </h2>
              <p>
                {t(
                  'You have the right to Access, Rectify, Cancel, or Oppose the treatment of your personal data (ARCO rights). To exercise these rights, please send an email to hello@pantrio.dev with the subject "ARCO Rights Request."',
                  'Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales (derechos ARCO). Para ejercer estos derechos, env\u00ede un correo electr\u00f3nico a hello@pantrio.dev con el asunto "Solicitud de derechos ARCO".'
                )}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-codex-text mb-3">
                {t('6. Cookies and Analytics', '6. Cookies y anal\u00edtica')}
              </h2>
              <p>
                {t(
                  'Our website may use cookies and similar technologies to enhance your browsing experience. We use localStorage to remember your language preference. No tracking cookies are used for advertising purposes.',
                  'Nuestro sitio web puede utilizar cookies y tecnolog\u00edas similares para mejorar su experiencia de navegaci\u00f3n. Utilizamos localStorage para recordar su preferencia de idioma. No se utilizan cookies de rastreo con fines publicitarios.'
                )}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-codex-text mb-3">
                {t('7. Changes to this Notice', '7. Cambios al aviso de privacidad')}
              </h2>
              <p>
                {t(
                  'We reserve the right to update this Privacy Notice at any time. Any changes will be published on this page with the updated date.',
                  'Nos reservamos el derecho de actualizar este Aviso de Privacidad en cualquier momento. Cualquier cambio ser\u00e1 publicado en esta p\u00e1gina con la fecha de actualizaci\u00f3n.'
                )}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-codex-text mb-3">
                {t('8. Contact', '8. Contacto')}
              </h2>
              <p>
                {t(
                  'For any questions regarding this Privacy Notice, please contact us at:',
                  'Para cualquier pregunta sobre este Aviso de Privacidad, cont\u00e1ctenos en:'
                )}
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>{t('Email', 'Correo')}: <a href="mailto:hello@pantrio.dev" className="text-codex-green hover:underline">hello@pantrio.dev</a></li>
                <li>{t('Phone', 'Tel\u00e9fono')}: <a href="tel:+524462421428" className="text-codex-green hover:underline">+52 (446) 242-1428</a></li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;

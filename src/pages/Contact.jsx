import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Button from '../components/Button';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const templateParams = {
        to_email: 'patodinkmedia@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Not provided',
        message: formData.message,
        timestamp: new Date().toLocaleString()
      };

      await emailjs.send(
        'service_p579v5u',
        'template_fy1n1b6',
        templateParams,
        'ELgEBh_c-dvvojtLW'
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });

      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');

      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputClasses = "w-full bg-codex-bg border border-white/[0.08] rounded-lg px-4 py-3 text-codex-text text-sm focus:outline-none focus:border-codex-green/50 transition-colors duration-150 placeholder:text-codex-text-dim";

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
              'Ready to transform your business? Contact us today.',
              '\u00bfListo para transformar tu negocio? Cont\u00e1ctanos hoy.'
            )}
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="bg-codex-card border border-white/[0.06] rounded-xl p-8">
              <h2 className="text-xl font-semibold mb-6 text-codex-text">
                {t('Send us a Message', 'Env\u00edanos un mensaje')}
              </h2>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-codex-green/10 border border-codex-green/30 rounded-lg text-codex-green text-sm"
                >
                  {t(
                    'Thank you! Your message has been sent successfully. We\u2019ll get back to you within 24 hours.',
                    '\u00a1Gracias! Tu mensaje se ha enviado correctamente. Te responderemos en un plazo de 24\u00a0horas.'
                  )}
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                >
                  {t(
                    'Sorry, there was an error sending your message. Please try again or email us directly at patodinkmedia@gmail.com',
                    'Lo sentimos, hubo un error al enviar tu mensaje. Int\u00e9ntalo de nuevo o escr\u00edbenos directamente a patodinkmedia@gmail.com'
                  )}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-codex-text-muted">
                    {t('Name', 'Nombre')}
                  </label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputClasses} placeholder={t('John Doe', 'Tu nombre')} disabled={isSubmitting} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-codex-text-muted">
                    {t('Email', 'Correo electr\u00f3nico')}
                  </label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClasses} placeholder="john@example.com" disabled={isSubmitting} />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2 text-codex-text-muted">
                    {t('Company (Optional)', 'Empresa (opcional)')}
                  </label>
                  <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className={inputClasses} placeholder={t('Your Company', 'Tu empresa')} disabled={isSubmitting} />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-codex-text-muted">
                    {t('Message', 'Mensaje')}
                  </label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="5" className={`${inputClasses} resize-none`} placeholder={t('Tell us about your project...', 'Cu\u00e9ntanos sobre tu proyecto...')} disabled={isSubmitting} />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('Sending...', 'Enviando...')}
                    </span>
                  ) : (
                    t('Send Message', 'Enviar mensaje')
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Button from '../components/Button';
import NetworkBackground from '../components/NetworkBackground';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS configuration
      const templateParams = {
        to_email: 'info@pantrioai.com',
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Not provided',
        message: formData.message,
        timestamp: new Date().toLocaleString()
      };

      await emailjs.send(
        'service_p579v5u',
        'template_msezgd8',
        templateParams,
        'ELgEBh_c-dvvojtLW'
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');

      // Clear error message after 5 seconds
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

  return (
    <>
      <NetworkBackground />
      <div className="min-h-screen pt-24 pb-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-semibold"
            style={{
              textShadow: '0 0 20px rgba(51, 102, 255, 0.6), 0 0 40px rgba(51, 102, 255, 0.4)'
            }}
          >
            Ready to transform your business? Contact us today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="bg-dark-card border border-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400"
                >
                  <div className="flex items-center gap-2">
                    <span>✅</span>
                    <span>Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.</span>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400"
                >
                  <div className="flex items-center gap-2">
                    <span>❌</span>
                    <span>Sorry, there was an error sending your message. Please try again or email us directly at info@pantrioai.com</span>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors" placeholder="John Doe" disabled={isSubmitting} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors" placeholder="john@example.com" disabled={isSubmitting} />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">Company (Optional)</label>
                  <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors" placeholder="Your Company" disabled={isSubmitting} />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="5" className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors resize-none" placeholder="Tell us about your project..." disabled={isSubmitting} />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div className="space-y-8" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
            <div className="bg-dark-card border border-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4"><div className="text-3xl">📧</div><div><h3 className="font-semibold mb-1">Email</h3><p className="text-gray-400">info@pantrioai.com</p></div></div>
                <div className="flex items-start space-x-4"><div className="text-3xl">📱</div><div><h3 className="font-semibold mb-1">Phone</h3><p className="text-gray-400">+52 (446) 242-1428</p></div></div>
                <div className="flex items-start space-x-4"><div className="text-3xl">📍</div><div><h3 className="font-semibold mb-1">Office</h3><p className="text-gray-400">Interlomas, Edo.Mex.</p></div></div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold mb-3">Need Immediate Help?</h3>
              <p className="text-gray-400 mb-4">Our chatbot is available 24/7</p>
            </div>
          </motion.div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

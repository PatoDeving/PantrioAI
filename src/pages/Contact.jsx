import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import NetworkBackground from '../components/NetworkBackground';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
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
            Get in <span className="text-neon-blue">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">Company</label>
                  <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors" placeholder="Your Company" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="5" className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors resize-none" placeholder="Tell us about your project..." />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </div>
          </motion.div>

          <motion.div className="space-y-8" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
            <div className="bg-dark-card border border-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4"><div className="text-3xl">📧</div><div><h3 className="font-semibold mb-1">Email</h3><p className="text-gray-400">info@pantrioai.com</p></div></div>
                <div className="flex items-start space-x-4"><div className="text-3xl">📱</div><div><h3 className="font-semibold mb-1">Phone</h3><p className="text-gray-400">+1 (555) 123-4567</p></div></div>
                <div className="flex items-start space-x-4"><div className="text-3xl">📍</div><div><h3 className="font-semibold mb-1">Office</h3><p className="text-gray-400">San Francisco, CA</p></div></div>
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

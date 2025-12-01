import React from 'react';
import { motion } from 'framer-motion';
import SpiralBackground from '../components/SpiralBackground';

const About = () => {
  const values = [
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We stay ahead of the curve, constantly exploring new technologies.',
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'We work closely with our clients as partners to achieve success.',
    },
    {
      icon: '🎯',
      title: 'Excellence',
      description: 'We deliver the highest quality in everything we do.',
    },
    {
      icon: '🌟',
      title: 'Integrity',
      description: 'We operate with transparency, honesty, and respect.',
    },
  ];

  return (
    <>
      <SpiralBackground />
      <div className="min-h-screen pt-24 pb-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-primary">Pantrio AI</span>
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-semibold"
            style={{
              textShadow: '0 0 20px rgba(51, 102, 255, 0.6), 0 0 40px rgba(51, 102, 255, 0.4)'
            }}
          >
            We are a team of passionate technologists dedicated to transforming
            businesses through innovative AI and software solutions.
          </p>
        </motion.div>

        {/* Mission and Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="bg-dark-card border border-primary/30 rounded-2xl p-8 md:p-12 h-full">
              <div className="text-6xl mb-6">⭐</div>
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                To empower businesses with intelligent, easy-to-integrate AI solutions that automate workflows, unlock insights, and elevate productivity — making advanced technology accessible to everyone.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="bg-dark-card border border-primary/30 rounded-2xl p-8 md:p-12 h-full">
              <div className="text-6xl mb-6">🌍</div>
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Vision</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                To become the leading AI platform for scalable automation, enabling companies worldwide to operate smarter, faster, and more efficiently through human-centered artificial intelligence.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-dark-card border border-gray-800 rounded-xl p-6 text-center"
                whileHover={{
                  y: -10,
                  borderColor: '#3366FF',
                  boxShadow: '0 10px 40px rgba(51, 102, 255, 0.3)'
                }}
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-primary">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;

import React from 'react';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen pt-24 pb-12 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            About <span className="text-codex-green">Pantrio AI</span>
          </h1>
          <p className="text-lg text-codex-text-muted max-w-2xl mx-auto">
            We are a team of passionate technologists dedicated to transforming
            businesses through innovative AI and software solutions.
          </p>
        </motion.div>

        {/* Mission and Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="bg-codex-card border border-codex-green/20 rounded-xl p-8 md:p-10 h-full">
              <div className="text-4xl mb-5">⭐</div>
              <h2 className="text-2xl font-bold mb-4 text-codex-green">Our Mission</h2>
              <p className="text-codex-text-muted leading-relaxed">
                To empower businesses with intelligent, easy-to-integrate AI solutions that automate workflows, unlock insights, and elevate productivity — making advanced technology accessible to everyone.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="bg-codex-card border border-codex-green/20 rounded-xl p-8 md:p-10 h-full">
              <div className="text-4xl mb-5">🌍</div>
              <h2 className="text-2xl font-bold mb-4 text-codex-green">Our Vision</h2>
              <p className="text-codex-text-muted leading-relaxed">
                To become the leading AI platform for scalable automation, enabling companies worldwide to operate smarter, faster, and more efficiently through human-centered artificial intelligence.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-10 text-center text-codex-text">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-codex-card border border-white/[0.06] rounded-xl p-6 text-center hover:border-codex-green/30 transition-colors duration-150"
                whileHover={{ y: -4 }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold mb-3 text-codex-text">{value.title}</h3>
                <p className="text-codex-text-muted text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

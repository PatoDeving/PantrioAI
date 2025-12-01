import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SimpleStarfield from '../components/SimpleStarfield';
import MagicButton from '../components/MagicButton';

/**
 * Home Page - Landing page with hero section
 * Features:
 * - 3D animated background
 * - Hero section with headline and CTA
 * - Animated entrance
 */
const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <SimpleStarfield />
      <div className="min-h-screen relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-1 to-accent-2">
                Pantrio AI
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Transforming businesses with cutting-edge AI solutions,
              <br />
              innovative web development, and intelligent automation
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <MagicButton onClick={() => navigate('/services')} size="lg">
                Explore Services →
              </MagicButton>
              <MagicButton variant="outline" size="lg" onClick={() => navigate('/contact')}>
                Get in Touch
              </MagicButton>
            </motion.div>

            {/* Animated Stats */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {[
                { number: '500+', label: 'Projects Completed' },
                { number: '200+', label: 'Happy Clients' },
                { number: '50+', label: 'AI Models Deployed' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-card bg-opacity-50 backdrop-blur-sm border border-border rounded-xl p-6"
                  whileHover={{
                    y: -5,
                    borderColor: '#3366FF',
                    boxShadow: '0 10px 30px rgba(51, 102, 255, 0.3)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-text-secondary">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        </div>
      </div>

      {/* Features Preview Section */}
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-1">Pantrio AI</span>?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🚀',
                title: 'Cutting-Edge Technology',
                description: 'Leveraging the latest AI and cloud technologies to deliver innovative solutions.',
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Optimized performance and efficiency in every project we deliver.',
              },
              {
                icon: '🎯',
                title: 'Client-Focused',
                description: 'Tailored solutions that meet your specific business needs and goals.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-xl p-8 text-center hover:border-primary transition-colors duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{
                  y: -10,
                  boxShadow: '0 10px 40px rgba(51, 102, 255, 0.3)'
                }}
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-primary">
                  {feature.title}
                </h3>
                <p className="text-text-secondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

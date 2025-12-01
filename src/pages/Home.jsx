import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SimpleStarfield from '../components/SimpleStarfield';
import MagicButton from '../components/MagicButton';
import Card from '../components/Card';

/**
 * Home Page - Landing page with hero section and services
 * Features:
 * - 3D animated background
 * - Hero section with headline and CTA
 * - Services section
 * - Animated entrance
 */
const Home = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: '🤖',
      title: 'AI & Machine Learning',
      description: 'Custom AI solutions, natural language processing, computer vision, and predictive analytics to transform your business operations.',
    },
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Modern, responsive websites and web applications built with cutting-edge technologies like React, Next.js, and Node.js.',
    },
    {
      icon: '📱',
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.',
    },
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'Cloud architecture, migration, and optimization services using AWS, Azure, and Google Cloud Platform.',
    },
    {
      icon: '⚙️',
      title: 'Automation & DevOps',
      description: 'Streamline your workflows with intelligent automation, CI/CD pipelines, and infrastructure as code.',
    },
    {
      icon: '🔒',
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions including penetration testing, security audits, and compliance management.',
    },
    {
      icon: '📊',
      title: 'Data Analytics',
      description: 'Turn your data into actionable insights with advanced analytics, visualization, and business intelligence.',
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces designed with user experience at the forefront of every decision.',
    },
  ];

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
              style={{
                textShadow: '0 0 20px rgba(51, 102, 255, 0.5), 0 0 40px rgba(51, 102, 255, 0.3)'
              }}
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
              <MagicButton onClick={() => navigate('/contact')} size="lg">
                Get in Touch →
              </MagicButton>
              <MagicButton variant="outline" size="lg" onClick={scrollToServices}>
                Explore Services
              </MagicButton>
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

      {/* Services Section */}
      <div id="services-section" className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-2">Services</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Comprehensive technology solutions tailored to your business needs.
              From AI to cloud infrastructure, we've got you covered.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-primary/20 to-accent-2/20 border border-primary/30 rounded-2xl p-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to transform your business?
              </h2>
              <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                Let's discuss how our services can help you achieve your goals.
                Get in touch with our team today.
              </p>
              <MagicButton size="lg" onClick={() => navigate('/contact')}>
                Contact Us →
              </MagicButton>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Home;

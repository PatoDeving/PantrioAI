import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import WaveBackground from '../components/WaveBackground';

/**
 * Services Page - Showcase company services
 * Features animated service cards with icons and wave background
 */
const Services = () => {
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

  return (
    <>
      <WaveBackground />
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-neon-blue">Services</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive technology solutions tailored to your business needs.
            From AI to cloud infrastructure, we've got you covered.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
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
          <div className="bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">
              Ready to transform your business?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can help you achieve your goals.
              Get in touch with our team today.
            </p>
            <motion.a
              href="/contact"
              className="inline-block bg-neon-blue text-black px-8 py-4 rounded-lg font-semibold text-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 25px rgba(0, 243, 255, 0.6)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>
        </div>
      </div>
    </>
  );
};

export default Services;

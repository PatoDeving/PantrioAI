import React from 'react';
import { motion } from 'framer-motion';
import GeometricBackground from '../components/GeometricBackground';

/**
 * Portfolio/Success Stories Page
 * Showcases completed projects and case studies with geometric background
 */
const Portfolio = () => {
  const projects = [
    {
      title: 'E-Commerce AI Platform',
      category: 'AI & Web Development',
      description: 'Built an intelligent recommendation engine that increased sales by 45% for a major retail client.',
      image: '🛒',
      tags: ['React', 'Python', 'TensorFlow', 'AWS'],
      metrics: { clients: '10K+', revenue: '+45%', time: '3 months' },
    },
    {
      title: 'Healthcare Automation System',
      category: 'Automation & Cloud',
      description: 'Automated patient record management reducing administrative time by 60% for healthcare providers.',
      image: '🏥',
      tags: ['Node.js', 'Azure', 'Docker', 'React'],
      metrics: { users: '5K+', efficiency: '+60%', time: '4 months' },
    },
    {
      title: 'Financial Analytics Dashboard',
      category: 'Data Analytics',
      description: 'Real-time financial analytics platform processing millions of transactions daily.',
      image: '📊',
      tags: ['React', 'D3.js', 'PostgreSQL', 'GCP'],
      metrics: { transactions: '5M+/day', speed: '2x faster', time: '5 months' },
    },
    {
      title: 'Smart IoT Solution',
      category: 'IoT & Mobile',
      description: 'Connected device management system for smart home automation with mobile app.',
      image: '🏠',
      tags: ['React Native', 'MQTT', 'Firebase', 'IoT'],
      metrics: { devices: '50K+', uptime: '99.9%', time: '6 months' },
    },
    {
      title: 'AI-Powered Chatbot',
      category: 'AI & NLP',
      description: 'Customer service chatbot handling 80% of inquiries automatically with high satisfaction.',
      image: '💬',
      tags: ['Python', 'GPT-4', 'React', 'AWS'],
      metrics: { queries: '100K+/mo', satisfaction: '92%', time: '2 months' },
    },
    {
      title: 'Cloud Migration Project',
      category: 'Cloud & DevOps',
      description: 'Migrated legacy infrastructure to cloud, reducing costs by 40% and improving scalability.',
      image: '☁️',
      tags: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
      metrics: { servers: '200+', savings: '-40%', time: '4 months' },
    },
  ];

  return (
    <>
      <GeometricBackground />
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
            Our <span className="text-neon-blue">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our successful projects and see how we've helped businesses
            transform with technology.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-dark-card border border-gray-800 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                y: -10,
                borderColor: '#00f3ff',
                boxShadow: '0 10px 40px rgba(0, 243, 255, 0.2)'
              }}
            >
              {/* Project Image/Icon */}
              <div className="bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 p-12 text-center">
                <div className="text-8xl">{project.image}</div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="text-sm text-neon-blue mb-2">{project.category}</div>
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-dark-bg border border-gray-700 rounded-full text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-700">
                  {Object.entries(project.metrics).map(([key, value], metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <div className="text-lg font-bold text-neon-blue">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { number: '500+', label: 'Projects Delivered' },
            { number: '200+', label: 'Happy Clients' },
            { number: '15+', label: 'Industries Served' },
            { number: '98%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-dark-card border border-gray-800 rounded-xl p-8 text-center"
              whileHover={{ 
                borderColor: '#00f3ff',
                boxShadow: '0 10px 30px rgba(0, 243, 255, 0.2)'
              }}
            >
              <h3 className="text-4xl font-bold text-neon-blue mb-2">{stat.number}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;

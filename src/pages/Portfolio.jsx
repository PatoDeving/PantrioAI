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
    {
      title: 'UX/UI Design Platform',
      category: 'UI/UX Design',
      description: 'Beautiful, intuitive interface design system with user experience at the forefront of every decision.',
      image: '🎨',
      tags: ['Figma', 'Adobe XD', 'React', 'Tailwind CSS'],
      metrics: { screens: '150+', rating: '4.9/5', time: '3 months' },
    },
    {
      title: 'Modern Web Application',
      category: 'Web Development',
      description: 'Responsive web application built with cutting-edge technologies delivering exceptional performance.',
      image: '💻',
      tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
      metrics: { users: '25K+', speed: '95/100', time: '4 months' },
    },
    {
      title: 'AI Agent System',
      category: 'AI & Automation',
      description: 'Autonomous AI agents handling complex workflows and decision-making processes with minimal human intervention.',
      image: '🤖',
      tags: ['Python', 'LangChain', 'GPT-4', 'Azure'],
      metrics: { tasks: '10K+/day', efficiency: '+75%', time: '5 months' },
    },
  ];

  return (
    <>
      <GeometricBackground />
      <div className="min-h-screen pt-24 pb-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-primary">Portfolio</span>
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-semibold"
            style={{
              textShadow: '0 0 20px rgba(51, 102, 255, 0.6), 0 0 40px rgba(51, 102, 255, 0.4)'
            }}
          >
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
                borderColor: '#3366FF',
                boxShadow: '0 10px 40px rgba(51, 102, 255, 0.3)'
              }}
            >
              {/* Project Image/Icon */}
              <div className="bg-gradient-to-br from-primary/20 to-accent-2/20 p-12 text-center">
                <div className="text-8xl">{project.image}</div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="text-sm text-primary mb-2">{project.category}</div>
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
                      <div className="text-lg font-bold text-primary">{value}</div>
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
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { number: '10+', label: 'Industries Served' },
            { number: '98%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-dark-card border border-gray-800 rounded-xl p-8 text-center"
              whileHover={{
                borderColor: '#3366FF',
                boxShadow: '0 10px 30px rgba(51, 102, 255, 0.3)'
              }}
            >
              <h3 className="text-4xl font-bold text-primary mb-2">{stat.number}</h3>
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

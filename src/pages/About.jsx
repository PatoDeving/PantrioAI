import React from 'react';
import { motion } from 'framer-motion';
import SpiralBackground from '../components/SpiralBackground';

const About = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '👩‍💼',
      bio: 'AI visionary with 15+ years in tech innovation',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '👨‍💻',
      bio: 'Full-stack expert and cloud architecture specialist',
    },
    {
      name: 'Emily Davis',
      role: 'Head of AI',
      image: '👩‍🔬',
      bio: 'PhD in Machine Learning, former Google researcher',
    },
    {
      name: 'James Wilson',
      role: 'Lead Designer',
      image: '👨‍🎨',
      bio: 'Award-winning UI/UX designer with a passion for innovation',
    },
    {
      name: 'Lisa Anderson',
      role: 'DevOps Lead',
      image: '👩‍🔧',
      bio: 'Cloud infrastructure expert, AWS & Kubernetes certified',
    },
    {
      name: 'David Lee',
      role: 'Product Manager',
      image: '👨‍💼',
      bio: 'Strategic thinker turning ideas into successful products',
    },
  ];

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
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-neon-blue">Pantrio AI</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We are a team of passionate technologists dedicated to transforming
            businesses through innovative AI and software solutions.
          </p>
        </motion.div>

        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-dark-card border border-gray-800 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-neon-blue">Our Story</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Founded in 2018, Pantrio AI emerged from a simple vision: to make
                cutting-edge AI accessible to businesses of all sizes.
              </p>
              <p>
                Today, we serve clients across multiple industries. Our team combines
                expertise in AI, cloud computing, and web development.
              </p>
            </div>
          </div>
        </motion.div>

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
                  borderColor: '#00f3ff',
                  boxShadow: '0 10px 40px rgba(0, 243, 255, 0.2)'
                }}
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-neon-blue">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-dark-card border border-gray-800 rounded-xl p-8 text-center"
                whileHover={{ 
                  y: -10,
                  borderColor: '#00f3ff',
                  boxShadow: '0 10px 40px rgba(0, 243, 255, 0.2)'
                }}
              >
                <div className="text-7xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <div className="text-neon-blue mb-3">{member.role}</div>
                <p className="text-gray-400 text-sm">{member.bio}</p>
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

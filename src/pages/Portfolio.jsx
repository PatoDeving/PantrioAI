import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Portfolio = () => {
  const { t } = useLanguage();

  const projects = [
    {
      title: t('E-Commerce AI Platform', 'Plataforma de e-commerce con IA'),
      category: t('AI & Web Development', 'IA y desarrollo web'),
      description: t(
        'Built an intelligent recommendation engine that increased sales by 45% for a major retail client.',
        'Desarrollamos un motor de recomendaciones inteligente que increment\u00f3 las ventas en un 45\u00a0% para un cliente del sector retail.'
      ),
      image: '\uD83D\uDED2',
      tags: ['React', 'Python', 'TensorFlow', 'AWS'],
      metrics: {
        clients: { value: '10K+', label: t('Clients', 'Clientes') },
        revenue: { value: '+45%', label: t('Revenue', 'Ingresos') },
        time: { value: t('2 months', '2 meses'), label: t('Time', 'Tiempo') },
      },
    },
    {
      title: t('AI-Powered Chatbot', 'Chatbot con inteligencia artificial'),
      category: t('AI & NLP', 'IA y PLN'),
      description: t(
        'Customer service chatbot handling 80% of inquiries automatically with high satisfaction rates.',
        'Chatbot de atenci\u00f3n al cliente que resuelve el 80\u00a0% de las consultas de forma autom\u00e1tica con altos \u00edndices de satisfacci\u00f3n.'
      ),
      image: '\uD83D\uDCAC',
      tags: ['Python', 'GPT-4', 'React', 'AWS'],
      metrics: {
        queries: { value: '100K+/mo', label: t('Queries', 'Consultas') },
        satisfaction: { value: '92%', label: t('Satisfaction', 'Satisfacci\u00f3n') },
        time: { value: t('1 month', '1 mes'), label: t('Time', 'Tiempo') },
      },
    },
    {
      title: t('Cloud Migration Project', 'Proyecto de migraci\u00f3n a la nube'),
      category: t('Cloud & DevOps', 'Nube y DevOps'),
      description: t(
        'Migrated legacy infrastructure to the cloud, reducing costs by 40% and improving scalability.',
        'Migramos infraestructura heredada a la nube, reduciendo costos en un 40\u00a0% y mejorando la escalabilidad.'
      ),
      image: '\u2601\uFE0F',
      tags: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
      metrics: {
        servers: { value: '200+', label: t('Servers', 'Servidores') },
        savings: { value: '-40%', label: t('Savings', 'Ahorro') },
        time: { value: t('3 months', '3 meses'), label: t('Time', 'Tiempo') },
      },
    },
    {
      title: t('UX/UI Design Platform', 'Plataforma de dise\u00f1o UX/UI'),
      category: t('UI/UX Design', 'Dise\u00f1o UI/UX'),
      description: t(
        'A complete design system with beautiful, intuitive interfaces built for an optimal user experience.',
        'Sistema de dise\u00f1o completo con interfaces intuitivas y atractivas, enfocado en una experiencia de usuario \u00f3ptima.'
      ),
      image: '\uD83C\uDFA8',
      tags: ['Figma', 'Adobe XD', 'React', 'Tailwind CSS'],
      metrics: {
        screens: { value: '150+', label: t('Screens', 'Pantallas') },
        rating: { value: '4.9/5', label: t('Rating', 'Calificaci\u00f3n') },
        time: { value: t('2 months', '2 meses'), label: t('Time', 'Tiempo') },
      },
    },
    {
      title: t('Modern Web Application', 'Aplicaci\u00f3n web moderna'),
      category: t('Web Development', 'Desarrollo web'),
      description: t(
        'Responsive web application built with cutting-edge technologies, delivering exceptional performance.',
        'Aplicaci\u00f3n web responsiva desarrollada con tecnolog\u00edas de vanguardia y un rendimiento excepcional.'
      ),
      image: '\uD83D\uDCBB',
      tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
      metrics: {
        users: { value: '25K+', label: t('Users', 'Usuarios') },
        speed: { value: '95/100', label: t('Speed', 'Velocidad') },
        time: { value: t('3 months', '3 meses'), label: t('Time', 'Tiempo') },
      },
    },
    {
      title: t('AI Agent System', 'Sistema de agentes de IA'),
      category: t('AI & Automation', 'IA y automatizaci\u00f3n'),
      description: t(
        'Autonomous AI agents handling complex workflows and decision-making processes with minimal human intervention.',
        'Agentes de IA aut\u00f3nomos que gestionan flujos de trabajo complejos y procesos de toma de decisiones con m\u00ednima intervenci\u00f3n humana.'
      ),
      image: '\uD83E\uDD16',
      tags: ['Python', 'LangChain', 'GPT-4', 'Azure'],
      metrics: {
        tasks: { value: '10K+/day', label: t('Tasks', 'Tareas') },
        efficiency: { value: '+75%', label: t('Efficiency', 'Eficiencia') },
        time: { value: t('4 months', '4 meses'), label: t('Time', 'Tiempo') },
      },
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            {t('Our', 'Nuestro')} <span className="text-codex-green">{t('Portfolio', 'portafolio')}</span>
          </h1>
          <p className="text-lg text-codex-text-muted max-w-2xl mx-auto">
            {t(
              'Explore our successful projects and see how we\u2019ve helped businesses transform with technology.',
              'Explora nuestros proyectos exitosos y descubre c\u00f3mo hemos ayudado a empresas a transformarse con tecnolog\u00eda.'
            )}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-codex-card border border-white/[0.06] rounded-xl overflow-hidden hover:border-codex-green/30 transition-colors duration-150"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              whileHover={{ y: -4 }}
            >
              {/* Project Image/Icon */}
              <div className="bg-codex-surface p-10 text-center border-b border-white/[0.06]">
                <div className="text-6xl">{project.image}</div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="text-xs text-codex-green font-medium mb-2 uppercase tracking-wider">{project.category}</div>
                <h3 className="text-xl font-semibold mb-3 text-codex-text">{project.title}</h3>
                <p className="text-codex-text-muted text-sm mb-4">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2.5 py-1 bg-codex-green/10 border border-codex-green/20 rounded-full text-xs text-codex-green"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/[0.06]">
                  {Object.values(project.metrics).map((metric, metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <div className="text-base font-semibold text-codex-green">{metric.value}</div>
                      <div className="text-xs text-codex-text-dim">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {[
            { number: '10+', label: t('Industries Served', 'Industrias atendidas') },
            { number: '98%', label: t('Client Satisfaction', 'Satisfacci\u00f3n del cliente') },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-codex-card border border-white/[0.06] rounded-xl p-8 text-center hover:border-codex-green/30 transition-colors duration-150"
              whileHover={{ y: -2 }}
            >
              <h3 className="text-4xl font-bold text-codex-green mb-2">{stat.number}</h3>
              <p className="text-codex-text-muted text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;

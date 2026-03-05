import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { SplineScene } from '../components/ui/splite';
import { Spotlight } from '../components/ui/spotlight';

const Portfolio = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const projects = [
    {
      title: t('E-Commerce AI Platform', 'Plataforma de e-commerce con IA'),
      category: t('AI & Web Development', 'IA y desarrollo web'),
      description: t(
        'Built an intelligent recommendation engine that increased sales by 45% for a major retail client.',
        'Desarrollamos un motor de recomendaciones inteligente que incrementó las ventas en un 45\u00a0% para un cliente del sector retail.'
      ),
      icon: '🛒',
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
        'Chatbot de atención al cliente que resuelve el 80\u00a0% de las consultas de forma automática con altos índices de satisfacción.'
      ),
      icon: '💬',
      tags: ['Python', 'GPT-4', 'React', 'AWS'],
      metrics: {
        queries: { value: '100K+/mo', label: t('Queries', 'Consultas') },
        satisfaction: { value: '92%', label: t('Satisfaction', 'Satisfacción') },
        time: { value: t('1 month', '1 mes'), label: t('Time', 'Tiempo') },
      },
    },
    {
      title: t('Cloud Migration Project', 'Proyecto de migración a la nube'),
      category: t('Cloud & DevOps', 'Nube y DevOps'),
      description: t(
        'Migrated legacy infrastructure to the cloud, reducing costs by 40% and improving scalability.',
        'Migramos infraestructura heredada a la nube, reduciendo costos en un 40\u00a0% y mejorando la escalabilidad.'
      ),
      icon: '☁️',
      tags: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
      metrics: {
        servers: { value: '200+', label: t('Servers', 'Servidores') },
        savings: { value: '-40%', label: t('Savings', 'Ahorro') },
        time: { value: t('3 months', '3 meses'), label: t('Time', 'Tiempo') },
      },
    },
    {
      title: t('UX/UI Design Platform', 'Plataforma de diseño UX/UI'),
      category: t('UI/UX Design', 'Diseño UI/UX'),
      description: t(
        'A complete design system with beautiful, intuitive interfaces built for an optimal user experience.',
        'Sistema de diseño completo con interfaces intuitivas y atractivas, enfocado en una experiencia de usuario óptima.'
      ),
      icon: '🎨',
      tags: ['Figma', 'Adobe XD', 'React', 'Tailwind CSS'],
      metrics: {
        screens: { value: '150+', label: t('Screens', 'Pantallas') },
        rating: { value: '4.9/5', label: t('Rating', 'Calificación') },
        time: { value: t('2 months', '2 meses'), label: t('Time', 'Tiempo') },
      },
    },
    {
      title: t('Modern Web Application', 'Aplicación web moderna'),
      category: t('Web Development', 'Desarrollo web'),
      description: t(
        'Responsive web application built with cutting-edge technologies, delivering exceptional performance.',
        'Aplicación web responsiva desarrollada con tecnologías de vanguardia y un rendimiento excepcional.'
      ),
      icon: '💻',
      tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
      metrics: {
        users: { value: '25K+', label: t('Users', 'Usuarios') },
        speed: { value: '95/100', label: t('Speed', 'Velocidad') },
        time: { value: t('3 months', '3 meses'), label: t('Time', 'Tiempo') },
      },
    },
    {
      title: t('AI Agent System', 'Sistema de agentes de IA'),
      category: t('AI & Automation', 'IA y automatización'),
      description: t(
        'Autonomous AI agents handling complex workflows and decision-making processes with minimal human intervention.',
        'Agentes de IA autónomos que gestionan flujos de trabajo complejos y procesos de toma de decisiones con mínima intervención humana.'
      ),
      icon: '🤖',
      tags: ['Python', 'LangChain', 'GPT-4', 'Azure'],
      metrics: {
        tasks: { value: '10K+/day', label: t('Tasks', 'Tareas') },
        efficiency: { value: '+75%', label: t('Efficiency', 'Eficiencia') },
        time: { value: t('4 months', '4 meses'), label: t('Time', 'Tiempo') },
      },
    },
  ];

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) return prev === projects.length - 1 ? 0 : prev + 1;
      return prev === 0 ? projects.length - 1 : prev - 1;
    });
  }, [projects.length]);

  const goToSlide = useCallback((index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  const currentProject = projects[currentIndex];

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
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
              'Explora nuestros proyectos exitosos y descubre cómo hemos ayudado a empresas a transformarse con tecnología.'
            )}
          </p>
        </motion.div>

        {/* ===== HERO CARD WITH SPLINE 3D + CAROUSEL ===== */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="w-full min-h-[520px] md:min-h-[480px] bg-black/[0.96] rounded-xl relative overflow-hidden border border-white/[0.06]">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="white"
            />

            <div className="flex flex-col md:flex-row h-full min-h-[520px] md:min-h-[480px]">
              {/* Left content — Carousel text */}
              <div className="flex-1 p-8 md:p-10 relative z-10 flex flex-col justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  >
                    {/* Category badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-codex-green/10 border border-codex-green/20 mb-4">
                      <span className="text-sm">{currentProject.icon}</span>
                      <span className="text-xs font-medium text-codex-green uppercase tracking-wider">
                        {currentProject.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4">
                      {currentProject.title}
                    </h2>

                    {/* Description */}
                    <p className="text-neutral-300 text-sm md:text-base mb-6 max-w-lg leading-relaxed">
                      {currentProject.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {currentProject.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      {Object.values(currentProject.metrics).map((metric, i) => (
                        <div key={i}>
                          <div className="text-lg md:text-xl font-bold text-codex-green">{metric.value}</div>
                          <div className="text-xs text-neutral-500">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Carousel controls */}
                <div className="flex items-center gap-4 mt-8">
                  {/* Prev button */}
                  <button
                    onClick={() => paginate(-1)}
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:border-codex-green/40 hover:bg-codex-green/10 transition-all duration-150"
                    aria-label="Previous project"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Dots indicator */}
                  <div className="flex gap-2">
                    {projects.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentIndex
                            ? 'w-6 bg-codex-green'
                            : 'w-2 bg-white/20 hover:bg-white/40'
                        }`}
                        aria-label={`Go to project ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Next button */}
                  <button
                    onClick={() => paginate(1)}
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:border-codex-green/40 hover:bg-codex-green/10 transition-all duration-150"
                    aria-label="Next project"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Counter */}
                  <span className="text-xs text-neutral-500 ml-2">
                    {currentIndex + 1} / {projects.length}
                  </span>
                </div>
              </div>

              {/* Right content — Spline 3D scene */}
              <div className="flex-1 relative min-h-[250px] md:min-h-0">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
                {/* Gradient overlay to blend into left side */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== PROJECT THUMBNAILS — quick access strip ===== */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {projects.map((project, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative p-4 rounded-xl border text-center transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-codex-green/10 border-codex-green/40 shadow-green-sm'
                    : 'bg-codex-card border-white/[0.06] hover:border-white/20'
                }`}
              >
                <div className="text-2xl mb-2">{project.icon}</div>
                <div className={`text-xs font-medium leading-tight ${
                  index === currentIndex ? 'text-codex-green' : 'text-codex-text-muted'
                }`}>
                  {project.category.split(' & ')[0].split(' y ')[0]}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ===== STATS SECTION ===== */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {[
            { number: '10+', label: t('Industries Served', 'Industrias atendidas') },
            { number: '98%', label: t('Client Satisfaction', 'Satisfacción del cliente') },
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

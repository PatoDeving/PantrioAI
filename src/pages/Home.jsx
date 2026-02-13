import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MagicButton from '../components/MagicButton';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Bento grid services - varying sizes for visual interest
  const bentoServices = [
    {
      icon: '\uD83E\uDD16',
      title: t('AI & Machine Learning', 'IA y aprendizaje autom\u00e1tico'),
      description: t(
        'Custom AI solutions, natural language processing, computer vision, and predictive analytics to transform your business operations.',
        'Soluciones de IA a medida: procesamiento de lenguaje natural, visi\u00f3n por computadora y an\u00e1lisis predictivo para transformar tu operaci\u00f3n.'
      ),
      span: 'md:col-span-2 md:row-span-2',
      featured: true,
    },
    {
      icon: '\uD83D\uDCBB',
      title: t('Web Development', 'Desarrollo web'),
      description: t(
        'Modern, responsive websites built with React, Next.js, and Node.js.',
        'Sitios web modernos y responsivos con React, Next.js y Node.js.'
      ),
      span: '',
    },
    {
      icon: '\uD83D\uDCF1',
      title: t('Mobile Development', 'Desarrollo m\u00f3vil'),
      description: t(
        'Native and cross-platform apps for iOS and Android.',
        'Aplicaciones nativas y multiplataforma para iOS y Android.'
      ),
      span: '',
    },
    {
      icon: '\u2601\uFE0F',
      title: t('Cloud Solutions', 'Soluciones en la nube'),
      description: t(
        'Cloud architecture, migration, and optimization using AWS, Azure, and GCP.',
        'Arquitectura, migraci\u00f3n y optimizaci\u00f3n en la nube con AWS, Azure y GCP.'
      ),
      span: 'md:col-span-2',
    },
    {
      icon: '\u2699\uFE0F',
      title: t('Automation & DevOps', 'Automatizaci\u00f3n y DevOps'),
      description: t(
        'Intelligent automation, CI/CD pipelines, and infrastructure as code.',
        'Automatizaci\u00f3n inteligente, pipelines CI/CD e infraestructura como c\u00f3digo.'
      ),
      span: '',
    },
    {
      icon: '\uD83D\uDCCA',
      title: t('Data Analytics', 'An\u00e1lisis de datos'),
      description: t(
        'Advanced analytics, visualization, and business intelligence.',
        'An\u00e1lisis avanzado, visualizaci\u00f3n e inteligencia de negocios.'
      ),
      span: '',
    },
    {
      icon: '\uD83C\uDFA8',
      title: t('UI/UX Design', 'Dise\u00f1o UI/UX'),
      description: t(
        'Beautiful, intuitive interfaces with user experience at the forefront.',
        'Interfaces intuitivas y atractivas con la experiencia de usuario como prioridad.'
      ),
      span: '',
    },
  ];

  const stats = [
    { value: '50+', label: t('Projects Delivered', 'Proyectos entregados') },
    { value: '98%', label: t('Client Satisfaction', 'Satisfacci\u00f3n del cliente') },
    { value: '24/7', label: t('Support Available', 'Soporte disponible') },
    { value: '10+', label: t('Industries Served', 'Industrias atendidas') },
  ];

  const coreServiceLabel = t('Core Service', 'Servicio principal');
  const terminalOutput = t('3 tasks completed in 2.4s', '3 tareas completadas en 2.4\u00a0s');

  return (
    <div className="min-h-screen relative z-10 noise-overlay">
      {/* ===== HERO SECTION ===== */}
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        {/* Ambient gradient blobs */}
        <div
          className="ambient-blob ambient-blob-1"
          style={{
            width: '600px',
            height: '600px',
            top: '10%',
            left: '-10%',
            background: 'rgba(51, 102, 255, 0.05)',
          }}
        />
        <div
          className="ambient-blob ambient-blob-2"
          style={{
            width: '500px',
            height: '500px',
            bottom: '5%',
            right: '-8%',
            background: 'rgba(51, 102, 255, 0.04)',
          }}
        />

        {/* Subtle dot grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Hero content */}
        <div className="max-w-4xl mx-auto text-center pt-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Status badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-codex-green/20 bg-codex-green/5 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05, duration: 0.5 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-codex-green animate-pulse" />
              <span className="text-xs font-medium text-codex-green tracking-wide">
                {t('AI-Powered Solutions', 'Soluciones impulsadas por IA')}
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              {t('Build smarter with', 'Construye m\u00e1s inteligente con')}{' '}
              <span className="text-codex-green relative">
                Pantrio AI
                {/* Underline glow */}
                <span
                  className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #3366FF, transparent)',
                    opacity: 0.5,
                  }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-codex-text-muted mb-12 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {t(
                'We design and build AI agents, automation systems, and modern web applications that help businesses operate faster and scale efficiently.',
                'Dise\u00f1amos y desarrollamos agentes de IA, sistemas de automatizaci\u00f3n y aplicaciones web modernas que ayudan a las empresas a operar m\u00e1s r\u00e1pido y escalar de manera eficiente.'
              )}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <MagicButton onClick={() => navigate('/contact')} size="lg">
                {t('Start a Project', 'Iniciar un proyecto')}
              </MagicButton>
              <MagicButton variant="outline" size="lg" onClick={scrollToServices}>
                {t('Explore Services', 'Explorar servicios')}
              </MagicButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            className="w-5 h-8 rounded-full border-2 border-codex-text-dim/30 flex justify-center pt-1.5"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-codex-text-dim/50"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ===== STATS BAR ===== */}
      <div className="relative z-10 py-16 px-4 border-y border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-codex-green mb-1">{stat.value}</div>
                <div className="text-xs text-codex-text-dim uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== SERVICES BENTO GRID ===== */}
      <div id="services-section" className="relative z-10 py-24 px-4">
        {/* Background ambient blob for services */}
        <div
          className="ambient-blob ambient-blob-2"
          style={{
            width: '700px',
            height: '700px',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(51, 102, 255, 0.025)',
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              {t('What We', 'Lo que')}{' '}
              <span className="text-codex-green">{t('Build', 'construimos')}</span>
            </h2>
            <p className="text-lg text-codex-text-muted max-w-2xl mx-auto">
              {t(
                'End-to-end technology solutions, from concept to deployment.',
                'Soluciones tecnol\u00f3gicas integrales, del concepto al despliegue.'
              )}
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bentoServices.map((service, index) => (
              <motion.div
                key={index}
                className={`glass-card rounded-xl transition-all duration-200 ${service.span} ${
                  service.featured ? 'p-10' : 'p-6'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                whileHover={{ y: -3 }}
              >
                {service.featured ? (
                  // Featured card - larger layout
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="text-4xl">{service.icon}</div>
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-codex-green bg-codex-green/10 px-3 py-1 rounded-full">
                          {coreServiceLabel}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-codex-text">{service.title}</h3>
                      <p className="text-codex-text-muted leading-relaxed mb-6">{service.description}</p>
                    </div>
                    {/* Mini demo / visual element */}
                    <div className="bg-codex-bg/60 border border-white/[0.04] rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                        <span className="text-[10px] text-codex-text-dim ml-2 font-mono">agent.py</span>
                      </div>
                      <div className="font-mono text-xs space-y-1">
                        <div><span className="text-codex-green/70">from</span> <span className="text-codex-text-muted">pantrio</span> <span className="text-codex-green/70">import</span> <span className="text-codex-text-muted">Agent</span></div>
                        <div><span className="text-codex-text-dim">agent</span> <span className="text-codex-text-dim">=</span> <span className="text-codex-text-muted">Agent</span><span className="text-codex-text-dim">(</span><span className="text-amber-400/70">"analyzer"</span><span className="text-codex-text-dim">)</span></div>
                        <div><span className="text-codex-text-dim">result</span> <span className="text-codex-text-dim">=</span> <span className="text-codex-text-dim">agent.</span><span className="text-codex-text-muted">run</span><span className="text-codex-text-dim">(</span><span className="text-amber-400/70">"Optimize workflow"</span><span className="text-codex-text-dim">)</span></div>
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/[0.04]">
                          <span className="text-codex-green">{'\u2713'}</span>
                          <span className="text-codex-text-dim">{terminalOutput}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Standard card
                  <>
                    <div className="text-3xl mb-4">{service.icon}</div>
                    <h3 className="text-base font-semibold mb-2 text-codex-text">{service.title}</h3>
                    <p className="text-codex-text-muted text-sm">{service.description}</p>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== HOW WE WORK ===== */}
      <div className="relative z-10 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              {t('How We', 'C\u00f3mo')}{' '}
              <span className="text-codex-green">{t('Work', 'trabajamos')}</span>
            </h2>
            <p className="text-codex-text-muted text-sm max-w-xl mx-auto">
              {t(
                'A streamlined process designed to get you from idea to production.',
                'Un proceso optimizado para llevar tu idea a producci\u00f3n.'
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-0">
            {[
              {
                step: '01',
                title: t('Discovery', 'Descubrimiento'),
                desc: t('We analyze your needs and define the project scope.', 'Analizamos tus necesidades y definimos el alcance del proyecto.'),
              },
              {
                step: '02',
                title: t('Design', 'Dise\u00f1o'),
                desc: t('Architecture and UI/UX tailored to your goals.', 'Arquitectura y UI/UX a la medida de tus objetivos.'),
              },
              {
                step: '03',
                title: t('Build', 'Desarrollo'),
                desc: t('Agile development with continuous iteration.', 'Desarrollo \u00e1gil con iteraci\u00f3n continua.'),
              },
              {
                step: '04',
                title: t('Deploy', 'Despliegue'),
                desc: t('Launch, monitor, and scale with confidence.', 'Lanzamiento, monitoreo y escalamiento con confianza.'),
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative text-center p-8"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {/* Connector line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/3 right-0 w-full h-px bg-gradient-to-r from-white/[0.06] to-white/[0.02] translate-x-1/2 z-0" />
                )}
                <div className="relative z-10">
                  <div className="text-3xl font-bold text-codex-green/20 mb-3">{item.step}</div>
                  <h3 className="text-base font-semibold text-codex-text mb-2">{item.title}</h3>
                  <p className="text-codex-text-dim text-xs">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      {/* ===== CTA SECTION ===== */}
      <div className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative glass-card rounded-2xl p-14 text-center overflow-hidden">
              {/* CTA ambient glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(51, 102, 255, 0.06) 0%, transparent 50%)',
                }}
              />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4 text-codex-text">
                  {t('Ready to build something great?', '\u00bfListo para construir algo grandioso?')}
                </h2>
                <p className="text-codex-text-muted mb-8 max-w-xl mx-auto">
                  {t(
                    'Tell us about your project and we\u2019ll craft a solution that fits.',
                    'Cu\u00e9ntanos sobre tu proyecto y crearemos una soluci\u00f3n a tu medida.'
                  )}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <MagicButton size="lg" onClick={() => navigate('/contact')}>
                    {t('Start a Project', 'Iniciar un proyecto')}
                  </MagicButton>
                  <MagicButton variant="outline" size="lg" onClick={() => navigate('/portfolio')}>
                    {t('View Our Work', 'Ver nuestro trabajo')}
                  </MagicButton>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;

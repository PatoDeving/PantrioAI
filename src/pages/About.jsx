import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: '\uD83D\uDCA1',
      title: t('Innovation', 'Innovaci\u00f3n'),
      description: t(
        'We stay ahead of the curve, constantly exploring new technologies.',
        'Nos mantenemos a la vanguardia, explorando nuevas tecnolog\u00edas constantemente.'
      ),
    },
    {
      icon: '\uD83E\uDD1D',
      title: t('Collaboration', 'Colaboraci\u00f3n'),
      description: t(
        'We work closely with our clients as partners to achieve success.',
        'Trabajamos de la mano con nuestros clientes como socios para lograr el \u00e9xito.'
      ),
    },
    {
      icon: '\uD83C\uDFAF',
      title: t('Excellence', 'Excelencia'),
      description: t(
        'We deliver the highest quality in everything we do.',
        'Entregamos la m\u00e1s alta calidad en todo lo que hacemos.'
      ),
    },
    {
      icon: '\uD83C\uDF1F',
      title: t('Integrity', 'Integridad'),
      description: t(
        'We operate with transparency, honesty, and respect.',
        'Operamos con transparencia, honestidad y respeto.'
      ),
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
            {t('About', 'Acerca de')} <span className="text-codex-green">Pantrio AI</span>
          </h1>
          <p className="text-lg text-codex-text-muted max-w-2xl mx-auto">
            {t(
              'We are a team of passionate technologists dedicated to transforming businesses through innovative AI and software solutions.',
              'Somos un equipo de tecn\u00f3logos apasionados, dedicados a transformar empresas mediante soluciones innovadoras de IA y software.'
            )}
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
              <div className="text-4xl mb-5">{'\u2B50'}</div>
              <h2 className="text-2xl font-bold mb-4 text-codex-green">{t('Our Mission', 'Nuestra misi\u00f3n')}</h2>
              <p className="text-codex-text-muted leading-relaxed">
                {t(
                  'To empower businesses with intelligent, easy-to-integrate AI solutions that automate workflows, unlock insights, and elevate productivity \u2014 making advanced technology accessible to everyone.',
                  'Potenciar a las empresas con soluciones de IA inteligentes y f\u00e1ciles de integrar que automatizan flujos de trabajo, generan insights y elevan la productividad, haciendo la tecnolog\u00eda avanzada accesible para todos.'
                )}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="bg-codex-card border border-codex-green/20 rounded-xl p-8 md:p-10 h-full">
              <div className="text-4xl mb-5">{'\uD83C\uDF0D'}</div>
              <h2 className="text-2xl font-bold mb-4 text-codex-green">{t('Our Vision', 'Nuestra visi\u00f3n')}</h2>
              <p className="text-codex-text-muted leading-relaxed">
                {t(
                  'To become the leading AI agency for scalable automation, enabling companies worldwide to operate smarter, faster, and more efficiently through human-centered artificial intelligence.',
                  'Convertirnos en la agencia l\u00edder de IA para automatizaci\u00f3n escalable, permitiendo que empresas en todo el mundo operen de forma m\u00e1s inteligente, r\u00e1pida y eficiente mediante inteligencia artificial centrada en las personas.'
                )}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Nearshore Advantage Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-codex-text">
            {t('Why a Mexico-Based AI Partner?', '\u00bfPor qu\u00e9 un socio de IA en M\u00e9xico?')}
          </h2>
          <p className="text-codex-text-muted text-sm text-center mb-10 max-w-2xl mx-auto">
            {t(
              'As a nearshore AI agency, we combine world-class technical talent with the advantages of proximity to the US and Canadian markets.',
              'Como agencia nearshore de IA, combinamos talento t\u00e9cnico de primer nivel con las ventajas de la proximidad a los mercados de EE.\u00a0UU. y Canad\u00e1.'
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '\u23F0',
                title: t('Timezone Aligned', 'Misma zona horaria'),
                desc: t('Same working hours as US Central/Eastern time. Real-time collaboration, no overnight delays.', 'Mismas horas laborales que el centro/este de EE.\u00a0UU. Colaboraci\u00f3n en tiempo real, sin retrasos.'),
              },
              {
                icon: '\uD83D\uDCB0',
                title: t('40-60% Cost Savings', '40-60% ahorro en costos'),
                desc: t('Enterprise-grade AI solutions at a fraction of US agency rates, without compromising quality.', 'Soluciones de IA de nivel empresarial a una fracci\u00f3n del costo de agencias en EE.\u00a0UU., sin comprometer calidad.'),
              },
              {
                icon: '\uD83C\uDF10',
                title: t('Fully Bilingual', 'Completamente biling\u00fce'),
                desc: t('Native English and Spanish. We bridge the communication gap for LATAM and North American markets.', 'Ingl\u00e9s y espa\u00f1ol nativos. Conectamos los mercados de LATAM y Norteam\u00e9rica sin barreras.'),
              },
              {
                icon: '\u2708\uFE0F',
                title: t('Travel Proximity', 'Proximidad geogr\u00e1fica'),
                desc: t('A short flight away for in-person meetings when it matters. Mexico City is 3-4 hours from most US cities.', 'A pocas horas de vuelo para reuniones presenciales. CDMX est\u00e1 a 3-4\u00a0horas de la mayor\u00eda de ciudades de EE.\u00a0UU.'),
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-codex-card border border-white/[0.06] rounded-xl p-6 text-center hover:border-codex-green/30 transition-colors duration-150"
                whileHover={{ y: -4 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-3 text-codex-text">{item.title}</h3>
                <p className="text-codex-text-muted text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-10 text-center text-codex-text">
            {t('Our Values', 'Nuestros valores')}
          </h2>
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

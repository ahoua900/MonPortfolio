import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experiences, education, stats } from '../../data/portfolio';
import { useLang } from '../../context/LanguageContext';

const Counter = ({ end, suffix, label }: { end: number; suffix: string; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="text-center">
      <motion.div className="font-display font-black text-4xl md:text-5xl text-white"
        initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
        {inView ? `${end}${suffix}` : '0'}
      </motion.div>
      <div className="text-white/35 text-xs font-mono mt-1 tracking-widest uppercase">{label}</div>
    </div>
  );
};

const expColors = ['#FFFFFF', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.35)'];

export const AboutSection = () => {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-28 px-4 md:px-10 lg:px-14 bg-[#0A0A0A] relative overflow-hidden">
      <div className="divider absolute top-0 inset-x-0" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-16">
          <div className="section-label mb-3">{t('about.label')}</div>
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="text-white/35 mt-3 max-w-lg">{t('about.sub')}</p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-20 border border-white/8"
          style={{ borderRadius: '2px' }}>
          {stats.map((s, i) => (
            <div key={s.label} className={`p-8 ${i < 3 ? 'md:border-r' : ''} border-white/8`}>
              <Counter end={s.value} suffix={s.suffix} label={s.label} />
            </div>
          ))}
        </motion.div>

        {/* Bio grid */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="section-label mb-4">{t('about.journey')}</div>
            <p className="text-white/60 leading-relaxed mb-5 text-sm">{t('about.bio1')}</p>
            <p className="text-white/60 leading-relaxed text-sm">{t('about.bio2')}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}>
            <div className="section-label mb-4">{t('about.vision')}</div>
            <div className="space-y-3">
              {[
                { icon: '01', title: 'Architecture First', text: 'Chaque système mérite une base solide. Architecture hexagonale et DDD pour des solutions évolutives.' },
                { icon: '02', title: 'Performance & Qualité', text: 'Code review rigoureux, tests automatisés et CI/CD pour zéro régression en production.' },
                { icon: '03', title: 'Collaboration', text: 'Leadership bienveillant, mentoring et transfert de compétences au cœur de mon approche.' },
                { icon: '04', title: 'Innovation Continue', text: 'Veille permanente et intégration des meilleures pratiques (IA, cloud, microservices).' },
              ].map((item) => (
                <div key={item.title} className="card p-4 flex gap-4">
                  <span className="font-mono text-white/20 text-xs flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-white/90 text-sm mb-1">{item.title}</div>
                    <div className="text-white/40 text-xs leading-relaxed">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}>
          <div className="section-label mb-8">{t('about.experience')}</div>
          <div className="space-y-0 border-l border-white/10 pl-8">
            {experiences.map((exp, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.12 }}
                className={`relative pb-10 ${i === experiences.length - 1 ? 'pb-0' : ''}`}>
                {/* Dot */}
                <div className="absolute -left-9 top-0 w-2 h-2 rounded-full border border-white/30"
                  style={{ background: expColors[i] }} />

                <div className="card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="font-mono text-xs text-white/30 mb-1">{exp.period}</div>
                      <div className="font-display font-bold text-white text-lg">{exp.title}</div>
                      <div className="text-white/50 text-sm">{exp.company}</div>
                    </div>
                    <span className="font-mono text-xs px-2 py-1 border border-white/10 text-white/30"
                      style={{ borderRadius: '2px' }}>{exp.type}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.tasks.map((task, ti) => (
                      <li key={ti} className="text-white/40 text-sm flex items-start gap-2">
                        <span className="text-white/20 mt-1 flex-shrink-0">—</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }} className="mt-16">
          <div className="section-label mb-6">{t('about.formation')}</div>
          <div className="grid md:grid-cols-2 gap-3">
            {education.map((ed, i) => (
              <div key={i} className="card p-5 flex gap-4">
                <div className="font-mono text-white/15 text-sm font-bold mt-0.5">0{i + 1}</div>
                <div>
                  <div className="font-semibold text-white/85 text-sm mb-1">{ed.degree}</div>
                  <div className="text-white/40 text-xs">{ed.institution}</div>
                  <div className="text-white/20 text-xs font-mono mt-1">{ed.year}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

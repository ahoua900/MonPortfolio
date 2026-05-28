import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../../data/portfolio';
import { useLang } from '../../context/LanguageContext';

const categories = [
  { key: 'backend', labelKey: 'skills.backend', icon: '⬛' },
  { key: 'frontend', labelKey: 'skills.frontend', icon: '⚛' },
  { key: 'mobile', labelKey: 'skills.mobile', icon: '📱' },
  { key: 'devops', labelKey: 'skills.devops', icon: '🐳' },
  { key: 'architecture', labelKey: 'skills.architecture', icon: '🏗' },
  { key: 'softSkills', labelKey: 'skills.leadership', icon: '🤝' },
] as const;

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="group">
      <div className="flex justify-between mb-1.5">
        <span className="text-white/55 text-sm group-hover:text-white transition-colors">{name}</span>
        <span className="font-mono text-xs text-white/30">{level}%</span>
      </div>
      <div className="h-px bg-white/8">
        <motion.div className="h-full bg-white" style={{ opacity: 0.6 }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }} />
      </div>
    </div>
  );
};

export const SkillsSection = () => {
  const { t } = useLang();
  const [active, setActive] = useState<string>('backend');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const currentSkills = skills[active as keyof typeof skills] || [];
  const currentCat = categories.find(c => c.key === active)!;

  return (
    <section id="skills" className="py-28 px-4 md:px-10 lg:px-14 bg-[#0A0A0A] relative overflow-hidden">
      <div className="divider absolute top-0 inset-x-0" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-16">
          <div className="section-label mb-3">{t('skills.label')}</div>
          <h2 className="section-title">{t('skills.title')}</h2>
          <p className="text-white/35 mt-3 max-w-lg">{t('skills.sub')}</p>
        </motion.div>

        {/* Category tabs */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button key={cat.key} onClick={() => setActive(cat.key)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 border ${
                active === cat.key
                  ? 'border-white/40 text-white bg-white/5'
                  : 'border-white/10 text-white/35 hover:border-white/25 hover:text-white/60'
              }`} style={{ borderRadius: '2px' }}>
              <span>{cat.icon}</span>
              {t(cat.labelKey)}
            </button>
          ))}
        </motion.div>

        {/* Skills content */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Bars */}
          <motion.div key={active} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }} className="card p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/6">
              <span className="text-2xl">{currentCat.icon}</span>
              <div>
                <div className="font-display font-bold text-white">{t(currentCat.labelKey)}</div>
                <div className="text-white/25 text-xs font-mono">{currentSkills.length} {t('skills.count')}</div>
              </div>
            </div>
            {currentSkills.map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.07} />
            ))}
          </motion.div>

          {/* Cards grid */}
          <motion.div key={active + '-g'} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }} className="grid grid-cols-2 gap-2 content-start">
            {currentSkills.map((skill, i) => (
              <motion.div key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                whileHover={{ y: -2 }}
                className="card p-4 text-center">
                <div className="font-mono font-black text-2xl text-white mb-1" style={{ opacity: skill.level / 100 + 0.15 }}>
                  {skill.level}
                </div>
                <div className="text-white/40 text-xs leading-tight">{skill.name}</div>
                <div className="mt-2 h-px bg-white/8">
                  <div className="h-full bg-white/40" style={{ width: `${skill.level}%` }} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }} className="mt-12 border border-white/8 p-8"
          style={{ borderRadius: '2px' }}>
          <div className="section-label mb-6">{t('skills.overview')}</div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const catSkills = skills[cat.key as keyof typeof skills] || [];
              const avg = Math.round(catSkills.reduce((a, s) => a + s.level, 0) / catSkills.length);
              return (
                <button key={cat.key} onClick={() => setActive(cat.key)}
                  className={`text-center p-3 border transition-all duration-300 ${
                    active === cat.key ? 'border-white/30 bg-white/5' : 'border-transparent hover:border-white/10'
                  }`} style={{ borderRadius: '2px' }}>
                  <div className="text-xl mb-2">{cat.icon}</div>
                  <div className="font-mono font-black text-xl text-white mb-0.5">{avg}%</div>
                  <div className="text-white/30 text-xs">{t(cat.labelKey)}</div>
                  <div className="mt-2 h-px bg-white/8">
                    <div className="h-full bg-white/50" style={{ width: `${avg}%` }} />
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

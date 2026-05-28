import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/portfolio';
import { useLang } from '../../context/LanguageContext';

const categoryKeys = ['Tous', 'Enterprise', 'SaaS', 'IA & Mobile', 'IA & Education', 'Logistique', 'AgriTech', 'EdTech'];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const { t } = useLang();
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const catEmoji: Record<string, string> = {
    Enterprise: '🏢', SaaS: '☁️', 'IA & Mobile': '🤖', 'IA & Education': '🎓',
    Logistique: '🚚', AgriTech: '🌾', EdTech: '📚',
  };

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -3 }}
      onClick={() => setExpanded(!expanded)}
      className="card cursor-pointer overflow-hidden"
    >
      {/* Top accent line */}
      <div className="h-px" style={{ background: project.featured ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.06)' }} />

      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            {project.featured && (
              <div className="font-mono text-xs text-white/25 tracking-widest mb-1.5">FEATURED</div>
            )}
            <h3 className="font-display font-bold text-white text-base leading-snug">{project.title}</h3>
            <div className="text-white/35 text-xs mt-1 font-mono">{project.role}</div>
          </div>
          <span className="text-xl flex-shrink-0">{catEmoji[project.category] || '📦'}</span>
        </div>

        <p className="text-white/45 text-sm leading-relaxed mb-4">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* Expanded */}
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="pt-4 border-t border-white/6 mb-4">
                <p className="text-white/45 text-sm leading-relaxed mb-3">{project.longDescription}</p>
                <div className="bg-white/4 border border-white/6 p-3" style={{ borderRadius: '2px' }}>
                  <div className="font-mono text-xs text-white/25 mb-1">// {t('projects.impact')}</div>
                  <div className="text-white/70 text-sm">⚡ {project.impact}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <button className="font-mono text-xs text-white/25 hover:text-white/60 transition-colors">
            {expanded ? `▲ ${t('projects.less')}` : `▼ ${t('projects.details')}`}
          </button>
          <div className="flex gap-2">
            <a href={project.github} onClick={e => e.stopPropagation()}
              className="font-mono text-xs text-white/25 hover:text-white transition-all duration-300 px-3 py-1.5 border border-white/8 hover:border-white/25"
              style={{ borderRadius: '2px' }}>
              {t('projects.code')}
            </a>
            <a href={project.demo} onClick={e => e.stopPropagation()}
              className="font-mono text-xs text-white px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-all duration-300"
              style={{ borderRadius: '2px' }}>
              {t('projects.demo')} →
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const { t } = useLang();
  const [filter, setFilter] = useState('Tous');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const filtered = filter === 'Tous' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-28 px-4 md:px-10 lg:px-14 bg-black relative overflow-hidden">
      <div className="divider absolute top-0 inset-x-0" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-16">
          <div className="section-label mb-3">{t('projects.label')}</div>
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="text-white/35 mt-3 max-w-lg">{t('projects.sub')}</p>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10">
          {categoryKeys.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`font-mono text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-300 ${
                filter === cat
                  ? 'border-white/40 text-white bg-white/5'
                  : 'border-white/10 text-white/35 hover:border-white/25 hover:text-white/60'
              }`} style={{ borderRadius: '2px' }}>
              {cat === 'Tous' ? t('projects.all') : cat}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </motion.div>
        </AnimatePresence>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 font-mono text-xs text-white/20">
          {filtered.length} {t('projects.shown')}
        </motion.div>
      </div>
    </section>
  );
};

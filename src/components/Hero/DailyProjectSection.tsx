import { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../../data/portfolio';
import { useLang } from '../../context/LanguageContext';

const getDailyProject = () => {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((today.getTime() - start.getTime()) / 86_400_000);
  return { project: projects[dayOfYear % projects.length], index: dayOfYear % projects.length };
};

const formatDate = (lang: string) => {
  const today = new Date();
  return today.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    day: '2-digit', month: 'long', year: 'numeric',
  }).toUpperCase();
};

export const DailyProjectSection = () => {
  const { t, lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { project, index } = useMemo(getDailyProject, []);

  return (
    <section className="relative px-4 md:px-10 lg:px-14 py-12 bg-black overflow-hidden">
      {/* Accent horizontal rule */}
      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: 'rgb(var(--accent))' }}
      />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: 'rgb(var(--accent))' }} />
            <span className="font-mono text-xs tracking-[0.22em] uppercase"
              style={{ color: 'rgb(var(--accent))' }}>
              {t('daily.label')}
            </span>
          </div>
          <span className="font-mono text-xs text-white/20 tracking-widest">
            {formatDate(lang)}
          </span>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="card p-0 overflow-hidden"
          style={{ borderColor: 'rgba(var(--accent), 0.18)' }}
        >
          <div className="grid lg:grid-cols-[200px_1fr]">
            {/* Left — index + progress */}
            <div className="relative flex flex-col justify-between p-7 lg:border-r"
              style={{ borderColor: 'rgba(var(--accent), 0.1)', background: 'rgba(var(--accent), 0.03)' }}>
              {/* Big project number */}
              <div>
                <div className="font-mono text-xs text-white/20 mb-1 tracking-widest">{t('daily.project_no')}</div>
                <div className="font-display font-black leading-none"
                  style={{ fontSize: 'clamp(3.5rem, 8vw, 5rem)', color: 'rgb(var(--accent))' }}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="font-mono text-xs text-white/25 mt-1">/ {String(projects.length).padStart(2, '0')}</div>
              </div>

              {/* Dot progress indicator */}
              <div className="flex flex-col gap-1.5 mt-6 lg:mt-0">
                {projects.map((_, i) => (
                  <div key={i}
                    className="h-px w-full transition-all duration-500"
                    style={{
                      background: i === index
                        ? 'rgb(var(--accent))'
                        : i < index
                          ? 'rgba(var(--accent), 0.25)'
                          : 'rgba(var(--c), 0.08)',
                      height: i === index ? '2px' : '1px',
                    }}
                  />
                ))}
              </div>

              {/* Role badge */}
              <div className="mt-6 lg:mt-0">
                <div className="font-mono text-xs text-white/20 mb-1 uppercase tracking-widest">{t('daily.role')}</div>
                <div className="text-white/60 text-xs leading-snug">{project.role}</div>
              </div>
            </div>

            {/* Right — project details */}
            <div className="p-7 lg:p-9 flex flex-col gap-5">
              {/* Category + title */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="tag text-xs" style={{ borderColor: 'rgba(var(--accent),0.3)', color: 'rgba(var(--accent),0.9)' }}>
                    {project.category}
                  </span>
                </div>
                <h3 className="font-display font-bold text-white leading-tight"
                  style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}>
                  {project.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              {/* Impact */}
              <div className="flex items-start gap-3 py-3 px-4 rounded-sm"
                style={{ background: 'rgba(var(--accent), 0.05)', borderLeft: '2px solid rgb(var(--accent))' }}>
                <span className="text-xs font-mono mt-0.5" style={{ color: 'rgb(var(--accent))' }}>↗</span>
                <div>
                  <div className="text-xs font-mono text-white/30 uppercase tracking-widest mb-1">{t('daily.impact')}</div>
                  <div className="text-white/70 text-sm">{project.impact}</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3 pt-1">
                {project.github !== '#' && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="btn-outline text-xs px-5 py-2.5 gap-1.5">
                    {t('daily.code')} ↗
                  </a>
                )}
                {project.demo !== '#' && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer"
                    className="btn-primary text-xs px-5 py-2.5 gap-1.5">
                    {t('daily.demo')} →
                  </a>
                )}
                {project.github === '#' && project.demo === '#' && (
                  <span className="font-mono text-xs text-white/25 italic">{t('daily.private')}</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-white/15 text-xs font-mono text-right mt-3 tracking-widest">
          {t('daily.changes')}
        </motion.p>
      </div>
    </section>
  );
};

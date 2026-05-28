import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { technologies } from '../../data/portfolio';
import { CodeEditor } from './CodeEditor';
import { useLang } from '../../context/LanguageContext';

const TechLogo = ({ logo }: { logo: string; color?: string }) => {
  const logos: Record<string, string> = { csharp: 'C#', react: '⚛', postgresql: 'PG', docker: '🐳', nextjs: '▲', ai: 'AI', maui: '📱', git: '⎇' };
  return (
    <div className="w-10 h-10 flex items-center justify-center text-sm font-bold font-mono border"
      style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', borderRadius: '2px' }}>
      {logos[logo] || '◈'}
    </div>
  );
};

export const TechnologiesSection = () => {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const tech = technologies[active];

  return (
    <section id="technologies" className="py-28 px-4 md:px-10 lg:px-14 bg-black relative overflow-hidden">
      <div className="divider absolute top-0 inset-x-0" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-16">
          <div className="section-label mb-3">{t('tech.label')}</div>
          <h2 className="section-title">{t('tech.title')}</h2>
          <p className="text-white/35 mt-3 max-w-lg">{t('tech.sub')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Tech list */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }} className="space-y-1">
            {technologies.map((t_, i) => (
              <motion.button key={t_.name} onClick={() => setActive(i)} whileHover={{ x: 4 }}
                className={`w-full text-left p-4 transition-all duration-300 border-l-2 ${
                  active === i
                    ? 'border-white bg-white/5'
                    : 'border-transparent hover:border-white/20 hover:bg-white/3'
                }`}>
                <div className="flex items-center gap-3 mb-2">
                  <TechLogo logo={t_.logo} color={t_.color} />
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium text-sm truncate ${active === i ? 'text-white' : 'text-white/50'}`}>{t_.name}</div>
                    <div className="text-white/25 text-xs font-mono">{t_.years} {t('tech.years')} · {t_.category}</div>
                  </div>
                  <div className={`font-mono text-xs font-bold flex-shrink-0 ${active === i ? 'text-white' : 'text-white/30'}`}>
                    {t_.level}%
                  </div>
                </div>
                <div className="h-px bg-white/5 overflow-hidden">
                  <motion.div className="h-full bg-white"
                    style={{ opacity: active === i ? 0.6 : 0.2 }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${t_.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.08 }} />
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Editor */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}>
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}>
                <div className="card p-4 mb-4 flex items-center gap-4">
                  <TechLogo logo={tech.logo} color={tech.color} />
                  <div>
                    <div className="font-display font-bold text-white text-lg">{tech.name}</div>
                    <div className="text-white/40 text-xs">{tech.description}</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="font-display font-black text-3xl text-white">{tech.years}<span className="text-lg text-white/40">y</span></div>
                    <div className="text-white/25 text-xs font-mono">{t('tech.years')}</div>
                  </div>
                </div>
                <CodeEditor code={tech.codeExample} color="rgba(255,255,255,0.5)" techName={tech.name} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

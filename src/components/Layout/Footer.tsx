import { motion } from 'framer-motion';
import { useLang } from '../../context/LanguageContext';

export const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="py-8 px-4 md:px-10 lg:px-14 bg-black border-t border-white/8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-white/25">
          © 2026 <span className="text-white font-semibold">AHOUA Elvis Ghislain</span> — {t('footer.rights')}
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-white/15">
          React · Vite · TypeScript · Framer Motion · GSAP
        </div>
        <motion.button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ y: -2 }}
          className="font-mono text-xs text-white/25 hover:text-white transition-all duration-300 flex items-center gap-2">
          {t('footer.back')} ↑
        </motion.button>
      </div>
    </footer>
  );
};

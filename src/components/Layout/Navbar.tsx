import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const SunIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export const Navbar = () => {
  const { t, lang, toggle } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '#about', key: 'nav.about' },
    { href: '#technologies', key: 'nav.tech' },
    { href: '#skills', key: 'nav.skills' },
    { href: '#projects', key: 'nav.projects' },
    { href: '#contact', key: 'nav.contact' },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navBg = scrolled
    ? (theme === 'dark' ? 'rgba(0,0,0,0.88)' : 'rgba(243,242,237,0.94)')
    : 'transparent';

  const mobBg = theme === 'dark' ? 'rgba(0,0,0,0.96)' : 'rgba(240,239,234,0.99)';
  const borderCol = `rgba(${theme === 'dark' ? '255,255,255' : '15,14,12'},0.08)`;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-white/8' : ''
      }`}
      style={{ background: navBg, backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottomColor: borderCol }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-14 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.button onClick={() => scrollTo('#hero')} whileHover={{ opacity: 0.7 }}
          className="font-display font-black text-white text-lg tracking-tight">
          AEG<span className="text-white/30 font-mono font-normal text-sm">.dev</span>
        </motion.button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button key={link.href} onClick={() => scrollTo(link.href)}
              className="text-white/40 hover:text-white text-xs font-mono tracking-widest uppercase transition-all duration-300">
              {t(link.key)}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            className="w-8 h-8 flex items-center justify-center border border-white/15 hover:border-white/40 text-white/40 hover:text-white transition-all duration-300"
            style={{ borderRadius: '2px' }}
          >
            <AnimatePresence mode="wait">
              <motion.span key={theme}
                initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                transition={{ duration: 0.2 }}>
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Lang toggle */}
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-mono text-xs tracking-widest border border-white/15 hover:border-white/40 text-white/40 hover:text-white transition-all duration-300 px-3 py-1.5"
            style={{ borderRadius: '2px' }}
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </motion.button>

          {/* CTA */}
          <motion.a
            href="mailto:elvisahoua64@gmail.com"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:inline-flex btn-primary text-xs px-5 py-2 gap-1.5"
          >
            {t('nav.cta')}
          </motion.a>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 text-white/60">
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: mobBg, borderBottom: `1px solid ${borderCol}` }}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button key={link.href} onClick={() => scrollTo(link.href)}
                  className="text-left text-white/60 hover:text-white text-xs font-mono tracking-widest uppercase transition-all duration-300 py-1">
                  {t(link.key)}
                </button>
              ))}
              <a href="mailto:elvisahoua64@gmail.com"
                className="btn-primary text-xs px-5 py-3 justify-center mt-2">
                {t('nav.cta')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

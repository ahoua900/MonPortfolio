import { useEffect, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useLang } from '../../context/LanguageContext';

const CVDownloadButton = lazy(() =>
  import('../CV/CVDownloadButton').then(m => ({ default: m.CVDownloadButton }))
);

const DownloadIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

/* ── Floating glass card ── */
const FloatCard = ({
  children, delay, className, style,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16, scale: 0.94 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`hidden md:block absolute z-20 rounded-2xl p-4 ${className ?? ''}`}
    style={{
      background: 'rgba(14,14,14,0.82)',
      border: '1px solid rgba(255,255,255,0.09)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      ...style,
    }}
  >
    {children}
  </motion.div>
);

export const HeroSection = () => {
  const { t } = useLang();
  const photoRef  = useRef<HTMLDivElement>(null);
  const card1Ref  = useRef<HTMLDivElement>(null);
  const card2Ref  = useRef<HTMLDivElement>(null);
  const card3Ref  = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Mouse parallax ── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(photoRef.current,  { x: nx * -10, y: ny * -6,  duration: 1.4, ease: 'power2.out' });
      gsap.to(card1Ref.current,  { x: nx *  18, y: ny *  10, duration: 1.6, ease: 'power2.out' });
      gsap.to(card2Ref.current,  { x: nx * -16, y: ny *  12, duration: 1.2, ease: 'power2.out' });
      gsap.to(card3Ref.current,  { x: nx *  14, y: ny * -10, duration: 1.8, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const pillBtn: React.CSSProperties = {
    borderRadius: '9999px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center"
    >
      {/* ── Background: warm orange glow at bottom ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: [
            'radial-gradient(ellipse 90% 55% at 50% 105%, rgba(240,69,0,0.18) 0%, transparent 65%)',
            'radial-gradient(ellipse 60% 40% at 20% 10%, rgba(240,69,0,0.04) 0%, transparent 60%)',
          ].join(','),
        }} />
        {/* Very subtle noise */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* ════ TEXT AREA ════ */}
      <div className="relative z-10 flex flex-col items-center text-center pt-36 pb-6 px-5 w-full max-w-4xl mx-auto">

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-5 py-1.5"
          style={{
            borderRadius: '9999px',
            border: '1px solid rgba(240,69,0,0.28)',
            background: 'rgba(240,69,0,0.07)',
          }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'rgb(var(--accent))' }} />
          <span className="font-mono text-xs tracking-[0.18em]" style={{ color: 'rgba(240,69,0,0.95)' }}>
            {t('hero.badge')}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-bold text-white leading-[1.08] mb-5"
          style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.6rem)', letterSpacing: '-0.035em' }}
        >
          {t('hero.greeting')} —<br />
          <span style={{ color: 'rgba(255,255,255,0.72)' }}>{t('hero.title.short')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/40 max-w-lg mx-auto mb-10 leading-relaxed"
          style={{ fontSize: 'clamp(0.92rem, 1.8vw, 1.05rem)' }}
        >
          {t('hero.subtitle')}
        </motion.p>

      </div>

      {/* ════ PHOTO + CARDS ════ */}
      <div className="relative w-full flex-1 max-w-5xl mx-auto" style={{ minHeight: '55vh' }}>

        {/* Photo — centered, pinned to bottom, faded at bottom */}
        <div
          ref={photoRef}
          className="absolute left-1/2 bottom-0 z-10"
          style={{ transform: 'translateX(-50%)', width: 'clamp(240px, 42vw, 500px)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="/photo.png"
              alt="AHOUA Elvis Ghislain"
              className="w-full object-cover object-top select-none"
              draggable={false}
              style={{
                height: 'clamp(320px, 60vh, 680px)',
                filter: 'grayscale(10%) contrast(1.04)',
                maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
              }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            {/* Fallback initials */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center"
              style={{ background: 'linear-gradient(to bottom, #1a1a1a, #000)' }}>
              <span className="font-display font-black text-white/8 select-none"
                style={{ fontSize: 'clamp(5rem, 15vw, 12rem)' }}>EG</span>
            </div>
          </motion.div>
        </div>

        {/* ─── Card 1: Projects (left) ─── */}
        <div ref={card1Ref}>
          <FloatCard delay={1.0} className="left-[4%] xl:left-[6%]" style={{ top: '18%', width: 178 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(240,69,0,0.15)' }}>
                <span className="text-base">📦</span>
              </div>
              <div>
                <div className="font-display font-bold text-white text-xl leading-none">30+</div>
                <div className="text-white/35 text-xs mt-0.5">projets livrés</div>
              </div>
            </div>
            {/* Progress bar */}
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1.2, delay: 1.4, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: 'rgb(var(--accent))' }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-white/20 text-xs font-mono">satisfaction</span>
              <span className="text-xs font-mono font-semibold" style={{ color: 'rgb(var(--accent))' }}>95%</span>
            </div>
          </FloatCard>
        </div>

        {/* ─── Card 2: Current role (right) ─── */}
        <div ref={card2Ref}>
          <FloatCard delay={1.15} className="right-[4%] xl:right-[6%]" style={{ top: '12%', width: 210 }}>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-white text-xs"
                style={{ background: 'rgb(var(--accent))' }}>
                CHK
              </div>
              <div>
                <div className="text-white text-xs font-semibold leading-tight">CHK Groupe</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} />
                  <span className="text-white/35 text-xs">En poste</span>
                </div>
              </div>
            </div>
            <p className="text-white/50 text-xs leading-relaxed">
              Lead Tech & Architecte — conception d'un système complet de gestion hôtelière.
            </p>
          </FloatCard>
        </div>

        {/* ─── Card 3: Tech stack (bottom-left) ─── */}
        <div ref={card3Ref}>
          <FloatCard delay={1.3} className="left-[6%] xl:left-[8%]" style={{ bottom: '16%', width: 165 }}>
            <div className="mb-2">
              <div className="font-display font-bold text-white text-2xl leading-none">20+</div>
              <div className="text-white/35 text-xs mt-0.5">technologies maîtrisées</div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {['.NET', 'React', 'SQL', 'MAUI'].map(tech => (
                <span key={tech} className="font-mono text-xs px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(240,69,0,0.12)', color: 'rgba(240,69,0,0.9)' }}>
                  {tech}
                </span>
              ))}
            </div>
          </FloatCard>
        </div>
      </div>

      {/* ════ CTAs ════ */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-30 flex flex-wrap items-center justify-center gap-3 pb-16 pt-2"
      >
        {/* Primary — Download CV */}
        <Suspense fallback={
          <span className="btn-primary px-7 py-3.5 text-sm opacity-60 cursor-wait" style={pillBtn}>
            <DownloadIcon />
            {t('hero.cta.cv')}
          </span>
        }>
          <CVDownloadButton
            label={t('hero.cta.cv')}
            className="btn-primary px-7 py-3.5 text-sm cursor-pointer"
            style={pillBtn}
          >
            <DownloadIcon />
          </CVDownloadButton>
        </Suspense>

        {/* Secondary — Contact */}
        <button
          onClick={() => scrollTo('#contact')}
          className="text-white/65 hover:text-white transition-all duration-300 px-7 py-3.5 text-sm"
          style={{ ...pillBtn, border: '1px solid rgba(255,255,255,0.18)' }}
        >
          {t('hero.cta.contact')}
        </button>

        {/* Social proof */}
        <div className="hidden lg:flex items-center gap-2 text-white/25 text-xs font-mono ml-2">
          <span>5+ ans</span>
          <span className="text-white/10">·</span>
          <span>30+ projets</span>
          <span className="text-white/10">·</span>
          <span>Abidjan 🌍</span>
        </div>
      </motion.div>

    </section>
  );
};

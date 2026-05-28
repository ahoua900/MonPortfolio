import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { personalInfo, experiences, education } from '../../data/portfolio';

const templates = [
  { id: 'modern', label: 'Modern Dark', color: '#6C63FF' },
  { id: 'clean', label: 'Clean Pro', color: '#00D4FF' },
  { id: 'minimal', label: 'Minimal ATS', color: '#00FF88' },
];

const contexts = [
  { id: 'fullstack', label: 'Full Stack .NET/React', icon: '⬛' },
  { id: 'lead', label: 'Lead Tech / Architecte', icon: '🏗️' },
  { id: 'mobile', label: 'Développeur Mobile', icon: '📱' },
  { id: 'ai', label: 'IA & Automatisation', icon: '🤖' },
  { id: 'consulting', label: 'Consulting Technique', icon: '💼' },
];

const buildCV = (context: string, template: string, custom: string): string => {
  const contextData: Record<string, { headline: string; keySkills: string[] }> = {
    fullstack: {
      headline: 'Développeur Full Stack Senior .NET / React',
      keySkills: ['C# / ASP.NET Core', 'React / TypeScript', 'Clean Architecture', 'PostgreSQL', 'Docker', 'CI/CD'],
    },
    lead: {
      headline: 'Lead Tech & Architecte Logiciel',
      keySkills: ['Leadership Technique', 'Architecture Hexagonale', 'DDD / CQRS', 'Mentoring', 'C# / .NET 8', 'React'],
    },
    mobile: {
      headline: 'Développeur Mobile Cross-Platform',
      keySkills: ['.NET MAUI', 'Xamarin.Forms', 'React Native', 'C#', 'REST APIs', 'Firebase'],
    },
    ai: {
      headline: 'Développeur IA & Automatisation',
      keySkills: ['Claude AI / Mistral AI', 'Agents IA', 'Python', 'C# / .NET', 'Automatisation', 'API Integration'],
    },
    consulting: {
      headline: 'Consultant Technique .NET / Architecture',
      keySkills: ['Audit de code', 'Clean Architecture', 'Migration VB.NET→C#', 'Optimisation SQL', 'DevOps', 'Mentoring'],
    },
  };

  const ctx = contextData[context] || contextData.fullstack;

  return `# ${personalInfo.name.toUpperCase()}
## ${ctx.headline}

📍 Abidjan, Côte d'Ivoire  |  📧 ${personalInfo.email}  |  🔗 github.com/elvisahoua64

---

## PROFIL PROFESSIONNEL

${custom || `Développeur Full Stack & Mobile passionné avec 5 ans d'expérience. Expert en architecture logicielle (Clean Architecture, DDD, Hexagonale), j'ai évolué de développeur à Lead Tech. Spécialisé en .NET/C# et React/TypeScript, je conçois des systèmes robustes, scalables et maintenables.`}

---

## COMPÉTENCES CLÉS

${ctx.keySkills.map(s => `• ${s}`).join('  |  ')}

---

## EXPÉRIENCES PROFESSIONNELLES

${experiences.map(exp => `
**${exp.title}** — ${exp.company} | ${exp.period}
${exp.tasks.slice(0, 3).map(t => `  • ${t}`).join('\n')}
`).join('\n')}

---

## PROJETS MARQUANTS

• **CHK PMS** — Gestion hôtelière complète (hébergement → caisses) | C# .NET 8, React, PostgreSQL
• **CloudPaie** — Refonte complète du système de paie | Clean Architecture, React, TypeScript
• **Djonanko** — SaaS WhatsApp Pro PME africaines | Next.js, NestJS, Supabase
• **FinanceIA** — Gestion financière Mobile Money avec IA | React, Mistral AI, Supabase

---

## FORMATION

${education.map(e => `• ${e.degree} — ${e.institution} (${e.year})`).join('\n')}

---

## TECHNOLOGIES

Backend: C# / .NET 8 (95%) | ASP.NET Core | Entity Framework | Dapper
Frontend: React 18 (90%) | TypeScript | Next.js | Tailwind CSS
Mobile: .NET MAUI | Xamarin.Forms
DevOps: Docker | CI/CD | GitHub Actions
DB: PostgreSQL | MySQL | MSSQL
IA: Claude AI | Mistral AI | Agents autonomes

---

## LANGUES

• Français — Langue maternelle
• Anglais — Professionnel (lecture, écriture technique)

_Template: ${template} | Optimisé ATS_`;
};

export const CVGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [selectedContext, setSelectedContext] = useState('fullstack');
  const [customBio, setCustomBio] = useState('');
  const [generated, setGenerated] = useState('');
  const [generating, setGenerating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const generate = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 1200));
    const cv = buildCV(selectedContext, selectedTemplate, customBio);
    setGenerated(cv);
    setGenerating(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
  };

  const download = () => {
    const blob = new Blob([generated], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CV_AHOUA_Elvis_${selectedContext}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="cv-generator" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-5"
        style={{ background: 'radial-gradient(circle, #00FF88 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs text-[#F59E0B] mb-4 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            cv.generate()
          </div>
          <h2 className="section-title text-white">
            Générateur de <span className="gradient-text">CV Intelligent</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Générez un CV personnalisé et optimisé ATS selon le poste et la technologie cibles.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Config panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Template */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-bold text-white mb-4">1. Template</h3>
              <div className="grid grid-cols-3 gap-3">
                {templates.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 border text-center ${
                      selectedTemplate === t.id ? 'text-white' : 'text-white/40 border-transparent hover:border-white/10'
                    }`}
                    style={selectedTemplate === t.id ? { borderColor: t.color + '50', background: t.color + '15', color: t.color } : {}}
                  >
                    <div className="w-8 h-8 rounded-lg mx-auto mb-2" style={{ background: t.color + '30' }} />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Context */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-bold text-white mb-4">2. Contexte du poste</h3>
              <div className="space-y-2">
                {contexts.map(ctx => (
                  <button
                    key={ctx.id}
                    onClick={() => setSelectedContext(ctx.id)}
                    className={`w-full text-left p-3 rounded-xl text-sm transition-all duration-300 border flex items-center gap-3 ${
                      selectedContext === ctx.id
                        ? 'border-primary/40 bg-primary/10 text-white'
                        : 'border-transparent text-white/50 hover:border-white/10 hover:text-white/70'
                    }`}
                  >
                    <span className="text-lg">{ctx.icon}</span>
                    {ctx.label}
                    {selectedContext === ctx.id && (
                      <svg className="w-4 h-4 text-primary ml-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom bio */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-bold text-white mb-2">3. Bio personnalisée (optionnel)</h3>
              <p className="text-white/30 text-xs mb-3">Adaptez le résumé professionnel selon l'offre</p>
              <textarea
                value={customBio}
                onChange={e => setCustomBio(e.target.value)}
                placeholder="Ex: Fort de 5 ans d'expérience en .NET et React, je cherche à rejoindre une équipe innovante..."
                rows={3}
                className="w-full rounded-xl px-4 py-3 text-white/80 placeholder-white/20 text-sm focus:outline-none resize-none transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>

            <motion.button
              onClick={generate}
              disabled={generating}
              whileHover={!generating ? { scale: 1.02 } : {}}
              whileTap={!generating ? { scale: 0.98 } : {}}
              className="w-full btn-primary text-white py-4 text-base font-semibold flex items-center justify-center gap-3"
            >
              {generating ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </motion.div>
                  Génération en cours...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Générer mon CV
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Preview panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="glass rounded-2xl overflow-hidden h-full flex flex-col">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  <span className="ml-2 text-xs text-white/30 font-mono">CV Preview</span>
                </div>
                {generated && (
                  <div className="flex gap-2">
                    <button onClick={copyToClipboard}
                      className="glass px-3 py-1 rounded-lg text-xs text-white/60 hover:text-white transition-all flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copier
                    </button>
                    <button onClick={download}
                      className="px-3 py-1 rounded-lg text-xs text-white transition-all flex items-center gap-1"
                      style={{ background: 'rgba(108,99,255,0.3)', border: '1px solid rgba(108,99,255,0.4)' }}>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      .MD
                    </button>
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-auto p-6 scrollbar-hide">
                <AnimatePresence mode="wait">
                  {!generated ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center"
                    >
                      <div className="text-6xl mb-4">📄</div>
                      <div className="text-white/30 text-sm">
                        Configurez les paramètres et cliquez sur<br />"Générer mon CV"
                      </div>
                    </motion.div>
                  ) : (
                    <motion.pre
                      key="generated"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-white/75 text-xs font-mono leading-relaxed whitespace-pre-wrap"
                    >
                      {generated}
                    </motion.pre>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

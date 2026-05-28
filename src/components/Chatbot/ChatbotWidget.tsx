import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { chatbotKnowledge, experiences, projects } from '../../data/portfolio';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  ts: number;
}

const SUGGESTIONS = [
  'Quelles sont tes compétences en .NET ?',
  'Parle-moi de tes projets phares',
  'Quelles sont tes tarifs / disponibilités ?',
  'Tu fais du consulting ?',
  'Quelle est ta stack principale ?',
  'Comment te contacter ?',
];

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/conversations';
const AGENT_ID = 'ag_019e692c865777cd83b98a09e5a132f5';

/* ── Contexte complet d'Elvis injecté dans chaque conversation ── */
const buildElvisContext = () => `
Tu es l'assistant IA personnel d'AHOUA Elvis Ghislain. Ta seule mission est de répondre aux questions des visiteurs de son portfolio en te basant EXCLUSIVEMENT sur les informations ci-dessous.

⚠️ RÈGLES STRICTES :
- Réponds UNIQUEMENT sur Elvis Ghislain et ses informations professionnelles
- Ne parle JAMAIS de toi-même en tant qu'IA, de ton entraînement ou de tes limites
- Si une question est hors-sujet, redirige poliment vers les compétences/projets d'Elvis
- Réponds en français par défaut, en anglais si l'utilisateur écrit en anglais
- Sois concis, professionnel et enthousiaste à propos d'Elvis

═══ PROFIL ═══
Nom complet : ${chatbotKnowledge.fullName}
Titre : ${chatbotKnowledge.title}
Expérience : ${chatbotKnowledge.experience}
Localisation : ${chatbotKnowledge.location}
Disponibilité : ${chatbotKnowledge.availability}

═══ EXPERTISES TECHNIQUES ═══
${chatbotKnowledge.expertise.map(e => `• ${e}`).join('\n')}

═══ SERVICES PROPOSÉS ═══
${chatbotKnowledge.services.map(s => `• ${s}`).join('\n')}

═══ TARIFS ═══
• Freelance : ${chatbotKnowledge.rates.freelance}
• Consulting : ${chatbotKnowledge.rates.consulting}
• Formation : ${chatbotKnowledge.rates.formation}

═══ CONTACT ═══
• Email : ${chatbotKnowledge.contact.email}
• WhatsApp : ${chatbotKnowledge.contact.whatsapp}
• GitHub : ${chatbotKnowledge.contact.github}
• LinkedIn : ${chatbotKnowledge.contact.linkedin}

═══ PROJETS RÉALISÉS ═══
${projects.map(p => `• [${p.category}] ${p.title}
  Description : ${p.description}
  Impact : ${p.impact}
  Rôle : ${p.role}
  Stack : ${p.tags.join(', ')}`).join('\n\n')}

═══ EXPÉRIENCES PROFESSIONNELLES ═══
${experiences.map(e => `• ${e.period} — ${e.title} chez ${e.company} (${e.type})
  Missions : ${e.tasks.slice(0, 4).join(' | ')}`).join('\n\n')}
`.trim();

const callMistralAgent = async (history: { role: string; content: string }[]) => {
  const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;

  if (!apiKey) {
    return `Je suis l'assistant d'**Elvis Ghislain**, Lead Tech & Développeur Full Stack Senior.

**Compétences principales :**
- **.NET / C#** — Clean Architecture, DDD, Microservices (5 ans)
- **React / TypeScript** — Applications web modernes
- **Architecture hexagonale** — Systèmes robustes & scalables
- **MAUI / Xamarin** — Applications mobiles cross-platform

**Disponible** pour missions freelance depuis Abidjan 🌍

Contact : \`${chatbotKnowledge.contact.email}\` · WhatsApp : \`${chatbotKnowledge.contact.whatsapp}\``;
  }

  // Séparer le message de contexte (premier message user uniquement)
  const firstUserIdx = history.findIndex(m => m.role === 'user');
  if (firstUserIdx === -1) return 'Aucune question reçue.';

  const elvisContext = buildElvisContext();

  // Injecter le contexte dans le premier message user, garder l'historique complet
  const inputs = history.slice(firstUserIdx).map((msg, i) => {
    if (i === 0 && msg.role === 'user') {
      return {
        role: 'user' as const,
        content: `[INSTRUCTIONS SYSTÈME - NE PAS AFFICHER]\n${elvisContext}\n\n[FIN DES INSTRUCTIONS]\n\nQuestion de l'utilisateur : ${msg.content}`,
      };
    }
    return { role: msg.role as 'user' | 'assistant', content: msg.content };
  });

  const res = await fetch(MISTRAL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      agent_id: AGENT_ID,
      agent_version: 0,
      inputs,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Mistral API ${res.status}: ${errText}`);
  }

  const data = await res.json();

  // Extraire le contenu de la réponse selon la structure de l'API
  const output = data.outputs ?? data.messages ?? data.choices;
  if (Array.isArray(output) && output.length > 0) {
    const last = output[output.length - 1];
    const content = last.content ?? last.message?.content;
    if (typeof content === 'string') return content;
    // Parfois le content est un tableau (multi-modal)
    if (Array.isArray(content)) {
      return content.map((c: { text?: string }) => c.text ?? '').join('');
    }
  }

  return data.content ?? data.text ?? 'Je suis prêt à vous parler d\'Elvis Ghislain.';
};

/* ── Markdown components ── */
const mdComponents: Components = {
  p: ({ children }) => (
    <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-bold" style={{ color: 'rgb(var(--accent))' }}>{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic opacity-80">{children}</em>
  ),
  code: ({ className, children }) => {
    const isBlock = /language-(\w+)/.test(className ?? '');
    if (isBlock) {
      return (
        <code className={`block text-xs font-mono whitespace-pre-wrap ${className ?? ''}`}
          style={{ color: 'rgba(255,255,255,0.85)' }}>
          {children}
        </code>
      );
    }
    return (
      <code className="px-1.5 py-0.5 rounded text-xs font-mono"
        style={{ background: 'rgba(var(--accent),0.15)', color: 'rgb(var(--accent))' }}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-2 p-3 rounded text-xs font-mono overflow-x-auto"
      style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(var(--accent),0.15)' }}>
      {children}
    </pre>
  ),
  ul: ({ children }) => (
    <ul className="my-2 space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-2 space-y-1 list-decimal list-inside">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-2 text-sm">
      <span className="mt-1 flex-shrink-0 text-xs" style={{ color: 'rgb(var(--accent))' }}>▸</span>
      <span>{children}</span>
    </li>
  ),
  h1: ({ children }) => (
    <h1 className="font-bold text-base mb-1 mt-2">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-bold text-sm mb-1 mt-2" style={{ color: 'rgb(var(--accent))' }}>{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-semibold text-sm mb-0.5 mt-1.5">{children}</h3>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="underline underline-offset-2"
      style={{ color: 'rgb(var(--accent))' }}>
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="pl-3 my-2 italic opacity-70"
      style={{ borderLeft: '2px solid rgb(var(--accent))' }}>
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr className="my-3" style={{ borderColor: 'rgba(var(--accent),0.2)' }} />
  ),
};

export const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Bonjour ! 👋 Je suis l'assistant IA d'**Elvis Ghislain**, Lead Tech & Développeur Full Stack Senior.

Je connais toutes ses compétences, projets et disponibilités. Comment puis-je vous aider ?`,
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg: Message = { role: 'user', content: trimmed, ts: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));
      const reply = await callMistralAgent(history);
      setMessages(prev => [...prev, { role: 'assistant', content: reply, ts: Date.now() }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Désolé, une erreur s'est produite. Contactez Elvis directement : \`elvisahoua64@gmail.com\``,
        ts: Date.now(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: 'rgb(var(--accent))',
          boxShadow: '0 0 28px rgba(var(--accent),0.45)',
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}
              className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}
              className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Pulse dot */}
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-black animate-pulse"
            style={{ background: 'rgb(var(--accent))', filter: 'brightness(1.4)' }} />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[9998] w-[390px] max-w-[calc(100vw-2rem)] flex flex-col overflow-hidden"
            style={{
              background: '#0D0D0D',
              border: '1px solid rgba(var(--accent),0.22)',
              borderRadius: '12px',
              boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(var(--accent),0.08)',
              maxHeight: '80vh',
            }}
          >
            {/* Header */}
            <div className="flex-shrink-0 p-4 flex items-center gap-3 border-b"
              style={{ borderColor: 'rgba(var(--accent),0.12)', background: 'rgba(var(--accent),0.06)' }}>
              <div className="relative">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0"
                  style={{ background: 'rgb(var(--accent))' }}>
                  EG
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                  style={{ background: '#22c55e', borderColor: '#0D0D0D' }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white text-sm">Assistant Elvis</div>
                <div className="text-white/35 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} />
                  Propulsé par Mistral AI
                </div>
              </div>
              <span className="font-mono text-xs px-2 py-1 rounded"
                style={{ color: 'rgb(var(--accent))', background: 'rgba(var(--accent),0.1)', fontSize: '0.6rem', letterSpacing: '0.12em' }}>
                AI
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-4 min-h-0" style={{ maxHeight: '340px' }}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.ts}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}
                >
                  {/* AI avatar */}
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 mt-1 text-xs"
                      style={{ background: 'rgb(var(--accent))' }}>
                      AI
                    </div>
                  )}

                  {/* Bubble */}
                  <div
                    className="max-w-[82%] text-sm leading-relaxed"
                    style={msg.role === 'user' ? {
                      background: 'rgb(var(--accent))',
                      color: '#fff',
                      borderRadius: '16px 16px 4px 16px',
                      padding: '10px 14px',
                    } : {
                      background: 'rgba(255,255,255,0.05)',
                      color: 'rgba(255,255,255,0.88)',
                      borderRadius: '4px 16px 16px 16px',
                      padding: '10px 14px',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      <ReactMarkdown components={mdComponents}>
                        {msg.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Loading dots */}
              {loading && (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-xs"
                    style={{ background: 'rgb(var(--accent))' }}>
                    AI
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-sm"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="flex gap-1.5 items-center">
                      {[0, 1, 2].map(i => (
                        <motion.div key={i} className="w-1.5 h-1.5 rounded-full"
                          style={{ background: 'rgb(var(--accent))' }}
                          animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            <AnimatePresence>
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex-shrink-0 px-4 pb-3 flex flex-wrap gap-1.5">
                  {SUGGESTIONS.slice(0, 3).map((s) => (
                    <button key={s} onClick={() => send(s)}
                      className="text-xs px-3 py-1.5 rounded-lg text-white/55 hover:text-white transition-all duration-200"
                      style={{ background: 'rgba(var(--accent),0.08)', border: '1px solid rgba(var(--accent),0.18)' }}>
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="flex-shrink-0 p-3 border-t" style={{ borderColor: 'rgba(var(--accent),0.1)' }}>
              <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Posez votre question..."
                  disabled={loading}
                  className="flex-1 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(var(--accent),0.4)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || loading}
                  whileHover={input.trim() && !loading ? { scale: 1.06 } : {}}
                  whileTap={input.trim() && !loading ? { scale: 0.94 } : {}}
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-30"
                  style={{ background: 'rgb(var(--accent))' }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

import { useState, useEffect, useRef } from 'react';

interface Props {
  code: string;
  color: string;
  techName: string;
}

const tokenize = (code: string) => {
  const keywords = /\b(public|private|protected|class|interface|async|await|return|new|const|let|var|if|else|for|while|import|from|export|default|extends|implements|override|static|readonly|abstract|sealed|partial|namespace|using|void|bool|int|string|Task|List|IEnumerable|record|enum|where|select|from|join|in|on|equals|into|orderby|group|by|WITH|SELECT|FROM|WHERE|JOIN|ON|ORDER|BY|GROUP|HAVING|INDEX|CREATE|TABLE|INSERT|UPDATE|DELETE|services|version|image|environment|networks|volumes|deploy|healthcheck|run|name|jobs|steps|uses|with|needs|if)\b/g;
  const strings = /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g;
  const comments = /(\/\/.*|#.*|\/\*[\s\S]*?\*\/)/g;
  const numbers = /\b(\d+(?:\.\d+)?)\b/g;
  const decorators = /(@\w+)/g;
  const types = /\b(string|int|bool|void|Task|List|IEnumerable|Result|Employee|Leave|User|Order|Payment|Report)\b/g;

  let result = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  result = result
    .replace(comments, '<span style="color:#6A9955">$1</span>')
    .replace(strings, '<span style="color:#CE9178">$&</span>')
    .replace(decorators, '<span style="color:#DCDCAA">$1</span>')
    .replace(keywords, '<span style="color:#569CD6">$1</span>')
    .replace(types, '<span style="color:#4EC9B0">$1</span>')
    .replace(numbers, '<span style="color:#B5CEA8">$1</span>');

  return result;
};

export const CodeEditor = ({ code, color, techName }: Props) => {
  const [displayed, setDisplayed] = useState('');
  const [lineCount, setLineCount] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cursorRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed('');
    indexRef.current = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    const speed = code.length > 800 ? 8 : code.length > 400 ? 12 : 16;

    intervalRef.current = setInterval(() => {
      if (indexRef.current < code.length) {
        const chunk = Math.min(3, code.length - indexRef.current);
        indexRef.current += chunk;
        const current = code.slice(0, indexRef.current);
        setDisplayed(current);
        setLineCount(current.split('\n').length);
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, speed);

    cursorRef.current = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (cursorRef.current) clearInterval(cursorRef.current);
    };
  }, [code]);

  const lines = displayed.split('\n');
  const totalExpected = code.split('\n').length;

  return (
    <div className="rounded-xl overflow-hidden border border-white/8 shadow-2xl" style={{ background: '#1E1E1E' }}>
      {/* VS Code title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5" style={{ background: '#323233' }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="glass px-6 py-1 rounded text-xs font-mono text-white/40 flex items-center gap-2">
            <span style={{ color }}>●</span>
            {techName === 'C# / .NET' && 'EmployeeController.cs'}
            {techName === 'React / TypeScript' && 'Dashboard.tsx'}
            {techName === 'SQL / PostgreSQL' && 'payroll_report.sql'}
            {techName === 'Docker / DevOps' && 'docker-compose.yml'}
            {techName === 'Next.js / Node.js' && 'page.tsx'}
            {techName === 'IA / Automatisation' && 'orientation-agent.ts'}
            {techName === 'MAUI / Xamarin' && 'LeaveRequestPage.xaml.cs'}
            {techName === 'Git / CI-CD' && 'deploy.yml'}
          </div>
        </div>
        <div className="text-xs font-mono text-white/20">
          {displayed.length}/{code.length}
        </div>
      </div>

      {/* Editor body */}
      <div className="flex" style={{ minHeight: '280px', maxHeight: '340px', overflow: 'hidden' }}>
        {/* Line numbers */}
        <div className="flex-shrink-0 select-none px-3 py-4 text-right font-mono text-xs leading-5"
          style={{ background: '#1E1E1E', color: '#495057', minWidth: '3rem', userSelect: 'none' }}>
          {Array.from({ length: Math.max(lineCount, 1) }, (_, i) => (
            <div key={i} style={{ height: '20px', lineHeight: '20px' }}>{i + 1}</div>
          ))}
          {Array.from({ length: Math.max(0, totalExpected - lineCount) }, (_, i) => (
            <div key={`ghost-${i}`} style={{ height: '20px' }} />
          ))}
        </div>

        {/* Code area */}
        <div className="flex-1 overflow-auto scrollbar-hide py-4 px-2 font-mono text-xs leading-5"
          style={{ color: '#D4D4D4' }}>
          <pre className="whitespace-pre-wrap break-all" style={{ margin: 0 }}>
            {lines.map((line, i) => (
              <div key={i} style={{ height: '20px', lineHeight: '20px' }}>
                <span dangerouslySetInnerHTML={{ __html: tokenize(line) }} />
                {i === lines.length - 1 && indexRef.current < code.length && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: '2px',
                      height: '14px',
                      background: cursorVisible ? '#AEAFAD' : 'transparent',
                      verticalAlign: 'middle',
                      marginLeft: '1px',
                    }}
                  />
                )}
              </div>
            ))}
          </pre>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-1.5 text-xs font-mono border-t border-white/5"
        style={{ background: color + '22', color: color }}>
        <span>⬡ {techName}</span>
        <span>Ln {lineCount}, Col {lines[lines.length - 1]?.length || 0}</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
};

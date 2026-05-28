/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        surface: {
          100: '#0A0A0A',
          200: '#111111',
          300: '#1A1A1A',
          400: '#222222',
          500: '#2A2A2A',
        },
        // Minimal accents — just whites with opacity
        muted: 'rgba(255,255,255,0.5)',
        subtle: 'rgba(255,255,255,0.08)',
        accent: '#F04500',   /* vivid orange — from reference image */
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'slide-up': 'slideUp 0.8s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(40px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      boxShadow: {
        'glow-white': '0 0 40px rgba(255,255,255,0.08)',
        'card': '0 4px 40px rgba(0,0,0,0.8)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.9)',
      },
    },
  },
  plugins: [],
};

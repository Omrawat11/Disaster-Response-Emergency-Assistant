/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#06080f',
        surface: '#0e1018',
        ember: '#C8410A',
        crimson: '#7A0F0F',
        gold: '#D4A853',
        ash: '#E8E0D5',
        smoke: '#5C5650',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        hero: 'clamp(2rem, 6vw, 7rem)',
      },
      backdropBlur: {
        glass: '20px',
      },
      animation: {
        'pulse-ember': 'pulseEmber 2s ease-in-out infinite',
        'scan-line': 'scanLine 1.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'ticker': 'ticker 30s linear infinite',
      },
      keyframes: {
        pulseEmber: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(200,65,10,0)' },
          '50%': { boxShadow: '0 0 20px 4px rgba(200,65,10,0.3)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

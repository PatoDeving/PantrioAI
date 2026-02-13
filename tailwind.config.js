/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette - blue accent from logo (#3366FF)
        'codex-bg': '#0a0a0a',
        'codex-surface': '#141414',
        'codex-card': '#1c1c1c',
        'codex-border': '#2a2a2a',
        'codex-border-light': 'rgba(255, 255, 255, 0.06)',
        'codex-green': '#3366FF',
        'codex-green-light': '#5C8AFF',
        'codex-green-dark': '#1A4FE0',
        'codex-green-subtle': 'rgba(51, 102, 255, 0.1)',
        'codex-text': '#e2e8f0',
        'codex-text-muted': '#94a3b8',
        'codex-text-dim': '#64748b',

        // Legacy aliases
        'primary': '#3366FF',
        'primary-dark': '#1A4FE0',
        'primary-light': '#5C8AFF',
        'accent-1': '#5C8AFF',
        'accent-2': '#85A8FF',
        'accent-3': '#ADC5FF',
        'dark-bg': '#0a0a0a',
        'dark-card': '#1c1c1c',
        'surface': '#141414',
        'card': '#1c1c1c',
        'border': '#2a2a2a',
        'neon-blue': '#3366FF',
        'neon-purple': '#1A4FE0',
        'text-primary': '#e2e8f0',
        'text-secondary': '#94a3b8',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.3)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.3)',
        'green-sm': '0 0 8px rgba(51, 102, 255, 0.15)',
        'green': '0 0 16px rgba(51, 102, 255, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

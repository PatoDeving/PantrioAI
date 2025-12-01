/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // New Brand Colors
        'primary': '#3366FF',
        'primary-dark': '#1B3FBF',
        'primary-light': '#5C8CFF',
        'accent-1': '#33CCFF',
        'accent-2': '#7A33FF',
        'accent-3': '#33FFE0',
        'bg-dark': '#0A0A0F',
        'surface': '#10121A',
        'card': '#181B26',
        'border': '#1F2433',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A5AEC1',

        // Legacy aliases for backward compatibility
        'neon-blue': '#3366FF',
        'neon-purple': '#7A33FF',
        'dark-bg': '#0A0A0F',
        'dark-card': '#181B26',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': {
            boxShadow: '0 0 20px rgba(51, 102, 255, 0.5), 0 0 40px rgba(51, 102, 255, 0.3)',
          },
          '100%': {
            boxShadow: '0 0 30px rgba(51, 102, 255, 0.8), 0 0 60px rgba(51, 102, 255, 0.5)',
          },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(51, 102, 255, 0.5)',
        'glow': '0 0 20px rgba(51, 102, 255, 0.6)',
        'glow-lg': '0 0 30px rgba(51, 102, 255, 0.8)',
        'glow-accent': '0 0 20px rgba(51, 204, 255, 0.6)',
      },
    },
  },
  plugins: [],
}

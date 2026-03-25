/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#f3ecdd',
        paper: '#f8f2e6',
        moon: '#3b3225',
        haze: '#8c7b60',
        gold: '#b88d37',
        crimson: '#7b5345',
        panel: '#fffaf1'
      },
      fontFamily: {
        serifCn: ['"Noto Serif SC"', '"Songti SC"', 'serif'],
        sansCn: ['"Noto Sans SC"', '"PingFang SC"', 'sans-serif']
      },
      boxShadow: {
        moon: '0 0 36px rgba(184,141,55,0.28)'
      }
    }
  },
  plugins: []
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#f9bf45',
        paper: '#f9bf45',
        moon: '#4e3307',
        haze: '#a97522',
        gold: '#f6e1a3',
        crimson: '#9b3149',
        panel: '#f7c860'
      },
      fontFamily: {
        serifCn: ['"Noto Serif SC"', '"Songti SC"', 'serif'],
        sansCn: ['"Noto Sans SC"', '"PingFang SC"', 'sans-serif']
      },
      boxShadow: {
        moon: '0 0 36px rgba(250, 231, 181, 0.45)'
      }
    }
  },
  plugins: []
};

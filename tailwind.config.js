/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0d12',
        moon: '#e8edf7',
        haze: '#8f9bb5',
        gold: '#9e8450',
        crimson: '#672a34',
        panel: '#111724'
      },
      fontFamily: {
        serifCn: ['"Noto Serif SC"', '"Songti SC"', 'serif'],
        sansCn: ['"Noto Sans SC"', '"PingFang SC"', 'sans-serif']
      },
      boxShadow: {
        moon: '0 0 40px rgba(158,132,80,0.2)'
      }
    }
  },
  plugins: []
};

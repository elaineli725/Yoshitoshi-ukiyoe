/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#f3be49',
        paper: '#f7cb62',
        moon: '#5b3d0c',
        haze: '#b88329',
        gold: '#f7e8b7',
        crimson: '#9b3149',
        panel: '#fad57d'
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

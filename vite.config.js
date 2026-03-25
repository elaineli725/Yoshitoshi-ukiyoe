import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages project path for this repository.
export default defineConfig({
  plugins: [react()],
  base: '/Yoshitoshi-ukiyoe/'
});

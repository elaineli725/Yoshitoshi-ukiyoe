import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages project site path, e.g. https://<user>.github.io/Yoshitoshi-ukiyoe/
export default defineConfig({
  plugins: [react()],
  base: '/Yoshitoshi-ukiyoe/'
});

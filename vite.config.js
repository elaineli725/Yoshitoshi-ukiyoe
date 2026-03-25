import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use relative asset paths so the same build works on GitHub Pages
// project sites, user sites, or custom domains.
export default defineConfig({
  plugins: [react()],
  base: './'
});

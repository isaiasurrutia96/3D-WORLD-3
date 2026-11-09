import { defineConfig } from 'vite';

export default defineConfig({ base: './',build:{rollupOptions:{input:{game:'index.html',backflip:'backflip.html',wallContact:'wall-contact-preview.html'}}} });

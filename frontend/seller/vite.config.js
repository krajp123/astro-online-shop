// Vite config for the seller dashboard app.
// Serves the seller workspace and runs on port 5174 in local development.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: '0.0.0.0'
  },
  preview: {
    port: 4174,
    host: '0.0.0.0'
  }
});

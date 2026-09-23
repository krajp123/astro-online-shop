// Vite config for the admin control panel app.
// Serves the admin dashboard and runs on port 5175 in local development.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    host: '0.0.0.0'
  },
  preview: {
    port: 4175,
    host: '0.0.0.0'
  }
});

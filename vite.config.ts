import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/get-report-test-task/',
  plugins: [react()],
});

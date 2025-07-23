import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import history from 'connect-history-api-fallback';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // or '0.0.0.0'
    port: 5173,
    middlewareMode: 'html',
    setupMiddlewares(middlewares) {
      middlewares.use(
        history({
          index: '/index.html'
        })
      );
      return middlewares;
    }
  }
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // The port your frontend runs on
    port: 5173,
    proxy: {
      // This rule intercepts all requests that start with /auth
      // It now forwards the full path, e.g., /auth/signup
      '/auth': {
        // This is the target URL of your backend server
        target: 'http://localhost:3000',
        // This is important for virtual hosted sites
        changeOrigin: true,
        // The rewrite rule has been removed!
        // This allows the full path to be forwarded to your backend.
        secure: false,
      },
      // This rule intercepts all requests that start with /tasks
      // It now forwards the full path, e.g., /tasks/get-all
      '/tasks': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        // The rewrite rule has been removed!
      },
    },
    // This is useful for single-page applications for direct URL access
    historyApiFallback: true
  }
})

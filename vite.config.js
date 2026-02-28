import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
=======
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
})

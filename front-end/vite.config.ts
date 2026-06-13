import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  //we add this so that when vopn is connected we can reload the host ----> now the server is on http://127.0.0.1:5173/      when we remove that the server will be on http://localhost:5173/
  server: {
    host: '127.0.0.1',
    port: 5173,
  }
})

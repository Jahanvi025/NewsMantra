import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy: {
      "/api": {
        target: "https://newsmantra.onrender.com",
        changeOrigin: true,
        secure: false,
      },
      "/auth": {
        target: "https://newsmantra.onrender.com",
        changeOrigin: true,
        secure: false,
      },
      "/notes": {
        target: "https://newsmantra.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react(), tailwindcss()],
})

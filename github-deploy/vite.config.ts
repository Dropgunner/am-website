import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  base: "/",  // This ensures the site works with both GitHub Pages and custom domains
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  base: "/am-website/",  // Updated for GitHub Pages deployment at /am-website/ subdirectory
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

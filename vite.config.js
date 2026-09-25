import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("react-router-dom")) return "react";
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("socket.io-client")) return "socket";
        },
      },
    },
  },
  resolve: {
    alias: {
      react: resolve(process.cwd(), "node_modules/react"),
      "react-dom": resolve(process.cwd(), "node_modules/react-dom"),
    },
  },
});

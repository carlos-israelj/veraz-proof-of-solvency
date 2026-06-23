import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // bb.js / noir_js usan WASM y top-level await; estas opciones ayudan al bundle.
  optimizeDeps: { esbuildOptions: { target: "esnext" } },
  build: { target: "esnext" },
});

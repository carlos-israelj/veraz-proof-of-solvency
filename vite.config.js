import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // bb.js / noir_js usan WASM y top-level await; estas opciones ayudan al bundle.
  optimizeDeps: {
    esbuildOptions: { target: "esnext" },
    exclude: ['@noir-lang/noir_js', '@aztec/bb.js']
  },
  build: { target: "esnext" },
  // Configuración para servir archivos WASM correctamente
  assetsInclude: ['**/*.wasm'],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// El problema: @noir-lang/noir_js está en optimizeDeps.exclude, por lo que
// Vite lo sirve como ESM nativo desde node_modules. Cuando su código
// ejecuta `import { pino } from 'pino/browser'`, el BROWSER hace una petición
// HTTP directa a /node_modules/pino/browser.js — saltándose los plugins Rollup.
//
// Solución: interceptar la petición HTTP con un middleware del servidor de Vite
// Y también usar resolveId/load para el build de producción.

const PINO_STUB_CODE = `
const noop = () => {};
const logger = {
  trace: noop, debug: noop, info: noop,
  warn: noop, error: noop, fatal: noop,
  silent: noop, child: () => logger, level: "silent",
};
export const pino = () => logger;
export default pino;
`;

function pinoBrowserStub() {
  const VIRTUAL_ID = "\0pino-browser-stub";

  return {
    name: "pino-browser-stub",

    // Para el BUILD de producción: interceptar en el grafo de módulos
    resolveId(id) {
      if (id === "pino/browser" || id.endsWith("/pino/browser.js")) {
        return VIRTUAL_ID;
      }
    },
    load(id) {
      if (id === VIRTUAL_ID) return PINO_STUB_CODE;
    },

    // Para el DEV server: interceptar la petición HTTP antes de que Vite
    // sirva el archivo real de node_modules
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.includes("pino/browser")) {
          res.setHeader("Content-Type", "application/javascript; charset=utf-8");
          res.setHeader("Cache-Control", "no-cache");
          res.end(PINO_STUB_CODE);
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  base: './', // Use relative paths for GitHub Pages
  plugins: [wasm(), topLevelAwait(), pinoBrowserStub(), react()],
  define: {
    // Algunas libs de Node.js usan `global` en lugar de `globalThis`
    global: "globalThis",
  },
  resolve: {
    alias: {
      // Resolver `buffer` al paquete browser-compatible (ya instalado como dep transitiva)
      buffer: "buffer/",
    },
    // CRITICAL FIX: Completely override browser condition to avoid UMD bundle
    // Remove 'browser' from default conditions to force 'default' export (ES6 modules)
    conditions: ['default', 'module', 'import'],
    mainFields: ['module', 'main'],
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
      define: { global: "globalThis" },
    },
    exclude: [
      "@noir-lang/noir_js",
      "@noir-lang/acvm_js",
      "@aztec/bb.js",
      "@stellar/stellar-sdk", // CRITICAL: Exclude to avoid UMD bundle pre-processing
    ],
    include: ["buffer"],
  },
  build: { target: "esnext" },
  assetsInclude: ["**/*.wasm"],
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "credentialless",
      "Cross-Origin-Resource-Policy": "cross-origin",
    },
    proxy: {
      // Proxy wallet icons to avoid CORS issues
      '/wallet-icon-proxy': {
        target: 'https://stellar.creit.tech',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wallet-icon-proxy/, '/wallet-icons'),
      },
    },
  },
});

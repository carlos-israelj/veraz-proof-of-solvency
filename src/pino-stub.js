// pino-stub.js
// Stub para pino/browser — noir_js importa pino como logger pero en el
// navegador no lo necesitamos. Exportamos un no-op que satisface la API.

const noop = () => {};

const logger = {
  trace: noop,
  debug: noop,
  info:  noop,
  warn:  noop,
  error: noop,
  fatal: noop,
  silent: noop,
  child: () => logger,
  level: "silent",
};

// noir_js importa `pino` como named export: import { pino } from 'pino/browser'
export const pino = () => logger;

// También como default
export default pino;

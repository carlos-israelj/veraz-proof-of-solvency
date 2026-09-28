/**
 * Request Logging Middleware
 */

/**
 * Log incoming requests
 */
export function requestLogger(req, res, next) {
  const start = Date.now();

  // Log request
  console.log(`→ ${req.method} ${req.path}`);

  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const emoji = status < 400 ? '✅' : '❌';

    console.log(`${emoji} ${req.method} ${req.path} - ${status} (${duration}ms)`);
  });

  next();
}

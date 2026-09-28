/**
 * Error Handling Middleware
 */

/**
 * Global error handler
 */
export function errorHandler(err, req, res, next) {
  // Log error
  console.error('❌ Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method
  });

  // Determine status code
  const statusCode = err.statusCode || err.status || 500;

  // Format error response
  const response = {
    error: {
      code: err.code || 'internal_error',
      message: err.message || 'An unexpected error occurred',
      details: err.details || {},
      request_id: req.id || `req_${Date.now()}`,
      timestamp: new Date().toISOString()
    }
  };

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.error.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

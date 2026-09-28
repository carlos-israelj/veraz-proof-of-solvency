/**
 * Response Formatting Utilities
 */

/**
 * Format success response
 */
export function formatResponse(data) {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString()
  };
}

/**
 * Format error response
 */
export function formatError({ code, message, details = {} }) {
  return {
    error: {
      code,
      message,
      details,
      timestamp: new Date().toISOString()
    }
  };
}

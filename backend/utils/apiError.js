// API error helper.
// Standardizes errors returned by the shared backend across all apps.
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

export default ApiError;

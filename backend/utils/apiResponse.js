// API response helper.
// Standardizes success payloads returned by controllers and services.
export const apiResponse = (res, statusCode, data, message = 'Success') => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

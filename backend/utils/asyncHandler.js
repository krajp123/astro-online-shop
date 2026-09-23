// Async handler wrapper.
// Simplifies controller error handling by catching promise rejections automatically.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;

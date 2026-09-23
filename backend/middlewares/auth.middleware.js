// Authentication middleware placeholder.
// Validates JWT access tokens for customer, seller, and admin requests.
export const authMiddleware = (req, res, next) => {
  // TODO: verify bearer token and attach user payload
  next();
};

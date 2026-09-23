// Role-based authorization middleware placeholder.
// Restricts routes based on CUSTOMER, SELLER, or ADMIN roles.
export const requireRole = (allowedRoles = []) => (req, res, next) => {
  // TODO: read role from decoded JWT and validate authorization
  next();
};

// Role-based authorization middleware placeholder.
// Restricts routes based on CUSTOMER or ADMIN roles.
export const requireRole = (allowedRoles = []) => (req, res, next) => {
  // TODO: read role from decoded JWT and validate authorization
  next();
};

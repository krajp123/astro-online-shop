// Route configuration for the customer app.
// Contains the role-specific route map and protected route definitions.
export const customerRoutes = [
  { path: '/', name: 'Home' },
  { path: '/products', name: 'Products' },
  { path: '/cart', name: 'Cart' },
  { path: '/orders', name: 'Orders' }
];

export const ProtectedRoute = () => {
  // Placeholder for customer auth guard and role-based access checks.
  return null;
};

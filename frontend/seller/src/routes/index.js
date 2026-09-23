// Route configuration for the seller app.
// Contains seller dashboards, product routes, and protected access logic.
export const sellerRoutes = [
  { path: '/', name: 'Dashboard' },
  { path: '/products', name: 'Products' },
  { path: '/orders', name: 'Orders' },
  { path: '/payouts', name: 'Payouts' }
];

export const ProtectedRoute = () => {
  // Placeholder for seller auth guard and role-based access checks.
  return null;
};

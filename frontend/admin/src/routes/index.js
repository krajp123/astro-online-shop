// Route configuration for the admin app.
// Contains protected owner-admin routes, management screens, and role enforcement.
export const adminRoutes = [
  { path: '/', name: 'Overview' },
  { path: '/products', name: 'Products' },
  { path: '/users', name: 'Users' },
  { path: '/orders', name: 'Orders' }
];

export const ProtectedRoute = () => {
  // Placeholder for admin auth guard and role-based access checks.
  return null;
};

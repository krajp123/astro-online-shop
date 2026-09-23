// Route configuration for the admin app.
// Contains protected admin routes, management screens, and role enforcement.
export const adminRoutes = [
  { path: '/', name: 'Overview' },
  { path: '/users', name: 'Users' },
  { path: '/sellers', name: 'Sellers' },
  { path: '/orders', name: 'Orders' }
];

export const ProtectedRoute = () => {
  // Placeholder for admin auth guard and role-based access checks.
  return null;
};

// Shared formatting helpers for the admin app.
// These utilities will centralize dashboard metrics, currency display, and dates.

export const formatCurrency = (value = 0) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

export const formatDate = (value) => {
  if (!value) return '—';
  return new Date(value).toLocaleDateString();
};

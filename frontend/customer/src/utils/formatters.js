// Shared formatting helpers for the customer app.
// These utilities will centralize price formatting, dates, and other app display helpers.

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

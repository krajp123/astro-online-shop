// Shared health controller.
// Used to verify backend uptime and basic service health across all apps.
export const healthCheck = async (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'ecommerce-backend',
    timestamp: new Date().toISOString()
  });
};

// Axios API client for the seller app.
// This service will hit the shared backend with seller-specific routes.
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 15000
});

export default api;

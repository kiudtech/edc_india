// Base URL for all API calls
// In development: Vite proxy handles /api → localhost:5000
// In production: Set VITE_API_URL in Render environment variables to your backend Render URL
export const API_BASE = import.meta.env.VITE_API_URL || ''

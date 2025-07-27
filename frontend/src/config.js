// Configuration file for API endpoints
// Change this to switch between local and production environments

const config = {
  // Production environment (Render deployment)
  production: {
    API_BASE_URL: 'https://gradnext-assessment.onrender.com/api',
    FRONTEND_URL: 'https://your-frontend-domain.com' // Update this when you deploy frontend
  },
  
  // Development environment (localhost)
  development: {
    API_BASE_URL: 'http://localhost:5000/api',
    FRONTEND_URL: 'http://localhost:5173'
  }
};

// Environment detection
const isProduction = import.meta.env.PROD || window.location.hostname !== 'localhost';

// Export the appropriate configuration
export const API_BASE_URL = isProduction 
  ? config.production.API_BASE_URL 
  : config.development.API_BASE_URL;

export const FRONTEND_URL = isProduction 
  ? config.production.FRONTEND_URL 
  : config.development.FRONTEND_URL;

// For manual override (uncomment the line you want to use)
// export const API_BASE_URL = 'https://gradnext-assessment.onrender.com/api'; // Production
// export const API_BASE_URL = 'http://localhost:5000/api'; // Development

console.log(`🌍 Environment: ${isProduction ? 'Production' : 'Development'}`);
console.log(`🔗 API Base URL: ${API_BASE_URL}`);

export default {
  API_BASE_URL,
  FRONTEND_URL,
  isProduction
}; 
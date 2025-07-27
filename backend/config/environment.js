// Backend environment configuration
// This file helps manage different environments (development, production)

const environments = {
  development: {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/cohort_enrollment',
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    NODE_ENV: 'development',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
    CORS_ORIGIN: process.env.FRONTEND_URL || 'http://localhost:5173'
  },
  
  production: {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    NODE_ENV: 'production',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://your-frontend-domain.com',
    CORS_ORIGIN: process.env.FRONTEND_URL || 'https://your-frontend-domain.com'
  }
};

// Determine current environment
const currentEnv = process.env.NODE_ENV || 'development';
const config = environments[currentEnv];

console.log(`🌍 Backend Environment: ${currentEnv}`);
console.log(`🔗 CORS Origin: ${config.CORS_ORIGIN}`);

module.exports = config; 
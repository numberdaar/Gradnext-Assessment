#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 Environment Switcher for Cohort Enrollment System');
console.log('==================================================\n');

const configPath = path.join(__dirname, 'frontend', 'src', 'config.js');

if (!fs.existsSync(configPath)) {
  console.log('❌ Config file not found!');
  process.exit(1);
}

const args = process.argv.slice(2);
const environment = args[0] || 'auto';

console.log(`🎯 Switching to: ${environment.toUpperCase()} environment\n`);

let configContent = fs.readFileSync(configPath, 'utf8');

if (environment === 'production' || environment === 'prod') {
  // Force production
  configContent = configContent.replace(
    /export const API_BASE_URL = isProduction[\s\S]*?config\.development\.API_BASE_URL;/,
    'export const API_BASE_URL = config.production.API_BASE_URL;'
  );
  console.log('✅ Switched to PRODUCTION (Render deployment)');
  console.log('🔗 API URL: https://gradnext-assessment.onrender.com/api');
} else if (environment === 'development' || environment === 'dev') {
  // Force development
  configContent = configContent.replace(
    /export const API_BASE_URL = isProduction[\s\S]*?config\.development\.API_BASE_URL;/,
    'export const API_BASE_URL = config.development.API_BASE_URL;'
  );
  console.log('✅ Switched to DEVELOPMENT (localhost)');
  console.log('🔗 API URL: http://localhost:5000/api');
} else if (environment === 'auto') {
  // Restore auto-detection
  configContent = `// Configuration file for API endpoints
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

console.log(\`🌍 Environment: \${isProduction ? 'Production' : 'Development'}\`);
console.log(\`🔗 API Base URL: \${API_BASE_URL}\`);

export default {
  API_BASE_URL,
  FRONTEND_URL,
  isProduction
};`;
  console.log('✅ Switched to AUTO-DETECTION');
  console.log('🔍 Will automatically detect environment based on hostname');
} else {
  console.log('❌ Invalid environment! Use: production, development, or auto');
  console.log('\nUsage:');
  console.log('  node switch-env.js production  # Force production');
  console.log('  node switch-env.js development # Force development');
  console.log('  node switch-env.js auto        # Auto-detect (default)');
  process.exit(1);
}

fs.writeFileSync(configPath, configContent);

console.log('\n📝 Config file updated successfully!');
console.log('🔄 Restart your frontend development server to apply changes.');
console.log('\n💡 Tip: You can also manually edit frontend/src/config.js'); 
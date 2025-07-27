#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🎓 Cohort Enrollment Automation System - Setup Script');
console.log('==================================================\n');

// Check if .env file exists
const envPath = path.join(__dirname, 'backend', '.env');
const envExamplePath = path.join(__dirname, 'backend', 'env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file from template...');
  
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created successfully!');
    console.log('⚠️  Please edit backend/.env with your actual configuration values.');
  } else {
    console.log('❌ env.example file not found. Please create it manually.');
  }
} else {
  console.log('✅ .env file already exists.');
}

console.log('\n📋 Next Steps:');
console.log('1. Edit backend/.env with your MongoDB and email credentials');
console.log('2. Run: cd backend && npm install');
console.log('3. Run: cd frontend && npm install');
console.log('4. Start backend: cd backend && npm start');
console.log('5. Start frontend: cd frontend && npm run dev');
console.log('\n📚 For detailed setup instructions, see SETUP.md');
console.log('📖 For API documentation, see API_DOCUMENTATION.md');

console.log('\n🎉 Setup script completed!'); 
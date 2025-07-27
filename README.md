# 🎓 Cohort Enrollment Automation System

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-18+-blue?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Express](https://img.shields.io/badge/Express.js-4.18+-black?style=for-the-badge&logo=express)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**A comprehensive email automation system for cohort enrollment with intelligent follow-up workflows**

[🚀 Quick Start](#-quick-start) • [📋 Features](#-features) • [🏗️ Architecture](#️-architecture) • [⚙️ Setup](#️-setup) • [📚 Documentation](#-documentation)

</div>

---

## 🎯 Project Overview

This system automates the entire cohort enrollment process for **gradnext's Consulting Cohort 101 program**. It handles form submissions, sends personalized emails, tracks user interactions, and intelligently manages follow-up sequences based on user behavior.

### ✨ What Makes This Special

- 🤖 **Intelligent Automation**: Smart email sequences based on user interactions
- 📊 **Real-time Dashboard**: Live monitoring of enrollment progress
- 🎨 **Beautiful UI**: Modern, responsive design with great UX
- 📧 **Professional Emails**: Beautiful HTML emails using Mailgen
- ⚡ **Scalable Architecture**: Built with modern MERN stack

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Gmail account for email sending

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd cohort-enrollment-system

# Run setup script
node setup.js

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Configuration

1. **Set up MongoDB Atlas**
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Get your connection string

2. **Configure Gmail**
   - Enable 2-factor authentication
   - Generate an App Password

3. **Edit Environment Variables**
   ```bash
   # Edit backend/.env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cohort_enrollment
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ```

### Running the Application

```bash
# Terminal 1: Start Backend
cd backend
npm start

# Terminal 2: Start Frontend
cd frontend
npm run dev
```

**Access the application:**
- 🌐 **Frontend**: http://localhost:5173
- 📊 **Admin Dashboard**: http://localhost:5173/dashboard
- 🔌 **API**: http://localhost:5000

### 🌍 Environment Configuration

The system automatically detects your environment and uses the appropriate API endpoints:

- **Development**: Uses `http://localhost:5000/api`
- **Production**: Uses `https://gradnext-assessment.onrender.com/api`

**Manual Environment Switching:**
```bash
# Switch to production (Render deployment)
node switch-env.js production

# Switch to development (localhost)
node switch-env.js development

# Auto-detect environment (default)
node switch-env.js auto
```

---

## 📋 Features

### 🎯 Core Functionality

| Feature | Description | Status |
|---------|-------------|--------|
| **Interest Form** | Collect user information with validation | ✅ Complete |
| **Email Automation** | Send personalized confirmation emails | ✅ Complete |
| **Interaction Tracking** | Monitor email opens, clicks, and payments | ✅ Complete |
| **Smart Follow-ups** | Intelligent reminder sequences | ✅ Complete |
| **Admin Dashboard** | Real-time user management and analytics | ✅ Complete |
| **Cron Automation** | Scheduled email workflows | ✅ Complete |

### 📧 Email Workflow

```mermaid
graph TD
    A[Form Submission] --> B[Send Confirmation Email]
    B --> C{Email Opened?}
    C -->|No| D[Wait 2 Days]
    D --> E[Send Reminder 1]
    C -->|Yes| F{Link Clicked?}
    F -->|No| G[Wait 3 Days]
    G --> H[Send Reminder 2]
    F -->|Yes| I{Payment Made?}
    I -->|No| J[Wait 2 Days]
    J --> K[Send Final Reminder]
    I -->|Yes| L[Stop Communication]
    E --> M{Still No Action?}
    M -->|Yes| E
    M -->|No| F
    H --> N{Still No Click?}
    N -->|Yes| H
    N -->|No| I
    K --> O{Still No Payment?}
    O -->|Yes| P[Stop Communication]
    O -->|No| L
```

### 🎨 User Interface

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Works on all devices
- **Real-time Updates**: Live data without page refresh
- **Interactive Elements**: Smooth animations and transitions

---

## 🏗️ Architecture

### Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React + Vite | Modern UI with fast development |
| **Backend** | Express.js | RESTful API server |
| **Database** | MongoDB Atlas | Cloud-hosted NoSQL database |
| **Email** | Nodemailer + Mailgen | Professional HTML emails |
| **Scheduler** | node-cron | Automated email workflows |
| **Styling** | CSS3 | Modern, responsive design |

</div>

### Project Structure

```
cohort-enrollment-system/
├── 📁 backend/
│   ├── 📁 models/
│   │   └── User.js              # MongoDB schema
│   ├── 📁 routes/
│   │   ├── form.js              # Form endpoints
│   │   └── email.js             # Email endpoints
│   ├── 📁 utils/
│   │   ├── emailService.js      # Email templates & sending
│   │   ├── cronService.js       # Automation logic
│   │   └── testData.js          # Test data generation
│   ├── package.json
│   └── server.js                # Main server
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── Form.jsx         # Interest form
│   │   │   └── Dashboard.jsx    # Admin dashboard
│   │   ├── App.jsx              # Main app
│   │   └── main.jsx             # Entry point
│   ├── package.json
│   └── index.html
├── 📄 README.md                 # This file
├── 📄 SETUP.md                  # Detailed setup guide
├── 📄 API_DOCUMENTATION.md      # Complete API reference
└── 📄 .gitignore               # Git ignore rules
```

---

## ⚙️ Setup

### Detailed Setup Guide

For comprehensive setup instructions, see [SETUP.md](./SETUP.md)

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB Atlas connection string | ✅ Yes |
| `EMAIL_USER` | Gmail address for sending emails | ✅ Yes |
| `EMAIL_PASS` | Gmail app password | ✅ Yes |
| `PORT` | Backend server port | ❌ No (default: 5000) |
| `NODE_ENV` | Environment (development/production) | ❌ No |
| `FRONTEND_URL` | Frontend URL for CORS | ❌ No |

### Testing

```bash
# Test form submission
curl -X POST http://localhost:5000/api/form/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"+1234567890"}'

# Test API health
curl http://localhost:5000/api/health

# Get email statistics
curl http://localhost:5000/api/email/stats
```

---

## 📚 Documentation

### 📖 Available Documentation

| Document | Description |
|----------|-------------|
| [📄 SETUP.md](./SETUP.md) | Detailed setup and configuration guide |
| [📄 API_DOCUMENTATION.md](./API_DOCUMENTATION.md) | Complete API reference with examples |
| [📄 README.md](./README.md) | Project overview and quick start |

### 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/form/submit` | Submit interest form |
| `GET` | `/api/form/users` | Get all users |
| `PATCH` | `/api/form/users/:id/status` | Update user status |
| `POST` | `/api/email/trigger-automation` | Trigger email automation |
| `GET` | `/api/email/stats` | Get email statistics |

---

## 🎯 Use Cases

### For Students
- Submit interest in Consulting Cohort 101
- Receive personalized confirmation emails
- Get timely reminders and updates
- Complete enrollment process

### For Administrators
- Monitor enrollment progress in real-time
- Track email engagement metrics
- Manage user interactions manually
- View comprehensive analytics

### For Developers
- Extensible architecture for custom workflows
- Well-documented API for integrations
- Modular codebase for easy maintenance
- Comprehensive testing capabilities

---

## 🚀 Deployment

### Recommended Platforms

| Platform | Type | Best For |
|----------|------|----------|
| **Render** | Backend | Free tier, easy deployment |
| **Railway** | Backend | Fast setup, good free tier |
| **Vercel** | Frontend | React optimization |
| **Netlify** | Frontend | Static site hosting |
| **MongoDB Atlas** | Database | Cloud database (already configured) |

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure production MongoDB URI
- [ ] Set up production email credentials
- [ ] Update CORS settings for production domain
- [ ] Change cron schedule to daily (`0 0 * * *`)
- [ ] Set up monitoring and logging

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

### Getting Help

- 📖 **Documentation**: Check the docs in this repository
- 🐛 **Issues**: Report bugs via GitHub Issues
- 💬 **Questions**: Open a discussion for general questions

### Common Issues

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Check connection string and network access |
| Email not sending | Verify Gmail app password and 2FA settings |
| CORS errors | Ensure FRONTEND_URL is set correctly |
| Port already in use | Change PORT in .env or kill existing process |

---

<div align="center">

**Built with ❤️ for gradnext**

[⬆️ Back to Top](#-cohort-enrollment-automation-system)

</div>
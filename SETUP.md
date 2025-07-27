# Setup Guide - Cohort Enrollment Automation System

## 🚀 Quick Start

This guide will help you set up the complete cohort enrollment automation system with email workflows and admin dashboard.

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB Atlas** account (free tier available)
- **Gmail account** for sending emails
- **Git** (optional, for version control)

## 🔧 Step 1: Database Setup

### MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user with read/write permissions
5. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/database`)

## 📧 Step 2: Email Configuration

### Gmail App Password Setup
1. Go to your Google Account settings
2. Enable 2-factor authentication
3. Generate an App Password:
   - Go to Security → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Cohort Enrollment System"
   - Copy the generated password

## ⚙️ Step 3: Backend Setup

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment file
Create a `.env` file in the backend directory:
```bash
# Copy the example file
cp env.example .env
```

### 4. Configure environment variables
Edit the `.env` file with your actual values:
```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/cohort_enrollment

# Email Configuration (Gmail)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### 5. Start the backend server
```bash
npm start
```

You should see:
```
🚀 Server running on port 5000
📧 Environment: development
✅ Connected to MongoDB
⏰ Cron jobs initialized
```

## 🎨 Step 4: Frontend Setup

### 1. Open a new terminal and navigate to frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

You should see:
```
  VITE v4.4.5  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## 🧪 Step 5: Testing the System

### 1. Test the Interest Form
- Open http://localhost:5173
- Fill out and submit the interest form
- Check your email for the confirmation message

### 2. Test the Admin Dashboard
- Go to http://localhost:5173/dashboard
- View user submissions and statistics
- Test the manual email automation trigger

### 3. Test Email Automation
- In the dashboard, simulate user interactions:
  - Mark emails as "read"
  - Mark links as "clicked"
  - Mark payments as "completed"
- Click "Trigger Email Automation" to test the cron logic

## 🔍 Step 6: API Testing

### Test API endpoints using curl or Postman:

```bash
# Health check
curl http://localhost:5000/api/health

# Submit interest form
curl -X POST http://localhost:5000/api/form/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"+1234567890"}'

# Get all users
curl http://localhost:5000/api/form/users

# Get email statistics
curl http://localhost:5000/api/email/stats

# Trigger email automation
curl -X POST http://localhost:5000/api/email/trigger-automation
```

## 🐛 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Verify your connection string
   - Check if your IP is whitelisted in MongoDB Atlas
   - Ensure database user has correct permissions

2. **Email Not Sending**
   - Verify Gmail app password is correct
   - Check if 2-factor authentication is enabled
   - Ensure EMAIL_USER and EMAIL_PASS are set correctly

3. **CORS Errors**
   - Verify FRONTEND_URL in .env matches your frontend URL
   - Check if backend is running on correct port

4. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing processes using the port

### Development Tips:

1. **Cron Job Testing**: The cron job runs every minute in development mode for easy testing
2. **Email Templates**: All email templates are in `backend/utils/emailService.js`
3. **Database**: Use MongoDB Compass to view your data visually
4. **Logs**: Check console logs for detailed error messages

## 📊 Monitoring

### Backend Logs
The backend provides detailed logging:
- ✅ Success messages
- ❌ Error messages
- 📧 Email sending status
- 🕐 Cron job execution

### Dashboard Metrics
The admin dashboard shows:
- Total users enrolled
- Email statistics
- User interaction rates
- Payment completion rates

## 🚀 Production Deployment

### Recommended Platforms:
- **Backend**: Render.com, Railway.app, or Heroku
- **Frontend**: Vercel, Netlify, or GitHub Pages
- **Database**: MongoDB Atlas (already configured)

### Environment Variables for Production:
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
EMAIL_USER=your_production_email
EMAIL_PASS=your_production_email_password
FRONTEND_URL=https://your-frontend-domain.com
```

### Cron Job in Production:
Change the cron schedule in `backend/utils/cronService.js`:
```javascript
// Production: run every day at midnight
cron.schedule('0 0 * * *', runEmailAutomation);

// Development: run every minute
// cron.schedule('*/1 * * * *', runEmailAutomation);
```

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Nodemailer Documentation](https://nodemailer.com/)
- [Mailgen Documentation](https://github.com/eladnava/mailgen)
- [node-cron Documentation](https://github.com/node-cron/node-cron)

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the console logs for error messages
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed

---

**Happy coding! 🎉** 
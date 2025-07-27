# API Documentation - Cohort Enrollment Automation System

## Base URL
```
http://localhost:5000/api
```

## Authentication
Currently, the API doesn't require authentication for development purposes. In production, you should implement proper authentication.

## Response Format
All API responses follow this format:
```json
{
  "success": true/false,
  "message": "Response message",
  "data": {} // Optional data payload
}
```

---

## 📝 Form Endpoints

### Submit Interest Form
**POST** `/form/submit`

Submit a new interest form for the cohort program.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Interest form submitted successfully! Check your email for confirmation.",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "status": "email_sent"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Name, email, and phone are required"
}
```

---

### Get All Users
**GET** `/form/users`

Retrieve all users from the database.

**Response:**
```json
{
  "success": true,
  "users": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "emailOpened": false,
      "clickedLink": false,
      "paymentComplete": false,
      "status": "email_sent",
      "emailCount": 1,
      "lastEmailSent": "2024-01-15T10:30:00.000Z",
      "submittedAt": "2024-01-15T10:30:00.000Z",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "total": 1
}
```

---

### Get User by ID
**GET** `/form/users/:id`

Retrieve a specific user by their ID.

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "emailOpened": false,
    "clickedLink": false,
    "paymentComplete": false,
    "status": "email_sent",
    "emailCount": 1,
    "lastEmailSent": "2024-01-15T10:30:00.000Z",
    "submittedAt": "2024-01-15T10:30:00.000Z",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "User not found"
}
```

---

### Update User Status
**PATCH** `/form/users/:id/status`

Update user interaction status (for testing/simulation).

**Request Body:**
```json
{
  "emailOpened": true,
  "clickedLink": false,
  "paymentComplete": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "User status updated successfully",
  "user": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "emailOpened": true,
    "clickedLink": false,
    "paymentComplete": false,
    "status": "email_sent"
  }
}
```

---

### Resend Confirmation Email
**POST** `/form/users/:id/resend-email`

Resend the confirmation email to a specific user.

**Response:**
```json
{
  "success": true,
  "message": "Confirmation email resent successfully"
}
```

---

## 📧 Email Endpoints

### Send Confirmation Email
**POST** `/email/send-confirmation/:userId`

Manually send a confirmation email to a specific user.

**Response:**
```json
{
  "success": true,
  "message": "Confirmation email sent successfully",
  "messageId": "<message-id@email-provider.com>"
}
```

---

### Send Reminder Email
**POST** `/email/send-reminder/:userId/:type`

Send a specific type of reminder email to a user.

**Types:**
- `reminder1` - First reminder for unopened emails
- `reminder2` - Second reminder with benefits
- `final` - Final reminder for clicked but unpaid users

**Response:**
```json
{
  "success": true,
  "message": "reminder1 email sent successfully",
  "messageId": "<message-id@email-provider.com>"
}
```

---

### Trigger Email Automation
**POST** `/email/trigger-automation`

Manually trigger the email automation cron job.

**Response:**
```json
{
  "success": true,
  "message": "Email automation triggered successfully"
}
```

---

### Get Email Statistics
**GET** `/email/stats`

Get comprehensive email and user statistics.

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 10,
    "totalEmailsSent": 25,
    "avgEmailsPerUser": 2.5,
    "usersWithPayment": 3,
    "usersOpenedEmail": 7,
    "usersClickedLink": 5
  },
  "statusBreakdown": [
    {
      "_id": "email_sent",
      "count": 4
    },
    {
      "_id": "completed",
      "count": 3
    },
    {
      "_id": "reminder_1",
      "count": 2
    },
    {
      "_id": "reminder_2",
      "count": 1
    }
  ]
}
```

---

### Test Email Configuration
**POST** `/email/test-config`

Send a test email to verify email configuration.

**Request Body:**
```json
{
  "testEmail": "test@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Test email sent successfully",
  "messageId": "<message-id@email-provider.com>"
}
```

---

## 🔍 System Endpoints

### Health Check
**GET** `/health`

Check if the API is running properly.

**Response:**
```json
{
  "success": true,
  "message": "Cohort Enrollment API is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development"
}
```

---

### API Information
**GET** `/`

Get basic API information and available endpoints.

**Response:**
```json
{
  "success": true,
  "message": "Welcome to Cohort Enrollment Automation API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/api/health",
    "form": "/api/form",
    "email": "/api/email"
  }
}
```

---

## 📊 Data Models

### User Schema
```javascript
{
  name: String,           // Required
  email: String,          // Required, unique
  phone: String,          // Required
  emailOpened: Boolean,   // Default: false
  clickedLink: Boolean,   // Default: false
  paymentComplete: Boolean, // Default: false
  lastEmailSent: Date,    // Default: now
  emailCount: Number,     // Default: 1
  status: String,         // Enum: submitted, email_sent, reminder_1, reminder_2, final_reminder, completed, stopped
  submittedAt: Date,      // Default: now
  lastInteraction: Date,  // Default: now
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

### Status Flow
```
submitted → email_sent → reminder_1 → reminder_2 → final_reminder → completed/stopped
```

---

## 🚨 Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

---

## 🧪 Testing Examples

### Using curl

```bash
# Submit a form
curl -X POST http://localhost:5000/api/form/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"+1234567890"}'

# Get all users
curl http://localhost:5000/api/form/users

# Update user status
curl -X PATCH http://localhost:5000/api/form/users/USER_ID/status \
  -H "Content-Type: application/json" \
  -d '{"emailOpened":true}'

# Trigger automation
curl -X POST http://localhost:5000/api/email/trigger-automation

# Get statistics
curl http://localhost:5000/api/email/stats
```

### Using JavaScript/Fetch

```javascript
// Submit form
const response = await fetch('/api/form/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890'
  })
});

const data = await response.json();
console.log(data);
```

---

## 📝 Notes

1. **Email Templates**: All email templates are generated using Mailgen and are customizable in `backend/utils/emailService.js`
2. **Cron Jobs**: Email automation runs every minute in development mode for testing
3. **Validation**: All inputs are validated on both client and server side
4. **Error Handling**: Comprehensive error handling with meaningful messages
5. **Logging**: All operations are logged for debugging and monitoring

---

**For more information, see the main README.md file.** 
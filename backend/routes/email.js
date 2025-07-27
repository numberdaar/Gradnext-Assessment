const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { 
  sendConfirmationEmail, 
  sendReminder1Email, 
  sendReminder2Email, 
  sendFinalReminderEmail 
} = require('../utils/emailService');
const { triggerEmailAutomation } = require('../utils/cronService');

// Send confirmation email to specific user
router.post('/send-confirmation/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const emailResult = await sendConfirmationEmail(user);
    
    if (emailResult.success) {
      user.status = 'email_sent';
      user.emailCount += 1;
      user.lastEmailSent = new Date();
      await user.save();

      res.json({
        success: true,
        message: 'Confirmation email sent successfully',
        messageId: emailResult.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send email',
        error: emailResult.error
      });
    }
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Send reminder email to specific user
router.post('/send-reminder/:userId/:type', async (req, res) => {
  try {
    const { userId, type } = req.params;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    let emailResult;
    let emailType;

    switch (type) {
      case 'reminder1':
        emailResult = await sendReminder1Email(user);
        emailType = 'reminder1';
        break;
      case 'reminder2':
        emailResult = await sendReminder2Email(user);
        emailType = 'reminder2';
        break;
      case 'final':
        emailResult = await sendFinalReminderEmail(user);
        emailType = 'finalReminder';
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid reminder type. Use: reminder1, reminder2, or final'
        });
    }

    if (emailResult.success) {
      user.emailCount += 1;
      user.lastEmailSent = new Date();
      await user.save();

      res.json({
        success: true,
        message: `${emailType} email sent successfully`,
        messageId: emailResult.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send email',
        error: emailResult.error
      });
    }
  } catch (error) {
    console.error('Error sending reminder email:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Manual trigger for email automation (for testing)
router.post('/trigger-automation', async (req, res) => {
  try {
    await triggerEmailAutomation();
    
    res.json({
      success: true,
      message: 'Email automation triggered successfully'
    });
  } catch (error) {
    console.error('Error triggering email automation:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get email statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          totalEmailsSent: { $sum: '$emailCount' },
          avgEmailsPerUser: { $avg: '$emailCount' },
          usersWithPayment: { $sum: { $cond: ['$paymentComplete', 1, 0] } },
          usersOpenedEmail: { $sum: { $cond: ['$emailOpened', 1, 0] } },
          usersClickedLink: { $sum: { $cond: ['$clickedLink', 1, 0] } }
        }
      }
    ]);

    const statusStats = await User.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      stats: stats[0] || {},
      statusBreakdown: statusStats
    });
  } catch (error) {
    console.error('Error fetching email stats:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Test email configuration
router.post('/test-config', async (req, res) => {
  try {
    const { testEmail } = req.body;
    
    if (!testEmail) {
      return res.status(400).json({
        success: false,
        message: 'Test email address is required'
      });
    }

    // Create a test user object
    const testUser = {
      name: 'Test User',
      email: testEmail
    };

    const emailResult = await sendConfirmationEmail(testUser);
    
    if (emailResult.success) {
      res.json({
        success: true,
        message: 'Test email sent successfully',
        messageId: emailResult.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send test email',
        error: emailResult.error
      });
    }
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router; 
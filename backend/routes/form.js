const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { sendConfirmationEmail } = require('../utils/emailService');

// Submit interest form
router.post('/submit', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone are required'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email already exists'
      });
    }

    // Create new user
    const user = new User({
      name,
      email: email.toLowerCase(),
      phone,
      status: 'submitted'
    });

    await user.save();

    // Send confirmation email
    const emailResult = await sendConfirmationEmail(user);
    
    if (emailResult.success) {
      // Update user status to email_sent
      user.status = 'email_sent';
      await user.save();
      
      console.log(`✅ Form submitted and confirmation email sent to: ${email}`);
      
      res.status(201).json({
        success: true,
        message: 'Interest form submitted successfully! Check your email for confirmation.',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          status: user.status
        }
      });
    } else {
      // Email failed but user was saved
      console.error(`❌ Email failed for user: ${email}`, emailResult.error);
      
      res.status(201).json({
        success: true,
        message: 'Interest form submitted successfully! We\'ll contact you soon.',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          status: user.status
        },
        emailWarning: 'Confirmation email could not be sent'
      });
    }

  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get all users (for admin dashboard)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
      .select('-__v')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      users,
      total: users.length
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-__v');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update user interaction status (for testing/simulation)
router.patch('/users/:id/status', async (req, res) => {
  try {
    const { emailOpened, clickedLink, paymentComplete } = req.body;
    
    const updateData = {};
    if (emailOpened !== undefined) updateData.emailOpened = emailOpened;
    if (clickedLink !== undefined) updateData.clickedLink = clickedLink;
    if (paymentComplete !== undefined) updateData.paymentComplete = paymentComplete;
    
    updateData.lastInteraction = new Date();

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-__v');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update status based on payment completion
    if (paymentComplete) {
      user.status = 'completed';
      await user.save();
    }

    res.json({
      success: true,
      message: 'User status updated successfully',
      user
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Resend confirmation email
router.post('/users/:id/resend-email', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
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
        message: 'Confirmation email resent successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send email',
        error: emailResult.error
      });
    }
  } catch (error) {
    console.error('Error resending email:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router; 
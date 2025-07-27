const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  // Email interaction tracking
  emailOpened: {
    type: Boolean,
    default: false
  },
  clickedLink: {
    type: Boolean,
    default: false
  },
  paymentComplete: {
    type: Boolean,
    default: false
  },
  // Email automation tracking
  lastEmailSent: {
    type: Date,
    default: Date.now
  },
  emailCount: {
    type: Number,
    default: 1
  },
  // Status tracking
  status: {
    type: String,
    enum: ['submitted', 'email_sent', 'reminder_1', 'reminder_2', 'final_reminder', 'completed', 'stopped'],
    default: 'submitted'
  },
  // Timestamps
  submittedAt: {
    type: Date,
    default: Date.now
  },
  lastInteraction: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
UserSchema.index({ email: 1 });
UserSchema.index({ status: 1 });
UserSchema.index({ lastEmailSent: 1 });

module.exports = mongoose.model('User', UserSchema); 
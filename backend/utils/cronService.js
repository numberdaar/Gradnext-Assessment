const cron = require('node-cron');
const User = require('../models/User');
const { 
  sendReminder1Email, 
  sendReminder2Email, 
  sendFinalReminderEmail 
} = require('./emailService');

// Helper function to check if enough time has passed since last email
const hasEnoughTimePassed = (lastEmailSent, daysRequired) => {
  const now = new Date();
  const timeDiff = now - new Date(lastEmailSent);
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
  return daysDiff >= daysRequired;
};

// Helper function to update user status and email count
const updateUserEmailStatus = async (userId, status, emailCount) => {
  await User.findByIdAndUpdate(userId, {
    status,
    emailCount,
    lastEmailSent: new Date()
  });
};

// Main cron job function
const runEmailAutomation = async () => {
  console.log('🕐 Running email automation cron job...');
  
  try {
    // Get all users who haven't completed payment and aren't stopped
    const users = await User.find({
      paymentComplete: false,
      status: { $nin: ['completed', 'stopped'] }
    });

    console.log(`📧 Processing ${users.length} users for email automation`);

    for (const user of users) {
      let shouldSendEmail = false;
      let emailType = '';
      let newStatus = user.status;

      // Logic for different scenarios
      switch (user.status) {
        case 'email_sent':
          // If email not opened after 2 days, send reminder 1
          if (!user.emailOpened && hasEnoughTimePassed(user.lastEmailSent, 2)) {
            shouldSendEmail = true;
            emailType = 'reminder1';
            newStatus = 'reminder_1';
          }
          // If email opened but link not clicked, send reminder 2
          else if (user.emailOpened && !user.clickedLink && hasEnoughTimePassed(user.lastEmailSent, 3)) {
            shouldSendEmail = true;
            emailType = 'reminder2';
            newStatus = 'reminder_2';
          }
          break;

        case 'reminder_1':
          // If still not opened after reminder 1, send another reminder
          if (!user.emailOpened && hasEnoughTimePassed(user.lastEmailSent, 2)) {
            shouldSendEmail = true;
            emailType = 'reminder1';
          }
          // If opened but not clicked, move to reminder 2
          else if (user.emailOpened && !user.clickedLink && hasEnoughTimePassed(user.lastEmailSent, 2)) {
            shouldSendEmail = true;
            emailType = 'reminder2';
            newStatus = 'reminder_2';
          }
          break;

        case 'reminder_2':
          // If link clicked but payment not completed after 2 days, send final reminder
          if (user.clickedLink && !user.paymentComplete && hasEnoughTimePassed(user.lastEmailSent, 2)) {
            shouldSendEmail = true;
            emailType = 'finalReminder';
            newStatus = 'final_reminder';
          }
          break;

        case 'final_reminder':
          // If still no payment after final reminder, stop communication
          if (!user.paymentComplete && hasEnoughTimePassed(user.lastEmailSent, 3)) {
            newStatus = 'stopped';
            await updateUserEmailStatus(user._id, newStatus, user.emailCount);
            console.log(`🛑 Stopped communication for user: ${user.email}`);
            continue;
          }
          break;
      }

      // Send email if conditions are met
      if (shouldSendEmail) {
        let emailResult;
        
        switch (emailType) {
          case 'reminder1':
            emailResult = await sendReminder1Email(user);
            break;
          case 'reminder2':
            emailResult = await sendReminder2Email(user);
            break;
          case 'finalReminder':
            emailResult = await sendFinalReminderEmail(user);
            break;
        }

        if (emailResult.success) {
          await updateUserEmailStatus(user._id, newStatus, user.emailCount + 1);
          console.log(`✅ Sent ${emailType} email to: ${user.email}`);
        } else {
          console.error(`❌ Failed to send ${emailType} email to: ${user.email}`, emailResult.error);
        }
      }
    }

    console.log('✅ Email automation cron job completed');
  } catch (error) {
    console.error('❌ Error in email automation cron job:', error);
  }
};

// Initialize cron jobs
const initializeCronJobs = () => {
  // Run every day at midnight (production)
  // cron.schedule('0 0 * * *', runEmailAutomation);
  
  // For development: run every minute
  cron.schedule('*/1 * * * *', runEmailAutomation);
  
  console.log('⏰ Cron jobs initialized');
};

// Manual trigger for testing
const triggerEmailAutomation = async () => {
  console.log('🔧 Manually triggering email automation...');
  await runEmailAutomation();
};

module.exports = {
  initializeCronJobs,
  runEmailAutomation,
  triggerEmailAutomation
}; 
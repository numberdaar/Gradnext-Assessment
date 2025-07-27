const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Create Mailgen instance
const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'gradnext',
    link: 'https://gradnext.co',
    logo: 'https://gradnext.co/logo.png'
  }
});

// Email templates
const emailTemplates = {
  confirmation: (userName) => ({
    body: {
      name: userName,
      intro: 'Thank you for your interest in our Consulting Cohort 101 program!',
      action: {
        instructions: 'We\'re excited to have you join us. Please click the button below to confirm your spot and complete your payment.',
        button: {
          color: '#22BC66',
          text: 'Confirm Your Spot & Pay',
          link: 'https://gradnext.co/payment/dummy-link'
        }
      },
      outro: 'If you have any questions, feel free to reply to this email. We\'re here to help!',
      signature: 'Best regards,<br>The gradnext Team'
    }
  }),

  reminder1: (userName) => ({
    body: {
      name: userName,
      intro: 'We noticed you haven\'t opened our previous email about the Consulting Cohort 101 program.',
      action: {
        instructions: 'Don\'t miss out on this opportunity! Click below to view the program details and secure your spot.',
        button: {
          color: '#FF6B35',
          text: 'View Program Details',
          link: 'https://gradnext.co/payment/dummy-link'
        }
      },
      outro: 'Spots are filling up quickly. We\'d hate for you to miss out!',
      signature: 'Best regards,<br>The gradnext Team'
    }
  }),

  reminder2: (userName) => ({
    body: {
      name: userName,
      intro: 'We saw you opened our email about the Consulting Cohort 101 program, but you haven\'t clicked the payment link yet.',
      action: {
        instructions: 'Here are some additional benefits of joining our program:',
        button: {
          color: '#4A90E2',
          text: 'Complete Your Enrollment',
          link: 'https://gradnext.co/payment/dummy-link'
        }
      },
      outro: [
        '🎯 Personalized career guidance',
        '💼 Real-world consulting projects',
        '🤝 Network with industry professionals',
        '📈 95% placement rate',
        '💰 Competitive pricing with flexible payment options'
      ],
      signature: 'Best regards,<br>The gradnext Team'
    }
  }),

  finalReminder: (userName) => ({
    body: {
      name: userName,
      intro: 'This is your final reminder about the Consulting Cohort 101 program.',
      action: {
        instructions: 'You clicked the payment link but haven\'t completed the payment yet. This is your last chance to secure your spot!',
        button: {
          color: '#E74C3C',
          text: 'Complete Payment Now',
          link: 'https://gradnext.co/payment/dummy-link'
        }
      },
      outro: 'If you\'re having trouble with the payment, please reply to this email and we\'ll help you resolve any issues.',
      signature: 'Best regards,<br>The gradnext Team'
    }
  })
};

// Send email function
const sendEmail = async (to, subject, templateName, userName) => {
  try {
    const transporter = createTransporter();
    const template = emailTemplates[templateName](userName);
    const emailHtml = mailGenerator.generate(template);
    const emailText = mailGenerator.generatePlaintext(template);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: emailHtml,
      text: emailText
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}: ${result.messageId}`);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Specific email sending functions
const sendConfirmationEmail = async (user) => {
  return await sendEmail(
    user.email,
    'Welcome to gradnext Consulting Cohort 101!',
    'confirmation',
    user.name
  );
};

const sendReminder1Email = async (user) => {
  return await sendEmail(
    user.email,
    'Reminder: Your Consulting Cohort 101 Spot Awaits',
    'reminder1',
    user.name
  );
};

const sendReminder2Email = async (user) => {
  return await sendEmail(
    user.email,
    'Don\'t Miss Out: Consulting Cohort 101 Benefits',
    'reminder2',
    user.name
  );
};

const sendFinalReminderEmail = async (user) => {
  return await sendEmail(
    user.email,
    'Final Reminder: Complete Your Consulting Cohort 101 Enrollment',
    'finalReminder',
    user.name
  );
};

module.exports = {
  sendEmail,
  sendConfirmationEmail,
  sendReminder1Email,
  sendReminder2Email,
  sendFinalReminderEmail
}; 
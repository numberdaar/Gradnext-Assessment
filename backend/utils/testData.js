const User = require('../models/User');

// Generate test users for development
const generateTestUsers = async () => {
  const testUsers = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      emailOpened: false,
      clickedLink: false,
      paymentComplete: false,
      status: 'email_sent',
      emailCount: 1
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1234567891',
      emailOpened: true,
      clickedLink: false,
      paymentComplete: false,
      status: 'reminder_2',
      emailCount: 3
    },
    {
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1234567892',
      emailOpened: true,
      clickedLink: true,
      paymentComplete: false,
      status: 'final_reminder',
      emailCount: 4
    },
    {
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      phone: '+1234567893',
      emailOpened: true,
      clickedLink: true,
      paymentComplete: true,
      status: 'completed',
      emailCount: 2
    },
    {
      name: 'David Brown',
      email: 'david.brown@example.com',
      phone: '+1234567894',
      emailOpened: false,
      clickedLink: false,
      paymentComplete: false,
      status: 'reminder_1',
      emailCount: 2
    }
  ];

  try {
    // Clear existing test users
    await User.deleteMany({ email: { $in: testUsers.map(u => u.email) } });
    
    // Insert test users
    const insertedUsers = await User.insertMany(testUsers);
    
    console.log(`✅ Generated ${insertedUsers.length} test users`);
    return insertedUsers;
  } catch (error) {
    console.error('❌ Error generating test users:', error);
    throw error;
  }
};

// Clear all test data
const clearTestData = async () => {
  try {
    await User.deleteMany({});
    console.log('✅ Cleared all test data');
  } catch (error) {
    console.error('❌ Error clearing test data:', error);
    throw error;
  }
};

module.exports = {
  generateTestUsers,
  clearTestData
}; 
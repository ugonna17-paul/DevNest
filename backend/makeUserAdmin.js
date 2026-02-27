// Script to make an existing user an admin
// Run: node makeUserAdmin.js <email>

const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function makeUserAdmin() {
  try {
    // Get email from command line argument
    const email = process.argv[2];
    
    if (!email) {
      console.log('❌ Please provide an email address');
      console.log('Usage: node makeUserAdmin.js <email>');
      process.exit(1);
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find user by email
    const user = await User.findOne({ email: email });
    
    if (!user) {
      console.log(`❌ No user found with email: ${email}`);
      process.exit(1);
    }

    // Check if already admin
    if (user.role === 'admin') {
      console.log(`ℹ️  User ${email} is already an admin`);
      process.exit(0);
    }

    // Update to admin
    user.role = 'admin';
    user.subscription.status = 'active';
    user.subscription.paidAt = new Date();
    await user.save();

    console.log('✅ Successfully updated user to admin!');
    console.log('📧 Email:', user.email);
    console.log('👤 Name:', user.name);
    console.log('🔑 Role: admin');
    console.log('\n💡 Please log out and log back in for changes to take effect');

    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

makeUserAdmin();

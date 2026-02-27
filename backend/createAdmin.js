// Script to create an admin user
// Run this script once to create your first admin account

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    subscription: {
      status: { 
        type: String, 
        enum: ["free", "pending", "active"], 
        default: "free" 
      },
      paidAt: { 
        type: Date 
      }
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Admin details - CHANGE THESE VALUES
    const adminData = {
      name: "Admin User",
      email: "admin@devnest.com", // Change this
      password: "admin123", // Change this to a strong password
      role: "admin",
      subscription: {
        status: "active", // Admin gets automatic active subscription
        paidAt: new Date()
      }
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('❌ Admin user already exists with this email');
      process.exit(1);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    adminData.password = await bcrypt.hash(adminData.password, salt);

    // Create admin user
    const admin = new User(adminData);
    await admin.save();

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', adminData.email);
    console.log('🔑 Password: admin123 (change after first login)');
    console.log('👤 Role: admin');

    process.exit(0);

  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
}

createAdminUser();

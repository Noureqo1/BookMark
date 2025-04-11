const mongoose = require('mongoose');
const User = require('../models/user');

const adminUser = {
  username: 'BookMarkAdmin',
  email: 'admin@bookmark.com',
  password: 'AdminPassword123!',
  role: 'admin'
};

mongoose.connect("mongodb+srv://Noureqo:12345mn3@cluster0.q8j0xqn.mongodb.net/")
.then(async () => {
  console.log('Connected to MongoDB');
  
  // Check if admin already exists
  const existingAdmin = await User.findOne({ email: adminUser.email });
  
  if (existingAdmin) {
    console.log('Admin user already exists');
    process.exit(0);
  }
  
  // Create admin user
  const newAdmin = await User.create(adminUser);
  console.log('Admin user created:', newAdmin);
  process.exit(0);
})
.catch(err => {
  console.error('Error creating admin user:', err);
  process.exit(1);
});
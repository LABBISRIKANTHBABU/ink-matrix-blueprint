const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');

dotenv.config();

// Connect to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  try {
    // Connect to database
    const connection = await connectDB();
    
    // Delete existing admin
    await Admin.deleteMany({ email: 'admin@inkmatrix.com' });
    console.log('Existing admin deleted');
    
    // Create admin - password will be hashed by the model's pre-save hook
    const admin = new Admin({
      email: 'admin@inkmatrix.com',
      password: 'admin123',  // Plain text - model will hash it
      role: 'admin'
    });
    
    await admin.save();
    
    console.log('Admin user created successfully');
    console.log('Email: admin@inkmatrix.com');
    console.log('Password: admin123');
    
    await connection.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
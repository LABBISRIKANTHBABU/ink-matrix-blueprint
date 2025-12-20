const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');

dotenv.config();

// Connect to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const testSaveAdmin = async () => {
  try {
    // Connect to database
    const connection = await connectDB();
    
    // Delete existing admin
    await Admin.deleteMany({ email: 'admin@inkmatrix.com' });
    console.log('Existing admin deleted');
    
    // Create admin
    const admin = new Admin({
      email: 'admin@inkmatrix.com',
      password: 'admin123',
      role: 'admin'
    });
    
    console.log('Before save - password:', admin.password);
    
    // Save admin
    const savedAdmin = await admin.save();
    
    console.log('After save - password:', savedAdmin.password);
    
    await connection.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

testSaveAdmin();
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

const testAdmin = async () => {
  try {
    // Connect to database
    const connection = await connectDB();
    
    // Find admin
    const admin = await Admin.findOne({ email: 'admin@inkmatrix.com' });
    
    if (admin) {
      console.log('Admin found:');
      console.log('Email:', admin.email);
      console.log('Role:', admin.role);
      console.log('Password (hashed):', admin.password);
    } else {
      console.log('Admin not found');
    }
    
    await connection.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

testAdmin();
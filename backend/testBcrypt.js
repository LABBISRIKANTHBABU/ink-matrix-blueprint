const bcrypt = require('bcryptjs');

async function testBcrypt() {
  try {
    // Hash a password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    console.log('Hashed password:', hashedPassword);
    
    // Compare passwords
    const isMatch = await bcrypt.compare('admin123', hashedPassword);
    console.log('Password match:', isMatch);
    
    // Compare with wrong password
    const isWrongMatch = await bcrypt.compare('wrongpassword', hashedPassword);
    console.log('Wrong password match:', isWrongMatch);
  } catch (error) {
    console.error(error);
  }
}

testBcrypt();
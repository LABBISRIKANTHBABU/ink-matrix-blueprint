const http = require('http');

// First, login to get a token
const loginData = JSON.stringify({
  email: 'admin@inkmatrix.com',
  password: 'admin123'
});

const loginOptions = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/admin/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(loginData)
  }
};

const loginReq = http.request(loginOptions, (res) => {
  let loginData = '';
  
  res.on('data', (chunk) => {
    loginData += chunk;
  });
  
  res.on('end', () => {
    const loginResponse = JSON.parse(loginData);
    console.log('Login response:', loginResponse);
    
    // Now test the protected route with the token
    const productData = JSON.stringify({
      name: 'Protected Test Product',
      price: 200,
      image: 'https://example.com/protected.jpg',
      category: 'test'
    });
    
    const productOptions = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/products',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginResponse.token}`,
        'Content-Length': Buffer.byteLength(productData)
      }
    };
    
    const productReq = http.request(productOptions, (res) => {
      console.log(`Product creation status: ${res.statusCode}`);
      
      let productData = '';
      
      res.on('data', (chunk) => {
        productData += chunk;
      });
      
      res.on('end', () => {
        console.log('Product creation response:', productData);
      });
    });
    
    productReq.on('error', (e) => {
      console.error(`Problem with product request: ${e.message}`);
    });
    
    productReq.write(productData);
    productReq.end();
  });
});

loginReq.on('error', (e) => {
  console.error(`Problem with login request: ${e.message}`);
});

loginReq.write(loginData);
loginReq.end();
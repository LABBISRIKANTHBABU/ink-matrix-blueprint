import fetch from 'node-fetch';

async function testBackend() {
  try {
    // Test getting products (should work without auth)
    console.log('Testing GET /api/products...');
    const productsResponse = await fetch('http://localhost:5000/api/products');
    console.log('Status:', productsResponse.status);
    const products = await productsResponse.json();
    console.log('Products count:', products.length);
    
    // Test admin login
    console.log('\nTesting POST /api/admin/login...');
    const loginResponse = await fetch('http://localhost:5000/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@inkmatrix.com',
        password: 'admin123'
      })
    });
    
    console.log('Login Status:', loginResponse.status);
    const loginData = await loginResponse.json();
    console.log('Login Response:', loginData);
    
    if (loginData.token) {
      console.log('\nTesting POST /api/products with auth...');
      const createResponse = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginData.token}`
        },
        body: JSON.stringify({
          name: 'Test Product',
          description: 'Test product description',
          price: 100,
          image: 'https://example.com/image.jpg',
          category: 'drinkware',
          subcategory: 'Mugs',
          bulkPricing: [{ minQty: 1, price: 100 }],
          customizable: false,
          inStock: true,
          rating: 0,
          reviews: 0
        })
      });
      
      console.log('Create Product Status:', createResponse.status);
      const createData = await createResponse.json();
      console.log('Create Product Response:', createData);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testBackend();
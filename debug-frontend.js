// Simple debug script to check if components are rendering
console.log('Debug script running...');

// Check if localStorage has admin token
const token = localStorage.getItem('admin-token');
console.log('Admin token in localStorage:', token);

// Check if we're on the right page
console.log('Current path:', window.location.pathname);

// Try to manually navigate to the add product page
if (window.location.pathname !== '/admin/add-product') {
  console.log('Redirecting to add product page...');
  window.location.href = '/admin/add-product';
} else {
  console.log('Already on add product page');
}
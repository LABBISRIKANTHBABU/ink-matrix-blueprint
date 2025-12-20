const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// GET /api/products - Get all products (PUBLIC)
router.get('/', getAllProducts);

// GET /api/products/:id - Get product by ID (PUBLIC)
router.get('/:id', getProductById);

// POST /api/products - Create a new product (ADMIN ONLY)
router.post('/', authMiddleware, createProduct);

// PUT /api/products/:id - Update a product (ADMIN ONLY)
router.put('/:id', authMiddleware, updateProduct);

// DELETE /api/products/:id - Delete a product (ADMIN ONLY)
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
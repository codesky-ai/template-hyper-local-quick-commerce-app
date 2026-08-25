import express from 'express';
import {
  getProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  createProduct
} from '../controllers/productController';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory
} from '../controllers/categoryController';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
} from '../controllers/orderController';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'HyperLocal Commerce API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Product routes
router.get('/products', getProducts);
router.get('/products/search', searchProducts);
router.get('/products/:id', getProductById);
router.get('/products/category/:categoryId', getProductsByCategory);
router.post('/products', createProduct); // Admin route

// Category routes
router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);
router.post('/categories', createCategory); // Admin route
router.put('/categories/:id', updateCategory); // Admin route

// Order routes
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.post('/orders', createOrder);
router.patch('/orders/:id/status', updateOrderStatus); // Admin route

// Fallback route for undefined endpoints
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

export default router;
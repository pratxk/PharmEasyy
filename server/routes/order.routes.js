const express = require('express');
const auth = require('../middlewares/auth.middleware');
const orderRouter = express.Router();
const checkAdmin = require('../middlewares/checkAdmin.middleware');
const orderController = require('../controllers/order.controller');


// GET: Fetch all orders (Admin only)
orderRouter.get('/', [auth, checkAdmin], orderController.getAllOrders);

// GET: Fetch a single order by ID (Admin only)
orderRouter.get('/single-product/:id', [auth, checkAdmin], orderController.getSingleOrder);

// POST: Add a new order
orderRouter.post('/add-order', auth, orderController.addOrder);

// PATCH: Update order status (Admin only)
orderRouter.patch('/update-order/:id', [auth, checkAdmin], orderController.updateOrderStatus);

module.exports = orderRouter;
const express = require('express');
const auth = require('../middlewares/auth.middleware');
const orderRouter = express.Router();
const checkAdmin = require('../middlewares/checkAdmin.Middleware');
const orderModel = require('../models/order.model');
const cartModel = require('../models/cart.model');


orderRouter.get('/', [auth, checkAdmin], async (req, res) => {
    try {
        const orders = await orderModel.find().populate('items.medicineId').populate('userId');
        res.status(202).json({ orders });
    } catch (error) {
        res.status(500).json({
            message: 'Error Fetching the orders',
            error: error.message
        })
    }
});


orderRouter.post('/add-order', auth, async (req, res) => {
    const userId = req.user._id;
    try {
        const cart = await cartModel.findOne({ userId }).populate('items.medicineId');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const newOrder = new orderModel({
            userId,
            items: cart.items,
            totalPrice: cart.totalPrice,
            status: 'Pending',
            paymentStatus: 'Paid'  // Assuming payment successfull
        });

        await newOrder.save();

        // Clear the user's cart 
        await cartModel.findOneAndUpdate(
            { userId },
            { items: [], totalPrice: 0 }
        );
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({
            message: 'Error placing order',
            error: error.message
        });
    }
});


orderRouter.patch('/update-order/:id', [auth, checkAdmin], async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;  
    try {
        const order = await orderModel.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Update the status from req.body
        order.status = status;
        await order.save();
        res.status(200).json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating order status',
            error: error.message
        });
    }
});

module.exports = orderRouter
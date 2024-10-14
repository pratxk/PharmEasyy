// controllers/orderController.js

const orderModel = require('../models/order.model');
const cartModel = require('../models/cart.model');

// GET: Fetch all orders (Admin only)
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate('items.medicineId').populate('userId');
        res.status(202).json({ orders });
    } catch (error) {
        res.status(500).json({
            message: 'Error Fetching the orders',
            error: error.message
        });
    }
};

// GET: Fetch a single order by ID (Admin only)
const getSingleOrder = async (req, res) => {
    const id = req.params.id;
    try {
        const order = await orderModel.findById(id).populate('items.medicineId').populate('userId');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ order }); 
    } catch (error) {
        res.status(500).json({
            message: 'Error Fetching the order',
            error: error.message
        });
    }
};

// POST: Add a new order
const addOrder = async (req, res) => {
    const userId = req.user._id;
    try {
        const cartItems = await cartModel.find({ userId });

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const items = cartItems.map(item => ({
            medicineId: item.medicineId,
            quantity: item.qty,
            price: item.price
        }));

        const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

        const newOrder = new orderModel({
            userId,
            items,
            totalPrice,
            status: 'Pending',
            paymentStatus: 'Paid'  // Assuming payment successful
        });

        await newOrder.save();
        await cartModel.deleteMany({ userId }); // Clear all items in the cart
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({
            message: 'Error placing order',
            error: error.message
        });
    }
};

// PATCH: Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;  
    try {
        const order = await orderModel.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();
        res.status(200).json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating order status',
            error: error.message
        });
    }
};

module.exports = {
    getAllOrders,
    getSingleOrder,
    addOrder,
    updateOrderStatus,
};
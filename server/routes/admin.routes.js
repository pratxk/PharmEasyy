const express = require('express');
const userModel = require('../models/user.model');
const auth = require('../middlewares/auth.middleware');
const checkAdmin = require('../middlewares/checkAdmin.Middleware');
const adminRouter = express.Router();

//all-admin only paths

adminRouter.get('/users', [auth, checkAdmin], async (req, res) => {
    try {
        const users = await userModel.find({}, '-password'); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching users',
            error: error.message
        });
    }
});


adminRouter.get('/orders', [auth, checkAdmin], async (req, res) => {
    try {
        const orders = await orderModel.find()
            .populate('userId', 'name email')  
            .populate('items.productId');    

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching orders',
            error: error.message
        });
    }
});

module.exports = adminRouter;

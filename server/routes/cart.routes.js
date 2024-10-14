const express = require('express');
const cartRouter = express.Router();
const auth = require('../middlewares/auth.middleware');
const cartModel = require('../models/cart.model');

// GET: Fetch user's cart
cartRouter.get('/', auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const cartItems = await cartModel.find({ userId });
        
        if (!cartItems.length) {
            return res.status(299).json({ message: 'Cart is empty' });
        }
        
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving cart',
            error: error.message
        });
    }
});

// POST: Add medicine to cart
cartRouter.post('/add', auth, async (req, res) => {
    const { name, developedBy,medicineId, maxMonthsExpiry, category, imageUrl, price } = req.body;
    const userId = req.user._id;

    try {
        const existingCartItem = await cartModel.findOne({ userId, name });

        if (existingCartItem) {
            return res.status(200).json({ message: 'Medicine already in cart. Quantity updated.' });
        } else {
            const newCartItem = new cartModel({
                userId,
                medicineId,
                name,
                developedBy,
                maxMonthsExpiry,
                category,
                imageUrl,
                price,
            });

            await newCartItem.save();
            return res.status(201).json({ message: 'Medicine added to cart', cartItem: newCartItem });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error adding medicine to cart',
            error: error.message
        });
    }
});


// POST: Remove medicine from cart
cartRouter.delete('/remove/:cartItemId', auth, async (req, res) => {
    const { cartItemId } = req.params; 
    try {
        const deletedItem = await cartModel.findByIdAndDelete(cartItemId);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.status(200).json({ message: 'Medicine removed from cart', deletedItem });
    } catch (error) {
        res.status(500).json({
            message: 'Error removing medicine from cart',
            error: error.message
        });
    }
});

// PATCH: Update medicine details in the cart (e.g., price)
cartRouter.patch('/update/:id', auth, async (req, res) => {
    const cartItemId = req.params.id;
    const { operation } = req.body; 
    try {
        const cartItem = await cartModel.findById(cartItemId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        if (operation === 'increment') {
            cartItem.qty += 1; 
        } else if (operation === 'decrement') {
            if (cartItem.qty > 1) {
                cartItem.qty -= 1; 
            } else {
                return res.status(400).json({ message: 'Quantity cannot be less than 1' });
            }
        } else {
            return res.status(400).json({ message: 'Invalid operation. Use "increment" or "decrement"' });
        }

        const updatedItem = await cartItem.save(); 

        res.status(200).json({ message: 'Cart item updated', updatedItem });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating cart item',
            error: error.message
        });
    }
});

cartRouter.delete('/clear', auth, async (req, res) => {
    const userId = req.user._id;
    try {
        await cartModel.deleteMany({ userId });
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Error clearing cart',
            error: error.message
        });
    }
});

module.exports = cartRouter;

// controllers/cartController.js

const { body, param, validationResult } = require('express-validator');
const cartModel = require('../models/cart.model');

// GET: Fetch user's cart
const getCartItems = async (req, res) => {
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
            error: error.message,
        });
    }
};

// POST: Add medicine to cart
const addMedicineToCart = [
    // Validation middleware
    body('medicineId').isMongoId().withMessage('Valid medicine ID is required'),
    body('name').isString().withMessage('Name is required'),
    body('developedBy').isString().withMessage('Developed by is required'),
    body('maxMonthsExpiry').isInt({ min: 0 }).withMessage('Max months expiry must be a non-negative integer'),
    body('category').isString().withMessage('Category is required'),
    body('imageUrl').isURL().withMessage('Valid image URL is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { medicineId, name, developedBy, maxMonthsExpiry, category, imageUrl, price } = req.body;

        // Extract userId from the authenticated user
        const userId = req.user._id; // Assuming req.user is set by your auth middleware

        try {
            const existingCartItem = await cartModel.findOne({ userId, medicineId });

            if (existingCartItem) {
                // Optionally, you could update the existing item if needed
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
                error: error.message,
            });
        }
    },
];

// DELETE: Remove medicine from cart
const removeMedicineFromCart = [
    param('cartItemId').isMongoId().withMessage('Valid cart item ID is required'),

    // Handler
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
                error: error.message,
            });
        }
    },
];

// PATCH: Update medicine details in the cart
const updateCartItem = [
    // Validation middleware
    param('id').isMongoId().withMessage('Valid cart item ID is required'),
    body('operation').isIn(['increment', 'decrement']).withMessage('Operation must be "increment" or "decrement"'),

    // Handler
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
            }

            const updatedItem = await cartItem.save();
            res.status(200).json({ message: 'Cart item updated', updatedItem });
        } catch (error) {
            res.status(500).json({
                message: 'Error updating cart item',
                error: error.message,
            });
        }
    },
];

// DELETE: Clear the user's cart
const clearCart = async (req, res) => {
    const userId = req.user._id;
    try {
        await cartModel.deleteMany({ userId });
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Error clearing cart',
            error: error.message,
        });
    }
};

module.exports = {
    getCartItems,
    addMedicineToCart,
    removeMedicineFromCart,
    updateCartItem,
    clearCart,
};

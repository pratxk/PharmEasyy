const express = require('express');
const cartRouter = express.Router();
const auth = require('../middlewares/auth.middleware');
const cartController = require('../controllers/cart.controller');


// GET: Fetch user's cart
cartRouter.get('/', auth, cartController.getCartItems);

// POST: Add medicine to cart
cartRouter.post('/add', auth, cartController.addMedicineToCart);

// DELETE: Remove medicine from cart
cartRouter.delete('/remove/:cartItemId', auth, cartController.removeMedicineFromCart);

// PATCH: Update medicine details in the cart
cartRouter.patch('/update/:id', auth, cartController.updateCartItem);

// DELETE: Clear the user's cart
cartRouter.delete('/clear', auth, cartController.clearCart);

module.exports = cartRouter;
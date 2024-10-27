const express = require('express');
const userRouter = express.Router();
const auth = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');
const checkAdmin = require('../middlewares/checkAdmin.middleware');

// POST: Register a new user
userRouter.post('/register', userController.registerUser);

// POST: Login a user
userRouter.post('/login', userController.loginUser);

//POST: Forgot Password User
userRouter.post('/forgot-password', userController.forgotPassword);

//POST: Reset Password User
userRouter.post('/reset-password/:userId/:token', userController.resetPassword);

// GET: Logout a user
userRouter.get('/logout', auth, userController.logoutUser);

// GET: Fetch current user's data
userRouter.get('/me', auth, userController.getCurrentUser);

// DELETE: Delete a user by ID
userRouter.delete('/delete-user/:id',[auth, checkAdmin], userController.deleteUser);

// GET: Fetch all users
userRouter.get('/get-all-users',[auth, checkAdmin],  userController.getAllUsers);

module.exports = userRouter;
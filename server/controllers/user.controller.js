// controllers/userController.js

const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const blacklistModel = require('../models/blacklist.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// POST: Register a new user
const registerUser = [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('ph_no').isNumeric().withMessage('Phone number must be numeric').isLength({ min: 10, max: 15 }).withMessage('Phone number must be between 10 and 15 digits'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { first_name, last_name, email, password, role, ph_no } = req.body;
        try {
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(401).json({ message: 'User already registered' });
            }

            const hash = await bcrypt.hash(password, 10); // Increased salt rounds for better security
            const user = new userModel({
                first_name,
                last_name,
                email,
                password: hash,
                role,
                ph_no
            });
            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({
                message: 'Error occurred during User Creation',
                error: error.message
            });
        }
    }
];

// POST: Login a user
const loginUser = [
    body('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(402).json({ message: 'User does not exist' });
            }

            const result = await bcrypt.compare(password, user.password);
            if (result) {
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SecretKEY, { expiresIn: '1d' });
                // res.cookie('token',token,{httpOnly:true, maxAge: 24*60*60*1000})
                res.status(201).json({
                    message: 'User logged in successfully',
                    token,
                    user,
                    role: user.role
                });
            } else {
                res.status(401).json({ message: 'Incorrect Password' });
            }
        } catch (error) {
            res.status(500).json({
                message: 'Error occurred during login',
                error: error.message
            });
        }
    }
];

// GET: Logout a user
const logoutUser = async (req, res) => {
    // const token = req.cookies.token;
    const token = req.headers.authorization.split(' ')[1];
    const BlackListed_Token = new blacklistModel({ token });
    await BlackListed_Token.save();
    res.clearCookie('token');
    res.send('Logout Successful');
};
// GET: Fetch current user's data
const getCurrentUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data' });
    }
};

// DELETE: Delete a user by ID
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user data' });
    }
};

// GET: Fetch all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    deleteUser,
    getAllUsers,
};

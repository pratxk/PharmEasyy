// controllers/userController.js

const userModel = require('../models/user.model');
const blacklistModel = require('../models/blacklist.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST: Register a new user
const registerUser = async (req, res) => {
    const { first_name, last_name, email, password, role, ph_no } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ message: 'User already registered' });
        }

        const hash = await bcrypt.hash(password, 5);
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
};

// POST: Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(402).json({ message: 'User does not exist' });
        }

        const result = await bcrypt.compare(password, user.password);
        if (result) {
            const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SecretKEY, { expiresIn: '1d' });
            res.status(201).json({
                message: 'User logged in successfully',
                user,
                token,
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
};

// GET: Logout a user
const logoutUser = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const BlackListed_Token = new blacklistModel({ token });
    await BlackListed_Token.save();
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

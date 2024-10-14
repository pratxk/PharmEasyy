const express = require('express');
const medicineRouter = express.Router();
const medicineModel = require('../models/medicine.model');
const auth = require('../middlewares/auth.middleware'); 
const checkAdmin = require('../middlewares/checkAdmin.middleware'); 

// GET: Fetch all medicines, with optional filters for category, price, and stock
medicineRouter.get('/', async (req, res) => {
    const { category, minPrice, maxPrice, inStock, limit, sort } = req.query;

    let filter = {};

    if (category) {
        filter.category = category;
    }

    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseFloat(minPrice);
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (inStock !== undefined) {
        filter.stock = inStock === 'true' ? { $gt: 0 } : 0;
    }
    try {
        let medicinesQuery = medicineModel.find(filter);
        if (sort) {
            medicinesQuery = medicinesQuery.sort({ [sort]: 1 }); 
        }
        const medicines = await medicinesQuery.limit(parseInt(limit) || 0); 
        res.json(medicines);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching medicines',
            error: error.message
        });
    }
});

medicineRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const medicine = await medicineModel.findById(id);
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }
        res.json(medicine);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching medicine',
            error: error.message
        });
    }
});



medicineRouter.post('/add-medicine', [auth, checkAdmin], async (req, res) => {
  const { name, developedBy, maxMonthsExpiry, category, imageUrl, stock, price } = req.body;
    try {
        const newMedicine = new medicineModel({
            name,
            developedBy,
            maxMonthsExpiry,
            category,
            imageUrl,
            stock,
            price
        });

        await newMedicine.save();
        res.status(201).json({ message: 'Medicine created successfully', newMedicine });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating medicine',
            error: error.message
        });
    }
});

medicineRouter.patch('/update-medicine/:id', [auth, checkAdmin], async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedMedicine = await medicineModel.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedMedicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }
        res.json({ message: 'Medicine updated successfully', updatedMedicine });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating medicine',
            error: error.message
        });
    }
});

// DELETE: Remove a medicine by ID (Admin only)
medicineRouter.delete('/delete-medicine/:id', [auth, checkAdmin], async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMedicine = await medicineModel.findByIdAndDelete(id);
        if (!deletedMedicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }
        res.json({ message: 'Medicine deleted successfully', deletedMedicine });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting medicine',
            error: error.message
        });
    }
});

module.exports = medicineRouter;

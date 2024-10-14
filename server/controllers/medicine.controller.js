// controllers/medicineController.js

const medicineModel = require('../models/medicine.model');

// GET: Fetch all medicines, with optional filters for category, price, and stock
const getAllMedicines = async (req, res) => {
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
            if (sort === 'inStock') {
                medicinesQuery = medicinesQuery.sort({ stock: -1 });
            } else if (sort === '-inStock') {
                medicinesQuery = medicinesQuery.sort({ stock: 1 });
            } else {
                medicinesQuery = medicinesQuery.sort({ [sort]: 1 });
            }
        }

        const medicines = await medicinesQuery.limit(parseInt(limit) || 0);
        res.json(medicines);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching medicines',
            error: error.message,
        });
    }
};

// GET: Fetch a single medicine by ID
const getMedicineById = async (req, res) => {
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
            error: error.message,
        });
    }
};

// POST: Add a new medicine
const addMedicine = async (req, res) => {
    const { name, developedBy, maxMonthsExpiry, category, imageUrl, stock, price } = req.body;

    try {
        const newMedicine = new medicineModel({
            name,
            developedBy,
            maxMonthsExpiry,
            category,
            imageUrl,
            stock,
            price,
        });

        await newMedicine.save();
        res.status(201).json({ message: 'Medicine created successfully', newMedicine });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating medicine',
            error: error.message,
        });
    }
};

// PATCH: Update an existing medicine
const updateMedicine = async (req, res) => {
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
            error: error.message,
        });
    }
};

// DELETE: Remove a medicine by ID
const deleteMedicine = async (req, res) => {
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
            error: error.message,
        });
    }
};

module.exports = {
    getAllMedicines,
    getMedicineById,
    addMedicine,
    updateMedicine,
    deleteMedicine,
};

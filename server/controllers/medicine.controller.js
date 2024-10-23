// controllers/medicineController.js
const cloudinary=require("cloudinary")
const multer=require("multer")


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const { body, param, validationResult } = require('express-validator');
const medicineModel = require('../models/medicine.model');

// GET: Fetch all medicines, with optional filters for category, price, and stock
const getAllMedicines = async (req, res) => {
    const { category, minPrice, maxPrice, inStock, limit, sort, page } = req.query;

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

        // Sorting logic
        if (sort) {
            if (sort === 'inStock') {
                medicinesQuery = medicinesQuery.sort({ stock: -1 });
            } else if (sort === '-inStock') {
                medicinesQuery = medicinesQuery.sort({ stock: 1 });
            } else {
                medicinesQuery = medicinesQuery.sort({ [sort]: 1 });
            }
        }

        // Pagination logic
        const limitValue = parseInt(limit) || 10; // Default to 10 if limit is not provided
        const pageValue = parseInt(page) || 1; // Default to 1 if page is not provided
        const skipValue = (pageValue - 1) * limitValue;

        const medicines = await medicinesQuery.skip(skipValue).limit(limitValue);
        const totalMedicines = await medicineModel.countDocuments(filter); // Count total documents matching the filter

        res.json({
            medicines,
            total: totalMedicines,
            page: pageValue,
            limit: limitValue,
        });
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
// POST: Add a new medicine
const addMedicine = [
    // Validation middleware
    body('name').isString().withMessage('Name is required'),
    body('developedBy').isString().withMessage('Developed by is required'),
    body('maxMonthsExpiry').isInt({ min: 0 }).withMessage('Max months expiry must be a non-negative integer'),
    body('category').isString().withMessage('Category is required'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    
    // Custom validation for imageUrl and file
    body('imageUrl').custom((value, { req }) => {
        if (!req.file && !value) {
            throw new Error('Either image file or image URL must be provided');
        }
        if (req.file && value) {
            throw new Error('Provide either an image file or an image URL, not both');
        }
        return true;
    }),

    // Handler
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, developedBy, maxMonthsExpiry, category, stock, price } = req.body;
        let imageUrl = '';

        // Handle file upload to Cloudinary if a file is provided
        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "medicine_imgs",
                });
                imageUrl = result.secure_url;
            } catch (error) {
                return res.status(500).json({
                    message: 'Error uploading image to Cloudinary',
                    error: error.message,
                });
            }
        } else if (req.body.imageUrl) {
            // Use the provided image URL if no file was uploaded
            imageUrl = req.body.imageUrl;
        }

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
    },
];


// PATCH: Update an existing medicine
const updateMedicine = [
    // Validation middleware
    param('id').isMongoId().withMessage('Valid medicine ID is required'),
    body('name').optional().isString().withMessage('Name must be a string'),
    body('developedBy').optional().isString().withMessage('Developed by must be a string'),
    body('maxMonthsExpiry').optional().isInt({ min: 0 }).withMessage('Max months expiry must be a non-negative integer'),
    body('category').optional().isString().withMessage('Category must be a string'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    
    // Custom validation for imageUrl and file
    body('imageUrl').optional().custom((value, { req }) => {
        if (!req.file && !value) {
            throw new Error('Either an image file or an image URL must be provided');
        }
        if (req.file && value) {
            throw new Error('Provide either an image file or an image URL, not both');
        }
        return true;
    }),

    // Handler
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const updates = { ...req.body }; // Get updates from the body

        // Handle file upload to Cloudinary if a file is provided
        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "medicine_imgs",
                });
                updates.imageUrl = result.secure_url; // Use the new image URL
            } catch (error) {
                return res.status(500).json({
                    message: 'Error uploading image to Cloudinary',
                    error: error.message,
                });
            }
        }

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
    },
];
// DELETE: Remove a medicine by ID
const deleteMedicine = [
    // Validation middleware
    param('id').isMongoId().withMessage('Valid medicine ID is required'),

    // Handler
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
    },
];

module.exports = {
    getAllMedicines,
    getMedicineById,
    addMedicine,
    updateMedicine,
    deleteMedicine,
};

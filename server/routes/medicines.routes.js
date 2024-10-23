const express = require('express');
const medicineRouter = express.Router();
const medicineModel = require('../models/medicine.model');
const auth = require('../middlewares/auth.middleware'); 
const checkAdmin = require('../middlewares/checkAdmin.middleware'); 
const multer = require('multer');
const medicineController = require('../controllers/medicine.controller');

const upload = multer({ dest: "uploads/" });

// GET: Fetch all medicines
medicineRouter.get('/', medicineController.getAllMedicines);

// GET: Fetch a single medicine by ID
medicineRouter.get('/:id', medicineController.getMedicineById);

// POST: Add a new medicine
medicineRouter.post('/add-medicine', [auth, checkAdmin], upload.single('medicine_img'), medicineController.addMedicine);

// PATCH: Update an existing medicine
medicineRouter.patch('/update-medicine/:id', [auth, checkAdmin], upload.single('imageUrl'), medicineController.updateMedicine);

// DELETE: Remove a medicine by ID
medicineRouter.delete('/delete-medicine/:id', [auth, checkAdmin], medicineController.deleteMedicine);

module.exports = medicineRouter;

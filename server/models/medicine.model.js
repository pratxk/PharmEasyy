const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    developedBy: {
        type: String,
        required: true
    },
    maxMonthsExpiry: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true 
    },
    imageUrl: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false, timestamps: true });

const medicineModel = mongoose.model('Medicine', medicineSchema);

module.exports = medicineModel;

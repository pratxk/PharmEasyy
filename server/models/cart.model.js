const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine',
        required: true
    },
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
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true,
        default: 1
    }
}, { versionKey: false, timestamps: true });

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;

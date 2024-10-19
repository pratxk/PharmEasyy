const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true
    },
    items: [
        {
            medicineId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Medicine', 
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ['Accepted', 'Dispatched', 'Canceled', 'Pending'], 
        default: 'Pending'
    },
    OrderId:{
        type:String,
        required:true
    },
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Failed', 'Pending'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false, timestamps: true });

const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;

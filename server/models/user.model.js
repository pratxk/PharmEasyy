const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    ph_no: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true,
        default:'user',
        enum: ['admin', 'user'],
    },
    created_at: {
        type: Date,
        default: Date.now
    },

},{versionKey:false,timeStamps:true});

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;
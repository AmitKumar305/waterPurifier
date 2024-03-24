const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('contactUs', contactUsSchema);

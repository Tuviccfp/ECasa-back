const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }, 
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            }
        },
        {
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    numberOrder: {
        type: Number,
        default: () => Math.round(Math.random() * 100000),
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Order', orderSchema);

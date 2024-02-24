const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    quantityStock: {
        type: Number,
        default: 0,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    short_description: {
        type: String,
        required: true,
    },
    long_description: {
        type: String,
        required: true
    },
    author: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            required: true,
        },
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Func',
            required: true,
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"  
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);
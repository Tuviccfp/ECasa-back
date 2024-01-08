const mongoose = require('mongoose');
const Category = require('../models/categories');

const subCategorieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
        ref: Category
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('SubCategory', subCategorieSchema)
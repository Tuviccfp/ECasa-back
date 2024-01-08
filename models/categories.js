const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Category', categorieSchema)
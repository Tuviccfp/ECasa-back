const mongoose = require('mongoose');

const fichaTecSchema = new mongoose.Schema({
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
    marca: {
        type: String,
        required: true,
    },
    modelo: {
        type: String || Number,
        required: true,
    },
    dataFab: {
        type: String,
        required: true
    },
    dataVal: {
        type: String,
        required: true,
    },
    dimensions: {
        type: String,
        required: true,
    },
    pound: {
        type: Number,
        required: true,
    },
    material: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    potencity: {
        type: Number,
        required: true,
    },
    func: {
        type: String,
        required: true,
    },
    packaging: {
        tipo: {
            type: String,
            required: true,
        },
        dimensions: {
            type: String,
            required: true,
        },
        pound: {
            type: Number,
            required: true
        }
    },
    guarantee: {
        period: {
            type: String,
            required: true,
        },
        details: {
            type: String,
            required: true,
        }
    },
    manufacturer: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    creteadAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('DataSheet', fichaTecSchema)
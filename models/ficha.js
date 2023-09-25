const mongoose = require('mongoose');
const Category = require('../models/categories');

const fichaTecSchema = new mongoose.Schema({
    marca: {
        type: String,
        required: true,
    },
    modelo: {
        type: String || Number,
        required: true,
    },
    dataFab: {
        type: Number,
        required: true
    },
    dataVal: {
        type: Number,
        required: true,
    },
    dimensions: {
        type: String && Number,
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
    }
})

module.exports = mongoose.model('DataSheet', fichaTecSchema)
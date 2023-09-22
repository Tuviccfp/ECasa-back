const mongoose = require('mongoose');
const Category = require('../models/categories');
const SubCategory = require('../models/subcategories');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: SubCategory
    }
})

module.exports = mongoose.model('Product', productSchema);
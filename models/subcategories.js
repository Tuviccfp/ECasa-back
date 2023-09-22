const mongoose = require('mongoose');
const Category = require('../models/categories');

const subCategorieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category
    }
})

module.exports = mongoose.model('SubCategory', subCategorieSchema)
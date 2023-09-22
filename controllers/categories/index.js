const express = require('express');
const router = express.Router();
const Category = require('./../../models/categories');
const SubCategory = require('./../../models/subcategories');

router.get('/categories', async (req, res) => {
    try {
        let searchCategories = await Category.find({}, null);
        res.status(200).json(searchCategories);
    } catch (error) {
        res.status(500).json({message: "O servidor não conseguiu encontrar o que lhe foi solicitado."})
    }
})

router.get('/categories/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let searchCategoriesID = await Category.findById(id);
        res.status(200).json(searchCategoriesID)
    } catch (error) {
        res.status(500).json({message: 'O servidor não conseguiu encontrar o que lhe foi solicitado.'})
    }
})

router.get('/category/get-sub-categorys/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let searchSubCategoryID = await SubCategory.findById(id);
        res.status(200).json(searchSubCategoryID, { status: 'Busca encontrada'})
    } catch (error) {
        res.status(500).json({message: 'O servidor não conseguiu encontrar o que lhe foi solicitado.'})
    }
})

router.post('/save-categories', async (req, res) => {
    try {
        const { name } = req.body;
            let saveNewCategorie = new Category({name}); 
            await saveNewCategorie.save();
            res.status(201).json(saveNewCategorie)
    } catch (error) {
        res.status(500).json({message: "O servidor não conseguiu salvar a categoria"})
    }
})

router.post('/category/save-subcategories', async (req, res) => {
    try {
        const { name, category } = req.body;
        let saveNewSubCategory = new SubCategory({ name, category })
        await saveNewSubCategory.save();
        res.status(201).json(saveNewSubCategory)
    } catch (error) {
        res.status(500).json({ message: "O servidor não conseguiu salvar a subcategoria."})
    }
})

module.exports = router;
const express = require('express');
const router = express.Router();
const categories = require('./../../models/categories');

router.get('/categories', async (req, res) => {
    try {
        let searchCategories = await categories.find({}, null);
        res.status(200).json(searchCategories);
    } catch (error) {
        res.status(500).json({message: "Error a buscar a sessão categoria"})
    }
})

router.post('/save-categories', async (req, res) => {
    let { name } = req.body;
    let saveNewCategorie = new categories({name}); 
    try {
        await saveNewCategorie.save();
        res.status(201).json(saveNewCategorie)
    } catch (error) {
        res.status(500).json({message: "Error ao salvar a categoria"})
    }
})

module.exports = router;
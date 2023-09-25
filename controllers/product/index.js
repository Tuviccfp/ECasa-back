const express = require('express');
const Product = require('../../models/produtcs');
const router = express.Router();

router.get('/products', async (req, res) => {
    try {
        let searchProduct = await Product.find({}, null) 
        res.status(200).json({searchProduct})
    } catch (error) {
        res.status(500).json('Erro ao exibir a listra de produtos')
    }
})

router.get('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const productID = await Product.findById(id)
        
        if (!productID) {
            res.status(404).json({message: "Erro ao encontrar o produto selecionado"})
        }

        res.status(200).json(productID)
    } catch (error) {
        res.status(500).json({message: 'Erro ao capturar os dados'})
    }
})

router.get('/product/search-products', async (req, res) => {
    try {
        const { keyword } = req.query.keyword;
        const result = await Product.find({ name: keyword })
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json('Produto não encontrado')
    }
})

router.post('/save-products', async (req, res) => {
    let {name, price, img, short_description, long_description, category, subcategory} = req.body;
    const saveProduct = new Product({ name, price, img, short_description, long_description, category, subcategory });
    try {
        await saveProduct.save();
        res.status(201).json(saveProduct)
    } catch (error) {
        res.status(500).json({message: 'Erro ao salvar um produto.'})
        console.log(error)
    }
})

router.put('/products', (req, res) => {
})
router.delete('/products', (req, res) => {
})

module.exports = router;
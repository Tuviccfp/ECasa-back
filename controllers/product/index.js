const express = require('express');
const Product = require('../../models/produtcs');
const router = express.Router();

router.get('/products', (req, res) => {
    // Rota que irá exibir todos os produtos
})

router.get('/products/:categoriaId', async (req, res) => {
    try {
        const {categoriaId} = req.params;
        const product = await Product.find({ categorie: mongoose.Types.ObjectId(categoriaId)})
        console.log(product)
        res.status(200).json(product)
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
    let {name, price, img, short_description, long_description, categorie} = req.body;
    const saveProduct = new Product({ name, price, img, short_description, long_description, categorie });
    try {
        await saveProduct.save();
        res.status(201).json(saveProduct)
    } catch (error) {
        res.status(500).json({message: 'Erro ao salvar um produto.'})
    }
})

router.put('/products', (req, res) => {
})
router.delete('/products', (req, res) => {
})

module.exports = router;
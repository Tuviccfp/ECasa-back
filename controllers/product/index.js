const express = require('express');
const Product = require('../../models/produtcs');
const router = express.Router();
const DataSheet = require('../../models/ficha');
const { verifyToken } = require('../../middlewares/authMaster');

router.get('/products', async (req, res) => {
    try {
        let searchProduct = await Product.find({}, null) 
        res.status(200).json({searchProduct})
    } catch (error) {
        res.status(500).json('Erro ao exibir a listra de produtos')
    }
})

router.get('/products/:id',  async (req, res) => {
    try {
        const id = req.params.id;
        const productID = await Product.findById(id)
        
        if (productID) {
            const dataSheetProduct = await DataSheet.find ({product: id});
            
            const result = {
                productID,
                dataSheetProduct
            }
            res.status(200).json(result)
        } else {
            res.status(404).json({message: "Erro ao encontrar o produto selecionado"})
        }

        // res.status(200).json(productID)
    } catch (error) {
        res.status(500).json({message: 'Erro ao capturar os dados'})
    }
})

router.get('/product/search-products',  async (req, res) => {
    try {
        const { keyword } = req.query.keyword;
        const result = await Product.find({ name: keyword })
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json('Produto não encontrado')
    }
})

//Products router.
router.post('/save-products', verifyToken, async (req, res) => {
    if (req.user.user.role !== 'admin' || req.user.user.role !== 'func') {
        return res.status(403).json({message: 'Acesso negado'});
    }
    try {
        // let {name, price, img, short_description, long_description, category, subcategory } = req.body;
        const saveProduct = new Product(req.body);
        await saveProduct.save();
        res.status(201).json(saveProduct);
    } catch (error) {
        res.status(500).json({message: 'Erro ao salvar um produto.'})
        console.log(error);
    }
})

router.put('/products-updated/:id', verifyToken, async (req, res) => {
    if (req.user.user.role !== 'admin' || req.user.user.role !== 'func') {
        return res.status(403).json({message: 'Acesso negado'});
    }
    try {
        const id = req.params.id;
        const dataById = await Product.findById(id);
        if(!dataById) {
            return res.status(404).json({message: "Não é possível localizar o id"});
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({sucess: false, message: error.message})
    }
});

router.delete('/products-delete/:id', verifyToken, async (req, res) => {
    if (req.user.user.role !== 'admin') {
        return res.status(403).json({message: 'Acesso negado'});
    }
    try {
        const id = req.params.id;
        const dataById = await Product.findById(id);
        if (!dataById) {
            return res.status(404).json({message: "Não é possível localizar o id"});
        }
        await Product.findByIdAndDelete(dataById);
        res.status(204).json({message: "Produto deletado com sucesso"});
    } catch (error) {
        console.log(error);
        res.status(500).json({sucess: false, message: error.message});
    }
});

// Datasheet routers.
router.post('/products/save-datasheet', verifyToken, async (req, res) => {
    if (req.user.user.role !== 'admin' || req.user.user.role !== 'func') {
        return res.status(403).json({message: 'Acesso negado'});
    }
    try {
        const newDatasheet = new DataSheet(req.body);

        await newDatasheet.save();
        res.status(201).json(newDatasheet);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/products/datasheet-updated/:id', verifyToken, async (req, res) => {
    if (req.user.user.role !== 'admin' || req.user.user.role !== 'func') {
        return res.status(403).json({message: 'Acesso negado'});
    }
    try {
        const newDatasheet = new DataSheet(req.body);
        const id = req.params.id;
        const dataById = await DataSheet.findById(id);
        if (!dataById) {
            return res.status(404).json({message: "Não é possível localizar o id"})
        }
       const updatedDatasheet = await DataSheet.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updatedDatasheet);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/products/datasheet-delete/:id', verifyToken, async (req, res) => {
    if (req.user.user.role !== 'admin') {
        return res.status(403).json({message: 'Acesso negado'});
    }
    try {
        const id = req.params.id;
        const dataById = await DataSheet.findById(id);
        if (!dataById) {
            return res.status(404).json({message: "Não é possível localizar o id"})
        }
        await DataSheet.findByIdAndDelete(dataById);
        res.status(201).json({message: "Ficha técnica deletada com sucesso."});
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
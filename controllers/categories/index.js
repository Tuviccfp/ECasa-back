const express = require('express');
const router = express.Router();
const Category = require('./../../models/categories');
const SubCategory = require('./../../models/subcategories');
const Product = require('./../../models/produtcs')
const { verifyToken } = require('../../middlewares/authMaster');

router.get('/categories', async (req, res) => {
    try {
        let searchCategories = await Category.find({}, null);
        res.status(200).json(searchCategories);
    } catch (error) {
        res.status(500).json({message: "O servidor não conseguiu encontrar o que foi solicitado."})
    }
})

router.get('/categories/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const searchCategoriesID = await Category.findById(id);

        if(searchCategoriesID) {
            const responseProduct = await Product.find({category: id})
            const responseSubCategory = await SubCategory.find({ category: id })
            
            res.status(200).json({searchCategoriesID, responseProduct, responseSubCategory});
        } else {
            res.status(404).json({ message: 'Categoria não encontrada' });
        }
    } catch (error) {
        res.status(500).json({message: 'O servidor não conseguiu encontrar o que foi solicitado.'})
    }
})

router.get('/category/get-sub-categorys/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let searchSubCategoryID = await SubCategory.findById(id);
        if(searchSubCategoryID) {
            const responseProductBySubCategory = await Product.find({ subcategory: id })
            res.status(200).json({responseProductBySubCategory})
        } else {
            res.status(404).json({ message: 'O servidor não conseguiu encontrar o que foi solicitado.'})
        }
    } catch (error) {
        res.status(500).json({message: 'O servidor não conseguiu encontrar o que foi solicitado.'})
    }
})

router.post('/save-categories', verifyToken, async (req, res) => {
    if(req.user.user.role !== 'admin' || req.user.user.role !== 'func') {
        return res.status(403).json({message: 'Acesso negado'});
    }
    try {
            const createCategorie = {...req.body, author: req.user.user.role}
            const saveNewCategorie = new Category(createCategorie); 
            await saveNewCategorie.save();
            res.status(201).json(saveNewCategorie);
    } catch (error) {
        res.status(500).json({message: "O servidor não conseguiu salvar a categoria"});
    }
});

router.put('/updated-categories/:id', verifyToken, async (req, res) => {
    if (req.user.user.role !== 'admin' || req.user.user.role !== 'func') {
        return res.status(403).json({message: 'Acesso negado'});
    }
    try {
        const id = req.params.id;
        const dataById = await Category.findById(id);
        if (!dataById) {
            return res.status(404).json({message: 'Não é possível localizar o id'});
        }
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({sucess: false, message: error.message});
    }
})

router.delete('/delete-categories/:id', verifyToken, async (req, res) => {
    if (req.user.user.role !== 'admin') {
        return res.status(403).json({message: 'Acesso negado'});
    }
    try {
        const id = req.params.id;
        const dataById = await Category.findById(id);
        if (!dataById) {
            return res.status(404).json({message: 'Não é possível localizar o id'});
        }
        await Category.findByIdAndDelete(dataById);
        res.status(200).json({message: 'Categoria deletada com sucesso'});
    } catch (error) {
        res.status(500).json({sucess: false, message: error.message});
    }
});

router.post('/category/save-subcategories', verifyToken, async (req, res) => {
    try {
        const createSubCategorie = {...req.body, author: req.user.user._id};
        let saveNewSubCategory = new SubCategory(createSubCategorie);
        await saveNewSubCategory.save();
        res.status(201).json(saveNewSubCategory);
    } catch (error) {
        res.status(500).json({ message: "O servidor não conseguiu salvar a subcategoria."});
    }
});

router.put('/updated-subcategories/:id', verifyToken, async (req, res) => {
    if (req.user.user.role !== 'admin' || req.user.user.role !== 'func') {
        return res.status(403).json({message: 'Acesso negado'});
    }
    try {
        const id = req.params.id;
        const dataById = await SubCategory.findById(id);
        if (!dataById) {
            return res.status(404).json({message: 'Não é possível localizar o id'});
        }
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(updatedSubCategory);
    } catch (error) {
        res.status(500).json({sucess: false, message: error.message});
    }
})

router.delete('/delete-subcategories/:id', verifyToken, async (req, res) => {
    if (req.user.user.role !== 'admin') {
        return res.status(403).json({message: 'Acesso negado'});
    }
    try {
        const id = req.params.id;
        const dataById = await SubCategory.findById(id);
        if (!dataById) {
            return res.status(404).json({message: 'Não é possível localizar o id'});
        }
        await SubCategory.findByIdAndDelete(dataById);
        res.status(200).json({message: 'Sub Categoria deletada com sucesso'});
    } catch (error) {
        res.status(500).json({sucess: false, message: error.message});
    }
});

module.exports = router;
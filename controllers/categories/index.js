const express = require('express');
const router = express.Router();
const Category = require('./../../models/categories');
const SubCategory = require('./../../models/subcategories');
const Product = require('./../../models/produtcs')
const CheckPermissions = require('../../middlewares/checkPermission');

// router.get('/categories', CheckPermissions([["USER_ROLE"]]), async (req, res) => {
//     try {
//         let searchCategories = await Category.find({}, null);
//         res.status(200).json(searchCategories);
//     } catch (error) {
//         res.status(500).json({message: "O servidor não conseguiu encontrar o que foi solicitado."})
//     }
// })

// router.get('/categories/:id', CheckPermissions([["USER_ROLE"]]), async (req, res) => {
//     try {
//         const id = req.params.id;
//         const searchCategoriesID = await Category.findById(id);

//         if(searchCategoriesID) {
//             const responseProduct = await Product.find({category: id})
//             const responseSubCategory = await SubCategory.find({ category: id })
            
//             res.status(200).json({searchCategoriesID, responseProduct, responseSubCategory});
//         } else {
//             res.status(404).json({ message: 'Categoria não encontrada' });
//         }
//     } catch (error) {
//         res.status(500).json({message: 'O servidor não conseguiu encontrar o que foi solicitado.'})
//     }
// })

// router.get('/category/get-sub-categorys/:id', CheckPermissions([["USER_ROLE"]]), async (req, res) => {
//     try {
//         const id = req.params.id;
//         let searchSubCategoryID = await SubCategory.findById(id);
//         if(searchSubCategoryID) {
//             const responseProductBySubCategory = await Product.find({ subcategory: id })
//             res.status(200).json({responseProductBySubCategory})
//         } else {
//             res.status(404).json({ message: 'O servidor não conseguiu encontrar o que foi solicitado.'})
//         }
//     } catch (error) {
//         res.status(500).json({message: 'O servidor não conseguiu encontrar o que foi solicitado.'})
//     }
// })

// router.post('/save-categories', CheckPermissions([["ADMIN_ROLE"]]), async (req, res) => {
//     try {
//         const { name } = req.body;
//             let saveNewCategorie = new Category({name}); 
//             await saveNewCategorie.save();
//             res.status(201).json(saveNewCategorie)
//     } catch (error) {
//         res.status(500).json({message: "O servidor não conseguiu salvar a categoria"})
//     }
// })

// router.post('/category/save-subcategories', CheckPermissions([["ADMIN_ROLE"]]), async (req, res) => {
//     try {
//         const { name, category } = req.body;
//         let saveNewSubCategory = new SubCategory({ name, category })
//         await saveNewSubCategory.save();
//         res.status(201).json(saveNewSubCategory)
//     } catch (error) {
//         res.status(500).json({ message: "O servidor não conseguiu salvar a subcategoria."})
//     }
// })

// module.exports = router;
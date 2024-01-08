const express = require('express');
const router = express.Router();
const Func = require('../../models/func');
const Admin = require('../../models/admin');
const {verifyToken} = require('../../middlewares/authMaster');

router.get('/get-func', verifyToken, async (req, res) => {
    if(req.user.user.role !== 'func') {
        return res.status(403).json({message: 'Acesso negado'});
    }
    try {
        const getFunc = Func.find().sort({createdAt: -1});
        res.status(200).json(getFunc);
    } catch (error) {
        console.log('Error: ', error.message);
        res.status(500).json({sucess: false, message: error.message});
    }
});

router.get('/get-func/:id', verifyToken, async (req, res) => {
    if (req.user.user.role !== 'func') {
        return res.status(403).json({message: 'Acesso negado'});
    }
    try {
        const id = req.params.id;
        const dataById = await Func.findById(id);
        if (!dataById) {
            return res.status(404).json({message: "Não é possível localizar o id"});
        }
        const response = await Func.find({funcId: dataById.id}).sort({createdAt: -1});
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({sucess: false, message: error.message});
    }
});

router.get('/get-admins', verifyToken, async (req, res) => {
    if(req.user.user.role !== 'func') {
        return res.status(403).json({message: 'Acesso negado'});
    }
    try {
        const getAdmins = Admin.find().sort({createdAt: -1});
        res.status(200).json(getAdmins);
    } catch (error) {
        console.log('Error: ', error.message);
        res.status(500).json({sucess: false, message: error.message});
    }
});

router.get('/get-admins/:id', verifyToken, async (req, res) => {
    if (req.user.user.role !== 'func') {
        return res.status(403).json({message: 'Acesso negado'});
    }
    try {
        const id = req.params.id;
        const dataById = await Admin.findById(id);
        if (!dataById) {
            return res.status(404).json({message: "Não é possível localizar o id"});
        }
        const response = await Admin.find({adminId: dataById.id}).sort({createdAt: -1});
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({sucess: false, message: error.message});
    }
});


module.exports = router;
const express = require('express');
const router = express.Router();
const Admin = require('../../models/admin');
const Func = require('../../models/func');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../../middlewares/authMaster');

router.get('/profile', verifyToken, async (req, res) => {
    const token = req.header('xoxota');

    if(!token) {
        return res.status(401).json({message: 'Não autorizado'});
    }

    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if(err) {
            return res.status(401).json({message: "Não autorizado"})
        }
        res.json({ user });
    });
});

router.post('/create-user-func', verifyToken, async (req, res) => {
    console.log(req.user.user.role)
    if (req.user.user.role !== 'admin') {
        return res.status(403).json({message: 'Acesso negado'})
    }
    try {
        const createFunc = {...req.body, author: req.user.user._id}
        const newFunc = new Func(createFunc);
        await newFunc.save();
        res.status(201).json({sucess: true, message: 'Admin create'});
    } catch (error) {
        console.log('O usuário admin não foi criado.')
        res.status(500).json({sucess: false, message: error.message});
    }
});

router.get('/get-func', verifyToken, async (req, res) => {
    if(req.user.user.role !== 'admin') {
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
    if (req.user.user.role !== 'admin') {
        return res.status(403).json({message: 'Forbidden'});
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

router.put('/updated-func/:id', verifyToken, async (req, res) => {
    if(req.user.user.role !== 'admin') {
        return res.status(403).json({message: 'Forbidden'});
    }
    try {
        const id = req.params.id;
        const dataById = await Func.findById(id);
        if (!dataById) {
           return res.status(404).json({message: "Não é possível localizar o id"});
        }
        const updatedFunc = await Func.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedFunc);
    } catch (error) {
        console.log(error);
        res.status(500).json({sucess: false, message: error.message});
    }
});

router.delete('/delete-func/:id', verifyToken, async (req, res) => {
    if(req.user.user.role !== 'admin') {
        return res.status(403).json({message: 'Forbidden'});
    }
    try {
        const id = req.params.id;
        const dataById = await Func.findById(id);
        if (!dataById) {
            return res.status(404).json({message: 'Não é possível localizar o id'});
        }
        await Func.findByIdAndDelete(dataById);
        res.status(204).json({message: 'Funcionário deletado com sucesso.'});
    } catch (error) {
        console.log(error);
        res.status(500).json({sucess: false, message: error.message});
    }
});

//Routers for list admin and configurations
router.get('/get-admins', verifyToken, async (req, res) => {
    if (req.user.user.role !== 'admin') {
        return res.status(403).json({message: 'Acesso negado'});
    }
    try {
        const getAdmins = await Admin.find({}).sort({createdAt: -1});
        res.status(200).json(getAdmins);
    } catch (error) {
        res.status(500).json({sucess: false, message: error.message});
    }
});

router.get('/get-admins/:id', verifyToken, async (req, res) => {
    if (req.user.user.role !== 'admin') {
        return res.status(403).json({message: 'Acesso negado'});
    }
    try {
        const id = req.params.id;
        const dataById = await Admin.findById(id);
        if (!dataById) {
            return res.status(404).json({message: 'Não é possível localizar o id'});
        }
        const response = await Admin.find({adminId: dataById.id}).sort({createdAt: -1});
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({sucess: false, message: error.message});
    }
});

module.exports = router;
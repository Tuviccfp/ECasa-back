const express = require('express');
const router = express.Router();
const Master = require('../../models/master');
const Admin = require('../../models/admin');
const {verifyToken} = require('../../middlewares/authMaster');

router.post('/create-master-login', async (req, res) => {
    const { name, nickname, password } = req.body;
    try {
        const newMaster = new Master({
            name,
            nickname,
            password
        })
        await newMaster.save();
        res.status(201).json({sucess: true, message: 'Master created'});
    } catch (error) {
        console.log(error);
        res.status(500).json({sucess: false, message: error.message});
    }
});


router.post('/create-user-admin', verifyToken, async (req, res) => {
    console.log(req.user.user.role)
    if (req.user.user.role !== 'master') {
        return res.status(403).json({message: 'Acesso negado'})
    }
    try {
        const createAdmin = {...req.body, author: req.user.user._id}
        const newAdmin = new Admin(createAdmin);
        await newAdmin.save();
        res.status(201).json({sucess: true, message: 'Admin create'});
    } catch (error) {
        console.log('O usuário admin não foi criado.')
        res.status(500).json({sucess: false, message: error.message});
    }
});

router.get('/get-admins', verifyToken, async (req, res) => {
    if(req.user.user.role !== 'master') {
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
    if (req.user.user.role !== 'master') {
        return res.status(403).json({message: 'Forbidden'});
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

router.put('/updated-admin/:id', verifyToken, async (req, res) => {
    if(req.user.user.role !== 'master') {
        return res.status(403).json({message: 'Forbidden'});
    }
    try {
        const id = req.params.id;
        const dataById = await Admin.findById(id);
        if (!dataById) {
            return res.status(404).json({message: "Não é possível localizar o id"});
        }
        const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedAdmin);
    } catch (error) {
        console.log(error);
        res.status(500).json({sucess: false, message: error.message});
    }
});

router.delete('/delete-admin/:id', verifyToken, async (req, res) => {
    if(req.user.user.role !== 'master') {
        return res.status(403).json({message: 'Forbidden'});
    }
    try {
        const id = req.params.id;
        const dataById = await Admin.findById(id);
        if (!dataById) {
            return res.status(404).json({message: 'Não é possível localizar o id'});
        }
        await Admin.findByIdAndDelete(dataById);
        res.status(204).json({message: 'Administrador deletado com sucesso.'});
    } catch (error) {
        console.log(error);
        res.status(500).json({sucess: false, message: error.message});
    }
});

module.exports = router;

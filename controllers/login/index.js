const express = require('express');
const router = express.Router();
const Master = require('../../models/master');
const Admin = require('../../models/admin');
const Func = require('../../models/func');
const User = require('../../models/user'); 
const { createToken } = require('../../middlewares/authMaster');

router.post('/login-master', async (req, res) => {
    const {nickname, password} = req.body;
    try {
        const user = await Master.findOne({nickname});
        if(!user || !(await user.isCorrect(password))) {
            return res.status(401).json({message: 'Credenciais inválidas'});
        }
        const token = createToken({ nickname: user.nickname, role: user.role, _id: user._id});
        res.json({token});
    } catch (error) {
        console.log('erro');
        res.status(500).json({sucess: false, message: error.message});
    }
});

router.post('/login-admin', async (req, res) => {
    const {matricula, password} = req.body;
    try {
        const user = await Admin.findOne({matricula});
        if (!user || !(await user.isCorrect(password))) {
            return res.status(401).json({message: "Credenciais inválidas"})
        }
        const token = createToken({ 
            _id: user._id,
            name: user.name,
            nickname: user.nickname,
            email: user.email,
            matricula: user.matricula,
            role: user.role,
            createdAt: user.createdAt
        });
        res.json({token});
    } catch (error) {
        console.log('Não foi possível logar');
        res.status(500).json({sucess: false, message: error.message});
    }
});

router.post('/login-funcionarios', async (req, res) => {
    const {matricula, password} = req.body;
    try {
        const user = await Func.findOne({matricula});
        if (!user || !(await user.isCorrect(password))) {
            return res.status(401).json({message: "Credenciais inválidas"});
        }
        const token = createToken({
            _id: user._id,
            name: user.name,
            email: user.email,
            matricula: user.matricula,
            role: user.role,
        });
        res.json({token});
    } catch (error) {
        console.log('Erro ao logar.');
        res.status(500).json({sucess: false, message: error.message});
    }
});

router.post('/login-user', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user || !(await user.isCorrect(password))) {
            return res.status(401).json({message: "Credenciais inválidas"});
        }
        const token = createToken({
            name: user.name,
            email: user.email,
            password: user.password,
            age: user.age,
            cpf: user.cpf,
            cep: user.enderess.cep,
            street: user.enderess.street,
            num: user.enderess.num,
            complement: user.enderess.complement
        })
        res.json({token});
    } catch (error) {
        console.log('Erro ao logar.');
        res.status(500).json({sucess: false, message: error.message});
    }
});

module.exports = router
const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.post('/create-new-user', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({sucess: true, message: "Usuário criado com sucesso."});
    } catch (error) {
        console.log(error);
        res.status(500).json({sucess: false, message: "Houve um erro ao criar a conta."})
    }
});

// router.get('/profile', veri)

module. exports = router;

const mongoose = require('mongoose');

const invalidToken = new mongoose.Schema({
    token: {
        type: String,
        require: true,
        unique: true,
    }
});

module.exports = mongoose.model('InvalidatedToken', invalidToken);

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    matricula: {
        type: Number,
        default: () => Math.round(Math.random() * 100000)
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Master',
        required: true,
    },
    role: {
        type: String,
        default: 'admin',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

adminSchema.pre("save", async function (next) {
    const admin = this;
    if (!admin.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
    next();
});

adminSchema.methods.isCorrect = function (password, next) {
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('Admin', adminSchema);
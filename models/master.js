const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const masterSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'admin_master'
    },
    nickname: {
        type: String,
        default: 'admin_master'
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'master'
    }
});

masterSchema.pre("save", async function (next) {
    const master = this;
    if (!master.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    master.password = await bcrypt.hash(master.password, salt);
    next();
});

masterSchema.methods.isCorrect = function (password, next) {
   return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('Master', masterSchema);
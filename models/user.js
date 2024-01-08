const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    cpf: {
        type: String,
        required: true 
    },
    enderess: {
        cep: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        num: {
            type: Number,
            required: true,
        },
        complement: {
            type: String,
            required: true
        }
    },
    roles: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

userSchema.methods.isCorrect = function (password, next) {
   return bcrypt.compare(password, this.password);
}


module.exports = mongoose.model('User', userSchema);
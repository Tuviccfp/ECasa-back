const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const funcSchema = new mongoose.Schema({
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
    required: true,
  },
  matricula: {
    type: Number,
    default: () => Math.round(Math.random() * 100000),
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  role: {
    type: String,
    default: "func",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

funcSchema.pre("save", async function (next) {
  const func = this;
  if (!func.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  func.password = await bcrypt.hash(func.password, salt);
  next();
});

funcSchema.methods.isCorrect = function (password, next) {
 return bcrypt.compare(password, this.password);
}


module.exports = mongoose.model('Func', funcSchema);
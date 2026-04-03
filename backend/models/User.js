const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  cellphone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;


// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   cellphone: String,

//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user'
//   }

// }, { timestamps: true });
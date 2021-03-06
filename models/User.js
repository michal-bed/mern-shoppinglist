// import { Schema, model } from 'mongoose';
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

const User = model('User', UserSchema);

// export default User;
module.exports = User;

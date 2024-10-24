const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  aadharNumber: { type: String, required: true, unique: true },
  voterId: { type: String, required: true },
  fingerprint: { type: String, required: true }, // or use a more suitable format
  age: { type: Number, required: true, min: 18 }, // Ensure age is at least 18
});

const User = mongoose.model('User', userSchema);
module.exports = User;

// server/models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Make sure usernames are unique
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Admin', adminSchema);

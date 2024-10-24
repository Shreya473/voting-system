const mongoose = require('mongoose');

// Define the Vote schema
const voteSchema = new mongoose.Schema({
  aadharNumber: { type: String, required: true, unique: true },
  voterId: { type: String, required: true },
  party: { type: String, required: true }, // Party the user is voting for
  timestamp: { type: Date, default: Date.now }, // Automatically add a timestamp
});

// Create the Vote model using the schema
const Vote = mongoose.model('Vote', voteSchema);

// Export the model to be used in other parts of the app
module.exports = Vote;

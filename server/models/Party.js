const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
  name: { type: String, required: true },
  votes: { type: Number, default: 0 },
});
// Create the Vote model using the schema
const Party = mongoose.model('Party', partySchema);

// Export the model to be used in other parts of the app
module.exports = Party;

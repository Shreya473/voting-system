const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const User = require("./models/User");
const Vote = require("./models/Vote");
const Party = require("./models/Party"); // Import Party model


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/VotingSystem", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { name, aadharNumber, voterId, fingerprint, age } = req.body;

  try {
    const existingUser = await User.findOne({ aadharNumber });
    if (existingUser) {
      return res.status(400).json({ error: 'Aadhar number already registered.' });
    }

    const newUser = new User({
      name,
      aadharNumber,
      voterId,
      fingerprint,
      age,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Verify endpoint
app.post('/api/verify', async (req, res) => {
  const { aadharNumber, voterId, fingerprint } = req.body;

  try {
    const user = await User.findOne({ aadharNumber, voterId, fingerprint });
    if (!user) {
      return res.status(400).json({ error: 'User verification failed. Invalid Aadhar number or fingerprint.' });
    }

    res.status(200).json({ message: 'User verification successful!', user });
  } catch (error) {
    res.status(500).json({ error: 'Server error during verification.' });
  }
});

// Save vote and increment party votes
app.post('/api/save-vote', async (req, res) => {
  const { aadharNumber, voterId, selectedParty } = req.body;

  try {
    const newVote = new Vote({ aadharNumber, voterId, selectedParty });
    await newVote.save();

    // Increment the votes count for the selected party
    const party = await Party.findOneAndUpdate(
      { name: selectedParty },
      { $inc: { votes: 1 } },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Vote saved successfully', party });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save vote' });
  }
});

// Get vote counts for all parties
app.get('/api/parties', async (req, res) => {
  try {
    const parties = await Party.find();
    res.status(200).json(parties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vote counts' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

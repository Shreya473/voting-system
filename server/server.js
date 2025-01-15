const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const User = require("./models/User");
const Vote = require("./models/Vote");
const Party = require("./models/Party"); // Import Party model
const Admin = require("./models/Admin"); // Import Admin model
const bcrypt = require('bcrypt');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, '../images')));
console.log(__dirname + "/../images");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/VotingSystem", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Admin SignIn Route
app.post('/api/admin-signin', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    res.json({ success: true, message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin Login Route
app.post('/api/admin-login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ success: false, message: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid username or password' });

    res.json({ success: true, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

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
  const { aadharNumber, voterId, party } = req.body;
  console.log('Received party:', party); // Debugging line
  try {
    // Check if the user has already voted
    const existingVote = await Vote.findOne({ aadharNumber });
    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted.' });
    }

    // Save new vote
    const newVote = new Vote({ aadharNumber, voterId, party });
    await newVote.save();

    // Increment the votes count for the selected party
    const updatedParty = await Party.findOneAndUpdate(
      { name: party },
      { $inc: { votes: 1 } },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: 'Vote saved successfully', updatedParty });
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

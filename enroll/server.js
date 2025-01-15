const express = require('express');
const bodyParser = require('body-parser');
const { SerialPort } = require('serialport');
const {ReadlineParser} = require('@serialport/parser-readline');
const cors = require("cors");


const app = express();
const port = 5001;

// Middleware to parse incoming request bodies in JSON format
app.use(bodyParser.json());
app.use(cors());

// Set up Serial communication with Arduino
const arduinoPort = new SerialPort({ path: 'COM5', baudRate: 9600 });  // Use your actual COM port
const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\n' }));

// Store fingerprint data fetched from Arduino
let FingerStatus = false;
let fingerprintData = '';
let fingerprintID = '';


// Listen for data from the Arduino
parser.on('data', (data) => {
  console.log('Received data from Arduino:', data);

  // Check if the Arduino sent fingerprint data
  if (data.startsWith('Found ID: ')) {
    fingerprintData = data.replace('Found ID: ', '').trim();
  }


  if (data.startsWith('FINGERPRINT_ID:')) {
    fingerprintID = data.replace("FINGERPRINT_ID: ", '').trim();
  }
});

app.get('/api/verify-fingerprint', (req, res) => {
 
  // Send command to Arduino to fetch fingerprint
  arduinoPort.write('VERIFY_FINGERPRINT\n');

  // Wait for fingerprint data
  setTimeout(() => {
    if (fingerprintData) {
      res.json({ fingerprint: fingerprintData });
      // Clear the stored fingerprint data after sending it
      fingerprintData = '';
    } else {
      fingerprintData = '';
      res.status(500).json({ error: 'Failed to fetch fingerprint' });
    }
  }, 6000);  // Wait for 3 seconds to allow the Arduino to process and return data
});

// Endpoint to fetch fingerprint from Arduino
app.get('/api/fetch-fingerprint', (req, res) => {
  // Send command to Arduino to fetch fingerprint
  arduinoPort.write('FETCH_FINGERPRINT\n');

  // Wait for fingerprint data
  setTimeout(() => {
    if (fingerprintID) {
      res.json({ fingerprint: fingerprintID });
      // Clear the stored fingerprint data after sending it
      fingerprintID = '';
    } else {
      fingerprintID = '';
      res.status(500).json({ error: 'Failed to fetch fingerprint' });
    }
  }, 6000);  // Wait for 3 seconds to allow the Arduino to process and return data
});

// Endpoint for user registration
app.post('/api/register', (req, res) => {
  const { name, aadharNumber, voterId, fingerprint, age } = req.body;

  if (!name || !aadharNumber || !voterId || !fingerprint || !age) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // You can add logic here to save this data in a database (MongoDB, MySQL, etc.)
  console.log('Registering user:', { name, aadharNumber, voterId, fingerprint, age });

  res.json({ message: 'Registration successful!' });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

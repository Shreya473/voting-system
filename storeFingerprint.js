const { SerialPort } = require('serialport');
const { MongoClient }  = require('mongodb');
const { ReadlineParser } = require('@serialport/parser-readline');

// MongoDB connection URL and Database
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'fingerprintDB';
const collectionName = 'fingerprints';

// Set up serial port to read from Arduino (change 'COM19' to your actual port)
const port = new SerialPort({path: 'COM19', baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Function to store data in MongoDB
async function storeData(aadhaar, fingerprintId) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    
    // Store Aadhaar and fingerprint ID in the database
    const result = await collection.insertOne({ aadhaar, fingerprintId });
    console.log(`Data inserted with _id: ${result.insertedId}`);
  } catch (error) {
    console.error('Error inserting data: ', error);
  } finally {
    await client.close();
  }
}

// Read data from Arduino
parser.on('data', (data) => {
  const parsedData = data.toString().split(','); // Assuming data comes in a CSV format like "aadhaar,fingerprintId"

  // Check if parsedData contains both aadhaar and fingerprintId
  if (parsedData.length < 2) {
    console.error('Invalid data received:', data);
    return;
  }

  const aadhaar = parsedData[0];
  const fingerprintId = parsedData[1];

  // Ensure both aadhaar and fingerprintId are not undefined
  if (!aadhaar || !fingerprintId) {
    console.error('Aadhaar or Fingerprint ID is missing!');
    return;
  }

  // Now safely trim and use them
  storeData(aadhaar.trim(), parseInt(fingerprintId.trim(), 10));
});

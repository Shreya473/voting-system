const { SerialPort } = require('serialport');

const port = new SerialPort({ path: 'COM19', baudRate: 9600 }); // Change 'COM19' to the correct port

port.on('open', () => {
  console.log('Port opened successfully!');
  port.close();
});

port.on('error', (err) => {
  console.error('Error opening port:', err.message);
});

const express = require('express');
const app = express();
const port = process.env.PUBLIC_PORT || 3000;
const dotenv = require('dotenv');
dotenv.config();

const URI = process.env.URI;
let connectionStatus = 'Disconnected';
const mongoose = require('mongoose');

const startDatabase = async () => {
  try {
    await mongoose.connect(URI);
    connectionStatus = 'Connected';
    console.log('Database connected');
  } catch (err) {
    console.error('Failed Connection', err);
    connectionStatus = 'Failed';
  }
};

// define the ping route
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/', async (req, res) => {
  res.send(connectionStatus);
});

const startServer = async () => {
  try {
    await startDatabase();
    app.listen(port, () => {
      console.log(`🚀 server running on PORT: ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;

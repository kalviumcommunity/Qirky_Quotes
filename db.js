const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

let connectionStatus = 'disconnected';

const startDatabase = async () => {
    try {
        await mongoose.connect(process.env.URI);
        connectionStatus = "Congratulations the database has been connected!!";
    } catch (err) {
        console.error("Failed to connect to database");
        connectionStatus = "Failed to connect to database";
    }
};

const stopDatabase = async () => {
    await mongoose.disconnect();
    connectionStatus = "Database disconnected";
};

const getConnectionStatus = async () => {
    return JSON.stringify(connectionStatus);
};

module.exports = { startDatabase, stopDatabase, getConnectionStatus };
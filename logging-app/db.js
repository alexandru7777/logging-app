const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI; // Your MongoDB connection string
const client = new MongoClient(uri);

let mongodb;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

const getDB = () => {
    return mongodb;
};

const closeConnection = () => {
    client.close();
};

module.exports = { connectDB, getDB, closeConnection };

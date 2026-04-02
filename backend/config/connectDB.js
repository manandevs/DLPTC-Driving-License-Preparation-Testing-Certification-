const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30_000,
      dbName: 'test',
    });
    console.log('MongoDB connected');
    console.log('Connected to DB:', mongoose.connection.name);
    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
};

module.exports = connectDB;
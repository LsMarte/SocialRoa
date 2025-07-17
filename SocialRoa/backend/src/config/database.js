const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use the MongoDB URI from environment variables
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/socialroa';
    
    console.log('Connecting to MongoDB at:', mongoUri);
    
    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    
    // If connection fails, try with MongoDB Memory Server as fallback
    console.log('Trying MongoDB Memory Server as fallback...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const fallbackUri = mongoServer.getUri();
      
      console.log('MongoDB Memory Server started at:', fallbackUri);
      
      await mongoose.connect(fallbackUri);
      console.log('Connected to MongoDB Memory Server');
    } catch (fallbackError) {
      console.error('MongoDB Memory Server also failed:', fallbackError);
      console.log('Please install and start MongoDB manually, or check your MongoDB connection.');
      // Don't exit the process, let the app continue without database for now
    }
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};

module.exports = { connectDB, disconnectDB };

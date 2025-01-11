import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

// Global cache for mongoose connection
let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return; // Prevent multiple connections

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true; // Set connection state
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

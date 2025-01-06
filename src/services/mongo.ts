import mongoose from 'mongoose';

export const connectDB = async () => {
  if (mongoose.connection.readyState) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
   
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

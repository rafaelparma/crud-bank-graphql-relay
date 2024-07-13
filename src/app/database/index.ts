import mongoose from 'mongoose';
import { mongoConfig } from '../configs';

export default async function connectMongoDB() {
    try {
        await mongoose.connect(mongoConfig.MONGODB_URI as string, { serverSelectionTimeoutMS: 10000, autoIndex: true })        
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
    }
  }

export async function disconnectMongoDB() {
  try {
      await mongoose.disconnect();      
  } catch (err) {
    console.error("Error disconnecting to MongoDB:", err);
  }
}
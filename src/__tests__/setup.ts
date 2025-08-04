import mongoose from 'mongoose';
import connectDB from '../config/db';

beforeAll(async () => {
  // Override MongoDB URI to use test database
  process.env.MONGODB_URI = process.env.MONGODB_URI?.replace('healthcheck-db', 'healthcheck-db-test');
  await connectDB();
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});

afterEach(async () => {
  // Clean up test data after each test
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.collection('declarations').deleteMany({});
  }
});
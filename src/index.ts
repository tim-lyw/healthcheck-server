import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import declarationRoutes from './routes/declarationRoutes';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json({ limit: '10mb' }));
if (!process.env.CORS_WHITELIST) {
  throw new Error('CORS_WHITELIST environment variable is required');
}

app.use(cors({
  origin: process.env.CORS_WHITELIST.split(','),
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use('/api/declarations', declarationRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    mongoose.connection.close();
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    mongoose.connection.close();
    process.exit(0);
  });
}); 
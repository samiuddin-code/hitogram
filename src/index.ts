import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import express from 'express';
import cors from 'cors'; // Import CORS middleware
import connectDB from './routes/db'; // Import your database connection function
import puzzleRouter from './routes/puzzle'; // Import your puzzle routes

const app = express();
const port = 3001;

app.use(cors({
  origin: ['http://localhost:3000', 'http://159.89.104.127'], // Add all your frontend origins here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json()); // Parse JSON bodies

// Connect to database
connectDB();

// Use the puzzle router
app.use('/puzzle', puzzleRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

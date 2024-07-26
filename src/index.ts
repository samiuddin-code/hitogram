import express from 'express';
import cors from 'cors'; // Import CORS middleware
import connectDB from './routes/db';
import puzzleRouter from './routes/puzzle';

const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
}));
app.use(express.json()); // Parse JSON bodies

connectDB();

app.use('/puzzle', puzzleRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

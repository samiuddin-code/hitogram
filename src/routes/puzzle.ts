// routes/puzzle.ts
import { Router, Request, Response } from 'express';
import Puzzle from '../models/Puzzle';
import User from '../models/User';
import { SubmitRequestBody } from '../types'; // Adjust the path as needed

const router = Router();

interface PuzzleResponse {
  grid: number[][];
  difficulty: string;
  _id: string;
  __v: number;
}

router.get('/generate', async (req: Request, res: Response) => {
  const difficulty = Array.isArray(req.query.difficulty) ? req.query.difficulty[0] : req.query.difficulty || 'easy';
  try {
    const puzzle = await generatePuzzle(difficulty as string);
    if (!puzzle) {
      return res.status(404).json({ error: 'Puzzle not generated' });
    }
    res.json(puzzle);
  } catch (error) {
    console.error('Error generating puzzle:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const generatePuzzle = async (difficulty: string) => {
  const grid = generateGrid(difficulty);
  const puzzle = new Puzzle({ grid, difficulty });
  await puzzle.save();
  return puzzle;
};

const generateGrid = (difficulty: string): number[][] => {
  if (difficulty === 'easy') {
    return [
      [1, 2],
      [2, 1],
    ];
  } else if (difficulty === 'medium') {
    return [
      [1, 2, 3],
      [3, 1, 2],
      [2, 3, 1],
    ];
  } else if (difficulty === 'hard') {
    return [
      [1, 2, 3, 4],
      [4, 1, 2, 3],
      [3, 4, 1, 2],
      [2, 3, 4, 1],
    ];
  }
  return [];
};

router.post('/submit', async (req: Request<{}, {}, SubmitRequestBody>, res: Response) => {
  const { username, puzzleId, solution, completionTime } = req.body; // Include completionTime in the request body

  try {
    const puzzle = await Puzzle.findById(puzzleId);

    if (!puzzle) {
      return res.status(404).json({ error: 'Puzzle not found' });
    }

    console.log('Puzzle Grid:', puzzle.grid);
    console.log('Submitted Solution:', solution);

    const isCorrect = evaluateSolution(puzzle.grid, solution);

    if (isCorrect) {
      const user = await User.findOneAndUpdate(
        { username },
        {
          $inc: { highScore: 1 },
          $push: { completionTimes: { puzzleId, time: completionTime } }
        },
        { new: true, upsert: true }
      );
      return res.json({ success: true, user });
    } else {
      return res.json({ success: false });
    }
  } catch (error) {
    console.error('Error submitting puzzle solution:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
const evaluateSolution = (grid: number[][], solution: { row: number, col: number }[][]): boolean => {
  console.log('Expected Grid:', grid);
  console.log('Submitted Solution:', solution);

  // Create a new grid based on the solution
  const solutionGrid = grid.map(row => row.slice()); // Copy the grid
  for (const pair of solution) {
    // `pair` is an array of two cells, so loop through each cell
    for (const { row, col } of pair) {
      // Check if coordinates are within bounds
      if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length) {
        console.log(`Invalid coordinates: (${row}, ${col})`);
        return false;
      }
      // Mark the solution cells
      solutionGrid[row][col] = 1; // Example: mark with 1, you can adjust this logic
    }
  }

  // Flatten both grids for comparison
  const flatGrid = grid.flat();
  const flatSolutionGrid = solutionGrid.flat();

  // Compare each value
  return flatGrid.every((value, index) => value === flatSolutionGrid[index]);
};


export default router;

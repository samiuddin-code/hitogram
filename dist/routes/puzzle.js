"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/puzzle.ts
const express_1 = require("express");
const Puzzle_1 = __importDefault(require("../models/Puzzle"));
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
router.get('/generate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const difficulty = Array.isArray(req.query.difficulty) ? req.query.difficulty[0] : req.query.difficulty || 'easy';
    try {
        const puzzle = yield generatePuzzle(difficulty);
        if (!puzzle) {
            return res.status(404).json({ error: 'Puzzle not generated' });
        }
        res.json(puzzle);
    }
    catch (error) {
        console.error('Error generating puzzle:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
const generatePuzzle = (difficulty) => __awaiter(void 0, void 0, void 0, function* () {
    const grid = generateGrid(difficulty);
    const puzzle = new Puzzle_1.default({ grid, difficulty });
    yield puzzle.save();
    return puzzle;
});
const generateGrid = (difficulty) => {
    if (difficulty === 'easy') {
        return [
            [1, 2],
            [2, 1],
        ];
    }
    else if (difficulty === 'medium') {
        return [
            [1, 2, 3],
            [3, 1, 2],
            [2, 3, 1],
        ];
    }
    else if (difficulty === 'hard') {
        return [
            [1, 2, 3, 4],
            [4, 1, 2, 3],
            [3, 4, 1, 2],
            [2, 3, 4, 1],
        ];
    }
    return [];
};
router.post('/submit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, puzzleId, solution, completionTime } = req.body; // Include completionTime in the request body
    try {
        const puzzle = yield Puzzle_1.default.findById(puzzleId);
        if (!puzzle) {
            return res.status(404).json({ error: 'Puzzle not found' });
        }
        console.log('Puzzle Grid:', puzzle.grid);
        console.log('Submitted Solution:', solution);
        const isCorrect = evaluateSolution(puzzle.grid, solution);
        if (isCorrect) {
            const user = yield User_1.default.findOneAndUpdate({ username }, {
                $inc: { highScore: 1 },
                $push: { completionTimes: { puzzleId, time: completionTime } }
            }, { new: true, upsert: true });
            return res.json({ success: true, user });
        }
        else {
            return res.json({ success: false });
        }
    }
    catch (error) {
        console.error('Error submitting puzzle solution:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}));
const evaluateSolution = (grid, solution) => {
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
exports.default = router;

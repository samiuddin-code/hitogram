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
const express_1 = require("express");
const Puzzle_1 = __importDefault(require("../models/Puzzle"));
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
router.get('/generate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const difficulty = Array.isArray(req.query.difficulty) ? req.query.difficulty[0] : req.query.difficulty || 'easy';
    const puzzle = yield generatePuzzle(difficulty);
    res.json(puzzle);
}));
const generatePuzzle = (difficulty) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement puzzle generation logic based on difficulty
    const grid = generateGrid(difficulty);
    const puzzle = new Puzzle_1.default({ grid, difficulty });
    yield puzzle.save();
    return puzzle;
});
const generateGrid = (difficulty) => {
    // Example logic for generating a simple 2x2 grid
    if (difficulty === 'easy') {
        return [
            [1, 2],
            [2, 1],
        ];
    }
    else if (difficulty === 'medium') {
        // Implement medium difficulty grid generation
        return [
            [1, 2, 3],
            [3, 1, 2],
            [2, 3, 1],
        ];
    }
    else if (difficulty === 'hard') {
        // Implement hard difficulty grid generation
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
    const { username, puzzleId, solution } = req.body;
    try {
        const puzzle = yield Puzzle_1.default.findById(puzzleId);
        if (!puzzle) {
            return res.status(404).json({ error: 'Puzzle not found' });
        }
        const isCorrect = evaluateSolution(puzzle.grid, solution);
        if (isCorrect) {
            const user = yield User_1.default.findOneAndUpdate({ username }, { $inc: { highScore: 1 } }, { new: true, upsert: true });
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
    if (grid.length !== solution.length)
        return false;
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].length !== solution[i].length)
            return false;
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] !== solution[i][j]) {
                return false;
            }
        }
    }
    return true;
};
exports.default = router;

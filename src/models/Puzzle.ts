import mongoose, { Document, Schema } from 'mongoose';

interface IPuzzle extends Document {
  grid: number[][];
  difficulty: string;
}

const puzzleSchema: Schema = new Schema({
  grid: { type: [[Number]], required: true },
  difficulty: { type: String, required: true }
});

const Puzzle = mongoose.model<IPuzzle>('Puzzle', puzzleSchema);

export default Puzzle;

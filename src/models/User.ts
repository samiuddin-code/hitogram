import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  highScore: { type: Number, default: 0 },
  completionTimes: [
    {
      puzzleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Puzzle' },
      time: { type: Number }
    }
  ]
});

export default mongoose.model('User', userSchema);

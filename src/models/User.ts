import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  highScore: { type: Number, default: 0 },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;

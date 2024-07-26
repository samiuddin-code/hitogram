"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    highScore: { type: Number, default: 0 },
    completionTimes: [
        {
            puzzleId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Puzzle' },
            time: { type: Number }
        }
    ]
});
exports.default = mongoose_1.default.model('User', userSchema);

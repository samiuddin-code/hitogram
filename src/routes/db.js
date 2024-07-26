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
const mongoose_1 = __importDefault(require("mongoose"));
// Function to connect to MongoDB
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Replace 'your-mongodb-uri' with your actual MongoDB connection string
        yield mongoose_1.default.connect('mongodb://localhost:27017/PuzzleGame.Puzzlegame', {
            useNewUrlParser: true, // Enables the new URL string parser
            useUnifiedTopology: true // Provides a unified way of handling MongoDB's topology
        });
        console.log('MongoDB connected');
    }
    catch (err) {
        // Log any errors that occur during connection
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process with failure code
    }
});
exports.default = connectDB;

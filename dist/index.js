"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Import CORS middleware
const db_1 = __importDefault(require("./routes/db")); // Import your database connection function
const puzzle_1 = __importDefault(require("./routes/puzzle")); // Import your puzzle routes
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://159.89.104.127:3000'], // Ensure correct origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', (0, cors_1.default)());
// Middleware
app.use(express_1.default.json()); // Parse JSON bodies
// Connect to database
(0, db_1.default)();
// Use the puzzle router
app.use('/puzzle', puzzle_1.default);
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

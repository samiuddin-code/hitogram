"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Import CORS middleware
const db_1 = __importDefault(require("./routes/db"));
const puzzle_1 = __importDefault(require("./routes/puzzle"));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Replace with your frontend URL
}));
app.use(express_1.default.json()); // Parse JSON bodies
(0, db_1.default)();
app.use('/puzzle', puzzle_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

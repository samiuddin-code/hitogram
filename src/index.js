"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./routes/db"));
const puzzle_1 = __importDefault(require("./routes/puzzle"));
const app = (0, express_1.default)();
const port = 3001;
app.use(express_1.default.json()); // Make sure to add this line to parse JSON bodies
(0, db_1.default)();
app.use('/puzzle', puzzle_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

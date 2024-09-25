import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;
const DB = process.env.DB_URL;

app.use(express.json());
app.use(cors());

const gameSchema = new mongoose.Schema({
    player1Name: String,
    player2Name: String,
    player1Score: Number,
    player2Score: Number,
    winner: String,
});
const Game = mongoose.model('Game', gameSchema);

app.get("/", (req, res) => res.send("Welcome to Backend"));

mongoose
    .connect(DB)
    .then(() => console.log("Database Connected Successfully"))
    .catch((error) => console.log(error.message));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
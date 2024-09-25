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

//Model for game
const gameSchema = new mongoose.Schema({
    player1Name: String,
    player2Name: String,
    player1Score: Number,
    player2Score: Number,
    winner: String,
});
const Game = mongoose.model('Game', gameSchema);


//Routes

//to save-the-game
app.post("/save-game", async (req, res) => {
    try {
        const { player1Name, player2Name, player1Score, player2Score, winner } = req.body;
        const newGame = new Game({
            player1Name,
            player2Name,
            player1Score,
            player2Score,
            winner,
        });
        await newGame.save();
        res.status(200).json({ message: "Game data saved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" }, error.message)
    }

})

// Get all game data
app.get('/all-games', async (req, res) => {
    try {
        const games = await Game.find();
        res.status(200).send(games);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" }, error.message)
    }

});

app.get("/", (req, res) => res.send("Welcome to Backend"));

mongoose
    .connect(DB)
    .then(() => console.log("Database Connected Successfully"))
    .catch((error) => console.log(error.message));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
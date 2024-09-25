import React, { useEffect, useState } from "react";
import axios from "axios";

const GameData = () => {
    const [gameData, setGameData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://mern-stonepaperscissor.onrender.com/all-games");
                console.log(response.data);
                setGameData(response.data);
            } catch (error) {
                console.error("Error fetching game data", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="data">
            <h1>Game Data</h1>
            <div className="box">
                {gameData.length > 0 ? (
                    gameData.map((game, index) => (
                        <div key={index} className="details">
                            <p>Player 1: <b> {game.player1Name}</b></p>
                            <p>Player 2: <b>{game.player2Name}</b></p>
                            <p>Winner: <b>{game.winner}</b></p>
                        </div>
                    ))
                ) : (
                    <p>No game data available.</p>
                )}
            </div>
        </div>
    );
};

export default GameData;

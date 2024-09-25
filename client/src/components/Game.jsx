import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import stoneImage from "../../public/stone.jpeg"
import paperImage from "../../public/paper.jpeg"
import scissorImage from "../../public/scissor.png"

const Game = () => {
    const navigate = useNavigate()

    const choices = ['stone', 'paper', 'scissor'];

    const images = {
        stone: stoneImage,
        paper: paperImage,
        scissor: scissorImage
    };

    const [player1Choice, setPlayer1Choice] = useState(null);
    const [player2Choice, setPlayer2Choice] = useState(null);
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [round, setRound] = useState(0);
    const [winner, setWinner] = useState(null);


    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    const [gameStarted, setGameStarted] = useState(false);

    const startGame = () => {
        if (player1Name && player2Name) {
            setGameStarted(true);
        } else {
            alert('Please enter names for both players.');
        }
    }
    const playGame = () => {
        const randomChoice1 = choices[Math.floor(Math.random() * choices.length)];
        const randomChoice2 = choices[Math.floor(Math.random() * choices.length)];

        setPlayer1Choice(randomChoice1);
        setPlayer2Choice(randomChoice2);

        if (randomChoice1 === randomChoice2) {
            setWinner('Tie');
        } else if (
            (randomChoice1 === 'stone' && randomChoice2 === 'scissor') ||
            (randomChoice1 === 'scissor' && randomChoice2 === 'paper') ||
            (randomChoice1 === 'paper' && randomChoice2 === 'stone')
        ) {
            setWinner(`${player1Name} wins!`);
            setPlayer1Score(player1Score + 1);
        } else {
            setWinner(`${player2Name} wins!`);
            setPlayer2Score(player2Score + 1);
        }

        setRound(round + 1);
    }

    const submitGameData = async () => {
        const gameData = {
            player1Name,
            player2Name,
            player1Score,
            player2Score,
            winner:
                player1Score > player2Score
                    ? player1Name
                    : player1Score < player2Score
                        ? player2Name
                        : 'Tie',
        };

        try {
            await axios.post('https://mern-stonepaperscissor.onrender.com/save-game', gameData);
            alert('Game data saved successfully!');
        } catch (error) {
            console.error('Error saving game data', error);
        }
    };

    return (
        <div className="container">

            {!gameStarted ? (
                <div className="player-input">
                    <h1>Enter Player Names</h1>
                    <input type="text"
                        value={player1Name}
                        onChange={(e) => setPlayer1Name(e.target.value)}
                        placeholder='Player 1 Name' />

                    <input type="text"
                        placeholder='Player 2 Name'
                        value={player2Name}
                        onChange={(e) => setPlayer2Name(e.target.value)} />

                    <button onClick={startGame}>Start the game</button>
                </div>
            ) : (<div className="game">
                <h1 className='game-name'>Stone-Paper-Scissor</h1>
                <div className="wrapper">
                    <div className="player">
                        <h2 className='player-name'>{player1Name}</h2>
                        {player1Choice && (
                            <img
                                style={{ height: '50px', width: '50px' }}
                                src={images[player1Choice]}
                                alt={player1Choice}
                            />
                        )}

                    </div>
                    <div className="player">
                        <h2 className='player-name'>{player2Name}</h2>
                        {player2Choice && (
                            <img
                                style={{ height: '50px', width: '50px' }}
                                src={images[player2Choice]}
                                alt={player2Choice}
                            />
                        )}
                    </div>

                </div>
                <button onClick={playGame} disabled={round === 6} >
                    Play
                </button>
                {winner && <h3>{winner}</h3>}

                <div className="scores">
                    <p>{player1Name} Score: {player1Score}</p>
                    <p>{player2Name} Score: {player2Score}</p>
                    <p>Round: {round}/6</p>
                </div>

                {round === 6 && (
                    <>
                        <h2>
                            Final Winner:{' '}
                            {player1Score > player2Score
                                ? player1Name
                                : player1Score < player2Score
                                    ? player2Name
                                    : "It's a Tie!"}
                        </h2>
                        <button onClick={submitGameData}>Save Game Data</button>
                    </>
                )}

                <div className="game-data">
                    <button onClick={() => navigate("/game-data")}>See History</button>
                </div>
            </div>)}



        </div>
    )
}

export default Game
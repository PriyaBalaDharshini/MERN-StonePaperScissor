import React from 'react'

const Game = () => {
    return (
        <div className="container">
            <div className="player-input">
                <h1>Enter Player Names</h1>
                <input type="text"
                    placeholder='Player 1 Name' />

                <input type="text"
                    placeholder='Player 2 Name' />

                <button>Start the game</button>
            </div>
            <div className="game">
                <h1 className='game-name'>Stone-Paper-Scissor</h1>
                <div className="wrapper">
                    <div className="player">
                        <h2 className='player-name'>Player 1 Name</h2>

                        <img
                            style={{ height: '50px', width: '50px' }}
                        />

                    </div>
                    <div className="player">
                        <h2  className='player-name'>Player 2 Name</h2>
                        <img
                            style={{ height: '50px', width: '50px' }}
                        />
                    </div>

                </div>
                <button >
                    Play
                </button>
            </div>
        </div>
    )
}

export default Game
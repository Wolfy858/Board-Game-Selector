import React, { useState } from 'react'

function GameModal({ game }) {
    return (
        <div>
            <h1>{game.title}</h1>
            <p>Description: {game.description}</p>
            <p>Play time (minutes): {game.playTime}</p>
            <p>Max number of players: {game.players}</p>
        </div>
    )
}

export default GameModal
import React, { useState } from 'react'

import './styles/GameModal.css'

function GameModal({ game, onClose }) {
    return (
        <div className="game-modal-overlay" onClick={onClose}>
          <div className="game-modal-content">
            <h1>{game.title}</h1>
            <p>Description: {game.description}</p>
            <p>Play time (minutes): {game.playTime}</p>
            <p>Max number of players: {game.players}</p>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
    )
}

export default GameModal
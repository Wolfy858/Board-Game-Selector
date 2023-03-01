import React, { useState } from 'react'
import { ref, remove } from 'firebase/database';
import database from './Firebase';

import './styles/GameModal.css'

function GameModal({ game, onClose }) {
  const handleDeleteGame = () => {
    const gameRef = ref(database, `/games/${game.id}`);
    remove(gameRef);
    onClose();
  }

  return (
      <div className="game-modal-overlay" onClick={onClose}>
        <div className="game-modal-content">
          <h1>{game.title}</h1>
          <p>Description: {game.description}</p>
          <p>Play time (minutes): {game.playTime}</p>
          <p>Max number of players: {game.players}</p>
          <button className="delete-button" onClick={handleDeleteGame}>Delete Game</button>
        </div>
      </div>
  )
}

export default GameModal
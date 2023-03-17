import React from 'react';
import { deleteGame } from './utils/deleteGame';

import './styles/DeleteGameButton.css'

function DeleteGameButton({ game, onClose }) {
  const handleDeleteGame = () => {
    deleteGame(game);
    onClose();
  };

  return (
    <button className="button delete-game-button" onClick={handleDeleteGame}>
      Delete Game
    </button>
  );
}

export default DeleteGameButton;
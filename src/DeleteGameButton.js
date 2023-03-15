import React from 'react';
import { ref, onValue, update } from 'firebase/database';
import database from './Firebase';

import './styles/DeleteGameButton.css'

function DeleteGameButton({ game, onClose }) {
  const handleDeleteGame = () => {
    const gameRef = ref(database, `/games/${game.id}`);
    update(gameRef, {
      deleted: true,
      enjoyers: null
    });

    const playersRef = ref(database, '/players');
    onValue(playersRef, (playersSnapshot) => {
      playersSnapshot.forEach((playerSnapshot) => {
        const player = playerSnapshot.val();
        if (player.preferences && Object.values(player.preferences).includes(game.id)) {
          const preferences = Object.entries(player.preferences).reduce((acc, [preferenceId, preferenceIdVal]) => {
            if (preferenceIdVal !== game.id) {
              acc[preferenceId] = preferenceIdVal;
            }
            return acc;
          }, {});
          const playerRef = ref(database, `/players/${playerSnapshot.key}`);
          update(playerRef, { preferences });
        }
      });
    });
    onClose();
  };

  return (
    <button className="delete-game-button" onClick={handleDeleteGame}>
      Delete Game
    </button>
  );
}

export default DeleteGameButton;
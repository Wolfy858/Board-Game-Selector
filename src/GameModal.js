import React, { useState, useEffect } from 'react';
import { ref, remove, onValue, child, push, update } from 'firebase/database';
import database from './Firebase';

import './styles/GameModal.css';

function GameModal({ game, onClose }) {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [players, setPlayers] = useState([]);

  const playersRef = ref(database, '/players');

  useEffect(() => {
    const playersListener = onValue(playersRef, snapshot => {
      const playersData = snapshot.val();
      const playersArray = playersData ? Object.entries(playersData).map(([key, value]) => ({ id: key, ...value })) : [];
      setPlayers(playersArray);
    });

    return () => {
      playersListener();
    };
  }, []);

  const handleDeleteGame = () => {
    const gameRef = ref(database, `/games/${game.id}`);
    remove(gameRef);

    const playersRef = ref(database, '/players')
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
    })
    onClose();
  };

  // const handleDeleteGame = () => {
  //   const gameRef = ref(database, `/games/${game.id}`);
  //   remove(gameRef);
  //   onClose();
  // };

  const handleAddPreference = () => {
    if (selectedPlayer) {
      const gameRef = ref(database, `/games/${game.id}`);
      const gameEnjoyersRef = child(gameRef, 'enjoyers');
      const newEnjoyerRef = push(gameEnjoyersRef, selectedPlayer);

      const playerRef = ref(database, `/players/${selectedPlayer}`)
      const playerPreferencesRef = child(playerRef, 'preferences');
      push(playerPreferencesRef, game.id)

      setSelectedPlayer(newEnjoyerRef.key);
      onClose();
    }
  };

  return (
    <div className="game-modal-overlay" onClick={onClose}>
      <div className="game-modal-content">
        <h1>{game.title}</h1>
        <p>Description: {game.description}</p>
        <p>Play time (minutes): {game.playTime}</p>
        <p>Max number of players: {game.playerCount}</p>
        <select value={selectedPlayer} onChange={(e) => setSelectedPlayer(e.target.value)} onClick={(e) => e.stopPropagation()}>
          <option value="">Select a player</option>
          {players.map(player => (
            <option key={player.id} value={player.id}>{player.name}</option>
          ))}
        </select>
        <button onClick={handleAddPreference}>Like</button>

        <button className="delete-game-button" onClick={handleDeleteGame}>Delete Game</button>
      </div>
    </div>
  );
}

export default GameModal;
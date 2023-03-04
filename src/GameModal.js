import React, { useState, useEffect } from 'react';
import { ref, remove, onValue, child, push } from 'firebase/database';
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
    onClose();
  };

  // const handleAddPreference = () => {
  //   if (selectedPlayer) {
  //     const gameRef = ref(database, `/games/${game.id}`);
  //     const gamePlayersRef = child(gameRef, 'players');
  //     push(gamePlayersRef, selectedPlayer);
  //     onClose();
  //   }
  // };

  const handleAddPreference = () => {
    if (selectedPlayer) {
      const gameRef = ref(database, `/games/${game.id}`);
      const gamePlayersRef = child(gameRef, 'players');
      const newPlayerRef = push(gamePlayersRef, selectedPlayer);
      setSelectedPlayer(newPlayerRef.key);
      onClose();
    }
  };

  return (
    <div className="game-modal-overlay" onClick={onClose}>
      <div className="game-modal-content">
        <h1>{game.title}</h1>
        <p>Description: {game.description}</p>
        <p>Play time (minutes): {game.playTime}</p>
        <p>Max number of players: {game.players}</p>
        <select value={selectedPlayer} onChange={(e) => setSelectedPlayer(e.target.value)} onClick={(e) => e.stopPropagation()}>
          <option value="">Select a player</option>
          {players.map(player => (
            <option key={player.id} value={player.id}>{player.name}</option>
          ))}
        </select>
        <button onClick={handleAddPreference}>Like</button>

        <button className="delete-button" onClick={handleDeleteGame}>Delete Game</button>
      </div>
    </div>
  );
}

export default GameModal;
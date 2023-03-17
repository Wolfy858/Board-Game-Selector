import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import database from './Firebase';
import DeleteGameButton from './DeleteGameButton';
import PreferenceBubble from './PreferenceBubble';

import './styles/GameModal.css';

function GameModal({ game, onClose }) {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [players, setPlayers] = useState([]);
  const [preferences, setPreferences] = useState([]);

  const playersRef = ref(database, '/players');

  useEffect(() => {
    const playersListener = onValue(playersRef, snapshot => {
      const playersData = snapshot.val();
      const playersArray = playersData ? Object.entries(playersData).map(([key, value]) => ({
        id: key,
        ...value,
        hasPreference: value.preferences && Object.values(value.preferences).includes(game.id),
      })) : [];
      setPlayers(playersArray);
    });
  
    return () => {
      playersListener();
    };
  }, []);

  return (
    <div className="game-modal-overlay" onClick={onClose}>
      <div className="game-modal-content">
        <h1>{game.title}</h1>
        <p>Description: {game.description}</p>
        <p>Play time (minutes): {game.playTime}</p>
        <p>Max number of players: {game.playerCount}</p>
        <div className="preferences-container">
          {players.map(player => (
            <PreferenceBubble key={player.id} player={player} game={game} />
          ))}
        </div>

        <DeleteGameButton game={game} onClose={onClose} />
      </div>
    </div>
  );
}

export default GameModal;
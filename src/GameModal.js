import React, { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import database from './Firebase';
import DeleteGameButton from './DeleteGameButton';
import PreferenceBubble from './PreferenceBubble';

import './styles/GameModal.css';

function GameModal({ game, onClose }) {
  const [players, setPlayers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState(game.description);
  const [playTime, setPlayTime] = useState(game.playTime);
  const [minPlayerCount, setMinPlayerCount] = useState(game.minPlayerCount);
  const [maxPlayerCount, setMaxPlayerCount] = useState(game.maxPlayerCount);

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

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    update(ref(database, `/games/${game.id}`), {
      description,
      playTime,
      minPlayerCount,
      maxPlayerCount
    }).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div className="game-modal-overlay" onClick={onClose}>
      <div className="game-modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h1>{game.title}</h1>
        </div>
        {editMode ? (
          <>
            <p>
              Description:{' '}
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows="10"
                cols="25"
                maxLength="250"
              />
            </p>
            <p>
              Play time (minutes):{' '}
              <input
                type="number"
                value={playTime}
                onChange={e => setPlayTime(parseInt(e.target.value))}
              />
            </p>
            <p>
              Miniumum number of players:{' '}
              <input
                type="number"
                value={minPlayerCount}
                onChange={e => setMinPlayerCount(parseInt(e.target.value))}
              />
            </p>
            <p>
              Maximum number of players:{' '}
              <input
                type="number"
                value={maxPlayerCount}
                onChange={e => setMaxPlayerCount(parseInt(e.target.value))}
              />
            </p>
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <p>{description}</p>
            <p>Play time (minutes): {playTime}</p>
            <p>Supports {minPlayerCount} - {maxPlayerCount} players</p>
            <div className="preferences-container">
              {players.map(player => (
                <PreferenceBubble key={player.id} player={player} game={game} />
              ))}
            </div>
            <div className='buttons-container'>
              <button className="button edit-button" onClick={handleEdit}>Edit</button>
              <DeleteGameButton game={game} onClose={onClose} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GameModal;

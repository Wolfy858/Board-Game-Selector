import { useState, useEffect } from 'react';
import { ref, onValue, remove, update } from 'firebase/database';
import database from './Firebase';

import './styles/PlayerList.css'

function PlayersList() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const playersRef = ref(database, '/players');
    onValue(playersRef, (playerSnapshot) => {
      const playerList = [];
      playerSnapshot.forEach((playerSnapshot) => {
        const player = playerSnapshot.val();
        const preferences = [];
        const gamesRef = ref(database, '/games');
        onValue(gamesRef, (gamesSnapshot) => {
          gamesSnapshot.forEach((gameSnapshot) => {
            const game = gameSnapshot.val();
            if (game.enjoyers && Object.values(game.enjoyers).includes(playerSnapshot.key)) {
              preferences.push(game.title);
            }
          });
          player.preferences = preferences;
          player.id = playerSnapshot.key
          playerList.push(player);
        });
      });
      setPlayers(playerList);
    });
  }, []);

  const handleDelete = (player) => {
    console.log(player.id)
    const playerRef = ref(database, `/players/${player.id}`);
    remove(playerRef);

    const gamesRef = ref(database, '/games');
    onValue(gamesRef, (gamesSnapshot) => {
      gamesSnapshot.forEach((gameSnapshot) => {
        const game = gameSnapshot.val();
        if (game.enjoyers && Object.values(game.enjoyers).includes(player.id)) {
          const enjoyers = Object.entries(game.enjoyers).reduce((acc, [enjoyerId, enjoyerIdVal]) => {
            if (enjoyerIdVal !== player.id) {
              acc[enjoyerId] = enjoyerIdVal;
            }
            return acc;
          }, {});
          const gameRef = ref(database, `/games/${gameSnapshot.key}`);
          update(gameRef, { enjoyers });
        }
      });
    });
  };

  return (
    <div className="players-list-container">
      <h2>Players</h2>
      <div className="players-list">
        {players.map((player) => (
          <div key={player.id} className="player-card">
            <button className="delete-button" onClick={() => handleDelete(player)}>X</button>
            <div className="player-name">{player.name}</div>
            <div className="player-preferences">
              <span>Wants to play:</span>
              <div>{player.preferences.length !== 0 ? player.preferences.join(', ') : 'Any'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayersList;
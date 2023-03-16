import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import database from './Firebase';
import DeleteGameButton from './DeleteGameButton';

import './styles/GameModal.css';
import { addPreference } from './utils/addPreference';
import { removePreference } from './utils/removePreference';

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

  const handleAddPreference = (playerId) => {
    addPreference(playerId, game);
  };

  const handleRemovePreference = (playerId) => {
    removePreference(playerId, game);
  };

  return (
    <div className="game-modal-overlay" onClick={onClose}>
      <div className="game-modal-content">
        <h1>{game.title}</h1>
        <p>Description: {game.description}</p>
        <p>Play time (minutes): {game.playTime}</p>
        <p>Max number of players: {game.playerCount}</p>
        <div className="preferences-container">
          {players.map(player => (
            <div
            key={player.id}
            className={`preference ${player.hasPreference ? 'active' : ''}`}
            onClick={(e) => {
              player.hasPreference
                ? handleRemovePreference(player.id)
                : handleAddPreference(player.id)
              e.stopPropagation()
            }}
            >
            {player.name}
          </div>
          ))}
        </div>

        <DeleteGameButton game={game} onClose={onClose} />
      </div>
    </div>
  );
}

export default GameModal;

// import React, { useState, useEffect } from 'react';
// import { ref, onValue } from 'firebase/database';
// import database from './Firebase';
// import DeleteGameButton from './DeleteGameButton';

// import './styles/GameModal.css';
// import { addPreference } from './utils/addPreference';

// function GameModal({ game, onClose }) {
//   const [selectedPlayer, setSelectedPlayer] = useState('');
//   const [players, setPlayers] = useState([]);

//   const playersRef = ref(database, '/players');

//   useEffect(() => {
//     const playersListener = onValue(playersRef, snapshot => {
//       const playersData = snapshot.val();
//       const playersArray = playersData ? Object.entries(playersData).map(([key, value]) => ({ id: key, ...value })) : [];
//       setPlayers(playersArray);
//     });

//     return () => {
//       playersListener();
//     };
//   }, []);

//   const handleAddPreference = () => {
//     if (selectedPlayer) {
//       addPreference(selectedPlayer, game)
//     }
//   };

//   return (
//     <div className="game-modal-overlay" onClick={onClose}>
//       <div className="game-modal-content">
//         <h1>{game.title}</h1>
//         <p>Description: {game.description}</p>
//         <p>Play time (minutes): {game.playTime}</p>
//         <p>Max number of players: {game.playerCount}</p>
//         <select value={selectedPlayer} onChange={(e) => setSelectedPlayer(e.target.value)} onClick={(e) => e.stopPropagation()}>
//           <option value="">Select a player</option>
//           {players.map(player => (
//             <option key={player.id} value={player.id}>{player.name}</option>
//           ))}
//         </select>
//         <button onClick={handleAddPreference}>Like</button>

//         <DeleteGameButton game={game} onClose={onClose} />
//       </div>
//     </div>
//   );
// }

// export default GameModal;
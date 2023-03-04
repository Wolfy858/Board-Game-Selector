import React from 'react';
import { ref, onValue } from 'firebase/database';
import database from './Firebase';

function PlayerList() {
  const [players, setPlayers] = React.useState([]);

  React.useEffect(() => {
    const playersRef = ref(database, '/players');
    onValue(playersRef, (snapshot) => {
      const playersData = snapshot.val();
      const playersArray = playersData ? Object.entries(playersData).map(([key, value]) => ({ id: key, ...value })) : [];
      setPlayers(playersArray);
    });
  }, []);

  return (
    <div>
      <h2>Players</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name} - {player.gamePreferences ? player.gamePreferences.join(', ') : 'No game preferences'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;
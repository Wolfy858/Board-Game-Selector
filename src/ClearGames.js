import React from "react"
import { ref, update, onValue, remove } from 'firebase/database';
import database from './Firebase';

import './styles/ClearGames.css'

const ClearGames = () => {
  const handleClearGames = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all games? This action cannot be undone.");
    if (confirmDelete) {
      const gamesRef = ref(database, '/games');
      onValue(gamesRef, (snapshot) => {
        const gamesData = snapshot.val();
        Object.entries(gamesData || {}).forEach(([key, value]) => {
          const gameRef = ref(database, `/games/${key}`);
          update(gameRef, { 
            deleted: true,
            enjoyers: null
          });
        });
      });

      const playersRef = ref(database, '/players');
      onValue(playersRef, (playersSnapshot) => {
        playersSnapshot.forEach((playerSnapshot) => {
          const playerRef = ref(database, `/players/${playerSnapshot.key}/preferences`);
          remove(playerRef);
        });
      });
    }
  }

  return (
    <div className='clear-games-wrapper'>
      <button className="clear-button" onClick={handleClearGames}>Clear All Games</button>
    </div>
  )
}

export default ClearGames
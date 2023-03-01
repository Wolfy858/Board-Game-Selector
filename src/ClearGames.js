import React from "react"
import { ref, remove } from 'firebase/database';
import database from './Firebase';

import './styles/ClearGames.css'

const ClearGames = () => {
  const handleClearGames = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all games? This action cannot be undone.");
    if (confirmDelete) {
      const gamesRef = ref(database, '/games');
      remove(gamesRef);
    }
  }

  return (
    <div className='clear-games-wrapper'>
      <button className="clear-button" onClick={handleClearGames}>Clear All Games</button>
    </div>
  )
}

export default ClearGames
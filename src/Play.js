import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import database from './Firebase';

import './styles/Play.css';

function Play() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [enjoyableGames, setEnjoyableGames] = useState([]);

  useEffect(() => {
    const gamesRef = ref(database, '/games');

    onValue(gamesRef, snapshot => {
      const gamesData = snapshot.val();
      const gamesArray = gamesData ? Object.entries(gamesData).map(([key, value]) => ({ id: key, ...value })) : [];
      const enjoyableGamesArray = gamesArray.filter(game => game.enjoyers && Object.keys(game.enjoyers).length > 0);
      setEnjoyableGames(enjoyableGamesArray);
    });
  }, []);

  const handlePlay = () => {
    const randomIndex = Math.floor(Math.random() * enjoyableGames.length);
    setSelectedGame(enjoyableGames[randomIndex]);
  };

  return (
    <div className="play">
      <button className="play-button" onClick={handlePlay}>Play</button>
      {selectedGame ? (
        <div className="selected-game">
          <h2>Selected Game</h2>
          <img src={selectedGame.thumbnail} alt={selectedGame.title} />
          <h3>{selectedGame.title}</h3>
        </div>
      ) : (
        null
      )}
    </div>
  );
}

export default Play;
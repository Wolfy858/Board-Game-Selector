import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import database from './Firebase';

import './styles/Play.css';

function Play() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [enjoyableGames, setEnjoyableGames] = useState([]);
  const [playersWithPreferences, setPlayersWithPreferences] = useState([]);

  useEffect(() => {
    const gamesRef = ref(database, '/games');
    const playersRef = ref(database, '/players');

    onValue(playersRef, snapshot => {
      const playersData = snapshot.val();
      const playersArray = playersData ? Object.entries(playersData).map(([key, value]) => ({ id: key, ...value })) : [];
      const playersWithPrefsArray = playersArray.filter(player => player.preferences && Object.keys(player.preferences).length > 0);
      setPlayersWithPreferences(playersWithPrefsArray);
    });

    onValue(gamesRef, snapshot => {
      const gamesData = snapshot.val();
      const gamesArray = gamesData ? Object.entries(gamesData).map(([key, value]) => ({ id: key, ...value })) : [];
      const enjoyableGamesArray = gamesArray.filter(game => game.enjoyers && Object.keys(game.enjoyers).length > 0 && !game.deleted);
      setEnjoyableGames(enjoyableGamesArray);
    });
  }, []);

  const handlePlay = () => {
    let selectedPlayer;
    let selectedGameFromPreferences;

    // Select a player at random from the array of players with preferences
    if (playersWithPreferences.length > 0) {
      const randomPlayerIndex = Math.floor(Math.random() * playersWithPreferences.length);
      selectedPlayer = playersWithPreferences[randomPlayerIndex];

      // Select a game at random from the selected player's preferences
      const preferredGames = Object.values(selectedPlayer.preferences);
      const randomGameIndex = Math.floor(Math.random() * preferredGames.length);
      const randomGameId = preferredGames[randomGameIndex];
      selectedGameFromPreferences = enjoyableGames.find(game => game.id === randomGameId);
    }

    // If a game was selected from a player's preferences, set it as the selected game
    // Otherwise, select a game randomly from the list of enjoyable games
    setSelectedGame(selectedGameFromPreferences || enjoyableGames[Math.floor(Math.random() * enjoyableGames.length)]);
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
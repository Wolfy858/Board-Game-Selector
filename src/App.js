import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import database from './Firebase';
import { ref, set, onValue, push, query, orderByChild, equalTo } from 'firebase/database'
import AddGame from './AddGame';
import GameSearchForm from './GameSearchForm';
import AddGameForm from './AddGameForm';
import GameGrid from './GameGrid';
import NavHeader from './NavHeader';
import PlayersPage from './PlayersPage';
import Play from './Play';

import './styles/App.css'

function App() {
  const [games, setGames] = useState([]);
  const gamesRef = ref(database, '/games');

  useEffect(() => {
    const queryRef = query(gamesRef, orderByChild("deleted"), equalTo(false));
    onValue(queryRef, (snapshot) => {
      const gamesData = snapshot.val();
      const gamesArray = Object.entries(gamesData || {}).map(([key, value]) => ({
        id: key,
        ...value
      }));
      setGames(gamesArray);
    });
  }, []);

  const addGame = game => {
    const newGameRef = push(gamesRef);
    const nonDeletedGame = { ...game, deleted: false }
    set(newGameRef, nonDeletedGame);
  }

  return (
<div>
  <NavHeader />
  <Routes>
    <Route path="/" element={<GameGrid games={games} />} />
    <Route path="/add-game" element={<AddGame />} >
      <Route path="search" element={<GameSearchForm onAddGame={addGame}/>} />
      <Route path="custom" element={<AddGameForm onAddGame={addGame}/>} />
    </Route>
    <Route path="/players" element={<PlayersPage />} />
    <Route path="/play" element={<Play />} />
  </Routes>
</div>
  );
}

export default App;


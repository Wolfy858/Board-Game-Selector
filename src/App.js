import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import database from './Firebase';
import { ref, set, onValue, push } from 'firebase/database'
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
    onValue(gamesRef, (snapshot) => {
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
    set(newGameRef, game);
  }

  return (
    <div>
      <NavHeader />
      <Routes>
        <Route exact path="/" element={<GameGrid games={games} />} />
        <Route path="/add-game" element={<AddGameForm onAddGame={addGame} />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </div>
  );
}

export default App;


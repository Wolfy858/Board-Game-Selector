import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import database from './Firebase';
import AddGameForm from './AddGameForm';
import GameGrid from './GameGrid';
import NavHeader from './NavHeader';

function App() {
  const [games, setGames] = useState([]);
  const gamesRef = database.ref('games');

  useEffect(() => {
    gamesRef.on('value', (snapshot) => {
      const gamesData = snapshot.val();
      const gamesArray = Object.entries(gamesData || {}).map(([key, value]) => ({
        id: key,
        ...value
      }));
      setGames(gamesArray);
    });
  }, []);

  // const addGame = game => {
  //   setGames([...games, game]);
  // };

  const addGame = game => {
    gamesRef.push(game)
  }

  return (
    <div>
      <NavHeader />
      <Routes>
        <Route exact path="/" element={<GameGrid games={games} />} />
        <Route path="/add-game" element={<AddGameForm onAddGame={addGame} />} />
      </Routes>
    </div>
  );
}

export default App;


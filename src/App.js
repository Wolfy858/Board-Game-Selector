import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AddGameForm from './AddGameForm';
import GameGrid from './GameGrid';
import NavHeader from './NavHeader';

function App() {
  const [games, setGames] = useState([]);

  const addGame = game => {
    setGames([...games, game]);
  };

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


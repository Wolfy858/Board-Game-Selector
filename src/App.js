import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import AddGameForm from './AddGameForm'
import GameGrid from './GameGrid'

function App() {
  const [games, setGames] = useState([]);

  const addGame = game => {
    setGames([...games, game]);
  };

  return (
    <div className="app">
      <AddGameForm onAddGame={addGame} />
      <GameGrid games={games} onAddGame={addGame} />
    </div>
  );
}

export default App;

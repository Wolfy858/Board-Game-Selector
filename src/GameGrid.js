import React, { useState } from 'react';
import GameModal from './GameModal'

import './styles/GameGrid.css'

function GameGrid({ games }) {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleSelectGame = game => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  return (
    <div className="board-game-grid">
      {games.map(game => (
        <div
          key={game.id}
          className="game-thumbnail"
          onClick={() => handleSelectGame(game)}
        >
          {/* <img src={game.imageUrl} alt={game.title} /> */}
          <p>{game.title}</p>
        </div>
      ))}
      {selectedGame && (
        <GameModal game={selectedGame} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default GameGrid

import React, { useState } from 'react';
import ClearGames from './ClearGames';
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
    <div>
      <div className="board-game-grid">
        {games.map(game => (
          <div
            key={game.id}
            className={`game-thumbnail ${game.thumbnail ? null : 'no-image'}`}
            style={{ backgroundImage: `url("${game.thumbnail}")` }}
            onClick={() => handleSelectGame(game)}
          >
            {!game.thumbnail ? <p>{game.title}</p> : null}
          </div>
        ))}
      </div>
      <ClearGames />
      {selectedGame && (
        <div className="modal-wrapper">
          <GameModal game={selectedGame} onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
}

export default GameGrid

import React, { useState } from 'react';
import GameModal from './GameModal'
import { ref, remove } from 'firebase/database';
import database from './Firebase';

import './styles/GameGrid.css'

function GameGrid({ games }) {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleClearGames = () => {
    const gamesRef = ref(database, '/games');
    remove(gamesRef);
  }

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
            className="game-thumbnail"
            style={{ backgroundImage: `url("${game.thumbnail}")` }}
            onClick={() => handleSelectGame(game)}
          >
            {!game.thumbnail ? <p>{game.title}</p> : null}
          </div>
        ))}
      </div>
      <div className='grid-menu'>
          <button className="clear-button" onClick={handleClearGames}>Clear All Games</button>
      </div>
      {selectedGame && (
        <div className="modal-wrapper">
          <GameModal game={selectedGame} onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
}

export default GameGrid

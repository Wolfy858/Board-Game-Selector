import React, { useState } from 'react';
import GameSearchForm from './GameSearchForm'
import database  from './Firebase';
import { ref, query, orderByChild, equalTo } from 'firebase/database'
import condenseDescription from './OpenAI';

import './styles/AddGameForm.css';

const AddGameForm = ({ onAddGame }) => {
  const [game, setGame] = useState({
    title: '',
    description: '',
    playerCount: '',
    playTime: '',
    thumbnail: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (query) => {
    // ...
  };

  const handleChange = (e) => {
    setGame({ ...game, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const gameRef = ref(database, '/games');
    const gameQuery = query(gameRef, orderByChild('title'), equalTo(game.title));
    const gameSnapshot = await gameQuery.once('value');

    if (gameSnapshot.exists()) {
      setErrorMessage(`Game with title "${game.title}" already exists.`);
    } else {
      onAddGame(game);
      setGame({
        title: '',
        description: '',
        playerCount: '',
        playTime: '',
        thumbnail: ''
      });
      setErrorMessage('');
    }
  };

  return (
    <div>
      <GameSearchForm onSearch={handleSearch} searchResults={searchResults} setSearchResults={setSearchResults} />
      <form onSubmit={handleSubmit} className="add-game-form" >
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={game.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={game.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="playerCount">Number of players</label>
          <input
            type="text"
            name="playerCount"
            id="playerCount"
            value={game.playerCount}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="playTime">Play time (in minutes)</label>
          <input
            type="text"
            name="playTime"
            id="playTime"
            value={game.playTime}
            onChange={handleChange}
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit">Add game</button>
      </form>
    </div>
  );
};

export default AddGameForm;

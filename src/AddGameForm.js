import React, { useState } from 'react';
import GameSearchForm from './GameSearchForm'
import database  from './Firebase';
import { ref, query, orderByChild, equalTo, get, set } from 'firebase/database'
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
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setGame({ ...game, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let errors = '';
    if (!game.title.trim()) {
      errors += 'Title cannot be blank.\n';
    }
    if (!game.description.trim()) {
      errors += 'Description cannot be blank.\n';
    }
    if (!game.playerCount.trim() || isNaN(game.playerCount)) {
      errors += 'Player count must be a number.\n';
    }
    if (!game.playTime.trim() || isNaN(game.playTime)) {
      errors += 'Play time must be a number.\n';
    }
    if (errors) {
      setErrorMessage(errors);
      return;
    }
    const gameRef = ref(database, '/games');
    const gameQuery = query(gameRef, orderByChild('title'), equalTo(game.title));
    const gameSnapshot = await get(gameQuery);
  
    if (gameSnapshot.exists()) {
      const existingGameRecord = gameSnapshot.val();
      const existingGame = Object.values(existingGameRecord)[0];
      if (existingGame.deleted) {
        // Game exists but was soft-deleted. Update and add it back to the database.
        const gameUpdates = {
          ...existingGame,
          deleted: false
        };
        const existingGameId = Object.keys(existingGameRecord)[0]
        await set(ref(database, `/games/${existingGameId}`), gameUpdates);
        setGame({
          title: '',
          description: '',
          playerCount: '',
          playTime: '',
          thumbnail: ''
        });
        setErrorMessage(`Game with title "${game.title}" has been added back to the collection. You can edit it there`);
      } else {
        // Game exists and is still in the database.
        setErrorMessage(`Game with title "${game.title}" already exists.`);
      }
    } else {
      // Game is new to the database.
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
      {/* <GameSearchForm onSearch={handleSearch} searchResults={searchResults} setSearchResults={setSearchResults} /> */}
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

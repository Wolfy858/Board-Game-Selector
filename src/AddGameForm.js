import React, { useState } from 'react';
import database  from './Firebase';

import './styles/AddGameForm.css';

function AddGameForm({ onAddGame }) {
  const gamesRef = database.ref('games');

  const [game, setGame] = useState({
    title: '',
    description: '',
    players: '',
    playTime: ''
  });

  const handleChange = event => {
    setGame({
      ...game,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    //gamesRef.push(game); // add game to Firebase
    onAddGame(game); // update local state
    setGame({
      title: '',
      description: '',
      players: '',
      playTime: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-game-form">
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
        <label htmlFor="players">Number of players</label>
        <input
          type="text"
          name="players"
          id="players"
          value={game.players}
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
      <button type="submit">Add game</button>
    </form>
  );
}

export default AddGameForm;
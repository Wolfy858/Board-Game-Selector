import React, { useState } from 'react';

function AddGameForm({ onAddGame }) {
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
    onAddGame(game);
    setGame({
      title: '',
      description: '',
      players: '',
      playTime: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={game.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={game.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="players"
        placeholder="Number of players"
        value={game.players}
        onChange={handleChange}
      />
      <input
        type="text"
        name="playTime"
        placeholder="Play time (in minutes)"
        value={game.playTime}
        onChange={handleChange}
      />
      <button type="submit">Add game</button>
    </form>
  );
}

export default AddGameForm
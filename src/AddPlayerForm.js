import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import database from './Firebase';

function AddPlayerForm() {
  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const playerRef = ref(database, 'players');
    push(playerRef, { name });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Player</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <button type="submit">Add Player</button>
    </form>
  );
}

export default AddPlayerForm;
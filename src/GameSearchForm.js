import React, { useState } from "react";
import database from './Firebase';
import { ref, query, orderByChild, equalTo, get, set } from 'firebase/database';

import './styles/GameSearchForm.css'

const GameSearchForm = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    const gameRef = ref(database, '/games');
    const gameQuery = query(gameRef, orderByChild('title'), equalTo(searchQuery));
    const gameSnapshot = await get(gameQuery);
    if (gameSnapshot.exists()) {
      const gameRecord = gameSnapshot.val();
      const game = Object.values(gameRecord)[0];
      if (game.deleted === true) {
        const gameId = Object.keys(gameRecord)[0]
        set(ref(database, 'games/' + gameId), { ...game, deleted: false });
        setMessage('Game added.');
        setMessageType('success');
        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 3000);
      } else {
        setMessage('Game already exists.');
        setMessageType('error');
      }
    } else {
      onSearch(searchQuery);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h2>Add by search</h2>
      <form onSubmit={handleSearch} className={'game-search-form'}>
        <input
          type="text"
          placeholder="Search for a game..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default GameSearchForm;

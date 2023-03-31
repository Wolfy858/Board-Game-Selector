import React, { useState } from "react";
import database from './Firebase';
import { ref, query, orderByChild, equalTo, get, set } from 'firebase/database';
import condenseDescription from './OpenAI';

import './styles/GameSearchForm.css'

const GameSearchForm = ({ onAddGame }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleAddGame = async (event) => {
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
        flashMessage('Game added.', 'success')
      } else {
        flashMessage('Game already exists.', 'error')
      }
    } else {
      handleSearch(searchQuery);
    }
    setSearchQuery('')
  };

  const flashMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    if (type === 'success') {
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
    }
  }

  const handleSearch = async (query) => {
    const response = await fetch(`https://www.boardgamegeek.com/xmlapi2/search?query=${query}&exact=1`);
    const xmlData = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData,"text/xml");

    if (xmlDoc.getElementsByTagName("item").length === 0) {
      flashMessage('Game not found.', 'error');
      return;
    }

    const firstResultId = xmlDoc.getElementsByTagName("item")[0].getAttribute("id");
    const gameResponse = await fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${firstResultId}&type=boardgame&stats=1`);
    const gameXmlData = await gameResponse.text();
    const gameXmlDoc = parser.parseFromString(gameXmlData,"text/xml");

    const condensedDescription = await condenseDescription(gameXmlDoc.getElementsByTagName("description")[0].textContent) // With GPT
    //const condensedDescription = gameXmlDoc.getElementsByTagName("description")[0].textContent  // Without GPT

    const gameData = {
      title: gameXmlDoc.getElementsByTagName("name")[0].getAttribute("value"),
      description: condensedDescription,
      playerCount: gameXmlDoc.getElementsByTagName("minplayers")[0].getAttribute("value"),
      playTime: gameXmlDoc.getElementsByTagName("playingtime")[0].getAttribute("value"),
      thumbnail: gameXmlDoc.getElementsByTagName("image")[0].textContent
    };
    onAddGame(gameData);
    flashMessage('Game added.', 'success');
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h2>Add by search</h2>
      <form onSubmit={handleAddGame} className={'game-search-form'}>
        <input
          type="text"
          placeholder="Search for a game..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button className='add-game-button' type="submit">Add Game</button>
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

import React, { useState } from 'react';
import GameSearchForm from './GameSearchForm'
import database  from './Firebase';
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

  const handleSearch = async (query) => {
    const response = await fetch(`https://www.boardgamegeek.com/xmlapi2/search?query=${query}&exact=1`);
    const xmlData = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData,"text/xml");
    const firstResultId = xmlDoc.getElementsByTagName("item")[0].getAttribute("id");
    const gameResponse = await fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${firstResultId}&type=boardgame&stats=1`);
    const gameXmlData = await gameResponse.text();
    const gameXmlDoc = parser.parseFromString(gameXmlData,"text/xml");

    const condensedDescription = await condenseDescription(gameXmlDoc.getElementsByTagName("description")[0].textContent)
    //const condensedDescription = gameXmlDoc.getElementsByTagName("description")[0].textContent

    const gameData = {
      title: gameXmlDoc.getElementsByTagName("name")[0].getAttribute("value"),
      description: condensedDescription,
      playerCount: gameXmlDoc.getElementsByTagName("minplayers")[0].getAttribute("value"),
      playTime: gameXmlDoc.getElementsByTagName("playingtime")[0].getAttribute("value"),
      thumbnail: gameXmlDoc.getElementsByTagName("image")[0].textContent
    };
    setGame(gameData);
    setSearchResults([]);
  };

  const handleChange = (e) => {
    setGame({ ...game, [e.target.name]: e.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    onAddGame(game); // update local state
    setGame({
      title: '',
      description: '',
      playerCount: '',
      playTime: '',
      thumbnail: ''
    });
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
        <button type="submit">Add game</button>
      </form>
    </div>
  );
};

export default AddGameForm;
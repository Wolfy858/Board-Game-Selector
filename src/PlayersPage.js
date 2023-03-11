import React from 'react';
import AddPlayerForm from './AddPlayerForm';
import PlayerList from './PlayerList';

function PlayersPage() {
  return (
    <div>
      <AddPlayerForm />
      <PlayerList />
    </div>
  );
}

export default PlayersPage;
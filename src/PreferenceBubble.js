import React from 'react';
import { addPreference } from './utils/addPreference';
import { removePreference } from './utils/removePreference';

function PreferenceBubble({ player, game }) {
  const handleClick = (e) => {
    player.hasPreference ? removePreference(player.id, game) : addPreference(player.id, game);
    e.stopPropagation()
  };

  return (
    <div
      key={player.id}
      className={`preference ${player.hasPreference ? 'active' : ''}`}
      onClick={handleClick}
    >
      {player.name}
    </div>
  );
}

export default PreferenceBubble;

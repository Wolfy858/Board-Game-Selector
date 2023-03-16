import { ref, child, push } from 'firebase/database';
import database from '../Firebase';

export const addPreference = (playerId, game) => {
  const gameRef = ref(database, `/games/${game.id}`);
  const gameEnjoyersRef = child(gameRef, 'enjoyers');
  push(gameEnjoyersRef, playerId);

  const playerRef = ref(database, `/players/${playerId}`)
  const playerPreferencesRef = child(playerRef, 'preferences');
  push(playerPreferencesRef, game.id)
};
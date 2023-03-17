import { ref, child, push, set } from 'firebase/database';
import database from '../Firebase';

export const addPreference = (playerId, game) => {
  const gameRef = ref(database, `/games/${game.id}`);
  const gameEnjoyersRef = child(gameRef, 'enjoyers');
  set(child(gameEnjoyersRef, playerId), playerId);

  const playerRef = ref(database, `/players/${playerId}`)
  const playerPreferencesRef = child(playerRef, 'preferences');
  set(child(playerPreferencesRef, game.id), game.id)
};
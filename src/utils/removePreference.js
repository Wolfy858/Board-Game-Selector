import { ref, child, remove, set } from 'firebase/database';
import database from '../Firebase';

export const removePreference = (playerId, game) => {
  const gameEnjoyersRef = ref(database, `games/${game.id}/enjoyers/${playerId}`);
  remove(gameEnjoyersRef);
  
  const playerPreferencesRef = ref(database, `players/${playerId}/preferences/${game.id}`);
  remove(playerPreferencesRef);
};
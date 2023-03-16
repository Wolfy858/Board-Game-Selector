import { ref, child, remove, set } from 'firebase/database';
import database from '../Firebase';

// export const removePreference = async (playerId, game) => {
//   const gameEnjoyersRef = ref(database, `/games/${game.id}/enjoyers/${playerId}`);
//   await remove(gameEnjoyersRef);

//   const playerPreferencesRef = ref(database, `/players/${playerId}/preferences/${game.id}`);
//   await remove(playerPreferencesRef);
// };

export const removePreference = (playerId, game) => {
  const gameRef = ref(database, `/games/${game.id}`);
  const gameEnjoyerRef = ref(database, `/games/${game.id}/enjoyers/${playerId}`);
  debugger
  set(gameEnjoyerRef, null)

  const playerRef = ref(database, `/players/${playerId}`);
  const preferenceRef= ref(database, `/players/${playerId}/preferences/${game.id}`)
  remove(preferenceRef)
};
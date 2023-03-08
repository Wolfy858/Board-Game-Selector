import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import database from './Firebase';

function PlayersList() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const playersRef = ref(database, '/players');
    onValue(playersRef, (playerSnapshot) => {
      const playerList = [];
      playerSnapshot.forEach((playerSnapshot) => {
        const player = playerSnapshot.val();
        const preferences = [];
        const gamesRef = ref(database, '/games');
        onValue(gamesRef, (gamesSnapshot) => {
          gamesSnapshot.forEach((gameSnapshot) => {
            const game = gameSnapshot.val();
            if (game.enjoyers && Object.values(game.enjoyers).includes(playerSnapshot.key)) {
              preferences.push(game.title);
            }
          });
          player.preferences = preferences;
          playerList.push(player);
          setPlayers(playerList);
        });
      });
    });
  }, []);

  // return (
  //   <div>
  //     <h1>Players and their preferences:</h1>
  //     {players.map((player) => (
  //       <div key={player.id}>
  //         <h2>{player.name}</h2>
  //         <ul>
  //           {player.preferences.map((preference) => (
  //             <li key={preference}>{preference}</li>
  //           ))}
  //         </ul>
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
        <div>
          <h2>Players</h2>
          <ul>
            {players.map((player) => (
              <li key={player.id}>
                {player.name} - {player.preferences.length !== 0 ? player.preferences.join(', ') : 'No game preferences'}
              </li>
            ))}
          </ul>
        </div>
      );
}

export default PlayersList;
// import React from 'react';
// import { ref, onValue } from 'firebase/database';
// import database from './Firebase';

// function PlayerList() {
//   const [players, setPlayers] = React.useState([]);

//   React.useEffect(() => {
//     const playersRef = ref(database, '/players');
//     onValue(playersRef, (snapshot) => {
//       const playersData = snapshot.val();
//       const playersArray = playersData ? Object.entries(playersData).map(([key, value]) => ({ id: key, ...value })) : [];
//       setPlayers(playersArray);
//     });
//   }, []);

//   
// }

// export default PlayerList;
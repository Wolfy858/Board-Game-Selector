import { Routes, Route, Link } from 'react-router-dom';
import AddGameForm from './AddGameForm';
import GameSearchForm from './GameSearchForm';

function AddGame() {
  return (
    <div>
      <h2>Add Game</h2>
      <nav>
        <ul>
          <li>
            <Link to="/add">Add Game Form</Link>
          </li>
          <li>
            <Link to="/search">Game Search Form</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/add" element={<AddGameForm />} />
        <Route path="/search" element={<GameSearchForm />} />
      </Routes>
    </div>
  );
}

export default AddGame;

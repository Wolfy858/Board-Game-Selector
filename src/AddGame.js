import { Routes, Outlet, Link } from 'react-router-dom';

function AddGame() {
  return (
    <div>
      <h2>Add Game</h2>
      <nav>
        <ul>
          <li>
            <Link to="/add-game/search">Game Search Form</Link>
          </li>
          <li>
            <Link to="/add-game/custom">Add Game Form</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default AddGame;

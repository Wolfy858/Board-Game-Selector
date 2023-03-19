import { Routes, Outlet, Link } from 'react-router-dom';
import './styles/AddGame.css'

function AddGame() {
  return (
    <div>
      <div className="add-game-nav">
        <Link to="/add-game/search" className="add-game-nav-link">
          Game Search Form
        </Link>
        <Link to="/add-game/custom" className="add-game-nav-link">
          Add Game Form
        </Link>
        
      </div>
      <Outlet />
    </div>
  );
}

export default AddGame;

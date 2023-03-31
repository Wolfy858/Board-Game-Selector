import { Outlet, NavLink } from 'react-router-dom';
import './styles/AddGame.css'

function AddGame() {
  return (
    <div>
      <div className="add-game-nav">
        <NavLink to="/add-game/search" className="add-game-nav-link" activeClassName="active">
          Game Search
        </NavLink>
        <NavLink to="/add-game/custom" className="add-game-nav-link" activeClassName="active">
          Add Custom Game
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default AddGame;

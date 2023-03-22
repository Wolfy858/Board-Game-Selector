import React from "react"
import { Link } from 'react-router-dom'

import './styles/NavHeader.css'

const NavHeader = () => {
  return (
    <nav>
      <ul className="nav-header">
        <li>
          <Link className="nav-button" to="/">Game Grid</Link>
        </li>
        <li>
          <Link className="nav-button" to="/add-game/search">Add Game</Link>
        </li>
        <li>
          <Link className="nav-button" to="/players">Players</Link>
        </li>
        <li>
          <Link className="nav-button" to="/play">Play</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavHeader
import React from "react"
import { Link } from 'react-router-dom'

import './styles/NavHeader.css'

function NavHeader() {
  return (
    <nav>
      <ul className="nav-header">
        <li>
            <Link className="nav-button" to="/">Game Grid</Link>
        </li>
        <li>
            <Link className="nav-button" to="/add-game">Add Game</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavHeader
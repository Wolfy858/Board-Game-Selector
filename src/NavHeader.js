import React from "react"
import { Link } from 'react-router-dom'

function NavHeader() {
    return (
      <nav>
        <ul>
          <li>
              <Link to="/">Game Grid</Link>
          </li>
          <li>
              <Link to="/add-game">Add Game</Link>
          </li>
        </ul>
      </nav>
    )
}

export default NavHeader
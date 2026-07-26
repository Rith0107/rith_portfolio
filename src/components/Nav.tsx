import { Link, NavLink } from 'react-router-dom'
import './Nav.css'

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-name">
          Rithwik Lagishetty
        </Link>
        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Work
          </NavLink>
          <NavLink
            to="/info"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Info
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

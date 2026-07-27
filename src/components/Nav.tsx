import { Link, NavLink } from 'react-router-dom'
import './Nav.css'

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-identity">
          <span className="nav-name">Rithwik Lagishetty</span>
          <span className="nav-title">Software Engineer</span>
        </Link>

        <nav className="nav-pill">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-pill-link active' : 'nav-pill-link')}
          >
            Work
          </NavLink>
          <NavLink
            to="/info"
            className={({ isActive }) => (isActive ? 'nav-pill-link active' : 'nav-pill-link')}
          >
            Info
          </NavLink>
        </nav>

        <div className="nav-external">
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            Resume <span className="nav-external-arrow">↗</span>
          </a>
          <a
            href="https://linkedin.com/in/rithwik-lagishetty"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <span className="nav-external-arrow">↗</span>
          </a>
        </div>
      </div>
    </header>
  )
}

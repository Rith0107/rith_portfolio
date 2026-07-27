import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import ResumeModal from './ResumeModal'
import './Nav.css'

export default function Nav() {
  const [resumeOpen, setResumeOpen] = useState(false)

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
          <button type="button" className="nav-external-button" onClick={() => setResumeOpen(true)}>
            Resume <span className="nav-external-arrow">↗</span>
          </button>
          <a
            href="https://www.linkedin.com/in/rithwik-lagishetty/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <span className="nav-external-arrow">↗</span>
          </a>
        </div>
      </div>

      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    </header>
  )
}

import { useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import ResumeModal from './ResumeModal'
import './Nav.css'

export default function Nav() {
  const [resumeOpen, setResumeOpen] = useState(false)
  const location = useLocation()

  const pillRef = useRef<HTMLElement>(null)
  const workRef = useRef<HTMLAnchorElement>(null)
  const infoRef = useRef<HTMLAnchorElement>(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const activeLink = location.pathname === '/info' ? infoRef.current : workRef.current
    const pill = pillRef.current
    if (!activeLink || !pill) return

    const measure = () => {
      const pillRect = pill.getBoundingClientRect()
      const linkRect = activeLink.getBoundingClientRect()
      setIndicator({ left: linkRect.left - pillRect.left, width: linkRect.width })
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [location.pathname])

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-identity">
          <span className="nav-name">Rithwik Lagishetty</span>
          <span className="nav-title">Software Engineer</span>
        </Link>

        <div className="nav-pill-wrapper">
          <span
            className="nav-pill-glow"
            style={{ transform: `translateX(${indicator.left + indicator.width / 2}px)` }}
          />
          <nav className="nav-pill" ref={pillRef}>
            <span
              className="nav-pill-indicator"
              style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
            />
            <NavLink
              to="/"
              end
              ref={workRef}
              className={({ isActive }) => (isActive ? 'nav-pill-link active' : 'nav-pill-link')}
            >
              Work
            </NavLink>
            <NavLink
              to="/info"
              ref={infoRef}
              className={({ isActive }) => (isActive ? 'nav-pill-link active' : 'nav-pill-link')}
            >
              Info
            </NavLink>
          </nav>
        </div>

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

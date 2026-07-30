import { useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import ResumeModal from './ResumeModal'
import './Nav.css'

const TABS = [
  { to: '/', label: 'Work', end: true },
  { to: '/info', label: 'Info', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

export default function Nav() {
  const [resumeOpen, setResumeOpen] = useState(false)
  const location = useLocation()

  const pillRef = useRef<HTMLElement>(null)
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  const activeIndex = TABS.findIndex((tab) =>
    tab.end ? location.pathname === tab.to : location.pathname.startsWith(tab.to),
  )

  useLayoutEffect(() => {
    const activeLink = tabRefs.current[activeIndex >= 0 ? activeIndex : 0]
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
  }, [location.pathname, activeIndex])

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
            {TABS.map((tab, index) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                end={tab.end}
                ref={(el) => {
                  tabRefs.current[index] = el
                }}
                className={({ isActive }) => (isActive ? 'nav-pill-link active' : 'nav-pill-link')}
              >
                {tab.label}
              </NavLink>
            ))}
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

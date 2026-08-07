import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { getWorkEntry } from '../data/workEntries'
import './Nav.css'

const ResumeModal = lazy(() => import('./ResumeModal'))

function isProjectCaseStudy(path: string) {
  const slug = path.match(/^\/work\/([^/]+)/)?.[1]
  if (!slug) return false
  return getWorkEntry(slug)?.category === 'project'
}

function isExperienceCaseStudy(path: string) {
  const slug = path.match(/^\/work\/([^/]+)/)?.[1]
  if (!slug) return false
  return getWorkEntry(slug)?.category === 'experience'
}

const TABS = [
  { to: '/', label: 'Work', match: (path: string) => path === '/' || isProjectCaseStudy(path) },
  { to: '/info', label: 'Info', match: (path: string) => path.startsWith('/info') || isExperienceCaseStudy(path) },
  { to: '/contact', label: 'Contact', match: (path: string) => path.startsWith('/contact') },
]

export default function Nav() {
  const [resumeOpen, setResumeOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const pillRef = useRef<HTMLElement>(null)
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [indicator, setIndicator] = useState({ left: 0, width: 0, duration: 300 })
  const prevLeft = useRef<number | null>(null)

  const activeIndex = TABS.findIndex((tab) => tab.match(location.pathname))

  useLayoutEffect(() => {
    const activeLink = tabRefs.current[activeIndex >= 0 ? activeIndex : 0]
    const pill = pillRef.current
    if (!activeLink || !pill) return

    const measure = (animate: boolean) => {
      const pillRect = pill.getBoundingClientRect()
      const linkRect = activeLink.getBoundingClientRect()
      const left = linkRect.left - pillRect.left
      const distance = prevLeft.current === null ? 0 : Math.abs(left - prevLeft.current)
      const duration = animate ? Math.min(320, Math.max(160, 130 + distance * 1)) : 0
      prevLeft.current = left
      setIndicator({ left, width: linkRect.width, duration })
    }

    measure(true)
    const onResize = () => measure(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [location.pathname, activeIndex])

  return (
    <header className={`nav${scrolled ? ' nav-scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-identity" state={{ scrollToTop: true }}>
          <span className="nav-name">Rithwik Lagishetty</span>
          <span className="nav-title">Software Engineer</span>
        </Link>

        <div className="nav-pill-wrapper">
          <nav className="nav-pill" ref={pillRef}>
            <span
              className="nav-pill-indicator"
              style={{
                transform: `translateX(${indicator.left}px)`,
                width: indicator.width,
                transitionDuration: `${indicator.duration}ms`,
              }}
            />
            {TABS.map((tab, index) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                ref={(el) => {
                  tabRefs.current[index] = el
                }}
                className={index === activeIndex ? 'nav-pill-link active' : 'nav-pill-link'}
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="nav-external">
          <a
            href="https://www.linkedin.com/in/rithwik-lagishetty/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <span className="nav-external-arrow">↗</span>
          </a>
          <button type="button" className="nav-external-button" onClick={() => setResumeOpen(true)}>
            Resume <span className="nav-external-arrow">↗</span>
          </button>
        </div>
      </div>

      {resumeOpen && (
        <Suspense fallback={null}>
          <ResumeModal onClose={() => setResumeOpen(false)} />
        </Suspense>
      )}
    </header>
  )
}

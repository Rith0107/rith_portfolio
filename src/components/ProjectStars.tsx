import { useEffect, useRef, useState } from 'react'
import './ProjectStars.css'

export interface ProjectStarData {
  title: string
  meta: string
  description: string[]
  tech: string[]
}

interface ProjectStarsProps {
  projects: ProjectStarData[]
}

interface StarPosition {
  x: number
  y: number
}

const CLOSE_TRANSITION_MS = 350

// A stylized outline of Pisces — a small triangular loop for one fish, a
// chain descending to the westernmost vertex, a long cord bending back up
// to the right, ending in a small pentagon loop for the second fish (the
// personal-touch reference: Pisces). Ordered along the path so connecting
// consecutive points always traces a recognizable constellation shape, no
// matter how many are actually used.
const PISCES_PATH: StarPosition[] = [
  { x: 26, y: 8 }, // fish 1, loop top — index 0
  { x: 14, y: 24 }, // fish 1, loop left — index 1
  { x: 25, y: 31 }, // fish 1, loop bottom-right — index 2, closes back to 0
  { x: 20, y: 40 }, // chain, just below the loop
  { x: 18, y: 50 }, // chain, descending
  { x: 9, y: 66 }, // westernmost vertex, where the chain meets the cord
  { x: 30, y: 66 }, // cord, bending back up from the vertex
  { x: 52, y: 60 }, // cord, midpoint
  { x: 70, y: 54 }, // cord, approaching fish 2
  { x: 80, y: 40 }, // fish 2, pentagon top-left — index 9, entry point
  { x: 90, y: 36 }, // fish 2, pentagon top-right
  { x: 98, y: 48 }, // fish 2, pentagon right
  { x: 89, y: 62 }, // fish 2, pentagon bottom-right
  { x: 78, y: 58 }, // fish 2, pentagon bottom-left — index 13, closes back to 9
]

// The loop (fish 1) and pentagon (fish 2) are each closed shapes, not just
// an open zigzag — these connect the last point of each back to its entry
// point, on top of the sequential chain below.
const PISCES_CLOSING_LINES: [number, number][] = [
  [2, 0], // closes the fish-1 triangle
  [13, 9], // closes the fish-2 pentagon
]

// The full outline is always drawn, regardless of project count — the
// first `projects.length` points are live (clickable, labeled, tied to a
// project); any remaining points render as dim ambient filler stars, ready
// to be "claimed" by future projects without reshuffling the shape.
function buildConstellationLines(total: number) {
  const lines: [number, number][] = []
  for (let i = 0; i < total - 1; i++) {
    lines.push([i, i + 1])
  }
  for (const [a, b] of PISCES_CLOSING_LINES) {
    if (a < total && b < total) lines.push([a, b])
  }
  return lines
}

export default function ProjectStars({ projects }: ProjectStarsProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  // Lags behind selectedIndex on close, so the panel's last content stays
  // visible while it fades out instead of blanking out instantly.
  const [displayedIndex, setDisplayedIndex] = useState<number | null>(null)
  const [panelOpened, setPanelOpened] = useState(false)
  // Separate from panelOpened: toggling this (rather than opacity on mount)
  // is what the CSS transitions on. Flipping it a frame after mount, instead
  // of in the same commit, is required for the transition to actually play
  // — a class already present on insertion has no prior frame to animate from.
  const [panelVisible, setPanelVisible] = useState(false)
  const closeTimeoutRef = useRef<number>()

  const positions = PISCES_PATH
  const lines = buildConstellationLines(PISCES_PATH.length)
  const displayedProject = displayedIndex !== null ? projects[displayedIndex] : null

  function selectStar(index: number) {
    window.clearTimeout(closeTimeoutRef.current)
    setSelectedIndex(index)
    setDisplayedIndex(index)
  }

  function closePanel() {
    setSelectedIndex(null)
    closeTimeoutRef.current = window.setTimeout(() => {
      setDisplayedIndex(null)
    }, CLOSE_TRANSITION_MS)
  }

  useEffect(() => {
    if (selectedIndex === null) {
      setPanelVisible(false)
      return
    }
    setPanelOpened(true)
    const id = requestAnimationFrame(() => setPanelVisible(true))
    return () => cancelAnimationFrame(id)
  }, [selectedIndex])

  useEffect(() => () => window.clearTimeout(closeTimeoutRef.current), [])

  return (
    <div className={`project-stars-layout${panelVisible ? ' panel-open' : ''}`}>
      <div className="star-map">
        <svg
          className="star-map-lines"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {lines.map(([a, b]) => (
            <line
              key={`line-${a}-${b}`}
              x1={positions[a].x}
              y1={positions[a].y}
              x2={positions[b].x}
              y2={positions[b].y}
              className="star-map-line"
            />
          ))}
        </svg>
        {positions.map((pos, index) => {
          const project = projects[index]
          if (!project) {
            return (
              <span
                key={`filler-${index}`}
                className="project-star filler"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <span className="star-dot" />
              </span>
            )
          }
          return (
            <button
              key={project.title}
              className={`project-star${index === selectedIndex ? ' active' : ''}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onClick={() => selectStar(index)}
            >
              <span className="star-dot" />
              <span className="star-label">{project.title}</span>
            </button>
          )
        })}
      </div>
      {panelOpened && (
        <div
          className={`star-detail-panel${panelVisible ? ' is-visible' : ''}`}
        >
          {displayedProject && (
            <div className="star-detail-content" key={displayedProject.title}>
              <button
                className="detail-close"
                onClick={closePanel}
                aria-label="Close project details"
              >
                ×
              </button>
              <h3>{displayedProject.title}</h3>
              <p className="detail-meta">{displayedProject.meta}</p>
              <ul className="detail-description">
                {displayedProject.description.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <div className="detail-tech">
                {displayedProject.tech.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

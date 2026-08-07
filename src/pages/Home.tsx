import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { workEntries } from '../data/workEntries'
import WindowFrame from '../components/WindowFrame'
import Reveal from '../components/Reveal'
import PacmanEasterEgg from '../components/PacmanEasterEgg'
import { useScrollGlow } from '../hooks/useScrollGlow'
import './Home.css'

export default function Home() {
  const projects = workEntries.filter((entry) => entry.category === 'project')

  useScrollGlow('.work-card')

  return (
    <main className="home">
      <section className="hero">
        <div className="hero-frame-wrap">
          <WindowFrame className="hero-frame">
            <h1 className="hero-headline">
              I build reliable systems & <span className="gradient-text">AI-powered tools</span>.
            </h1>
            <div className="hero-bio-row">
              <div className="hero-bio-box">
                <p className="hero-bio-primary">Software engineer at FIS in Atlanta.</p>
                <p className="hero-bio-secondary">Formerly at Global Payments and Cognida.ai.</p>
              </div>
            </div>
          </WindowFrame>
          <PacmanEasterEgg />
        </div>
      </section>

      <section className="work-section">
        <div className="work-grid">
          {projects.map((entry, index) => (
            <Reveal key={entry.slug} delayMs={index * 80}>
              <WorkCard entry={entry} />
            </Reveal>
          ))}
        </div>
        <BrewingLine />
      </section>
    </main>
  )
}

function BrewingLine() {
  const text = 'More projects brewing...'
  const ref = useRef<HTMLParagraphElement>(null)
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return
        startedRef.current = true

        let i = 0
        const interval = setInterval(() => {
          i += 1
          setTyped(text.slice(0, i))
          if (i >= text.length) {
            clearInterval(interval)
            setDone(true)
          }
        }, 55)
      },
      { threshold: 0.9 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <p className="work-more-brewing" ref={ref}>
      <span className="work-more-brewing-prompt">$</span>
      <span>{typed}</span>
      <span className={`work-more-brewing-cursor${done ? ' blinking' : ''}`} />
    </p>
  )
}

function WorkCard({ entry }: { entry: (typeof workEntries)[number] }) {
  return (
    <Link to={`/work/${entry.slug}`} className="work-card-link">
      <div className="work-card">
        <div className="work-card-top">
          <div className="work-card-heading">
            <h3>{entry.title}</h3>
            <ArrowIcon />
          </div>
          <p className="work-card-oneliner">{entry.oneLiner}</p>
        </div>
        <div className="work-card-visual">
          {entry.image ? (
            <img
              src={entry.image}
              alt=""
              className="work-card-visual-image"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              className="work-card-visual-fallback"
              style={{
                background: `linear-gradient(135deg, ${entry.accent}33 0%, ${entry.accent}0d 60%, transparent 100%)`,
              }}
            >
              <span className="work-card-visual-dot" style={{ background: entry.accent }} />
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="work-card-arrow-icon"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

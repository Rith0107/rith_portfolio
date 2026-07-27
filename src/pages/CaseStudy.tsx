import { Link, useParams } from 'react-router-dom'
import { workEntries, getWorkEntry } from '../data/workEntries'
import WindowFrame from '../components/WindowFrame'
import Reveal from '../components/Reveal'
import './CaseStudy.css'

export default function CaseStudy() {
  const { slug } = useParams()
  const entry = slug ? getWorkEntry(slug) : undefined

  if (!entry) {
    return (
      <main className="case-study">
        <p className="case-not-found">
          Couldn't find that one. <Link to="/">Back to work →</Link>
        </p>
      </main>
    )
  }

  const currentIndex = workEntries.findIndex((item) => item.slug === entry.slug)
  const next = workEntries[(currentIndex + 1) % workEntries.length]

  return (
    <main className="case-study">
      <Link to="/" className="case-back">
        ← Back to work
      </Link>

      <header className="case-header">
        <p className="case-meta">
          {entry.role} · {entry.location} · {entry.period}
        </p>
        <h1>{entry.title}</h1>
        <p className="case-oneliner">{entry.oneLiner}</p>
      </header>

      <Reveal>
        <WindowFrame className="case-visual">
          <div
            className="case-visual-inner"
            style={{
              background: `linear-gradient(135deg, ${entry.accent}40 0%, ${entry.accent}12 60%, transparent 100%)`,
            }}
          >
            <span className="case-visual-dot" style={{ background: entry.accent }} />
          </div>
        </WindowFrame>
      </Reveal>

      <div className="case-body">
        <p className="case-overview">{entry.overview}</p>

        {entry.context && (
          <section>
            <h2>Context</h2>
            <p>{entry.context}</p>
          </section>
        )}

        {entry.problem && (
          <section>
            <h2>The problem</h2>
            <ul>
              {entry.problem.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        )}

        {entry.process && (
          <section>
            <h2>Approach</h2>
            <ul>
              {entry.process.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        )}

        {entry.outcome && (
          <section>
            <h2>Outcome</h2>
            <ul className="case-outcome">
              {entry.outcome.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        )}

        {entry.retrospective && (
          <blockquote className="case-retrospective">
            {entry.retrospective}
          </blockquote>
        )}
      </div>

      <Link to={`/work/${next.slug}`} className="case-next">
        <span className="case-next-label">Next</span>
        <span className="case-next-title">{next.title} →</span>
      </Link>
    </main>
  )
}

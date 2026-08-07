import { Link, useParams } from 'react-router-dom'
import { workEntries, getWorkEntry } from '../data/workEntries'
import Reveal from '../components/Reveal'
import { useScrollGlow } from '../hooks/useScrollGlow'
import './CaseStudy.css'

export default function CaseStudy() {
  const { slug } = useParams()
  const entry = slug ? getWorkEntry(slug) : undefined

  useScrollGlow('.case-visual-inner', [slug])

  if (!entry) {
    return (
      <main className="case-study">
        <p className="case-not-found">
          Couldn't find that one. <Link to="/">Back to work →</Link>
        </p>
      </main>
    )
  }

  const sameCategory = workEntries.filter((item) => item.category === entry.category)
  const currentIndex = sameCategory.findIndex((item) => item.slug === entry.slug)
  const next = currentIndex < sameCategory.length - 1 ? sameCategory[currentIndex + 1] : undefined

  return (
    <main className="case-study">
      <Link to={entry.category === 'experience' ? '/info' : '/'} className="case-back">
        ← Back to {entry.category === 'experience' ? 'info' : 'work'}
      </Link>

      <header className="case-header">
        <p className="case-meta">
          {entry.role} · {entry.location} · {entry.period}
        </p>
        {entry.logo && !entry.logoWithTitle ? (
          <img src={entry.logo} alt={entry.title} className="case-logo" decoding="async" />
        ) : entry.logoWithTitle ? (
          <h1 className="case-title-brand">
            {entry.title}
            <img src={entry.logo} alt="" className="case-logo-inline" decoding="async" />
          </h1>
        ) : (
          <h1>{entry.title}</h1>
        )}
        <p className="case-oneliner">{entry.oneLiner}</p>
      </header>

      {entry.image && (
        <Reveal>
          <div className="case-visual">
            <div className="case-visual-inner">
              <img src={entry.image} alt="" className="case-visual-image" decoding="async" />
            </div>
          </div>
        </Reveal>
      )}

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

      {next && (
        <Link to={`/work/${next.slug}`} className="case-next">
          <span className="case-next-label">Next</span>
          <span className="case-next-title">{next.title} →</span>
        </Link>
      )}
    </main>
  )
}

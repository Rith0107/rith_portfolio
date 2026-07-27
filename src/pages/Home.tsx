import { Link } from 'react-router-dom'
import { workEntries } from '../data/workEntries'
import WindowFrame from '../components/WindowFrame'
import Reveal from '../components/Reveal'
import './Home.css'

export default function Home() {
  const projects = workEntries.filter((entry) => entry.category === 'project')

  return (
    <main className="home">
      <section className="hero">
        <WindowFrame className="hero-frame">
          <p className="hero-eyebrow">Software Engineer · Atlanta, USA</p>
          <h1 className="hero-headline">
            I build backend systems and <span className="gradient-text">AI-driven tools</span>{' '}
            that hold up in production.
          </h1>
          <p className="hero-tagline">
            Currently modernizing enterprise platforms at FIS, with a background in
            machine learning, document intelligence, and shipping reliable software
            end to end.
          </p>
          <div className="hero-links">
            <a href="https://github.com/Rith0107" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href="https://www.linkedin.com/in/rithwik-lagishetty/" target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href="mailto:rithwik.lagishetty@gmail.com">Email ↗</a>
          </div>
        </WindowFrame>
      </section>

      <section className="work-section">
        <div className="work-grid">
          {projects.map((entry, index) => (
            <Reveal key={entry.slug} delayMs={index * 80}>
              <WorkCard entry={entry} />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}

function WorkCard({ entry }: { entry: (typeof workEntries)[number] }) {
  return (
    <Link to={`/work/${entry.slug}`} className="work-card-link">
      <WindowFrame className="work-card">
        <div
          className="work-card-visual"
          style={{
            background: `linear-gradient(135deg, ${entry.accent}33 0%, ${entry.accent}0d 60%, transparent 100%)`,
          }}
        >
          <span className="work-card-visual-dot" style={{ background: entry.accent }} />
        </div>
        <div className="work-card-body">
          <div className="work-card-heading">
            <h3>{entry.title}</h3>
            <span className="work-card-period">{entry.period}</span>
          </div>
          <p className="work-card-role">
            {entry.role} · {entry.location}
          </p>
          <p className="work-card-oneliner">{entry.oneLiner}</p>
          <span className="work-card-arrow">View case study →</span>
        </div>
      </WindowFrame>
    </Link>
  )
}

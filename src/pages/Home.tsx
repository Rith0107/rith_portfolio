import { Link } from 'react-router-dom'
import { workEntries } from '../data/workEntries'
import './Home.css'

export default function Home() {
  const experience = workEntries.filter((entry) => entry.category === 'experience')
  const projects = workEntries.filter((entry) => entry.category === 'project')

  return (
    <main className="home">
      <section className="hero">
        <p className="hero-eyebrow">Software Engineer</p>
        <h1 className="hero-name">Rithwik Lagishetty</h1>
        <p className="hero-tagline">
          I build reliable backend systems and AI-driven tools — currently
          modernizing enterprise platforms at FIS, with a background in
          machine learning and document intelligence.
        </p>
        <div className="hero-links">
          <a href="https://github.com/Rith0107" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/rithwik-lagishetty"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:rithwik.lagishetty@gmail.com">Email</a>
        </div>
      </section>

      <section className="work-section">
        <h2 className="work-section-title">Experience</h2>
        <ul className="work-list">
          {experience.map((entry) => (
            <li key={entry.slug}>
              <Link to={`/work/${entry.slug}`} className="work-row">
                <div className="work-row-heading">
                  <h3>{entry.title}</h3>
                  <span className="work-row-period">{entry.period}</span>
                </div>
                <p className="work-row-role">
                  {entry.role} · {entry.location}
                </p>
                <p className="work-row-oneliner">{entry.oneLiner}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="work-section">
        <h2 className="work-section-title">Projects</h2>
        <ul className="work-list">
          {projects.map((entry) => (
            <li key={entry.slug}>
              <Link to={`/work/${entry.slug}`} className="work-row">
                <div className="work-row-heading">
                  <h3>{entry.title}</h3>
                  <span className="work-row-period">{entry.period}</span>
                </div>
                <p className="work-row-role">
                  {entry.role} · {entry.location}
                </p>
                <p className="work-row-oneliner">{entry.oneLiner}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

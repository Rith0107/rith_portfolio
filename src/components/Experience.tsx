import { useEffect, useRef, useState } from 'react'
import Globe from './Globe'
import './Experience.css'

interface ExperienceEntry {
  company: string
  role: string
  location: string
  period: string
  bullets: string[]
  pinIndex: number
}

const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'FIS',
    role: 'Software Engineer II',
    location: 'Atlanta, USA',
    period: 'January 2026 – Present',
    pinIndex: 0,
    bullets: [
      'Modernizing the Cards platform by migrating legacy COBOL components to Java, improving backend maintainability, scalability, and long-term system reliability.',
      'Contributing to AI-driven document anomaly-detection solutions for customer mailer validation, building on PDF-based workflows and extending support toward AFP processing.',
      'Designing, testing, and delivering production-ready enterprise software features in Agile teams, translating business requirements into reliable backend services and document validation systems.',
    ],
  },
  {
    company: 'Global Payments',
    role: 'Software Engineer Intern',
    location: 'Atlanta, USA',
    period: 'June 2025 – December 2025',
    pinIndex: 0,
    bullets: [
      'Built AI-powered software for automated anomaly detection in customer-facing mailer PDFs and HTML templates, reducing manual compliance review time from 2–3 hours to under 15 minutes.',
      'Developed and optimized Python-based ML pipelines to detect text overlap, layout issues, and missing-value anomalies in semi-structured documents, cutting anomaly detection time by 90%+ and achieving 95% accuracy.',
      'Collaborated with engineers and stakeholders to design, test, and integrate production-ready solutions into enterprise systems using Agile development practices.',
    ],
  },
  {
    company: 'Cognida.ai',
    role: 'Software Developer / Software Developer Intern',
    location: 'Hyderabad, India',
    period: 'February 2023 – October 2023',
    pinIndex: 1,
    bullets: [
      'Built an internal mobile application using Microsoft PowerApps to streamline assignment tracking and status reporting, improving operational efficiency and stakeholder visibility.',
      'Used client and usage data to identify product and workflow improvement opportunities, supporting development of more effective software solutions.',
      'Worked with cross-functional teams to translate business requirements into implementable features, user stories, dashboards, and technical deliverables.',
    ],
  },
  {
    company: 'PerspectAI',
    role: 'Technical and Inside Sales Intern',
    location: 'Hyderabad, India',
    period: 'July 2022 – October 2022',
    pinIndex: 1,
    bullets: [
      'Conducted market research to identify target audiences and analyze current industry trends.',
      'Collaborated across technical teams — testing, development, and design — gaining hands-on exposure to multiple parts of the product lifecycle.',
    ],
  },
]

const FLY_DURATION_MS = 450

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [flyingCompany, setFlyingCompany] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [sectionVisible, setSectionVisible] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  function handleAdvance() {
    if (flyingCompany) return
    setFlyingCompany(EXPERIENCE[activeIndex].company)
    setActiveIndex((i) => (i + 1) % EXPERIENCE.length)
    window.setTimeout(() => {
      setFlyingCompany(null)
    }, FLY_DURATION_MS)
  }

  const length = EXPERIENCE.length

  return (
    <section
      className={`experience${sectionVisible ? ' is-visible' : ''}`}
      id="experience"
      ref={sectionRef}
    >
      <h2 className="section-title">Experience</h2>
      <p className="stack-hint">Click the front card to see the next role</p>
      <div className="experience-layout">
        <div className="card-stack">
          {EXPERIENCE.map((entry, index) => {
            const rel = (index - activeIndex + length) % length
            const isFront = rel === 0
            const flying = entry.company === flyingCompany
            return (
              <article
                key={entry.company}
                className={`stack-card depth-${rel}${flying ? ' flying' : ''}`}
                style={{ zIndex: flying ? length + 1 : length - rel }}
                onClick={isFront ? handleAdvance : undefined}
                role={isFront ? 'button' : undefined}
                tabIndex={isFront ? 0 : -1}
                onKeyDown={(e) => {
                  if (isFront && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault()
                    handleAdvance()
                  }
                }}
              >
                <div className="card-header">
                  <h3>{entry.company}</h3>
                  <span className="card-period">{entry.period}</span>
                </div>
                <p className="card-role">
                  {entry.role} · {entry.location}
                </p>
                <ul className="card-bullets">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
        <div className="globe-panel">
          <Globe activePinIndex={EXPERIENCE[activeIndex].pinIndex} />
        </div>
      </div>
      <div className="stack-dots">
        {EXPERIENCE.map((entry, index) => (
          <span
            key={entry.company}
            className={`stack-dot${index === activeIndex ? ' active' : ''}`}
          />
        ))}
      </div>
    </section>
  )
}

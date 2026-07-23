import { useEffect, useRef, useState } from 'react'
import './Experience.css'

interface ExperienceEntry {
  company: string
  role: string
  location: string
  period: string
  bullets: string[]
}

const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'FIS',
    role: 'Software Engineer II',
    location: 'Atlanta, USA',
    period: 'January 2026 – Present',
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
    bullets: [
      'Built an internal mobile application using Microsoft PowerApps to streamline assignment tracking and status reporting, improving operational efficiency and stakeholder visibility.',
      'Used client and usage data to identify product and workflow improvement opportunities, supporting development of more effective software solutions.',
      'Worked with cross-functional teams to translate business requirements into implementable features, user stories, dashboards, and technical deliverables.',
    ],
  },
]

function TimelineItem({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entryObs]) => {
        if (entryObs.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <li
      ref={ref}
      className={`timeline-item${visible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="timeline-marker" />
      <div className="timeline-content">
        <div className="timeline-header">
          <h3>{entry.company}</h3>
          <span className="timeline-period">{entry.period}</span>
        </div>
        <p className="timeline-role">
          {entry.role} · {entry.location}
        </p>
        <ul className="timeline-bullets">
          {entry.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <h2 className="section-title">Experience</h2>
      <ol className="timeline">
        {EXPERIENCE.map((entry, index) => (
          <TimelineItem key={entry.company} entry={entry} index={index} />
        ))}
      </ol>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { workEntries } from '../data/workEntries'
import './Info.css'

const SKILLS: { category: string; items: string[] }[] = [
  {
    category: 'Programming Languages',
    items: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'HTML', 'CSS', 'SQL'],
  },
  {
    category: 'Software Engineering',
    items: [
      'Data Structures & Algorithms',
      'OOP',
      'REST APIs',
      'Testing',
      'Backend Development',
      'Microservices',
      'Agile',
      'Git',
    ],
  },
  {
    category: 'Machine Learning / AI',
    items: [
      'Scikit-learn',
      'TensorFlow',
      'PyTorch',
      'Pandas',
      'NumPy',
      'Model Evaluation',
      'Computer Vision',
      'NLP',
    ],
  },
  {
    category: 'Systems / Platforms',
    items: ['Linux/Unix', 'AWS', 'Cloud Computing'],
  },
]

interface EducationEntry {
  school: string
  subtitle?: string
  logo: string
  location: string
  degree: string
  period: string
  detail: string
}

const EDUCATION: EducationEntry[] = [
  {
    school: 'New Jersey Institute of Technology',
    subtitle: '(NJIT)',
    logo: '/logos/njit.png',
    location: 'Newark, NJ, USA',
    degree: 'Master of Science in Computer Science',
    period: 'December 2025',
    detail: 'GPA: 4.0/4.0',
  },
  {
    school: 'Mahindra University',
    subtitle: 'Formerly Mahindra École Centrale',
    logo: '/logos/mahindra.png',
    location: 'Hyderabad, India',
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    period: 'August 2023',
    detail: 'GPA: 8.6/10',
  },
]

function Overline({ children }: { children: string }) {
  return (
    <div className="info-overline">
      <span className="info-overline-dot" />
      <span className="info-overline-text">{children}</span>
    </div>
  )
}

function PinIcon() {
  return (
    <svg className="pin-icon" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 4.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" />
    </svg>
  )
}

export default function Info() {
  const experience = workEntries.filter((entry) => entry.category === 'experience')

  return (
    <main className="info">
      <section className="info-section info-about">
        <h1>About</h1>
        <p>
          I'm a software engineer currently at FIS, modernizing a legacy
          Cards platform and contributing to AI-driven document
          intelligence work. Before that, I built anomaly-detection systems
          at Global Payments and worked across product and engineering at
          Cognida.ai. My background spans backend systems and machine
          learning — I care most about work that's reliable enough for
          someone else to depend on, not just clever.
        </p>
      </section>

      <section className="info-section">
        <Overline>Experience</Overline>
        <div className="experience-list">
          {experience.map((entry) => (
            <Link key={entry.slug} to={`/work/${entry.slug}`} className="experience-row">
              <div className="experience-company-block">
                <div className="experience-company">
                  {entry.logo ? (
                    entry.logoWithTitle ? (
                      <>
                        {entry.title}
                        <img src={entry.logo} alt="" className="experience-logo experience-logo-inline" />
                      </>
                    ) : (
                      <img src={entry.logo} alt={entry.title} className="experience-logo" />
                    )
                  ) : (
                    entry.title
                  )}
                </div>
                <span className="experience-location">
                  <PinIcon />
                  {entry.location}
                </span>
              </div>
              <div className="experience-details">
                <div className="experience-title-date">
                  <h3>{entry.role}</h3>
                  <span className="experience-meta">{entry.period}</span>
                </div>
                <p className="experience-body">{entry.oneLiner}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="info-section">
        <Overline>Education</Overline>
        <div className="edu-cards">
          {EDUCATION.map((item) => (
            <div key={item.school} className="edu-card">
              <span className="edu-card-logo-wrap">
                <img src={item.logo} alt={item.school} className="edu-card-logo" />
              </span>
              <h3 className="edu-card-name">{item.school}</h3>
              {item.subtitle && <p className="edu-card-subtitle">{item.subtitle}</p>}
              <span className="experience-location">
                <PinIcon />
                {item.location}
              </span>
              <p className="edu-card-degree">{item.degree}</p>
              <p className="edu-card-detail">{item.detail}</p>
              <p className="edu-card-detail">Graduated in {item.period}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="info-section">
        <Overline>Skills</Overline>
        <div className="skills-grid">
          {SKILLS.map((group) => (
            <div key={group.category} className="skills-group">
              <h3>{group.category}</h3>
              <div className="skills-tags">
                {group.items.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="info-section">
        <Overline>Contact</Overline>
        <div className="info-contact">
          <a href="https://github.com/Rith0107" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/rithwik-lagishetty/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:rithwik.lagishetty@gmail.com">Email</a>
        </div>
      </section>
    </main>
  )
}

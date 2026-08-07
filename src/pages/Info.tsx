import { Link } from 'react-router-dom'
import { workEntries } from '../data/workEntries'
import WindowFrame from '../components/WindowFrame'
import { useScrollGlow } from '../hooks/useScrollGlow'
import { useMediaQuery } from '../hooks/useMediaQuery'
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

function Overline({ children, as: Tag = 'div' }: { children: string; as?: 'div' | 'h1' }) {
  return (
    <Tag className="info-overline">
      <span className="info-overline-dot" />
      <span className="info-overline-text">{children}</span>
    </Tag>
  )
}

function PinIcon() {
  return (
    <svg className="pin-icon" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 4.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" />
    </svg>
  )
}

interface Chapter {
  title: string
  text: string
  accent: string
  aspect: number
  photo?: string
}

const CHAPTERS: Chapter[] = [
  {
    title: 'Where it started',
    text: "I've been curious about computers for as long as I can remember. As a kid I'd just sit there wondering — what's actually happening when I press a key, how does this thing even work? That curiosity never really went away, it just eventually turned into a CS degree.",
    accent: '#8b7cf6',
    aspect: 0.75,
    photo: '/photos/nyc-skyline.jpg',
  },
  {
    title: 'Then AI happened',
    text: "What got me hooked on AI and ML was realizing you could actually train a machine to do what you want, instead of just telling it exactly what to do step by step. That blew my mind a little, honestly. That's the moment I went from liking computers to wanting to build the ones that learn.",
    accent: '#4fd1c5',
    aspect: 0.562,
    photo: '/photos/ai-coding-dog.jpg',
  },
  {
    title: 'A big leap',
    text: "I moved from India to the US for my master's, which meant leaving family and everything familiar behind and starting over on my own. It was hard. But looking back, it's probably the thing that's made me grow the most.",
    accent: '#f6ad55',
    aspect: 0.75,
    photo: '/photos/vermont-landscape.jpg',
  },
  {
    title: 'Outside of work,',
    text: "You'll usually find me cooking, out shooting photos, or geeking out over cars — road trips are my favorite excuse to indulge that obsession. Add in the occasional cricket match and that's pretty much life outside of code. All of it makes me slow down and actually notice things — something code rarely asks of me.",
    accent: '#f687b3',
    aspect: 0.662,
    photo: '/photos/art-colosseum.jpg',
  },
]

function ChapterVisual({ chapter }: { chapter: Chapter }) {
  return (
    <div className="info-chapter-visual">
      {chapter.photo ? (
        <img
          src={chapter.photo}
          alt=""
          style={{ aspectRatio: chapter.aspect }}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div
          className="info-chapter-placeholder"
          style={{
            aspectRatio: chapter.aspect,
            background: `linear-gradient(135deg, ${chapter.accent}40 0%, ${chapter.accent}12 60%, transparent 100%)`,
          }}
        >
          <span className="info-chapter-dot" style={{ background: chapter.accent }} />
        </div>
      )}
    </div>
  )
}

function ChapterText({ chapter }: { chapter: Chapter }) {
  return (
    <div className="info-chapter">
      <h3>{chapter.title}</h3>
      <p>{chapter.text}</p>
    </div>
  )
}

function SignOff() {
  return (
    <div className="info-sign-off">
      <p>That's the story so far — thanks for reading.</p>
      <span className="info-signature" role="img" aria-label="Rithwik's signature" />
    </div>
  )
}

export default function Info() {
  const experience = workEntries.filter((entry) => entry.category === 'experience')
  const isDesktop = useMediaQuery('(min-width: 701px)')
  const lastChapterIndex = CHAPTERS.length - 1

  useScrollGlow('.info-chapter-visual')

  return (
    <main className="info">
      <section className="info-section info-about">
        <Overline as="h1">About</Overline>
        <div className="info-about-body">
          <p className="info-about-hook">
            I'm a software engineer who's still chasing the same question that got me here —{' '}
            <span className="gradient-text">how does this actually work?</span>
          </p>

          {isDesktop ? (
            <div className="info-chapters-columns">
              <div className="info-chapters-col">
                {CHAPTERS.map((chapter, index) =>
                  index % 2 === 0 ? (
                    <ChapterVisual key={chapter.title} chapter={chapter} />
                  ) : (
                    <ChapterText key={chapter.title} chapter={chapter} />
                  ),
                )}
                {lastChapterIndex % 2 === 1 && <SignOff key="sign-off" />}
              </div>
              <div className="info-chapters-col">
                {CHAPTERS.map((chapter, index) =>
                  index % 2 === 0 ? (
                    <ChapterText key={chapter.title} chapter={chapter} />
                  ) : (
                    <ChapterVisual key={chapter.title} chapter={chapter} />
                  ),
                )}
                {lastChapterIndex % 2 === 0 && <SignOff key="sign-off" />}
              </div>
            </div>
          ) : (
            <div className="info-chapters-list">
              {CHAPTERS.map((chapter) => (
                <div key={chapter.title} className="info-chapter-row">
                  <ChapterVisual chapter={chapter} />
                  <ChapterText chapter={chapter} />
                </div>
              ))}
            </div>
          )}

          {!isDesktop && <SignOff />}
        </div>
      </section>

      <div className="info-divider" />

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
                        <img
                          src={entry.logo}
                          alt=""
                          className="experience-logo experience-logo-inline"
                          decoding="async"
                        />
                      </>
                    ) : (
                      <img src={entry.logo} alt={entry.title} className="experience-logo" decoding="async" />
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
                {entry.roles ? (
                  <div className="role-timeline">
                    {entry.roles.map((r) => (
                      <div key={r.title} className="role-timeline-item">
                        <div className="experience-title-date">
                          <h3>{r.title}</h3>
                          <span className="experience-meta">{r.period}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="experience-title-date">
                    <h3>{entry.role}</h3>
                    <span className="experience-meta">{entry.period}</span>
                  </div>
                )}
                <p className="experience-body">{entry.oneLiner}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="info-divider" />

      <section className="info-section">
        <Overline>Education</Overline>
        <div className="edu-cards">
          {EDUCATION.map((item) => (
            <div key={item.school} className="edu-card">
              <span className="edu-card-logo-wrap">
                <img src={item.logo} alt={item.school} className="edu-card-logo" decoding="async" />
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

      <div className="info-divider" />

      <section className="info-section">
        <Overline>Skills</Overline>
        <WindowFrame className="skills-terminal">
          <p className="skills-terminal-prompt">
            <span className="skills-terminal-prefix">$</span> cat skills.json
          </p>
          <p className="skills-terminal-brace">{'{'}</p>
          {SKILLS.map((group, index) => (
            <p key={group.category} className="skills-terminal-json-line">
              <span className="skills-terminal-key">
                "{group.category.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')}"
              </span>
              <span className="skills-terminal-punct">: [</span>
              <span className="skills-terminal-items">
                {group.items.map((item) => `"${item}"`).join(', ')}
              </span>
              <span className="skills-terminal-punct">]{index < SKILLS.length - 1 ? ',' : ''}</span>
            </p>
          ))}
          <p className="skills-terminal-brace">{'}'}</p>
        </WindowFrame>
      </section>
    </main>
  )
}

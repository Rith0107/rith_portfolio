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

const EDUCATION = [
  {
    school: 'New Jersey Institute of Technology (NJIT)',
    degree: 'M.S. in Computer Science',
    period: 'December 2025',
    detail: 'GPA: 4.0/4.0',
  },
  {
    school: 'Mahindra Ecole Centrale',
    degree: 'B.Tech in Computer Science and Engineering',
    period: 'August 2023',
    detail: 'GPA: 8.6/10',
  },
]

export default function Info() {
  return (
    <main className="info">
      <section className="info-section">
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
        <h2>Education</h2>
        <ul className="info-list">
          {EDUCATION.map((item) => (
            <li key={item.school}>
              <div className="info-list-heading">
                <h3>{item.school}</h3>
                <span>{item.period}</span>
              </div>
              <p>{item.degree}</p>
              <p className="info-list-detail">{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="info-section">
        <h2>Skills</h2>
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
        <h2>Contact</h2>
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

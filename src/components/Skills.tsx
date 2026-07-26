import { useEffect, useRef, useState } from 'react'
import AsteroidField from './AsteroidField'
import './Skills.css'

const SKILLS = [
  'Python',
  'Java',
  'JavaScript',
  'C++',
  'SQL',
  'Data Structures & Algorithms',
  'REST APIs',
  'Microservices',
  'Backend Development',
  'Git',
  'Agile',
  'Scikit-learn',
  'TensorFlow',
  'PyTorch',
  'Computer Vision',
  'NLP',
  'Pandas',
  'AWS',
  'Cloud Computing',
  'Linux',
]

export default function Skills() {
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

  return (
    <section
      className={`skills${sectionVisible ? ' is-visible' : ''}`}
      id="skills"
      ref={sectionRef}
    >
      <h2 className="section-title">Skills</h2>
      <p className="skills-hint">An asteroid field of everything I work with</p>
      <div className="asteroid-field-wrapper">
        <AsteroidField skills={SKILLS} />
      </div>
    </section>
  )
}

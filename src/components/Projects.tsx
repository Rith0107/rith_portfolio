import { useEffect, useRef, useState } from 'react'
import ProjectStars, { type ProjectStarData } from './ProjectStars'
import './Projects.css'

const PROJECTS: ProjectStarData[] = [
  {
    title: 'Disaster Recognition from Aerial Images',
    meta: 'January 2025 – May 2025 · NJIT',
    description: [
      'Built and evaluated a MobileNetV2-based computer vision pipeline in Python for aerial disaster image classification.',
      'Used data augmentation and class balancing to improve model generalization on imbalanced datasets.',
    ],
    tech: ['Python', 'Computer Vision', 'MobileNetV2', 'Deep Learning'],
  },
  {
    title: 'Used Cars Price Prediction',
    meta: 'August 2024 – December 2024 · NJIT',
    description: [
      'Developed an end-to-end machine learning pipeline for used car price prediction using Random Forest and Gradient Boosting.',
      'Applied feature engineering, preprocessing, and SHAP-based model interpretation.',
    ],
    tech: ['Python', 'Random Forest', 'Gradient Boosting', 'SHAP'],
  },
  {
    title: 'AD MAKER',
    meta: 'January 2022 – December 2022 · Mahindra University',
    description: [
      'Built an interactive ad-generation system using GPT-3, ConceptNet, and NRCLex to generate ad concepts from a given product type and emotional tone.',
      'Designed NLP pipelines for large ad datasets, including emotion tagging, semantic filtering, and content ranking to improve relevance.',
    ],
    tech: ['GPT-3', 'NLP', 'ConceptNet', 'NRCLex'],
  },
]

export default function Projects() {
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
      className={`projects${sectionVisible ? ' is-visible' : ''}`}
      id="projects"
      ref={sectionRef}
    >
      <h2 className="section-title">Projects</h2>
      <p className="station-hint">Click a star to read about that project</p>
      <ProjectStars projects={PROJECTS} />
    </section>
  )
}

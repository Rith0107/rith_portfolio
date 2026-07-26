import { useParams } from 'react-router-dom'

export default function CaseStudy() {
  const { slug } = useParams()
  return (
    <main>
      <h1>Case study: {slug}</h1>
    </main>
  )
}

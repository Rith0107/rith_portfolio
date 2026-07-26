import StarfieldBackground from './components/StarfieldBackground'
import Hero from './components/Hero'
import Experience from './components/Experience'
import MarsTransition from './components/MarsTransition'
import Projects from './components/Projects'
import Skills from './components/Skills'
import './App.css'

function App() {
  return (
    <main className="app">
      <StarfieldBackground />
      <Hero />
      <Experience />
      <Projects />
      <MarsTransition />
      <Skills />
    </main>
  )
}

export default App

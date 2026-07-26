import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import Info from './pages/Info'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work/:slug" element={<CaseStudy />} />
      <Route path="/info" element={<Info />} />
    </Routes>
  )
}

export default App

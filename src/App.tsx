import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import Info from './pages/Info'
import Contact from './pages/Contact'

function App() {
  const location = useLocation()
  const scrollPositions = useRef<Map<string, number>>(new Map())

  // Continuously remember where the user is scrolled to on each page, so
  // returning to it (e.g. via a "back to work" link) can restore that spot
  // instead of dropping them back at the top.
  useEffect(() => {
    const onScroll = () => {
      scrollPositions.current.set(location.pathname, window.scrollY)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  useEffect(() => {
    const forceTop = (location.state as { scrollToTop?: boolean } | null)?.scrollToTop
    const saved = scrollPositions.current.get(location.pathname)
    window.scrollTo(0, forceTop ? 0 : saved ?? 0)
  }, [location.pathname, location.state])

  return (
    <>
      <Nav />
      <div key={location.pathname} className="page-transition">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/info" element={<Info />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App

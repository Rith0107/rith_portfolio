import { useLocation } from 'react-router-dom'
import './Footer.css'

const CARS = ['/cars/car-1-k4.png', '/cars/car-2-scross.png', '/cars/car-3-i10.png']

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const location = useLocation()
  const showCars = location.pathname === '/contact'

  return (
    <footer className="footer">
      {showCars && (
        <div className="footer-cars" aria-hidden="true">
          {CARS.map((src) => (
            <img key={src} src={src} alt="" className="footer-car" />
          ))}
        </div>
      )}
      <div className="footer-inner">
        <div className="footer-links">
          <a href="mailto:rithwik.lagishetty@gmail.com" className="footer-link">
            <MailIcon />
            <span>rithwik.lagishetty@gmail.com</span>
          </a>
          <a
            href="https://www.instagram.com/rithwiklagishetty/"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            <InstagramIcon />
            <span>@rithwiklagishetty</span>
          </a>
        </div>
        <p className="footer-copyright">© {year} Rithwik Lagishetty. All rights reserved.</p>
      </div>
    </footer>
  )
}

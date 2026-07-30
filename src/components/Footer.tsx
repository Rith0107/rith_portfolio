import './Footer.css'

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

  return (
    <footer className="footer">
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

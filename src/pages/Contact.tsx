import { useState, type FormEvent } from 'react'
import './Contact.css'

const FORM_ENDPOINT = 'https://formspree.io/f/xkjwonnk'

type Status = 'idle' | 'sending' | 'sent' | 'error'

function IndiaBorderFrame() {
  return (
    <div className="india-border-frame" aria-hidden="true">
      <span className="india-border-strip edge-x top" />
      <span className="india-border-strip edge-x bottom" />
      <span className="india-border-strip edge-y left" />
      <span className="india-border-strip edge-y right" />
    </div>
  )
}

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(event.currentTarget),
      })
      if (response.ok) {
        setStatus('sent')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="contact">
      <div className="postcard">
        <IndiaBorderFrame />

        <div className="postcard-message">
          <h1 className="contact-greeting">Hey there,</h1>
          <p className="contact-subtitle">
            Whether you just want to say hi, talk about a role or project, or share something
            you're building — I'd genuinely love to hear from you. Go ahead, write below.
          </p>
          <p className="contact-ps">
            P.S. — if you've got a second, I'd love to know what you thought of this site.
          </p>
        </div>

        <div className="postcard-divider" aria-hidden="true" />

        <div className="postcard-address">
          <span className="postcard-stamp">
            <svg
              className="postcard-stamp-chakra"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
            >
              <circle cx="12" cy="12" r="9.5" />
              <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
              <line x1="12.00" y1="9.80" x2="12.00" y2="2.50" />
              <line x1="12.57" y1="9.87" x2="14.46" y2="2.82" />
              <line x1="13.10" y1="10.09" x2="16.75" y2="3.77" />
              <line x1="13.56" y1="10.44" x2="18.72" y2="5.28" />
              <line x1="13.91" y1="10.90" x2="20.23" y2="7.25" />
              <line x1="14.13" y1="11.43" x2="21.18" y2="9.54" />
              <line x1="14.20" y1="12.00" x2="21.50" y2="12.00" />
              <line x1="14.13" y1="12.57" x2="21.18" y2="14.46" />
              <line x1="13.91" y1="13.10" x2="20.23" y2="16.75" />
              <line x1="13.56" y1="13.56" x2="18.72" y2="18.72" />
              <line x1="13.10" y1="13.91" x2="16.75" y2="20.23" />
              <line x1="12.57" y1="14.13" x2="14.46" y2="21.18" />
              <line x1="12.00" y1="14.20" x2="12.00" y2="21.50" />
              <line x1="11.43" y1="14.13" x2="9.54" y2="21.18" />
              <line x1="10.90" y1="13.91" x2="7.25" y2="20.23" />
              <line x1="10.44" y1="13.56" x2="5.28" y2="18.72" />
              <line x1="10.09" y1="13.10" x2="3.77" y2="16.75" />
              <line x1="9.87" y1="12.57" x2="2.82" y2="14.46" />
              <line x1="9.80" y1="12.00" x2="2.50" y2="12.00" />
              <line x1="9.87" y1="11.43" x2="2.82" y2="9.54" />
              <line x1="10.09" y1="10.90" x2="3.77" y2="7.25" />
              <line x1="10.44" y1="10.44" x2="5.28" y2="5.28" />
              <line x1="10.90" y1="10.09" x2="7.25" y2="3.77" />
              <line x1="11.43" y1="9.87" x2="9.54" y2="2.82" />
            </svg>
            <span className="postcard-stamp-label">INDIA POST</span>
          </span>

          {status === 'sent' ? (
            <p className="contact-success">
              Thanks — your message is on its way. I'll reply soon.
            </p>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="contact-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="contact-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </div>
              <button type="submit" className="contact-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              {status === 'error' && (
                <p className="contact-error">
                  Something went wrong. Email me directly at{' '}
                  <a href="mailto:rithwik.lagishetty@gmail.com">rithwik.lagishetty@gmail.com</a>.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </main>
  )
}

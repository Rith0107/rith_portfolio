import { useState, type CSSProperties, type MouseEvent } from 'react'
import PacmanModal from './PacmanModal'
import './PacmanEasterEgg.css'

export default function PacmanEasterEgg() {
  const [prompting, setPrompting] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [promptX, setPromptX] = useState<number | null>(null)
  const [tailOffset, setTailOffset] = useState(0)

  function handleSpriteClick(event: MouseEvent<HTMLButtonElement>) {
    const wrap = event.currentTarget.closest('.hero-frame-wrap')
    if (wrap) {
      const wrapRect = wrap.getBoundingClientRect()
      const btnRect = event.currentTarget.getBoundingClientRect()
      const rawX = btnRect.left + btnRect.width / 2 - wrapRect.left
      const half = 130
      const clampedX = Math.min(Math.max(rawX, half), wrapRect.width - half)
      setPromptX(clampedX)
      const maxTailOffset = half - 24
      setTailOffset(Math.min(Math.max(rawX - clampedX, -maxTailOffset), maxTailOffset))
    }
    setPrompting(true)
  }

  return (
    <>
      <div className="pacman-egg-track">
        <button
          type="button"
          className={`pacman-egg-sprite${prompting ? ' pacman-egg-paused' : ''}`}
          onClick={handleSpriteClick}
          aria-label="Play a hidden game"
        >
          <span className="pacman-egg-shape">
            <span className="pacman-egg-mouth" />
          </span>
        </button>
      </div>

      {prompting && (
        <div className="pacman-egg-prompt-layer">
          <div
            className="pacman-egg-prompt"
            style={
              promptX !== null
                ? ({ left: `${promptX}px`, '--tail-offset': `${tailOffset}px` } as CSSProperties)
                : undefined
            }
          >
            <p>Wanna play a game?</p>
            <div className="pacman-egg-prompt-actions">
              <button
                type="button"
                className="pacman-egg-yes"
                onClick={() => {
                  setPrompting(false)
                  setPlaying(true)
                }}
              >
                Yeah
              </button>
              <button type="button" className="pacman-egg-no" onClick={() => setPrompting(false)}>
                Nah
              </button>
            </div>
          </div>
        </div>
      )}

      {playing && <PacmanModal onClose={() => setPlaying(false)} />}
    </>
  )
}

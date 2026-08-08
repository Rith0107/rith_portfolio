import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import WindowFrame from './WindowFrame'
import PacmanGame from './PacmanGame'
import { useScrollLock } from '../hooks/useScrollLock'
import './PacmanModal.css'

interface PacmanModalProps {
  onClose: () => void
}

export default function PacmanModal({ onClose }: PacmanModalProps) {
  useScrollLock(true)

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return createPortal(
    <div className="pacman-modal-overlay" onClick={onClose}>
      <div className="pacman-modal" onClick={(event) => event.stopPropagation()}>
        <WindowFrame className="pacman-modal-frame" onClose={onClose}>
          <div className="pacman-modal-bar">
            <span className="pacman-modal-title">Pacman</span>
          </div>
          <PacmanGame />
        </WindowFrame>
      </div>
    </div>,
    document.body,
  )
}

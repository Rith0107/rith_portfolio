import type { ReactNode } from 'react'
import './WindowFrame.css'

interface WindowFrameProps {
  children: ReactNode
  className?: string
  onClose?: () => void
  onMaximize?: () => void
}

export default function WindowFrame({ children, className, onClose, onMaximize }: WindowFrameProps) {
  return (
    <div className={`window-frame${className ? ` ${className}` : ''}`}>
      <div className="window-frame-bar">
        {onClose ? (
          <button
            type="button"
            className="window-dot window-dot-red window-dot-close"
            onClick={onClose}
            aria-label="Close"
          />
        ) : (
          <span className="window-dot window-dot-red" />
        )}
        <span className="window-dot window-dot-yellow" />
        {onMaximize ? (
          <button
            type="button"
            className="window-dot window-dot-green window-dot-maximize"
            onClick={onMaximize}
            aria-label="Maximize"
          />
        ) : (
          <span className="window-dot window-dot-green" />
        )}
      </div>
      <div className="window-frame-body">{children}</div>
    </div>
  )
}

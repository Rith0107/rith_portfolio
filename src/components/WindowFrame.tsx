import type { ReactNode } from 'react'
import './WindowFrame.css'

interface WindowFrameProps {
  children: ReactNode
  className?: string
}

export default function WindowFrame({ children, className }: WindowFrameProps) {
  return (
    <div className={`window-frame${className ? ` ${className}` : ''}`}>
      <div className="window-frame-bar">
        <span className="window-dot window-dot-red" />
        <span className="window-dot window-dot-yellow" />
        <span className="window-dot window-dot-green" />
      </div>
      <div className="window-frame-body">{children}</div>
    </div>
  )
}

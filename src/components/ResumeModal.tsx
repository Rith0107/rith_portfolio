import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.js?url'
import WindowFrame from './WindowFrame'
import { useScrollLock } from '../hooks/useScrollLock'
import './ResumeModal.css'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

interface ResumeModalProps {
  onClose: () => void
}

export default function ResumeModal({ onClose }: ResumeModalProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading')
  const [maximized, setMaximized] = useState(false)

  useScrollLock(true)

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  useEffect(() => {
    let cancelled = false

    async function renderResume() {
      const container = containerRef.current
      if (!container) return

      container.innerHTML = ''
      setStatus('loading')

      try {
        const pdf = await pdfjsLib.getDocument('/resume.pdf').promise
        if (cancelled || !containerRef.current) return

        const outputScale = Math.min(window.devicePixelRatio || 1, 3)

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          const page = await pdf.getPage(pageNumber)
          if (cancelled || !containerRef.current) return

          const cssScale = (container.clientWidth || 640) / page.getViewport({ scale: 1 }).width
          const viewport = page.getViewport({ scale: cssScale * outputScale })

          const canvas = document.createElement('canvas')
          canvas.className = 'resume-modal-page'
          canvas.width = viewport.width
          canvas.height = viewport.height
          containerRef.current.appendChild(canvas)

          const context = canvas.getContext('2d')
          if (!context) continue
          await page.render({ canvasContext: context, viewport }).promise
        }

        if (!cancelled) setStatus('ready')
      } catch (error) {
        console.error('Failed to render resume PDF', error)
        if (!cancelled) setStatus('error')
      }
    }

    renderResume()
    return () => {
      cancelled = true
    }
  }, [maximized])

  return createPortal(
    <div className="resume-modal-overlay" onClick={onClose}>
      <div
        className={`resume-modal${maximized ? ' resume-modal-maximized' : ''}`}
        onClick={(event) => event.stopPropagation()}
      >
        <WindowFrame
          className="resume-modal-frame"
          onClose={onClose}
          onMaximize={() => setMaximized((m) => !m)}
        >
          <div className="resume-modal-bar">
            <span>Rithwik_Lagishetty_Resume.pdf</span>
            <div className="resume-modal-actions">
              <a href="/resume.pdf" download>
                Download ↓
              </a>
            </div>
          </div>
          <div className="resume-modal-scroll">
            {status === 'loading' && <p className="resume-modal-status">Loading resume…</p>}
            {status === 'error' && (
              <p className="resume-modal-status">
                Couldn't load the preview. <a href="/resume.pdf">Open the PDF directly →</a>
              </p>
            )}
            <div ref={containerRef} className="resume-modal-pages" />
          </div>
        </WindowFrame>
      </div>
    </div>,
    document.body,
  )
}

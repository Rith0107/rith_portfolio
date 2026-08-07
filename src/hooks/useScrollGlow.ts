import { useEffect } from 'react'

export function useScrollGlow(selector: string, deps: unknown[] = []) {
  useEffect(() => {
    const visuals = Array.from(document.querySelectorAll<HTMLElement>(selector))
    if (visuals.length === 0) return
    let ticking = false

    function updateReflections() {
      const viewportH = window.innerHeight
      visuals.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const progress = 1 - center / viewportH
        const glowYPct = Math.min(140, Math.max(-40, -20 + progress * 140))
        const glowXPct = Math.min(70, Math.max(30, 50 + (rect.left / window.innerWidth - 0.3) * 40))
        // Expressed as a pixel translate (not a background gradient position)
        // so the browser only ever has to composite, never repaint.
        el.style.setProperty('--glow-x', `${(glowXPct / 100) * rect.width}px`)
        el.style.setProperty('--glow-y', `${(glowYPct / 100) * rect.height}px`)
      })
      ticking = false
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateReflections)
        ticking = true
      }
    }

    updateReflections()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, ...deps])
}

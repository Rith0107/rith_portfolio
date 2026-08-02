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
        const glowY = Math.min(140, Math.max(-40, -20 + progress * 140))
        const glowX = Math.min(70, Math.max(30, 50 + (rect.left / window.innerWidth - 0.3) * 40))
        el.style.setProperty('--glow-y', `${glowY}%`)
        el.style.setProperty('--glow-x', `${glowX}%`)
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

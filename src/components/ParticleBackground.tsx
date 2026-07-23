import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

const PARTICLE_COUNT = 90
const LINK_DISTANCE = 130
const MOUSE_RADIUS = 160

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let width = 0
    let height = 0
    let particles: Particle[] = []
    const mouse = { x: -9999, y: -9999 }

    function resize() {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }

    function initParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }))
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    function handlePointerLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    initParticles()

    window.addEventListener('resize', () => {
      resize()
      initParticles()
    })
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerleave', handlePointerLeave)

    let frameId: number

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const distToMouse = Math.hypot(dx, dy)
        if (distToMouse < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - distToMouse) / MOUSE_RADIUS
          p.x += (dx / distToMouse) * force * 1.2
          p.y += (dy / distToMouse) * force * 1.2
        }
      }

      ctx.fillStyle = 'rgba(120, 170, 255, 0.8)'
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(120, 170, 255, ${0.15 * (1 - dist / LINK_DISTANCE)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      frameId = requestAnimationFrame(draw)
    }

    if (prefersReducedMotion) {
      draw()
    } else {
      frameId = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-background" aria-hidden="true" />
}

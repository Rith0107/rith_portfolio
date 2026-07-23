import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  baseAlpha: number
  twinkleSpeed: number
  phase: number
  parallax: number
  isTwinkler: boolean
}

interface ShootingStar {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

const STAR_COUNT = 160
const CONSTELLATION_COUNT = 3
const STARS_PER_CONSTELLATION = 6
const CONSTELLATION_SPREAD = 130
const SHOOTING_STAR_CHANCE = 0.006

function makeStar(x: number, y: number, isTwinkler: boolean): Star {
  return {
    x,
    y,
    radius: Math.random() * 1.4 + 0.4,
    baseAlpha: isTwinkler
      ? Math.random() * 0.15 + 0.85
      : Math.random() * 0.3 + 0.35,
    twinkleSpeed: isTwinkler
      ? Math.random() * 0.03 + 0.015
      : Math.random() * 0.008 + 0.003,
    phase: Math.random() * Math.PI * 2,
    parallax: Math.random() * 14 + 3,
    isTwinkler,
  }
}

export default function StarfieldBackground() {
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
    let stars: Star[] = []
    let constellationLines: [Star, Star][] = []
    let shootingStars: ShootingStar[] = []
    const mouse = { x: 0, y: 0 }
    let hasPointer = false

    function resize() {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }

    function overlapsTextZone(cx: number, cy: number) {
      const margin = CONSTELLATION_SPREAD / 2 + 40
      const halfW = Math.min(340, width * 0.4) + margin
      const halfH = Math.min(260, height * 0.32) + margin
      return (
        Math.abs(cx - width / 2) < halfW && Math.abs(cy - height / 2) < halfH
      )
    }

    function buildConstellation(): { points: Star[]; lines: [Star, Star][] } {
      let cx = 0
      let cy = 0
      for (let attempt = 0; attempt < 20; attempt++) {
        cx = Math.random() * width * 0.8 + width * 0.1
        cy = Math.random() * height * 0.7 + height * 0.1
        if (!overlapsTextZone(cx, cy)) break
      }
      const points = Array.from({ length: STARS_PER_CONSTELLATION }, () =>
        makeStar(
          cx + (Math.random() - 0.5) * CONSTELLATION_SPREAD,
          cy + (Math.random() - 0.5) * CONSTELLATION_SPREAD,
          true,
        ),
      )

      const lines: [Star, Star][] = []
      const remaining = [...points]
      let current = remaining.shift()!
      while (remaining.length) {
        let nearestIdx = 0
        let nearestDist = Infinity
        remaining.forEach((p, idx) => {
          const dist = Math.hypot(p.x - current.x, p.y - current.y)
          if (dist < nearestDist) {
            nearestDist = dist
            nearestIdx = idx
          }
        })
        const next = remaining.splice(nearestIdx, 1)[0]
        lines.push([current, next])
        current = next
      }

      return { points, lines }
    }

    function initStars() {
      const ambientCount = STAR_COUNT - CONSTELLATION_COUNT * STARS_PER_CONSTELLATION
      const ambientStars = Array.from({ length: ambientCount }, () =>
        makeStar(Math.random() * width, Math.random() * height, Math.random() < 0.22),
      )

      constellationLines = []
      const constellationStars: Star[] = []
      for (let i = 0; i < CONSTELLATION_COUNT; i++) {
        const { points, lines } = buildConstellation()
        constellationStars.push(...points)
        constellationLines.push(...lines)
      }

      stars = [...ambientStars, ...constellationStars]
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = (e.clientX - rect.left) / width - 0.5
      mouse.y = (e.clientY - rect.top) / height - 0.5
      hasPointer = true
    }

    resize()
    initStars()

    const handleResize = () => {
      resize()
      initStars()
    }

    window.addEventListener('resize', handleResize)
    canvas.addEventListener('pointermove', handlePointerMove)

    let frameId: number
    let t = 0

    function maybeSpawnShootingStar() {
      if (Math.random() < SHOOTING_STAR_CHANCE) {
        const fromLeft = Math.random() < 0.5
        const startX = fromLeft ? -20 : width + 20
        const startY = Math.random() * height * 0.5
        const speed = 6 + Math.random() * 4
        const angle = fromLeft ? Math.PI / 6 : Math.PI - Math.PI / 6
        shootingStars.push({
          x: startX,
          y: startY,
          vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 40 + Math.random() * 20,
        })
      }
    }

    function draw() {
      if (!ctx) return
      t += 1
      ctx.clearRect(0, 0, width, height)

      const px = hasPointer ? mouse.x : 0
      const py = hasPointer ? mouse.y : 0

      for (const [a, b] of constellationLines) {
        ctx.strokeStyle = 'rgba(170, 200, 255, 0.14)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(a.x + px * a.parallax, a.y + py * a.parallax)
        ctx.lineTo(b.x + px * b.parallax, b.y + py * b.parallax)
        ctx.stroke()
      }

      for (const s of stars) {
        const twinkle = Math.sin(t * s.twinkleSpeed + s.phase) * 0.5 + 0.5
        const alpha = s.isTwinkler
          ? s.baseAlpha * (0.08 + 0.92 * twinkle)
          : s.baseAlpha * (0.75 + 0.25 * twinkle)
        const dx = px * s.parallax
        const dy = py * s.parallax

        ctx.beginPath()
        ctx.fillStyle = `rgba(226, 235, 255, ${alpha})`
        ctx.arc(s.x + dx, s.y + dy, s.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!prefersReducedMotion) {
        maybeSpawnShootingStar()
        shootingStars = shootingStars.filter((s) => s.life < s.maxLife)
        for (const s of shootingStars) {
          s.x += s.vx
          s.y += s.vy
          s.life += 1
          const fade = 1 - s.life / s.maxLife
          ctx.beginPath()
          ctx.strokeStyle = `rgba(255, 255, 255, ${fade})`
          ctx.lineWidth = 1.5
          ctx.moveTo(s.x, s.y)
          ctx.lineTo(s.x - s.vx * 4, s.y - s.vy * 4)
          ctx.stroke()
        }
      }

      frameId = requestAnimationFrame(draw)
    }

    frameId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="starfield-background" aria-hidden="true" />
}

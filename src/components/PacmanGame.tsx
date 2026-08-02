import { useEffect, useRef, useState } from 'react'
import './PacmanGame.css'

const COLS = 10
const ROWS = 10
const TILE = 24
const BOARD_W = COLS * 2 + 1
const BOARD_H = ROWS * 2 + 1
const CANVAS_W = BOARD_W * TILE
const CANVAS_H = BOARD_H * TILE

const WALL = 0
const DOT = 1
const PELLET = 2
const EMPTY = 3

const FRIGHTENED_MS = 7000
const GHOST_COLORS = ['#ff6b6b', '#4fd1c5', '#ff8bd1']

interface Dir {
  dx: number
  dy: number
}

const ZERO: Dir = { dx: 0, dy: 0 }
const DIRS: Dir[] = [
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
]

interface Entity {
  x: number
  y: number
  dir: Dir
  nextDir: Dir
  speed: number
  color: string
  frightened: boolean
}

function generateMaze(): number[][] {
  const grid: number[][] = Array.from({ length: BOARD_H }, () => Array(BOARD_W).fill(WALL))
  const visited: boolean[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(false))

  function carve(cx: number, cy: number) {
    visited[cy][cx] = true
    grid[cy * 2 + 1][cx * 2 + 1] = DOT
    const dirs = [...DIRS]
    for (let i = dirs.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[dirs[i], dirs[j]] = [dirs[j], dirs[i]]
    }
    for (const d of dirs) {
      const nx = cx + d.dx
      const ny = cy + d.dy
      if (nx >= 0 && nx < COLS && ny >= 0 && ny < ROWS && !visited[ny][nx]) {
        grid[cy * 2 + 1 + d.dy][cx * 2 + 1 + d.dx] = DOT
        carve(nx, ny)
      }
    }
  }
  carve(0, 0)

  for (let cy = 0; cy < ROWS; cy += 1) {
    for (let cx = 0; cx < COLS; cx += 1) {
      if (Math.random() < 0.16) {
        const d = DIRS[Math.floor(Math.random() * DIRS.length)]
        const nx = cx + d.dx
        const ny = cy + d.dy
        if (nx >= 0 && nx < COLS && ny >= 0 && ny < ROWS) {
          grid[cy * 2 + 1 + d.dy][cx * 2 + 1 + d.dx] = DOT
        }
      }
    }
  }

  return grid
}

interface Spawns {
  pac: { row: number; col: number }
  ghosts: { row: number; col: number }[]
}

function buildBoard(): { board: number[][]; spawns: Spawns; totalDots: number } {
  const board = generateMaze()

  const corners: [number, number][] = [
    [1, 1],
    [1, BOARD_W - 2],
    [BOARD_H - 2, 1],
    [BOARD_H - 2, BOARD_W - 2],
  ]
  corners.forEach(([r, c]) => {
    if (board[r][c] !== WALL) board[r][c] = PELLET
  })

  const centerRow = ROWS + (ROWS % 2 === 0 ? -1 : 0)
  const centerCol = COLS + (COLS % 2 === 0 ? -1 : 0)
  const ghostSpawn = { row: centerRow, col: centerCol }
  if (board[ghostSpawn.row][ghostSpawn.col] !== WALL) board[ghostSpawn.row][ghostSpawn.col] = EMPTY

  const pacSpawn = { row: BOARD_H - 2, col: COLS }
  if (board[pacSpawn.row][pacSpawn.col] !== WALL) board[pacSpawn.row][pacSpawn.col] = EMPTY

  let totalDots = 0
  for (let r = 0; r < BOARD_H; r += 1) {
    for (let c = 0; c < BOARD_W; c += 1) {
      if (board[r][c] === DOT || board[r][c] === PELLET) totalDots += 1
    }
  }

  return {
    board,
    spawns: { pac: pacSpawn, ghosts: [ghostSpawn, ghostSpawn, ghostSpawn] },
    totalDots,
  }
}

function isWalkable(board: number[][], row: number, col: number): boolean {
  if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) return false
  return board[row][col] !== WALL
}

function tileAt(px: number): number {
  return Math.round(px / TILE)
}

function stepEntity(entity: Entity, board: number[][], dt: number, decide: () => Dir) {
  const col = tileAt(entity.x)
  const row = tileAt(entity.y)
  const atCenterX = Math.abs(entity.x - col * TILE) < 1
  const atCenterY = Math.abs(entity.y - row * TILE) < 1

  if (atCenterX && atCenterY) {
    entity.x = col * TILE
    entity.y = row * TILE
    const desired = decide()
    if (desired && isWalkable(board, row + desired.dy, col + desired.dx)) {
      entity.dir = desired
    } else if (!isWalkable(board, row + entity.dir.dy, col + entity.dir.dx)) {
      entity.dir = ZERO
    }
  }

  entity.x += entity.dir.dx * entity.speed * dt
  entity.y += entity.dir.dy * entity.speed * dt
}

function ghostDecide(ghost: Entity, board: number[][], pac: Entity): Dir {
  const col = tileAt(ghost.x)
  const row = tileAt(ghost.y)
  const reverse = { dx: -ghost.dir.dx, dy: -ghost.dir.dy }
  let options = DIRS.filter((d) => isWalkable(board, row + d.dy, col + d.dx))
  if (options.length > 1) {
    options = options.filter((d) => !(d.dx === reverse.dx && d.dy === reverse.dy))
  }
  if (options.length === 0) return ghost.dir

  const pacCol = tileAt(pac.x)
  const pacRow = tileAt(pac.y)
  const score = (d: Dir) => {
    const dist = Math.hypot(row + d.dy - pacRow, col + d.dx - pacCol)
    return ghost.frightened ? -dist : dist
  }

  if (Math.random() < 0.65) {
    return [...options].sort((a, b) => score(a) - score(b))[0]
  }
  return options[Math.floor(Math.random() * options.length)]
}

type Status = 'playing' | 'over' | 'won'

function HeartIcon({ lost }: { lost: boolean }) {
  return (
    <svg
      className={lost ? 'pacman-life pacman-life-lost' : 'pacman-life'}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 20.3 10.6 19C5.7 14.6 2.5 11.7 2.5 8.1 2.5 5.2 4.8 3 7.6 3c1.6 0 3.1.75 4.4 2 1.3-1.25 2.8-2 4.4-2 2.8 0 5.1 2.2 5.1 5.1 0 3.6-3.2 6.5-8.1 10.9l-1.4 1.3z" />
    </svg>
  )
}

export default function PacmanGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const boardRef = useRef<number[][]>([])
  const pacRef = useRef<Entity | null>(null)
  const ghostsRef = useRef<Entity[]>([])
  const dotsRemainingRef = useRef(0)
  const frightenedUntilRef = useRef(0)
  const rafRef = useRef(0)
  const lastTimeRef = useRef(0)
  const statusRef = useRef<Status>('playing')
  const scoreRef = useRef(0)
  const livesRef = useRef(3)
  const [status, setStatus] = useState<Status>('playing')
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)

  function placeEntity(entity: Entity, spawn: { row: number; col: number }) {
    entity.x = spawn.col * TILE
    entity.y = spawn.row * TILE
    entity.dir = ZERO
    entity.frightened = false
  }

  function newGame() {
    const { board, spawns, totalDots } = buildBoard()
    boardRef.current = board
    dotsRemainingRef.current = totalDots

    pacRef.current = {
      x: spawns.pac.col * TILE,
      y: spawns.pac.row * TILE,
      dir: ZERO,
      nextDir: ZERO,
      speed: TILE * 4.6,
      color: '#f2f2f3',
      frightened: false,
    }

    ghostsRef.current = spawns.ghosts.map((spawn, i) => ({
      x: spawn.col * TILE,
      y: spawn.row * TILE,
      dir: DIRS[i % DIRS.length],
      nextDir: ZERO,
      speed: TILE * 3.9,
      color: GHOST_COLORS[i % GHOST_COLORS.length],
      frightened: false,
    }))

    scoreRef.current = 0
    livesRef.current = 3
    setScore(0)
    setLives(3)
    statusRef.current = 'playing'
    setStatus('playing')
  }

  useEffect(() => {
    newGame()

    function handleKey(event: KeyboardEvent) {
      const pac = pacRef.current
      if (!pac) return
      let dir: Dir | null = null
      if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') dir = { dx: 0, dy: -1 }
      else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') dir = { dx: 0, dy: 1 }
      else if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') dir = { dx: -1, dy: 0 }
      else if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') dir = { dx: 1, dy: 0 }
      if (dir) {
        event.preventDefault()
        pac.nextDir = dir
      }
    }
    window.addEventListener('keydown', handleKey)

    function loop(time: number) {
      rafRef.current = requestAnimationFrame(loop)
      const dt = Math.min((time - (lastTimeRef.current || time)) / 1000, 0.05)
      lastTimeRef.current = time

      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!canvas || !ctx) return

      const board = boardRef.current
      const pac = pacRef.current
      const ghosts = ghostsRef.current

      if (statusRef.current === 'playing' && pac) {
        stepEntity(pac, board, dt, () => pac.nextDir)

        const pCol = tileAt(pac.x)
        const pRow = tileAt(pac.y)
        const tile = board[pRow]?.[pCol]
        if (tile === DOT) {
          board[pRow][pCol] = EMPTY
          scoreRef.current += 10
          dotsRemainingRef.current -= 1
          setScore(scoreRef.current)
        } else if (tile === PELLET) {
          board[pRow][pCol] = EMPTY
          scoreRef.current += 50
          dotsRemainingRef.current -= 1
          setScore(scoreRef.current)
          frightenedUntilRef.current = performance.now() + FRIGHTENED_MS
          ghosts.forEach((g) => {
            g.frightened = true
          })
        }

        if (ghosts.some((g) => g.frightened) && performance.now() > frightenedUntilRef.current) {
          ghosts.forEach((g) => {
            g.frightened = false
          })
        }

        ghosts.forEach((ghost) => {
          stepEntity(ghost, board, dt, () => ghostDecide(ghost, board, pac))
          const dist = Math.hypot(ghost.x - pac.x, ghost.y - pac.y)
          if (dist < TILE * 0.55) {
            if (ghost.frightened) {
              scoreRef.current += 200
              setScore(scoreRef.current)
              const centerRow = ROWS + (ROWS % 2 === 0 ? -1 : 0)
              const centerCol = COLS + (COLS % 2 === 0 ? -1 : 0)
              placeEntity(ghost, { row: centerRow, col: centerCol })
            } else {
              livesRef.current -= 1
              setLives(livesRef.current)
              if (livesRef.current <= 0) {
                statusRef.current = 'over'
                setStatus('over')
              } else {
                placeEntity(pac, { row: BOARD_H - 2, col: COLS })
                const centerRow = ROWS + (ROWS % 2 === 0 ? -1 : 0)
                const centerCol = COLS + (COLS % 2 === 0 ? -1 : 0)
                ghosts.forEach((g, i) => {
                  placeEntity(g, { row: centerRow, col: centerCol })
                  g.dir = DIRS[i % DIRS.length]
                })
              }
            }
          }
        })

        if (dotsRemainingRef.current <= 0) {
          statusRef.current = 'won'
          setStatus('won')
        }
      }

      draw(ctx, board, pac, ghosts, time)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('keydown', handleKey)
      cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
  }

  function drawPac(ctx: CanvasRenderingContext2D, pac: Entity, time: number) {
    const radius = TILE * 0.42
    const mouth = 0.18 + Math.abs(Math.sin(time / 90)) * 0.24
    let angle = 0
    if (pac.dir.dx === 1) angle = 0
    else if (pac.dir.dx === -1) angle = Math.PI
    else if (pac.dir.dy === -1) angle = -Math.PI / 2
    else if (pac.dir.dy === 1) angle = Math.PI / 2

    ctx.save()
    ctx.fillStyle = '#f2f2f3'
    ctx.shadowColor = 'rgba(242,242,243,0.5)'
    ctx.shadowBlur = 8
    ctx.beginPath()
    ctx.moveTo(pac.x, pac.y)
    ctx.arc(pac.x, pac.y, radius, angle + mouth * Math.PI, angle + (2 - mouth) * Math.PI)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  function drawGhost(ctx: CanvasRenderingContext2D, ghost: Entity, time: number) {
    const r = TILE * 0.4
    const flicker = ghost.frightened && frightenedUntilRef.current - performance.now() < 2000
    const showPale = flicker && Math.floor(time / 150) % 2 === 0
    const bodyColor = ghost.frightened ? (showPale ? '#e8e9eb' : '#3a3d42') : ghost.color

    ctx.save()
    ctx.fillStyle = bodyColor
    ctx.beginPath()
    ctx.arc(ghost.x, ghost.y - r * 0.15, r, Math.PI, 0)
    ctx.lineTo(ghost.x + r, ghost.y + r * 0.7)
    for (let i = 0; i < 3; i += 1) {
      const step = (r * 2) / 3
      const bx = ghost.x + r - step * i - step / 2
      ctx.lineTo(bx, ghost.y + (i % 2 === 0 ? r * 0.4 : r * 0.7))
    }
    ctx.lineTo(ghost.x - r, ghost.y + r * 0.7)
    ctx.closePath()
    ctx.fill()

    if (!ghost.frightened || showPale) {
      const eyeOffsetX = ghost.dir.dx * 1.5
      const eyeOffsetY = ghost.dir.dy * 1.5
      ;[-1, 1].forEach((side) => {
        ctx.fillStyle = '#f2f2f3'
        ctx.beginPath()
        ctx.arc(ghost.x + side * r * 0.42, ghost.y - r * 0.15, r * 0.28, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#17181a'
        ctx.beginPath()
        ctx.arc(
          ghost.x + side * r * 0.42 + eyeOffsetX,
          ghost.y - r * 0.15 + eyeOffsetY,
          r * 0.13,
          0,
          Math.PI * 2,
        )
        ctx.fill()
      })
    }
    ctx.restore()
  }

  function draw(
    ctx: CanvasRenderingContext2D,
    board: number[][],
    pac: Entity | null,
    ghosts: Entity[],
    time: number,
  ) {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
    ctx.fillStyle = '#0a0a0b'
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

    for (let r = 0; r < board.length; r += 1) {
      for (let c = 0; c < board[0].length; c += 1) {
        if (board[r][c] === WALL) continue
        const x = c * TILE - TILE / 2
        const y = r * TILE - TILE / 2
        ctx.fillStyle = '#141416'
        ctx.strokeStyle = 'rgba(255,255,255,0.06)'
        ctx.lineWidth = 1
        roundRect(ctx, x + 1, y + 1, TILE - 2, TILE - 2, 4)
        ctx.fill()
        ctx.stroke()
      }
    }

    for (let r = 0; r < board.length; r += 1) {
      for (let c = 0; c < board[0].length; c += 1) {
        const tile = board[r][c]
        if (tile === DOT) {
          ctx.fillStyle = 'rgba(242,242,243,0.55)'
          ctx.beginPath()
          ctx.arc(c * TILE, r * TILE, 2.2, 0, Math.PI * 2)
          ctx.fill()
        } else if (tile === PELLET) {
          const pulse = 0.55 + Math.sin(time / 180) * 0.35
          ctx.save()
          ctx.shadowColor = 'rgba(242,242,243,0.9)'
          ctx.shadowBlur = 10
          ctx.fillStyle = `rgba(242,242,243,${pulse})`
          ctx.beginPath()
          ctx.arc(c * TILE, r * TILE, 5.5, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      }
    }

    if (pac) drawPac(ctx, pac, time)
    ghosts.forEach((g) => drawGhost(ctx, g, time))
  }

  function handleDpad(dir: Dir) {
    if (pacRef.current) pacRef.current.nextDir = dir
  }

  return (
    <div className="pacman-game">
      <div className="pacman-hud">
        <span className="pacman-hud-item">
          <span className="pacman-hud-prefix">$</span> Score <strong>{score}</strong>
        </span>
        <span className="pacman-hud-item">
          Lives{' '}
          {Array.from({ length: 3 }).map((_, i) => (
            <HeartIcon key={i} lost={i >= lives} />
          ))}
        </span>
      </div>
      <div className="pacman-canvas-wrap">
        <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className="pacman-canvas" />
        {status === 'over' && (
          <div className="pacman-overlay">
            <p className="pacman-overlay-title">Game over</p>
            <p className="pacman-overlay-score">Score: {score}</p>
            <button type="button" onClick={newGame}>
              Play again
            </button>
          </div>
        )}
        {status === 'won' && (
          <div className="pacman-overlay">
            <p className="pacman-overlay-title">Board cleared</p>
            <p className="pacman-overlay-score">Score: {score}</p>
            <button type="button" onClick={newGame}>
              Play again
            </button>
          </div>
        )}
      </div>
      <div className="pacman-dpad" aria-hidden="true">
        <button type="button" className="pacman-dpad-up" onClick={() => handleDpad({ dx: 0, dy: -1 })}>
          ↑
        </button>
        <button type="button" className="pacman-dpad-left" onClick={() => handleDpad({ dx: -1, dy: 0 })}>
          ←
        </button>
        <button type="button" className="pacman-dpad-down" onClick={() => handleDpad({ dx: 0, dy: 1 })}>
          ↓
        </button>
        <button type="button" className="pacman-dpad-right" onClick={() => handleDpad({ dx: 1, dy: 0 })}>
          →
        </button>
      </div>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './AsteroidField.css'

interface AsteroidFieldProps {
  skills: string[]
}

// Small deterministic PRNG so the scatter/rock shapes are stable across
// re-renders instead of reshuffling every time the component mounts.
function mulberry32(seed: number) {
  let t = seed
  return function random() {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

// Longer names get a bigger rock, both so the label fits and as a loose
// visual cue — no per-skill tuning needed as more are added. `multiplier`
// scales everything down together on narrow (mobile) containers, where
// there isn't room for 20 full-size rocks side by side.
function sizeForSkill(name: string, multiplier: number) {
  return (0.55 + Math.min(name.length, 26) * 0.018) * multiplier
}

function labelLines(name: string) {
  const words = name.split(' ')
  if (words.length <= 1) return [name]
  return [words[0], words.slice(1).join(' ')]
}

const LABEL_SPRITE_SCALE = 0.0052

// Longer names get a *smaller* font, not a bigger sprite — otherwise a
// long name both grows its rock and grows its label, and the two compound
// into a much bigger footprint than the collision spacing accounts for.
function fontSizeForLabel(lines: string[]) {
  const longest = Math.max(...lines.map((line) => line.length))
  return Math.max(30, 58 - longest * 1.15)
}

// Mirrors createLabelSprite's sizing without touching the canvas, so the
// scatter step can reserve enough clearance for the label before any
// sprite actually exists yet.
function estimateLabelHalfWidth(name: string, multiplier: number) {
  const lines = labelLines(name)
  const fontSize = fontSizeForLabel(lines)
  const longest = Math.max(...lines.map((line) => line.length))
  const approxPxWidth = longest * fontSize * 0.56 + 48
  return (approxPxWidth * LABEL_SPRITE_SCALE * multiplier) / 2
}

// Displaces each vertex by a handful of summed sine waves over its own
// spherical angles (a cheap stand-in for simplex noise) so neighboring
// vertices shift together into smooth lumps — a jagged look would come from
// displacing each vertex independently at random instead.
function createRockGeometry(radius: number, random: () => number) {
  const geometry = new THREE.IcosahedronGeometry(radius, 4)
  const position = geometry.attributes.position
  const vertex = new THREE.Vector3()

  const phase1 = random() * Math.PI * 2
  const phase2 = random() * Math.PI * 2
  const phase3 = random() * Math.PI * 2
  const phase4 = random() * Math.PI * 2

  for (let i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i)
    const theta = Math.atan2(vertex.z, vertex.x)
    const phi = Math.acos(THREE.MathUtils.clamp(vertex.y / radius, -1, 1))

    const bump =
      1 +
      0.16 * Math.sin(theta * 3 + phase1) * Math.sin(phi * 2 + phase2) +
      0.09 * Math.sin(theta * 5 + phi * 4 + phase3) +
      0.05 * Math.sin(theta * 9 - phi * 6 + phase4)

    vertex.multiplyScalar(bump)
    position.setXYZ(i, vertex.x, vertex.y, vertex.z)
  }
  geometry.computeVertexNormals()
  return geometry
}

// A mottled, cratered diffuse texture — soft dark pits and a few lighter
// highlights over a base rock tone, so the surface reads as pitted stone
// rather than a flat, uniform color.
function createRockTexture(random: () => number) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  const warm = random()
  const baseR = 100 + warm * 25
  const baseG = 95 + warm * 12
  const baseB = 92
  ctx.fillStyle = `rgb(${baseR}, ${baseG}, ${baseB})`
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const craterCount = 26
  for (let i = 0; i < craterCount; i++) {
    const x = random() * canvas.width
    const y = random() * canvas.height
    const r = 6 + random() * 26
    const dark = random() < 0.75
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r)
    if (dark) {
      gradient.addColorStop(0, 'rgba(20, 18, 16, 0.55)')
      gradient.addColorStop(0.7, 'rgba(20, 18, 16, 0.22)')
      gradient.addColorStop(1, 'rgba(20, 18, 16, 0)')
    } else {
      gradient.addColorStop(0, 'rgba(210, 200, 190, 0.35)')
      gradient.addColorStop(0.7, 'rgba(210, 200, 190, 0.12)')
      gradient.addColorStop(1, 'rgba(210, 200, 190, 0)')
    }
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return texture
}

function createLabelSprite(lines: string[], multiplier: number) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  const fontSize = fontSizeForLabel(lines)
  ctx.font = `700 ${fontSize}px system-ui, sans-serif`
  const maxWidth = Math.max(...lines.map((line) => ctx.measureText(line).width))
  canvas.width = Math.ceil(maxWidth + 48)
  canvas.height = fontSize * lines.length + 28

  ctx.font = `700 ${fontSize}px system-ui, sans-serif`
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.lineWidth = 9
  ctx.strokeStyle = 'rgba(4, 7, 14, 0.9)'
  ctx.fillStyle = '#ffffff'
  const lineHeight = canvas.height / lines.length
  lines.forEach((line, i) => {
    const y = (i + 0.5) * lineHeight
    ctx.strokeText(line, canvas.width / 2, y)
    ctx.fillText(line, canvas.width / 2, y)
  })

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
  })
  const sprite = new THREE.Sprite(material)
  sprite.scale.set(
    canvas.width * LABEL_SPRITE_SCALE * multiplier,
    canvas.height * LABEL_SPRITE_SCALE * multiplier,
    1,
  )
  return sprite
}

// The world-space area actually visible to the camera, derived from its
// real fov/distance/aspect rather than a guessed constant — otherwise the
// scatter range is only correct for whatever aspect ratio it was tuned
// against, and clips on any other (e.g. mobile). `margin` reserves edge
// clearance for the largest rock+label so nothing gets cut off.
function getSafeScatterRange(camera: THREE.PerspectiveCamera, margin: number) {
  const verticalFov = THREE.MathUtils.degToRad(camera.fov)
  const visibleHeight = 2 * Math.tan(verticalFov / 2) * camera.position.z
  const visibleWidth = visibleHeight * camera.aspect
  return {
    halfWidth: Math.max(1, visibleWidth / 2 - margin),
    halfHeight: Math.max(1, visibleHeight / 2 - margin),
  }
}

// Scatters asteroids through a shallow 3D volume with minimum-distance
// rejection (scaled by each rock's own radius/label footprint) so they
// cluster loosely without ever overlapping on screen — scales to any skill
// count with no per-item tuning. The depth range is kept small deliberately:
// with real perspective, two rocks can be a safe 3D distance apart yet still
// overlap once projected to the screen if one is much further back, so
// depth stays shallow enough that this can't happen. Placing the biggest
// rocks first gives them first pick of clear space, so a large one doesn't
// get squeezed in last and crowd its neighbors.
function scatterPositions(radii: number[], halfWidth: number, halfHeight: number) {
  const random = mulberry32(1337)
  const order = radii.map((_, i) => i).sort((a, b) => radii[b] - radii[a])
  const placed: { pos: THREE.Vector3; radius: number }[] = []
  const result: THREE.Vector3[] = new Array(radii.length)

  for (const index of order) {
    const radius = radii[index]
    let pos = new THREE.Vector3()
    for (let attempt = 0; attempt < 200; attempt++) {
      const candidate = new THREE.Vector3(
        (random() - 0.5) * 2 * halfWidth,
        (random() - 0.5) * 2 * halfHeight,
        (random() - 0.5) * 2,
      )
      const tooClose = placed.some(
        (p) => candidate.distanceTo(p.pos) < (p.radius + radius) * 1.8,
      )
      pos = candidate
      if (!tooClose) break
    }
    placed.push({ pos, radius })
    result[index] = pos
  }
  return result
}

export default function AsteroidField({ skills }: AsteroidFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 16)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, 0.32))
    const sunLight = new THREE.DirectionalLight(0xfff4e0, 2.2)
    sunLight.position.set(6, 5, 7)
    scene.add(sunLight)
    const rimLight = new THREE.DirectionalLight(0x9fc2ff, 0.3)
    rimLight.position.set(-5, -3, -4)
    scene.add(rimLight)

    const disposableGeometries: THREE.BufferGeometry[] = []
    const disposableMaterials: THREE.Material[] = []
    const disposableTextures: THREE.Texture[] = []

    // Set the real aspect ratio before computing the scatter range, so the
    // range reflects this container's actual shape (desktop vs. mobile)
    // instead of an assumption baked in ahead of time.
    if (container.clientWidth > 0 && container.clientHeight > 0) {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
    }

    // Narrow containers get smaller rocks/labels across the board — 20
    // full-size rocks simply don't fit side by side on a phone screen.
    const sizeMultiplier = THREE.MathUtils.clamp(
      container.clientWidth / 900,
      0.55,
      1,
    )

    const sizes = skills.map((skill) => sizeForSkill(skill, sizeMultiplier))
    // The rock itself may be smaller than its label — space by whichever
    // is bigger so long names never crowd their neighbors.
    const clearances = skills.map((skill, i) =>
      Math.max(sizes[i], estimateLabelHalfWidth(skill, sizeMultiplier)),
    )
    const maxClearance = Math.max(...clearances)
    const { halfWidth, halfHeight } = getSafeScatterRange(
      camera,
      maxClearance + 0.3,
    )
    const positions = scatterPositions(clearances, halfWidth, halfHeight)

    const asteroidGroups = skills.map((skill, index) => {
      const group = new THREE.Group()
      group.position.copy(positions[index])

      const seed = 1000 + index * 97
      const random = mulberry32(seed)
      const geometry = createRockGeometry(sizes[index], random)
      const rockTexture = createRockTexture(random)
      const material = new THREE.MeshStandardMaterial({
        map: rockTexture,
        roughness: 1,
        metalness: 0,
      })
      disposableGeometries.push(geometry)
      disposableMaterials.push(material)
      disposableTextures.push(rockTexture)
      group.add(new THREE.Mesh(geometry, material))

      const label = createLabelSprite(labelLines(skill), sizeMultiplier)
      disposableTextures.push(label.material.map as THREE.Texture)
      disposableMaterials.push(label.material)
      label.position.set(0, 0, sizes[index] * 0.75)
      group.add(label)

      group.rotation.set(random() * Math.PI * 2, random() * Math.PI * 2, 0)

      return {
        group,
        spinX: (random() - 0.5) * 0.004,
        spinY: (random() - 0.5) * 0.004,
      }
    })

    asteroidGroups.forEach(({ group }) => scene.add(group))

    function resize() {
      if (!container) return
      const { clientWidth, clientHeight } = container
      if (clientWidth === 0 || clientHeight === 0) return
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight)
    }

    resize()
    window.addEventListener('resize', resize)

    let frameId: number

    function animate() {
      if (!prefersReducedMotion) {
        for (const { group, spinX, spinY } of asteroidGroups) {
          group.rotation.x += spinX
          group.rotation.y += spinY
        }
      }
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      disposableGeometries.forEach((geometry) => geometry.dispose())
      disposableMaterials.forEach((material) => material.dispose())
      disposableTextures.forEach((texture) => texture.dispose())
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [skills])

  return <div ref={containerRef} className="asteroid-field" aria-hidden="true" />
}

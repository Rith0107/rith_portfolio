import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import earthDayTexture from '../assets/earth.jpg'
import earthNightTexture from '../assets/earth-night.png'
import './Globe.css'

interface Pin {
  lat: number
  lon: number
}

const PINS: Pin[] = [
  { lat: 33.749, lon: -84.388 }, // Atlanta, USA — FIS / Global Payments
  { lat: 17.385, lon: 78.4867 }, // Hyderabad, India — Cognida.ai
]

const RADIUS = 1.5
const ROTATION_EASE = 0.04

function latLongToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

function getDayOfYear(date: Date) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0)
  return Math.floor((date.getTime() - start) / 86400000)
}

function getSunDirection(date: Date) {
  const dayOfYear = getDayOfYear(date)
  const declination =
    23.44 * Math.sin(THREE.MathUtils.degToRad((360 / 365) * (dayOfYear + 284)))
  const utcHours =
    date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600
  let subsolarLon = 15 * (12 - utcHours)
  subsolarLon = ((subsolarLon + 180) % 360 + 360) % 360 - 180
  return latLongToVector3(declination, subsolarLon, 1).normalize()
}

interface GlobeProps {
  activePinIndex: number
}

export default function Globe({ activePinIndex }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const activePinIndexRef = useRef(activePinIndex)
  activePinIndexRef.current = activePinIndex

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 4.2

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const globeGroup = new THREE.Group()
    scene.add(globeGroup)

    const textureLoader = new THREE.TextureLoader()
    const dayMap = textureLoader.load(earthDayTexture)
    dayMap.colorSpace = THREE.SRGBColorSpace
    const nightMap = textureLoader.load(earthNightTexture)
    nightMap.colorSpace = THREE.SRGBColorSpace

    const earthGeometry = new THREE.SphereGeometry(RADIUS, 48, 32)
    const earthMaterial = new THREE.ShaderMaterial({
      uniforms: {
        dayTexture: { value: dayMap },
        nightTexture: { value: nightMap },
        sunDirection: { value: getSunDirection(new Date()) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormalLocal;
        void main() {
          vUv = uv;
          vNormalLocal = normal;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D dayTexture;
        uniform sampler2D nightTexture;
        uniform vec3 sunDirection;
        varying vec2 vUv;
        varying vec3 vNormalLocal;
        void main() {
          vec3 rawDay = texture2D(dayTexture, vUv).rgb;
          vec3 dayColor = rawDay * vec3(1.0, 1.22, 1.65) * 1.18;
          float dayGray = dot(dayColor, vec3(0.299, 0.587, 0.114));
          dayColor = mix(vec3(dayGray), dayColor, 1.4);
          vec3 nightBase = rawDay * vec3(0.24, 0.32, 0.52);
          vec3 lights = texture2D(nightTexture, vUv).rgb * 1.4;
          vec3 nightColor = nightBase + lights;
          float intensity = dot(normalize(vNormalLocal), normalize(sunDirection));
          float blend = smoothstep(-0.15, 0.15, intensity);
          vec3 color = mix(nightColor, dayColor, blend);
          color = pow(color, vec3(1.0 / 2.2));
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    })
    globeGroup.add(new THREE.Mesh(earthGeometry, earthMaterial))

    const pinTargetAngles: number[] = []
    const pinMeshes: THREE.Mesh[] = PINS.map(({ lat, lon }) => {
      const position = latLongToVector3(lat, lon, RADIUS * 1.01)
      pinTargetAngles.push(Math.atan2(-position.x, position.z))

      const pinGeometry = new THREE.SphereGeometry(0.05, 12, 12)
      const pinMaterial = new THREE.MeshBasicMaterial({ color: 0x78aaff })
      const pin = new THREE.Mesh(pinGeometry, pinMaterial)
      pin.position.copy(position)
      globeGroup.add(pin)

      const haloGeometry = new THREE.RingGeometry(0.07, 0.1, 24)
      const haloMaterial = new THREE.MeshBasicMaterial({
        color: 0x78aaff,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
      })
      const halo = new THREE.Mesh(haloGeometry, haloMaterial)
      halo.position.copy(position)
      halo.lookAt(position.clone().multiplyScalar(2))
      globeGroup.add(halo)

      return pin
    })

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
    let t = 0

    function animate() {
      t += 1

      if (t % 30 === 0) {
        earthMaterial.uniforms.sunDirection.value = getSunDirection(new Date())
      }

      const targetAngle = pinTargetAngles[activePinIndexRef.current] ?? 0
      const current = globeGroup.rotation.y
      const diff = ((targetAngle - current + Math.PI * 3) % (Math.PI * 2)) - Math.PI
      globeGroup.rotation.y += prefersReducedMotion ? diff : diff * ROTATION_EASE

      pinMeshes.forEach((pin, index) => {
        const isActive = index === activePinIndexRef.current
        const pulse = isActive ? 1 + Math.sin(t * 0.08) * 0.25 : 1
        pin.scale.setScalar(isActive ? 1.6 * pulse : 1)
        const material = pin.material as THREE.MeshBasicMaterial
        material.color.set(isActive ? 0xffffff : 0x78aaff)
      })

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      earthGeometry.dispose()
      earthMaterial.dispose()
      dayMap.dispose()
      nightMap.dispose()
      pinMeshes.forEach((pin) => {
        pin.geometry.dispose()
        ;(pin.material as THREE.Material).dispose()
      })
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="globe-container" aria-hidden="true" />
}

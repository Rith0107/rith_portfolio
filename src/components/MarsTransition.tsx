import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import marsTexture from '../assets/mars.jpg'
import './MarsTransition.css'

const MARS_RADIUS = 1.3

export default function MarsTransition() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [sectionVisible, setSectionVisible] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0.3, 4.2)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, 0.55))
    const sunLight = new THREE.DirectionalLight(0xffe8d0, 1.5)
    sunLight.position.set(5, 3, 4)
    scene.add(sunLight)

    const textureLoader = new THREE.TextureLoader()
    const marsMap = textureLoader.load(marsTexture)
    marsMap.colorSpace = THREE.SRGBColorSpace

    const marsGeometry = new THREE.SphereGeometry(MARS_RADIUS, 48, 32)
    const marsMaterial = new THREE.MeshStandardMaterial({
      map: marsMap,
      roughness: 0.95,
      metalness: 0,
    })
    const marsMesh = new THREE.Mesh(marsGeometry, marsMaterial)
    marsMesh.rotation.y = Math.random() * Math.PI * 2

    // Tilt the group (not the mesh) so the mesh spins around its own axis
    // while that axis stays visibly tilted, like a real planet's obliquity.
    const marsGroup = new THREE.Group()
    marsGroup.rotation.z = 0.42
    marsGroup.rotation.x = 0.12
    marsGroup.add(marsMesh)
    scene.add(marsGroup)

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
      marsMesh.rotation.y += prefersReducedMotion ? 0 : 0.0015
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      marsGeometry.dispose()
      marsMaterial.dispose()
      marsMap.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      className={`mars-transition-section${sectionVisible ? ' is-visible' : ''}`}
      ref={sectionRef}
    >
      <div ref={containerRef} className="mars-transition" aria-hidden="true" />
    </div>
  )
}

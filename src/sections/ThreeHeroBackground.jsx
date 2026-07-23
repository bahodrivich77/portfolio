import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeHeroBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let renderer, scene, camera
    let shieldPoints, ringPoints1, ringPoints2
    let animationFrameId
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

    const isMobile = window.innerWidth < 768
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return
    }

    // Custom smooth particle texture
    const createParticleTexture = (colorHex) => {
      const canvas = document.createElement('canvas')
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext('2d')

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
      gradient.addColorStop(0.2, colorHex)
      gradient.addColorStop(0.6, 'rgba(11, 17, 32, 0.15)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 64, 64)

      const texture = new THREE.CanvasTexture(canvas)
      texture.colorSpace = THREE.SRGBColorSpace
      return texture
    }

    const init = () => {
      const width = container.clientWidth
      const height = container.clientHeight

      scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x0B1120, 0.002)

      camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000)
      camera.position.z = 240

      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height)
      container.appendChild(renderer.domElement)

      // Group to hold all objects for unified parallax rotation
      const mainGroup = new THREE.Group()
      scene.add(mainGroup)

      // Group 1: The 3D Emerald Security Shield Emblem in the center
      const shieldGeometry = new THREE.BufferGeometry()
      const shieldCount = isMobile ? 300 : 700
      const shieldPositions = new Float32Array(shieldCount * 3)
      const shieldColors = new Float32Array(shieldCount * 3)

      const emeraldColor = new THREE.Color('#047857')
      const brightEmerald = new THREE.Color('#34d399')

      for (let i = 0; i < shieldCount; i++) {
        // Parametric formulas to create a 3D high-tech military shield shape
        const u = Math.random() * Math.PI * 2 // Angle around the shield
        const v = Math.random() // Height of the shield (-0.5 to 0.5)

        // Custom math to form a pointed security shield
        const widthFactor = Math.sin(v * Math.PI) * (1 - v * 0.4)
        const x = Math.sin(u) * 45 * widthFactor
        const z = Math.cos(u) * 20 * widthFactor
        const y = (v - 0.5) * 80 + (Math.abs(x) > 1 ? -Math.pow(x/25, 2) * 5 : 0) // curved shield back

        shieldPositions[i * 3] = x
        shieldPositions[i * 3 + 1] = y
        shieldPositions[i * 3 + 2] = z

        const mixColor = emeraldColor.clone().lerp(brightEmerald, Math.random() * 0.5)
        shieldColors[i * 3] = mixColor.r
        shieldColors[i * 3 + 1] = mixColor.g
        shieldColors[i * 3 + 2] = mixColor.b
      }

      shieldGeometry.setAttribute('position', new THREE.BufferAttribute(shieldPositions, 3))
      shieldGeometry.setAttribute('color', new THREE.BufferAttribute(shieldColors, 3))

      const shieldTexture = createParticleTexture('#34d399')
      const shieldMaterial = new THREE.PointsMaterial({
        size: isMobile ? 6 : 9,
        map: shieldTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      shieldPoints = new THREE.Points(shieldGeometry, shieldMaterial)
      mainGroup.add(shieldPoints)

      // Group 2: Golden Orbital Defensive Ring 1 (Horizontal tilt)
      const ring1Geom = new THREE.BufferGeometry()
      const ring1Count = isMobile ? 250 : 500
      const ring1Pos = new Float32Array(ring1Count * 3)
      const goldColor = new THREE.Color('#D97706')
      const goldBright = new THREE.Color('#fbbf24')

      for (let i = 0; i < ring1Count; i++) {
        const theta = (i / ring1Count) * Math.PI * 2 + Math.random() * 0.05
        const radius = 100 + (Math.random() - 0.5) * 6
        const x = Math.cos(theta) * radius
        const z = Math.sin(theta) * radius
        const y = (Math.random() - 0.5) * 4

        ring1Pos[i * 3] = x
        ring1Pos[i * 3 + 1] = y
        ring1Pos[i * 3 + 2] = z
      }
      ring1Geom.setAttribute('position', new THREE.BufferAttribute(ring1Pos, 3))
      const goldTexture = createParticleTexture('#fbbf24')
      const ringMaterial1 = new THREE.PointsMaterial({
        size: isMobile ? 4 : 6,
        map: goldTexture,
        color: goldBright,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      ringPoints1 = new THREE.Points(ring1Geom, ringMaterial1)
      ringPoints1.rotation.x = Math.PI / 4
      ringPoints1.rotation.y = Math.PI / 6
      mainGroup.add(ringPoints1)

      // Group 3: Golden Orbital Defensive Ring 2 (Vertical tilted)
      const ring2Geom = new THREE.BufferGeometry()
      const ring2Count = isMobile ? 200 : 400
      const ring2Pos = new Float32Array(ring2Count * 3)

      for (let i = 0; i < ring2Count; i++) {
        const theta = (i / ring2Count) * Math.PI * 2 + Math.random() * 0.05
        const radius = 120 + (Math.random() - 0.5) * 4
        const x = Math.cos(theta) * radius
        const z = Math.sin(theta) * radius
        const y = (Math.random() - 0.5) * 3

      ring2Pos[i * 3] = x
      ring2Pos[i * 3 + 1] = y
      ring2Pos[i * 3 + 2] = z
    }
    ring2Geom.setAttribute('position', new THREE.BufferAttribute(ring2Pos, 3))
    const ringMaterial2 = new THREE.PointsMaterial({
      size: isMobile ? 3 : 5,
      map: goldTexture,
      color: goldColor,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    ringPoints2 = new THREE.Points(ring2Geom, ringMaterial2)
    ringPoints2.rotation.x = -Math.PI / 3
    ringPoints2.rotation.y = Math.PI / 4
    mainGroup.add(ringPoints2)

      // Unified lights
      const dirLight1 = new THREE.DirectionalLight(0x047857, 2)
      dirLight1.position.set(1, 1, 1).normalize()
      scene.add(dirLight1)

      const dirLight2 = new THREE.DirectionalLight(0xD97706, 1.5)
      dirLight2.position.set(-1, -1, 1).normalize()
      scene.add(dirLight2)

      const ambientLight = new THREE.AmbientLight(0x0B1120)
      scene.add(ambientLight)
    }

    const tick = (time) => {
      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04

      camera.position.x = mouse.x * 50
      camera.position.y = -mouse.y * 50
      camera.lookAt(scene.position)

      const t = time * 0.001

      // Rotate elements independently for high-tech security vibe
      if (shieldPoints) {
        shieldPoints.rotation.y = t * 0.15

        // Gentle breathing animation of the shield particles
        const positions = shieldPoints.geometry.attributes.position.array
        for (let i = 0; i < positions.length / 3; i++) {
          const i3 = i * 3
          // Displace along Y very subtly
          positions[i3 + 1] += Math.sin(t + positions[i3] * 0.1) * 0.05
        }
        shieldPoints.geometry.attributes.position.needsUpdate = true
      }

      if (ringPoints1) {
        ringPoints1.rotation.z = -t * 0.08
        ringPoints1.rotation.y = Math.sin(t * 0.05) * 0.2
      }

      if (ringPoints2) {
        ringPoints2.rotation.z = t * 0.12
        ringPoints2.rotation.x = Math.cos(t * 0.04) * 0.2
      }

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(tick)
    }

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const handleResize = () => {
      if (!container || !renderer || !camera) return
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    init()
    animationFrameId = requestAnimationFrame(tick)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)

      if (renderer) {
        renderer.dispose()
        const dom = renderer.domElement
        if (dom && dom.parentNode) {
          dom.parentNode.removeChild(dom)
        }
      }

      if (shieldPoints) {
        shieldPoints.geometry.dispose()
        shieldPoints.material.dispose()
      }
      if (ringPoints1) {
        ringPoints1.geometry.dispose()
        ringPoints1.material.dispose()
      }
      if (ringPoints2) {
        ringPoints2.geometry.dispose()
        ringPoints2.material.dispose()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, overflow: 'hidden' }}
      aria-hidden="true"
    />
  )
}

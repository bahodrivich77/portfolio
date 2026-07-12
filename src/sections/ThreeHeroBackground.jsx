import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeHeroBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let renderer, scene, camera
    let particleSystem, originalPositions, particleSpeeds
    let animationFrameId
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

    // Detect capabilities
    const isMobile = window.innerWidth < 768
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Configuration
    const PARTICLE_COUNT = prefersReducedMotion ? 0 : (isMobile ? 400 : 1800)

    if (PARTICLE_COUNT === 0) {
      // Graceful CSS-only fallback if reduced-motion is requested
      return
    }

    // Create custom smooth circle texture to avoid external file requests
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext('2d')

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
      gradient.addColorStop(0.2, 'rgba(0, 212, 255, 0.8)')
      gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.25)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 64, 64)

      const texture = new THREE.CanvasTexture(canvas)
      texture.colorSpace = THREE.SRGBColorSpace
      return texture
    }

    // Initialize Three.js Scene
    const init = () => {
      const width = container.clientWidth
      const height = container.clientHeight

      // Scene & Fog for depth cinematic feel
      scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x050508, 0.0015)

      // Camera
      camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000)
      camera.position.z = 250

      // Renderer - optimized with powerPreference & alpha
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height)
      container.appendChild(renderer.domElement)

      // Particles Geometry
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(PARTICLE_COUNT * 3)
      const colors = new Float32Array(PARTICLE_COUNT * 3)
      const sizes = new Float32Array(PARTICLE_COUNT)

      originalPositions = new Float32Array(PARTICLE_COUNT * 3)
      particleSpeeds = new Float32Array(PARTICLE_COUNT)

      const colorCyan = new THREE.Color('#00d4ff')
      const colorPurple = new THREE.Color('#a855f7')
      const colorIndigo = new THREE.Color('#6366f1')

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Distribute in a beautiful cinematic double-helix or wave galaxy
        const theta = Math.random() * Math.PI * 2
        const r = 50 + Math.random() * 150
        const x = Math.cos(theta) * r
        const y = Math.sin(theta) * (r * 0.4) + (Math.random() - 0.5) * 30
        const z = (Math.random() - 0.5) * 180

        positions[i * 3] = x
        positions[i * 3 + 1] = y
        positions[i * 3 + 2] = z

        originalPositions[i * 3] = x
        originalPositions[i * 3 + 1] = y
        originalPositions[i * 3 + 2] = z

        particleSpeeds[i] = 0.1 + Math.random() * 0.4

        // Color blending
        let mixedColor
        const rand = Math.random()
        if (rand < 0.4) {
          mixedColor = colorCyan.clone().lerp(colorIndigo, Math.random())
        } else if (rand < 0.8) {
          mixedColor = colorPurple.clone().lerp(colorIndigo, Math.random())
        } else {
          mixedColor = colorCyan.clone().lerp(colorPurple, Math.random())
        }

        colors[i * 3] = mixedColor.r
        colors[i * 3 + 1] = mixedColor.g
        colors[i * 3 + 2] = mixedColor.b

        sizes[i] = isMobile ? (3 + Math.random() * 6) : (4 + Math.random() * 12)
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      // Material
      const texture = createParticleTexture()
      const material = new THREE.PointsMaterial({
        size: isMobile ? 8 : 12,
        map: texture,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      particleSystem = new THREE.Points(geometry, material)
      scene.add(particleSystem)

      // Lights for atmospheric volumetric glow effect
      const dirLight1 = new THREE.DirectionalLight(0x00d4ff, 1.5)
      dirLight1.position.set(1, 1, 1).normalize()
      scene.add(dirLight1)

      const dirLight2 = new THREE.DirectionalLight(0xa855f7, 1)
      dirLight2.position.set(-1, -1, 1).normalize()
      scene.add(dirLight2)

      const ambientLight = new THREE.AmbientLight(0x0a0a14)
      scene.add(ambientLight)
    }

    // Dynamic wave / particle movement algorithm
    const animateParticles = (time) => {
      const positionsAttr = particleSystem.geometry.attributes.position
      const positions = positionsAttr.array

      const t = time * 0.0005

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3
        const speed = particleSpeeds[i]

        // Smooth wave function simulating galactic dust flows
        const x = originalPositions[i3]
        const y = originalPositions[i3 + 1]
        const z = originalPositions[i3 + 2]

        // Noise flow field mathematical approximation
        positions[i3] = x + Math.sin(t + y * 0.02) * 12 * speed
        positions[i3 + 1] = y + Math.cos(t + x * 0.02) * 8 * speed
        positions[i3 + 2] = z + Math.sin(t * 1.5 + (x + y) * 0.01) * 10 * speed

        // Interactive mouse gravity deflection
        const mx = mouse.x * 120
        const my = mouse.y * 120
        const dx = positions[i3] - mx
        const dy = positions[i3 + 1] - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 80) {
          const force = (80 - dist) / 80
          positions[i3] += (dx / dist) * force * 15
          positions[i3 + 1] += (dy / dist) * force * 15
        }
      }

      positionsAttr.needsUpdate = true
    }

    // Animation Loop
    const tick = (time) => {
      // Inertial damping / lerp for smooth dynamic parallax camera drift
      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04

      // Drift camera slightly based on mouse parallax coordinates
      camera.position.x = mouse.x * 60
      camera.position.y = -mouse.y * 60
      camera.lookAt(scene.position)

      // Galactic spin
      if (particleSystem) {
        particleSystem.rotation.y = time * 0.00003
        animateParticles(time)
      }

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(tick)
    }

    // Event Handlers
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0]
        mouse.targetX = (t.clientX / window.innerWidth) * 2 - 1
        mouse.targetY = -(t.clientY / window.innerHeight) * 2 + 1
      }
    }

    // Gyroscope / Device orientation fallback for cinematic feel on actual mobile phones
    const handleDeviceOrientation = (e) => {
      if (e.beta && e.gamma) {
        // Map tilt range beautifully
        mouse.targetX = THREE.MathUtils.clamp(e.gamma / 30, -1, 1)
        mouse.targetY = THREE.MathUtils.clamp((e.beta - 45) / 30, -1, 1)
      }
    }

    const handleResize = () => {
      if (!container || !renderer || !camera) return
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    // Execute setup
    init()
    animationFrameId = requestAnimationFrame(tick)

    // Listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true })
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('resize', handleResize)
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation)
      }

      if (renderer) {
        renderer.dispose()
        const dom = renderer.domElement
        if (dom && dom.parentNode) {
          dom.parentNode.removeChild(dom)
        }
      }

      if (particleSystem) {
        particleSystem.geometry.dispose()
        particleSystem.material.dispose()
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

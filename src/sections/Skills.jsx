import { useRef, useEffect } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const TECH_NODES = [
  // Core — center cluster
  { name: 'React',       level: 90, category: 'framework', color: '#61dafb', size: 'lg' },
  { name: 'TypeScript',  level: 72, category: 'language',  color: '#3178c6', size: 'md' },
  { name: 'JavaScript',  level: 88, category: 'language',  color: '#f7df1e', size: 'md' },
  { name: 'Next.js',     level: 78, category: 'framework', color: '#ffffff', size: 'md' },
  { name: 'Tailwind',    level: 92, category: 'framework', color: '#06b6d4', size: 'md' },
  // Tools
  { name: 'Git',         level: 85, category: 'tool',      color: '#f05032', size: 'sm' },
  { name: 'Figma',       level: 70, category: 'design',    color: '#f24e1e', size: 'sm' },
  { name: 'Vite',        level: 88, category: 'tool',      color: '#646cff', size: 'sm' },
  { name: 'GitHub',      level: 85, category: 'tool',      color: '#e6edf3', size: 'sm' },
  // Frontend
  { name: 'HTML5',       level: 95, category: 'language',  color: '#e34f26', size: 'sm' },
  { name: 'CSS3',        level: 90, category: 'language',  color: '#1572b6', size: 'sm' },
  { name: 'Framer M.',   level: 82, category: 'framework', color: '#bb4fff', size: 'sm' },
  // Emerging
  { name: 'Node.js',     level: 45, category: 'backend',   color: '#339933', size: 'xs' },
  { name: 'REST API',    level: 80, category: 'other',     color: '#00d4ff', size: 'xs' },
  { name: 'VS Code',     level: 95, category: 'tool',      color: '#007acc', size: 'xs' },
]

const MARQUEE_TECHS = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS',
  'Framer Motion', 'HTML5', 'CSS3', 'Git', 'GitHub', 'Vite', 'Figma',
  'REST API', 'Node.js', 'VS Code', 'Vercel', 'React Router',
]

const SIZE_MAP = { lg: 38, md: 30, sm: 24, xs: 20 }

// Interactive 3D constellation/node-graph projected onto canvas
function InteractiveUniverseCanvas({ inView }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const nodesRef = useRef([])
  const animationRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999, px: -9999, py: -9999, isDown: false, activeNode: null })

  // Initialize interactive 3D particle node physics
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')

    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.width * 0.58 // maintain consistent cinematic wide ratio
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    // Build interactive node list with local 3D velocities & coordinates
    if (nodesRef.current.length === 0) {
      nodesRef.current = TECH_NODES.map((node) => {
        // Distribute uniformly in 3D sphere space
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos((Math.random() * 2) - 1)
        const dist = 100 + Math.random() * 120

        return {
          ...node,
          // 3D coordinates relative to center
          x3d: dist * Math.sin(phi) * Math.cos(theta),
          y3d: dist * Math.sin(phi) * Math.sin(theta),
          z3d: dist * Math.cos(phi),
          // Projected 2D screen coordinate coordinates
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          radius: SIZE_MAP[node.size] || 24,
          glow: Math.random() * 0.5 + 0.5,
          angle: Math.random() * Math.PI * 2,
          speed: 0.003 + Math.random() * 0.004,
        }
      })
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      mouseRef.current.x = mx
      mouseRef.current.y = my

      // Check hover
      if (!mouseRef.current.isDown) {
        let hoveredNode = null
        for (const node of nodesRef.current) {
          const dx = node.x - mx
          const dy = node.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < node.radius + 10) {
            hoveredNode = node
            break
          }
        }
        canvas.style.cursor = hoveredNode ? 'grab' : 'default'
      } else if (mouseRef.current.activeNode) {
        canvas.style.cursor = 'grabbing'
        const node = mouseRef.current.activeNode
        node.x = mx
        node.y = my
      }
    }

    const onMouseDown = () => {
      mouseRef.current.isDown = true
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const node of nodesRef.current) {
        const dx = node.x - mx
        const dy = node.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < node.radius + 10) {
          mouseRef.current.activeNode = node
          break
        }
      }
    }

    const onMouseUp = () => {
      mouseRef.current.isDown = false
      mouseRef.current.activeNode = null
      canvas.style.cursor = 'default'
    }

    const onMouseLeave = () => {
      mouseRef.current.x = -9999
      mouseRef.current.y = -9999
      mouseRef.current.isDown = false
      mouseRef.current.activeNode = null
    }

    canvas.addEventListener('mousemove', onMouseMove, { passive: true })
    canvas.addEventListener('mousedown', onMouseDown, { passive: true })
    canvas.addEventListener('mouseup', onMouseUp, { passive: true })
    canvas.addEventListener('mouseleave', onMouseLeave, { passive: true })

    // Touch support
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0]
        const rect = canvas.getBoundingClientRect()
        const mx = t.clientX - rect.left
        const my = t.clientY - rect.top
        mouseRef.current.x = mx
        mouseRef.current.y = my

        if (mouseRef.current.isDown && mouseRef.current.activeNode) {
          const node = mouseRef.current.activeNode
          node.x = mx
          node.y = my
        }
      }
    }

    const onTouchStart = (e) => {
      if (e.touches.length > 0) {
        mouseRef.current.isDown = true
        const t = e.touches[0]
        const rect = canvas.getBoundingClientRect()
        const mx = t.clientX - rect.left
        const my = t.clientY - rect.top
        mouseRef.current.x = mx
        mouseRef.current.y = my

        for (const node of nodesRef.current) {
          const dx = node.x - mx
          const dy = node.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < node.radius + 15) {
            mouseRef.current.activeNode = node
            break
          }
        }
      }
    }

    canvas.addEventListener('touchmove', onTouchMove, { passive: true })
    canvas.addEventListener('touchstart', onTouchStart, { passive: true })
    canvas.addEventListener('touchend', onMouseUp, { passive: true })

    // Core Animation loop simulating dynamic 3D orbital dynamics & spring network
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const rotationSpeed = 0.004

      // Rotate nodes in virtual 3D space
      nodesRef.current.forEach((node) => {
        if (node !== mouseRef.current.activeNode) {
          // Rotate around Y axis
          const cosY = Math.cos(rotationSpeed)
          const sinY = Math.sin(rotationSpeed)
          const xRot = node.x3d * cosY - node.z3d * sinY
          const zRot = node.x3d * sinY + node.z3d * cosY

          // Rotate around X axis slightly
          const cosX = Math.cos(rotationSpeed * 0.4)
          const sinX = Math.sin(rotationSpeed * 0.4)
          const yRot = node.y3d * cosX - zRot * sinX
          const finalZ = node.y3d * sinX + zRot * cosX

          node.x3d = xRot
          node.y3d = yRot
          node.z3d = finalZ

          // 3D projection mathematical transformation (focal length = 250)
          const fov = 250
          const scale = fov / (fov + finalZ)
          node.projScale = scale

          // Target projected coordinates
          const targetX = cx + xRot * scale
          const targetY = cy + yRot * scale

          // Smooth lerp to projected coordinate with soft physics drag
          node.x += (targetX - node.x) * 0.08
          node.y += (targetY - node.y) * 0.08
        }
      })

      // Draw Connection Constellation Lines with variable opacity depending on 3D depth
      ctx.lineWidth = 0.8
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const n1 = nodesRef.current[i]
          const n2 = nodesRef.current[j]

          const dist3D = Math.sqrt(
            Math.pow(n1.x3d - n2.x3d, 2) +
            Math.pow(n1.y3d - n2.y3d, 2) +
            Math.pow(n1.z3d - n2.z3d, 2)
          )

          // Only draw close connections to create a beautiful neural constellation net
          if (dist3D < 160) {
            const opacity = (1 - dist3D / 160) * 0.22 * Math.min(n1.projScale || 1, n2.projScale || 1)
            ctx.beginPath()
            ctx.moveTo(n1.x, n1.y)
            ctx.lineTo(n2.x, n2.y)

            const gradient = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y)
            gradient.addColorStop(0, n1.color + Math.floor(opacity * 255).toString(16).padStart(2, '0'))
            gradient.addColorStop(1, n2.color + Math.floor(opacity * 255).toString(16).padStart(2, '0'))

            ctx.strokeStyle = gradient
            ctx.stroke()
          }
        }
      }

      // Draw Nodes in depth-sorted order to preserve flawless overlapping visual aesthetics
      const sortedNodes = [...nodesRef.current].sort((a, b) => (b.z3d || 0) - (a.z3d || 0))

      sortedNodes.forEach((node) => {
        const scale = node.projScale || 1
        const radius = node.radius * (0.6 + scale * 0.5)

        // Mouse attraction / repulsion physics
        const mx = mouseRef.current.x
        const my = mouseRef.current.y
        const dx = node.x - mx
        const dy = node.y - my
        const mouseDist = Math.sqrt(dx * dx + dy * dy)

        let hoverIntensity = 0
        if (mouseDist < 90) {
          hoverIntensity = (90 - mouseDist) / 90
          // Draw subtle interactive connection to cursor
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(mx, my)
          ctx.strokeStyle = `${node.color}15`
          ctx.stroke()
        }

        // Depth shader mapping color opacities
        const baseAlpha = 0.15 + scale * 0.5
        const finalAlpha = Math.min(1, baseAlpha + hoverIntensity * 0.4)

        ctx.save()

        // Glow layer
        ctx.shadowBlur = (node.level >= 85 ? 15 : 6) * scale
        ctx.shadowColor = node.color

        // Node circle
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `radial-gradient`

        const radialGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius)
        radialGrad.addColorStop(0, `${node.color}35`)
        radialGrad.addColorStop(0.7, `${node.color}10`)
        radialGrad.addColorStop(1, `${node.color}00`)
        ctx.fillStyle = radialGrad
        ctx.fill()

        ctx.strokeStyle = `${node.color}${Math.floor((0.2 + scale * 0.6) * 255).toString(16).padStart(2, '0')}`
        ctx.lineWidth = 1.2
        ctx.stroke()

        // Clean shadow settings to render text razor sharp
        ctx.shadowBlur = 0
        ctx.shadowColor = 'transparent'

        // Text labels inside nodes
        ctx.font = `bold ${Math.max(8, 10 * scale)}px Inter, system-ui, sans-serif`
        ctx.fillStyle = `rgba(255, 255, 255, ${finalAlpha})`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(node.name, node.x, node.y)

        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(render)
    }

    if (inView) {
      render()
    }

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mousedown', onMouseDown)
      canvas.removeEventListener('mouseup', onMouseUp)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchend', onMouseUp)
    }
  }, [inView])

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[360px]" style={{ touchAction: 'none' }}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        aria-label="Interactive 3D Technology Constellation Graph"
      />
    </div>
  )
}

function SkillCard({ category, skills, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-hover"
      style={{
        padding: '1.5rem',
        borderRadius: '1.25rem',
        border: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '0.6rem',
          background: `${category.color}12`, border: `1px solid ${category.color}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem',
        }}>
          {category.emoji}
        </div>
        <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{category.label}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {skills.map(({ name, level, color }) => (
          <div key={name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', fontWeight: 500 }}>{name}</span>
              <span style={{ color: color || '#00d4ff', fontSize: '0.72rem', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
                {level}%
              </span>
            </div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 9999, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${level}%` } : { width: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 + index * 0.1 }}
                style={{
                  height: '100%',
                  borderRadius: 9999,
                  background: color
                    ? `linear-gradient(90deg, ${color}, ${color}aa)`
                    : 'linear-gradient(90deg, #00d4ff, #a855f7)',
                  boxShadow: `0 0 8px ${color || '#00d4ff'}40`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

const SKILL_CATEGORIES = [
  {
    label: 'Languages',
    emoji: '⌨️',
    color: '#f7df1e',
    skills: [
      { name: 'JavaScript', level: 88, color: '#f7df1e' },
      { name: 'TypeScript', level: 72, color: '#3178c6' },
      { name: 'HTML5',      level: 95, color: '#e34f26' },
      { name: 'CSS3',       level: 90, color: '#1572b6' },
    ],
  },
  {
    label: 'Frameworks',
    emoji: '⚛️',
    color: '#61dafb',
    skills: [
      { name: 'React',          level: 90, color: '#61dafb' },
      { name: 'Next.js',        level: 78, color: '#e6edf3' },
      { name: 'Tailwind CSS',   level: 92, color: '#06b6d4' },
      { name: 'Framer Motion',  level: 82, color: '#bb4fff' },
    ],
  },
  {
    label: 'Tools',
    emoji: '🔧',
    color: '#f05032',
    skills: [
      { name: 'Git / GitHub',  level: 85, color: '#f05032' },
      { name: 'Vite',          level: 88, color: '#646cff' },
      { name: 'Figma',         level: 70, color: '#f24e1e' },
      { name: 'VS Code',       level: 95, color: '#007acc' },
    ],
  },
  {
    label: 'Other',
    emoji: '🌐',
    color: '#00d4ff',
    skills: [
      { name: 'Responsive Design', level: 93, color: '#00d4ff' },
      { name: 'REST APIs',          level: 80, color: '#10b981' },
      { name: 'UI/UX Thinking',     level: 75, color: '#a855f7' },
      { name: 'Clean Code',         level: 82, color: '#6366f1' },
    ],
  },
]

export default function Skills() {
  const { tx } = useLanguage()
  const s = tx.skills
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const doubled = [...MARQUEE_TECHS, ...MARQUEE_TECHS]

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding: 'clamp(5rem, 10vw, 8rem) 0',
        overflow: 'hidden',
        background: 'rgba(8, 11, 18, 0.6)',
        position: 'relative',
      }}
    >
      {/* Atmospheric left glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '30%', left: '-10%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.25rem' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <div className="eyebrow-pill" style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
            {s.eyebrow}
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1,
          }}>
            <span className="text-gradient">{s.title}</span>
          </h2>
        </motion.div>

        {/* Marquee */}
        <div style={{ position: 'relative', marginBottom: 'clamp(3rem, 6vw, 5rem)', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 80,
            background: 'linear-gradient(90deg, #080b12, transparent)', zIndex: 10, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 80,
            background: 'linear-gradient(270deg, #080b12, transparent)', zIndex: 10, pointerEvents: 'none',
          }} />
          <div className="marquee-track">
            {doubled.map((tech, i) => (
              <div
                key={i}
                className="glass-hover"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  margin: '0 0.5rem', padding: '0.6rem 1.25rem',
                  borderRadius: '0.75rem', whiteSpace: 'nowrap',
                  border: '1px solid rgba(255,255,255,0.05)',
                  background: 'rgba(255,255,255,0.02)',
                  fontSize: '0.8rem', fontWeight: 600,
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#00d4ff', opacity: 0.6, flexShrink: 0 }} />
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic 3D projected interactive constellation universe map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            padding: 'clamp(1rem, 3vw, 2.5rem)',
            borderRadius: '1.5rem',
            border: '1px solid rgba(255,255,255,0.05)',
            background: 'rgba(255,255,255,0.015)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>
              Technology Constellation Map (Grabbable & Orbiting)
            </span>
          </div>
          <InteractiveUniverseCanvas inView={inView} />
        </motion.div>

        {/* Skill cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1rem' }}>
          {SKILL_CATEGORIES.map((cat, idx) => (
            <SkillCard
              key={cat.label}
              category={cat}
              skills={cat.skills}
              index={idx}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

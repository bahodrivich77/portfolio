import { useRef, useEffect } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const TECH_NODES = [
  // Core — center cluster
  { name: 'Go (Golang)', level: 92, category: 'language',  color: '#34d399', size: 'lg' },
  { name: 'Rust',        level: 80, category: 'language',  color: '#fbbf24', size: 'lg' },
  { name: 'Kubernetes',  level: 88, category: 'framework', color: '#34d399', size: 'md' },
  { name: 'DevSecOps',   level: 85, category: 'framework', color: '#fbbf24', size: 'md' },
  { name: 'C++ / C',     level: 78, category: 'language',  color: '#34d399', size: 'md' },
  // Tools / Infrastructure
  { name: 'Docker',      level: 90, category: 'tool',      color: '#fbbf24', size: 'sm' },
  { name: 'AWS GovCloud',level: 82, category: 'tool',      color: '#34d399', size: 'sm' },
  { name: 'Linux Kernel',level: 88, category: 'tool',      color: '#fbbf24', size: 'sm' },
  { name: 'Git / GitHub',level: 92, category: 'tool',      color: '#34d399', size: 'sm' },
  // Cryptography / Standards
  { name: 'GOST Crypto', level: 95, category: 'other',     color: '#fbbf24', size: 'sm' },
  { name: 'ISO 27001',   level: 90, category: 'other',     color: '#34d399', size: 'sm' },
  { name: 'gRPC / Proto',level: 85, category: 'framework', color: '#fbbf24', size: 'sm' },
  // Emerging / Backend
  { name: 'PostgreSQL',  level: 87, category: 'backend',   color: '#34d399', size: 'xs' },
  { name: 'Redis',       level: 85, category: 'backend',   color: '#fbbf24', size: 'xs' },
  { name: 'Bash Script', level: 90, category: 'language',  color: '#34d399', size: 'xs' },
]

const MARQUEE_TECHS = [
  'Go (Golang)', 'Rust', 'Kubernetes', 'DevSecOps', 'C++ / C',
  'AWS GovCloud', 'Linux Kernel', 'GOST Cryptography', 'ISO 27001',
  'mTLS', 'gRPC', 'Apache Kafka', 'PostgreSQL', 'Redis', 'Docker',
  'Bash Scripting', 'FedRAMP', 'OAuth 2.0',
]

const SIZE_MAP = { lg: 38, md: 30, sm: 24, xs: 20 }

// Interactive 3D constellation projected onto canvas (Emerald & Gold nodes)
function InteractiveUniverseCanvas({ inView }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const nodesRef = useRef([])
  const animationRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999, px: -9999, py: -9999, isDown: false, activeNode: null })

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')

    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.width * 0.55 // Cinematic wide ratio
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    if (nodesRef.current.length === 0) {
      nodesRef.current = TECH_NODES.map((node) => {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos((Math.random() * 2) - 1)
        const dist = 100 + Math.random() * 110

        return {
          ...node,
          x3d: dist * Math.sin(phi) * Math.cos(theta),
          y3d: dist * Math.sin(phi) * Math.sin(theta),
          z3d: dist * Math.cos(phi),
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          radius: SIZE_MAP[node.size] || 24,
          glow: Math.random() * 0.5 + 0.5,
          angle: Math.random() * Math.PI * 2,
          speed: 0.002 + Math.random() * 0.003,
        }
      })
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      mouseRef.current.x = mx
      mouseRef.current.y = my

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

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const rotationSpeed = 0.003

      nodesRef.current.forEach((node) => {
        if (node !== mouseRef.current.activeNode) {
          const cosY = Math.cos(rotationSpeed)
          const sinY = Math.sin(rotationSpeed)
          const xRot = node.x3d * cosY - node.z3d * sinY
          const zRot = node.x3d * sinY + node.z3d * cosY

          const cosX = Math.cos(rotationSpeed * 0.3)
          const sinX = Math.sin(rotationSpeed * 0.3)
          const yRot = node.y3d * cosX - zRot * sinX
          const finalZ = node.y3d * sinX + zRot * cosX

          node.x3d = xRot
          node.y3d = yRot
          node.z3d = finalZ

          const fov = 250
          const scale = fov / (fov + finalZ)
          node.projScale = scale

          const targetX = cx + xRot * scale
          const targetY = cy + yRot * scale

          node.x += (targetX - node.x) * 0.08
          node.y += (targetY - node.y) * 0.08
        }
      })

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

          if (dist3D < 150) {
            const opacity = (1 - dist3D / 150) * 0.25 * Math.min(n1.projScale || 1, n2.projScale || 1)
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

      const sortedNodes = [...nodesRef.current].sort((a, b) => (b.z3d || 0) - (a.z3d || 0))

      sortedNodes.forEach((node) => {
        const scale = node.projScale || 1
        const radius = node.radius * (0.6 + scale * 0.5)

        const mx = mouseRef.current.x
        const my = mouseRef.current.y
        const dx = node.x - mx
        const dy = node.y - my
        const mouseDist = Math.sqrt(dx * dx + dy * dy)

        let hoverIntensity = 0
        if (mouseDist < 90) {
          hoverIntensity = (90 - mouseDist) / 90
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(mx, my)
          ctx.strokeStyle = `${node.color}15`
          ctx.stroke()
        }

        const baseAlpha = 0.2 + scale * 0.5
        const finalAlpha = Math.min(1, baseAlpha + hoverIntensity * 0.4)

        ctx.save()

        ctx.shadowBlur = (node.level >= 85 ? 15 : 6) * scale
        ctx.shadowColor = node.color

        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)

        const radialGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius)
        radialGrad.addColorStop(0, `${node.color}35`)
        radialGrad.addColorStop(0.7, `${node.color}10`)
        radialGrad.addColorStop(1, `${node.color}00`)
        ctx.fillStyle = radialGrad
        ctx.fill()

        ctx.strokeStyle = `${node.color}${Math.floor((0.2 + scale * 0.6) * 255).toString(16).padStart(2, '0')}`
        ctx.lineWidth = 1.2
        ctx.stroke()

        ctx.shadowBlur = 0
        ctx.shadowColor = 'transparent'

        ctx.font = `bold ${Math.max(8, 10 * scale)}px 'JetBrains Mono', monospace`
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
      transition={{ delay: 0.25 + index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-hover"
      style={{
        padding: '1.5rem',
        borderRadius: '0.75rem',
        border: '1px solid #334155',
        background: 'rgba(15, 23, 42, 0.75)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '0.375rem',
          background: `${category.color}15`, border: `1px solid ${category.color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem',
        }}>
          {category.emoji}
        </div>
        <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.9rem', letterSpacing: '-0.01em' }}>{category.label}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {skills.map(({ name, level, color }) => (
          <div key={name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: '#94a3b8', fontSize: '0.82rem', fontWeight: 600 }}>{name}</span>
              <span style={{ color: color || '#34d399', fontSize: '0.72rem', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
                {level}%
              </span>
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 9999, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${level}%` } : { width: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 + index * 0.08 }}
                style={{
                  height: '100%',
                  borderRadius: 9999,
                  background: color
                    ? `linear-gradient(90deg, ${color}, ${color}cc)`
                    : 'linear-gradient(90deg, #047857, #fbbf24)',
                  boxShadow: `0 0 8px ${color || '#047857'}40`,
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
    label: 'Core Languages',
    emoji: '⚙️',
    color: '#34d399',
    skills: [
      { name: 'Go (Golang)', level: 92, color: '#34d399' },
      { name: 'Rust',        level: 80, color: '#fbbf24' },
      { name: 'C++ / C',     level: 78, color: '#34d399' },
      { name: 'Bash Script', level: 90, color: '#fbbf24' },
    ],
  },
  {
    label: 'Systems & K8s',
    emoji: '☸️',
    color: '#fbbf24',
    skills: [
      { name: 'Kubernetes',  level: 88, color: '#34d399' },
      { name: 'Docker / OCI',level: 90, color: '#fbbf24' },
      { name: 'gRPC / Proto',level: 85, color: '#34d399' },
      { name: 'mTLS Mesh',   level: 80, color: '#fbbf24' },
    ],
  },
  {
    label: 'Infrastructure',
    emoji: '☁️',
    color: '#34d399',
    skills: [
      { name: 'AWS GovCloud',level: 82, color: '#34d399' },
      { name: 'Linux Kernel',level: 88, color: '#fbbf24' },
      { name: 'GitOps / CD', level: 85, color: '#34d399' },
      { name: 'Ansible',     level: 75, color: '#fbbf24' },
    ],
  },
  {
    label: 'Security & Audit',
    emoji: '🛡️',
    color: '#fbbf24',
    skills: [
      { name: 'GOST Crypto', level: 95, color: '#34d399' },
      { name: 'ISO 27001',   level: 90, color: '#fbbf24' },
      { name: 'OAuth / IAM', level: 88, color: '#34d399' },
      { name: 'Pentesting',  level: 75, color: '#fbbf24' },
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
        background: 'rgba(15, 23, 42, 0.4)',
        position: 'relative',
      }}
    >
      {/* Atmosphere left emerald glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '30%', left: '-10%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(4,120,87,0.06) 0%, transparent 70%)',
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

        {/* Marquee with Emerald and Gold branding */}
        <div style={{ position: 'relative', marginBottom: 'clamp(3rem, 6vw, 5rem)', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 80,
            background: 'linear-gradient(90deg, #0B1120, transparent)', zIndex: 10, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 80,
            background: 'linear-gradient(270deg, #0B1120, transparent)', zIndex: 10, pointerEvents: 'none',
          }} />
          <div className="marquee-track">
            {doubled.map((tech, i) => (
              <div
                key={i}
                className="glass-hover"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  margin: '0 0.5rem', padding: '0.6rem 1.25rem',
                  borderRadius: '0.375rem', whiteSpace: 'nowrap',
                  border: '1px solid #334155',
                  background: 'rgba(15, 23, 42, 0.6)',
                  fontSize: '0.8rem', fontWeight: 700,
                  color: '#94a3b8',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#fbbf24', opacity: 0.85, flexShrink: 0 }} />
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
            borderRadius: '1rem',
            border: '1px solid #334155',
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(12px)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{ color: '#fbbf24', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
              Tactical Systems Constellation Graph (Grabbable & Orbiting)
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

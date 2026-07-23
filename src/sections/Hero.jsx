import { useEffect, useRef, useState, useMemo, lazy, Suspense } from 'react'
import { m as motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Shield, Key, FileText, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

// Lazy-load the heavy Three.js gold/emerald defensive constellation background
const ThreeHeroBackground = lazy(() => import('./ThreeHeroBackground'))

// ─── Pure WebGL-free Canvas Fallback (Emerald/Gold Particles) ────
function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let mouse = { x: -9999, y: -9999 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const onMouseMove = (e) => {
      mouse = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const COUNT = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 14000))
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      hue: Math.random() > 0.65 ? 'gold' : 'emerald', // emerald or gold
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100) {
          const force = (100 - dist) / 100
          p.vx += (dx / dist) * force * 0.15
          p.vy += (dy / dist) * force * 0.15
        }

        p.vx *= 0.98
        p.vy *= 0.98

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.hue === 'emerald'
          ? `rgba(52, 211, 153, ${p.alpha})`
          : `rgba(251, 191, 36, ${p.alpha})`
        ctx.fill()

        // Draw tactical defense mesh lines
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const ddx = p.x - q.x
          const ddy = p.y - q.y
          const d = Math.sqrt(ddx * ddx + ddy * ddy)
          if (d < 90) {
            const opacity = (1 - d / 90) * 0.08
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = p.hue === 'emerald'
              ? `rgba(52, 211, 153, ${opacity})`
              : `rgba(251, 191, 36, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  )
}

// ─── Floating Defensive rings ─────────────────────────────────────
function FloatingRings() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
      <div
        className="spin-slow"
        style={{
          position: 'absolute',
          width: 'clamp(450px, 60vw, 800px)',
          height: 'clamp(450px, 60vw, 800px)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: '1px solid rgba(4, 120, 87, 0.05)',
        }}
      />
      <div
        className="spin-slow-reverse"
        style={{
          position: 'absolute',
          width: 'clamp(300px, 45vw, 600px)',
          height: 'clamp(300px, 45vw, 600px)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: '1px dashed rgba(217, 119, 6, 0.08)',
        }}
      />
    </div>
  )
}

// ─── Holographic Government Credential Badge ──────────────────────
function GovernmentCredential({ name, role }) {
  const [glare, setGlare] = useState({ x: 50, y: 50 })
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setGlare({ x, y })
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-8 mx-auto group cursor-crosshair"
      style={{ width: 'fit-content', perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      ref={cardRef}
    >
      {/* Dynamic Gold Glow behind the badge */}
      <div
        className="pulse-glow"
        style={{
          position: 'absolute',
          inset: -12,
          borderRadius: '1.25rem',
          background: 'radial-gradient(circle, rgba(217,119,6,0.1) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Cybernetic Frame & Card */}
      <div
        className="relative overflow-hidden"
        style={{
          width: 'clamp(280px, 90vw, 360px)',
          background: 'rgba(15, 23, 42, 0.85)',
          border: '2px solid #334155',
          borderRadius: '1rem',
          padding: '1.25rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(4, 120, 87, 0.1)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Holographic Glare Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(217, 119, 6, 0.08) 0%, rgba(4, 120, 87, 0.05) 40%, transparent 80%)`,
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />

        {/* Tactical Status Bar */}
        <div className="flex items-center justify-between border-b border-slate-700/50 pb-2.5 mb-3 text-[0.62rem] text-slate-400 font-mono tracking-widest">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" style={{ boxShadow: '0 0 6px #059669' }} />
            SECURE LINK ACTIVE
          </div>
          <div className="text-[#fbbf24] flex items-center gap-1">
            <Shield size={10} /> ACCESS LEVEL: 05
          </div>
        </div>

        {/* Card Main Area */}
        <div className="flex gap-4 items-start">
          {/* Avatar Area with cybernetic brackets */}
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-1.5 border border-dashed border-[#047857]/50 rounded-lg animate-spin-slow" />
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '0.5rem',
                overflow: 'hidden',
                border: '1px solid #D97706',
                background: '#0B1120',
              }}
            >
              <picture>
                <source srcSet="/Cmcoder-sm.webp 320w, /Cmcoder.webp 640w" sizes="80px" type="image/webp" />
                <img
                  src="/Cmcoder.webp"
                  alt={name}
                  width="80"
                  height="80"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </picture>
            </div>
            {/* Stamp Overlay */}
            <div className="absolute -bottom-1 -right-1 bg-emerald-950 text-[#34d399] border border-emerald-500 text-[0.45rem] px-1 py-0.5 rounded font-mono font-bold scale-90 tracking-tighter">
              VERIFIED
            </div>
          </div>

          {/* Dossier Text */}
          <div className="flex-1 text-left">
            <div className="text-[0.6rem] text-[#fbbf24] font-mono tracking-widest uppercase font-bold mb-0.5 flex items-center gap-1">
              <CheckCircle2 size={10} /> Certified official
            </div>
            <h3 className="font-display font-extrabold text-white text-base tracking-tight leading-none mb-1">
              {name}
            </h3>
            <p className="text-slate-400 text-[0.68rem] leading-tight font-mono mb-2">
              {role}
            </p>
            {/* Cryptographic Key Signature readout */}
            <div className="bg-slate-900/80 rounded px-2 py-1 border border-slate-800 text-[0.5rem] font-mono text-emerald-400/90 leading-none flex items-center gap-1">
              <Key size={8} className="text-[#fbbf24]" />
              SIG: F72D:8801:40A2:ED49
            </div>
          </div>
        </div>

        {/* Footer Audit Hash */}
        <div className="mt-3.5 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[0.55rem] text-slate-500 font-mono">
          <div>AUTH_ID: 8820-GOV-ID</div>
          <div className="flex items-center gap-1">
            <FileText size={8} /> INTEGRITY CHECK: PASSED
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Typewriter ───────────────────────────────────────────────────
function Typewriter({ texts }) {
  const [display, setDisplay] = useState('')
  const textList = useMemo(() => texts || [], [texts])

  useEffect(() => {
    if (!textList.length) return
    let active = true
    let idx = 0
    let char = 0
    let timer

    const loop = () => {
      if (!active) return
      const current = textList[idx] || ''
      if (char <= current.length) {
        setDisplay(current.slice(0, char))
        char++
        timer = setTimeout(loop, 55)
      } else {
        timer = setTimeout(() => {
          char = 0
          idx = (idx + 1) % textList.length
          loop()
        }, 2200)
      }
    }
    loop()
    return () => { active = false; clearTimeout(timer) }
  }, [textList])

  return (
    <span className="font-bold font-mono tracking-wider" style={{ color: '#fbbf24', fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)' }}>
      {display}
      <span className="animate-cursor" aria-hidden="true" />
    </span>
  )
}

// ─── Magnetic CTA button ──────────────────────────────────────────
function MagneticButton({ onClick, children, primary = true, className = '' }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const btn = ref.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
  }

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`${primary ? 'btn-primary' : 'btn-outline'} px-8 py-3.5 text-sm font-bold uppercase tracking-wider ${className}`}
      style={{ transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease' }}
    >
      {children}
    </motion.button>
  )
}

// ─── Main Hero ────────────────────────────────────────────────────
export default function Hero() {
  const { tx } = useLanguage()
  const h = tx.hero
  const [loadThreeBackground, setLoadThreeBackground] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        setLoadThreeBackground(true)
      }, { timeout: 1800 })
    } else {
      const t = setTimeout(() => {
        setLoadThreeBackground(true)
      }, 1200)
      return () => clearTimeout(t)
    }
  }, [])

  const scrollDown = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  }
  const item = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0B1120]"
      style={{ paddingTop: '6rem', paddingBottom: '4rem' }}
    >
      {/* Tactical WebGL gold/emerald particle defense grid */}
      {loadThreeBackground ? (
        <Suspense fallback={<ParticleField />}>
          <ThreeHeroBackground />
        </Suspense>
      ) : (
        <ParticleField />
      )}
      <FloatingRings />

      {/* Grid line decorators matching futuristic authority */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#047857]/30 to-transparent" />
      <div className="absolute inset-y-0 left-12 w-px bg-gradient-to-b from-transparent via-[#047857]/10 to-transparent" />
      <div className="absolute inset-y-0 right-12 w-px bg-gradient-to-b from-transparent via-[#047857]/10 to-transparent" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center px-5 max-w-4xl w-full"
      >
        {/* Holographic Credential Badge */}
        <motion.div variants={item}>
          <GovernmentCredential name={tx.common.name} role={tx.about.role} />
        </motion.div>

        {/* Authoritative Title */}
        <motion.h1
          variants={item}
          className="font-display"
          style={{
            fontSize: 'clamp(2.2rem, 7vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}
        >
          {tx.common.name.split(' ')[0]}{' '}
          <span className="text-gradient">{tx.common.name.split(' ').slice(1).join(' ')}</span>
        </motion.h1>

        {/* Role Typewriter */}
        <motion.div variants={item} style={{ minHeight: '2rem', marginBottom: '1.5rem' }}>
          <Typewriter texts={h.typeSequence} />
        </motion.div>

        {/* Secure Positioning / Bio */}
        <motion.p
          variants={item}
          className="font-sans"
          style={{
            maxWidth: '38rem',
            lineHeight: 1.7,
            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
            color: '#94a3b8',
            marginBottom: '2.5rem',
          }}
        >
          {h.positioning}
        </motion.p>

        {/* Actions */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-10">
          <MagneticButton onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} primary>
            {h.ctaProjects}
          </MagneticButton>
          <MagneticButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} primary={false}>
            {h.ctaContact}
          </MagneticButton>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={item}
          className="grid grid-cols-3 gap-3 w-full max-w-md sm:max-w-2xl"
        >
          {[
            { value: '08+', label: h.stats.experience },
            { value: '15+', label: h.stats.projects },
            { value: '99.9%', label: h.stats.quality },
          ].map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.08, duration: 0.5 }}
              className="text-center py-3.5 px-2.5 rounded-lg border border-[#334155] bg-slate-900/60 backdrop-blur-md"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
              }}
            >
              <div
                className="font-display text-2xl sm:text-3xl font-extrabold text-[#fbbf24]"
                style={{ letterSpacing: '-0.02em' }}
              >
                {value}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.65rem', marginTop: 5, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>
                {label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-1.5 transition-all duration-300"
        style={{ transform: 'translateX(-50%)', color: '#94a3b8' }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#34d399'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
      >
        <span style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
          {h.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-[#34d399]" />
        </motion.div>
      </motion.button>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-48 pointer-events-none z-2"
        style={{
          background: 'linear-gradient(to bottom, transparent, #0B1120)',
        }}
      />
    </section>
  )
}

import { useEffect, useRef, useState, useMemo } from 'react'
import { m as motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, ExternalLink } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

// ─── Particle Canvas (pure WebGL-free canvas) ────────────────────
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

    // Create particles
    const COUNT = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 12000))
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      hue: Math.random() > 0.6 ? 280 : 195, // cyan or purple
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        // Mouse repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (120 - dist) / 120
          p.vx += (dx / dist) * force * 0.3
          p.vy += (dy / dist) * force * 0.3
        }

        // Damping
        p.vx *= 0.98
        p.vy *= 0.98

        p.x += p.vx
        p.y += p.vy

        // Wrap
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.hue === 195
          ? `rgba(0, 212, 255, ${p.alpha})`
          : `rgba(168, 85, 247, ${p.alpha})`
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const ddx = p.x - q.x
          const ddy = p.y - q.y
          const d = Math.sqrt(ddx * ddx + ddy * ddy)
          if (d < 100) {
            const opacity = (1 - d / 100) * 0.12
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`
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

// ─── Floating ring decoration ─────────────────────────────────────
function FloatingRings() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
      {/* Large outer ring */}
      <div
        className="spin-slow"
        style={{
          position: 'absolute',
          width: 'clamp(500px, 70vw, 900px)',
          height: 'clamp(500px, 70vw, 900px)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: '1px solid rgba(0, 212, 255, 0.04)',
        }}
      />
      {/* Mid ring — dashed */}
      <div
        className="spin-slow-reverse"
        style={{
          position: 'absolute',
          width: 'clamp(350px, 50vw, 660px)',
          height: 'clamp(350px, 50vw, 660px)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: '1px dashed rgba(168, 85, 247, 0.06)',
        }}
      />
    </div>
  )
}

// ─── Avatar with glowing frame ───────────────────────────────────
function Avatar({ name }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-8 mx-auto"
      style={{ width: 'fit-content' }}
    >
      {/* Outer glow ring */}
      <div
        className="pulse-glow"
        style={{
          position: 'absolute',
          inset: -8,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)',
        }}
      />
      {/* Rotating gradient ring */}
      <div
        className="spin-slow"
        style={{
          position: 'absolute',
          inset: -4,
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, #00d4ff, #a855f7, #6366f1, transparent, #00d4ff)',
          padding: '2px',
        }}
      >
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#050508' }} />
      </div>

      {/* Avatar image */}
      <div
        style={{
          position: 'relative',
          width: 'clamp(120px, 20vw, 160px)',
          height: 'clamp(120px, 20vw, 160px)',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid rgba(0,212,255,0.2)',
        }}
      >
        <picture>
          <source srcSet="/Cmcoder-sm.webp 320w, /Cmcoder.webp 640w" sizes="160px" type="image/webp" />
          <img
            src="/Cmcoder.webp"
            alt={name}
            width="160"
            height="160"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </picture>
      </div>

      {/* Online badge */}
      <div style={{
        position: 'absolute', bottom: 4, right: 4,
        width: 16, height: 16, borderRadius: '50%',
        background: '#22c55e',
        border: '2px solid #050508',
        boxShadow: '0 0 8px rgba(34,197,94,0.6)',
      }} />
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
        timer = setTimeout(loop, 60)
      } else {
        timer = setTimeout(() => {
          char = 0
          idx = (idx + 1) % textList.length
          loop()
        }, 2500)
      }
    }
    loop()
    return () => { active = false; clearTimeout(timer) }
  }, [textList])

  return (
    <span className="font-medium" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
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
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
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
      whileTap={{ scale: 0.96 }}
      className={`${primary ? 'btn-primary' : 'btn-outline'} px-8 py-4 text-base font-semibold ${className}`}
      style={{ transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease' }}
    >
      {children}
    </motion.button>
  )
}

// ─── Main Hero ────────────────────────────────────────────────────
export default function Hero() {
  const { tx } = useLanguage()
  const h = tx.hero

  const scrollDown = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

  // Stagger animation variants
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
  }
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ paddingTop: '5rem', paddingBottom: '4rem' }}
    >
      {/* Particle background */}
      <ParticleField />
      <FloatingRings />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center px-5 max-w-4xl w-full"
      >
        {/* Avatar */}
        <motion.div variants={item}>
          <Avatar name={tx.common.name} />
        </motion.div>

        {/* Status badge */}
        <motion.div variants={item}>
          <div className="eyebrow-pill mb-6">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }} />
            {h.badge}
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="font-display"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '1rem',
          }}
        >
          {tx.common.name.split(' ')[0]}{' '}
          <span className="text-gradient">{tx.common.name.split(' ').slice(1).join(' ')}</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div variants={item} style={{ minHeight: '2rem', marginBottom: '1.5rem' }}>
          <Typewriter texts={h.typeSequence} />
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={item}
          style={{
            maxWidth: '38rem',
            lineHeight: 1.7,
            fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
            color: 'rgba(255,255,255,0.45)',
            marginBottom: '2.5rem',
          }}
        >
          Building digital experiences that feel{' '}
          <span style={{ color: '#00d4ff', fontWeight: 600 }}>alive</span>.
          {' '}Frontend Developer ·{' '}
          <span style={{ color: '#a855f7', fontWeight: 600 }}>UI/UX Enthusiast</span>
          {' '}· Creative Technologist
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-8">
          <MagneticButton onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} primary>
            {h.ctaProjects}
            <ExternalLink size={16} className="inline ml-2" />
          </MagneticButton>
          <MagneticButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} primary={false}>
            {h.ctaContact}
          </MagneticButton>
        </motion.div>

        {/* Social links */}
        <motion.div variants={item} className="flex gap-3 mb-12">
          {[
            {
              href: 'https://github.com/bahodrivich77/',
              label: 'GitHub',
              icon: <Github size={18} />,
            },
            {
              href: 'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/',
              label: 'LinkedIn',
              icon: <Linkedin size={18} />,
            },
            {
              href: 'https://t.me/bahod1rovi_ch77',
              label: 'Telegram',
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              ),
            },
          ].map(({ href, label, icon }) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ y: -3 }}
              className="p-3 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                color: 'rgba(255,255,255,0.4)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'
                e.currentTarget.style.color = '#00d4ff'
                e.currentTarget.style.background = 'rgba(0,212,255,0.06)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              }}
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="grid grid-cols-3 gap-4 w-full max-w-sm sm:max-w-md"
        >
          {[
            { value: '2+', label: h.stats.experience },
            { value: '10+', label: h.stats.projects },
            { value: '100%', label: h.stats.quality },
          ].map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.6 }}
              className="text-center py-4 px-2 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div
                className="font-display text-2xl sm:text-3xl font-extrabold text-gradient"
                style={{ letterSpacing: '-0.02em' }}
              >
                {value}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem', marginTop: 4, letterSpacing: '0.04em' }}>
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
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2 transition-all duration-300"
        style={{ transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.2)' }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#00d4ff'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
      >
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {h.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>

      {/* Bottom gradient fade */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px',
          background: 'linear-gradient(to bottom, transparent, #050508)',
          pointerEvents: 'none', zIndex: 2,
        }}
      />
    </section>
  )
}

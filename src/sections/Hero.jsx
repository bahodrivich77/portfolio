import { useEffect, useRef, useState, useMemo } from 'react'
import { m as motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, ChevronDown } from 'lucide-react'

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
    <span className="text-cyan font-mono font-semibold tracking-tight">
      {display}
      <span className="animate-cursor ml-1" aria-hidden="true" />
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
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
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
      className={`${primary ? 'btn-premium' : 'btn-secondary'} px-8 py-4 text-base font-bold ${className}`}
      style={{ transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}
    >
      {children}
    </motion.button>
  )
}

export default function Hero() {
  const scrollDown = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-10"
    >
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="badge-work">
              <span className="pulse-dot" />
              Ish uchun ochiq
            </div>
          </motion.div>

          {/* Main Title */}
          <h1 className="font-display text-6xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tighter">
            <span className="text-white/60 block text-3xl md:text-4xl font-bold mb-2">Salom, men</span>
            <span className="text-white block">Mirkarim</span>
            <span className="text-gradient block">Bahodirovich</span>
          </h1>

          {/* Typewriter Role */}
          <div className="text-xl md:text-2xl mb-8 flex items-center gap-3">
            <span className="text-white/40">Expert</span>
            <Typewriter texts={[
              'Frontend Developer',
              'React & Next.js',
              'UI/UX ga e\'tibor beraman',
              'Tailwind CSS',
            ]} />
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted max-w-xl mb-12 leading-relaxed font-medium">
        Men uchun dasturlash shunchaki kod yozish emas. Har bir loyiha — muammoni tahlil qilish, zamonaviy texnologiyalarni qo'llash va foydalanuvchiga qulay tajriba yaratish imkoniyatidir. Har bir detalga e'tibor berib, sifatli va uzoq muddat xizmat qiladigan mahsulot yaratishga intilaman.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <MagneticButton onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} primary>
              Loyihalarni ko'rish
              <ArrowRight size={18} />
            </MagneticButton>
            <MagneticButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} primary={false}>
              Aloqa
            </MagneticButton>
          </div>

          {/* Social Social */}
          <div className="flex items-center gap-6 text-muted">
            <a href="https://github.com/bahodrivich77/" target="_blank" className="hover:text-cyan transition-colors"><Github size={24} /></a>
            <a href="https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/" target="_blank" className="hover:text-cyan transition-colors"><Linkedin size={24} /></a>
            <div className="h-px w-12 bg-white/10" />
            <span className="text-sm font-bold tracking-widest uppercase opacity-50">Expert Systems</span>
          </div>
        </motion.div>

        {/* Right Side: Futuristic Visualization (Optional) */}
       <motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1, delay: 0.2 }}
  className="hidden lg:flex justify-center items-center relative"
>
  <div className="relative w-96 h-96">
    {/* Glow */}
    <div className="absolute inset-0 bg-cyan/10 rounded-full blur-[100px] animate-pulse" />

    {/* Animated Rings */}
    <div className="absolute inset-0 border border-white/5 rounded-full rotate-45" />
    <div className="absolute inset-8 border border-cyan/20 rounded-full animate-[spin_20s_linear_infinite]" />
    <div className="absolute inset-16 border border-purple/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

    {/* Profile Image */}
    <div className="absolute inset-12 rounded-full overflow-hidden border-2 border-cyan/20 shadow-[0_0_60px_rgba(34,211,238,0.25)] backdrop-blur-xl">
      <img
        src="/Cmcoder.webp"
        alt="Mirkarim Furqatov - Frontend Developer Portfolio Hero Image"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Floating Glow */}
    <div className="absolute inset-12 rounded-full bg-gradient-to-tr from-cyan/10 via-transparent to-purple/10 pointer-events-none" />

    {/* Small Floating Dots */}
    <div className="absolute top-8 right-16 w-3 h-3 bg-cyan rounded-full animate-bounce" />
    <div className="absolute bottom-10 left-12 w-2 h-2 bg-purple rounded-full animate-ping" />
    <div className="absolute top-24 left-4 w-2 h-2 bg-white/50 rounded-full animate-pulse" />
  </div>
</motion.div>
      </div>

      {/* Scroll Down Hint */}
      <button
        onClick={scrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group text-muted hover:text-white transition-colors"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Pastga</span>
        <div className="w-px h-12 bg-grad-premium opacity-30 group-hover:opacity-100 transition-opacity" />
        <ChevronDown size={16} className="animate-bounce" />
      </button>
    </section>
  )
}

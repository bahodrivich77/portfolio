import { useState, useRef, useEffect } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { Send, Github, Linkedin, CheckCircle2, AlertCircle, Terminal, MapPin, Clock, ShieldCheck, Key } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN || ''
const CHAT_ID = import.meta.env.VITE_CHAT_ID || ''

const SOCIALS = [
  {
    name: 'Secure Telegram Channel',
    handle: '@bahod1rovi_ch77',
    link: 'https://t.me/bahod1rovi_ch77',
    color: '#059669',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    name: 'Official LinkedIn Registry',
    handle: 'Mirkarim Furqatov',
    link: 'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/',
    color: '#D97706',
    icon: <Linkedin size={18} />,
  },
  {
    name: 'National GitHub Repositories',
    handle: 'bahodrivich77',
    link: 'https://github.com/bahodrivich77',
    color: '#059669',
    icon: <Github size={18} />,
  },
]

function TerminalLine({ text, delay = 0, color = 'rgba(255,255,255,0.5)' }) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    let timer
    let i = 0
    const start = () => {
      timer = setTimeout(function tick() {
        i++
        setDisplay(text.slice(0, i))
        if (i < text.length) timer = setTimeout(tick, 25)
      }, delay)
    }
    start()
    return () => clearTimeout(timer)
  }, [text, delay])

  return (
    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color, lineHeight: 1.8 }}>
      {display}
    </div>
  )
}

function TerminalPanel() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) setTimeout(() => setVisible(true), 250)
  }, [inView])

  const lines = [
    { text: '$ whoami --authority', color: '#34d399', delay: 0 },
    { text: 'mirkarim — Chief System Architect & Government IT Advisor', color: 'rgba(255,255,255,0.7)', delay: 350 },
    { text: '$ system-status --check-ports', color: '#34d399', delay: 1000 },
    { text: '● SECURE PORT 443: ACTIVE [TLS 1.3 ENFORCED]', color: '#22c55e', delay: 1350 },
    { text: '● GOST CRYTOGRAPHIC SEAL: VERIFIED', color: '#22c55e', delay: 1700 },
    { text: '$ location --hq', color: '#34d399', delay: 2200 },
    { text: 'Tashkent, Uzbekistan (HQ Secure Server Node)', color: '#fbbf24', delay: 2500 },
    { text: '$ secure-channel --establish-handshake', color: '#D97706', delay: 3100 },
  ]

  return (
    <div
      ref={ref}
      style={{
        borderRadius: '0.75rem',
        background: '#0a0c14',
        border: '1px solid #334155',
        overflow: 'hidden',
        boxShadow: '0 0 40px rgba(4,120,87,0.05)',
      }}
    >
      {/* Terminal chrome */}
      <div style={{
        padding: '0.6rem 1rem',
        background: 'rgba(255,255,255,0.02)',
        borderBottom: '1px solid #334155',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
      }}>
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {['#ef4444', '#f59e0b', '#10b981'].map((c) => (
            <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.8 }} />
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.7rem', fontWeight: 700 }}>
          <Terminal size={10} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>mirkarim@gov-secure-terminal ~ </span>
        </div>
      </div>

      {/* Terminal body */}
      <div style={{ padding: '1.25rem', minHeight: 180 }}>
        {visible && lines.map((line, i) => (
          <TerminalLine key={i} text={line.text} delay={line.delay} color={line.color} />
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 4 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: '#fbbf24' }}>$</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ width: 8, height: 14, background: '#34d399', display: 'inline-block', borderRadius: 1 }}
          />
        </div>
      </div>
    </div>
  )
}

export default function Contact() {
  const { tx } = useLanguage()
  const c = tx.contact
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [status, setStatus] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const text = c.telegramMsg
      .replace('{name}', form.name)
      .replace('{email}', form.email)
      .replace('{message}', form.message)
    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
      })
      setStatus(res.ok ? 'ok' : 'err')
      if (res.ok) setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('err')
    }
    setTimeout(() => setStatus(null), 5000)
  }

  const inputStyle = (field) => ({
    width: '100%',
    padding: '0.9rem 1rem',
    borderRadius: '0.375rem',
    border: focused === field ? '1px solid #10b981' : '1px solid #334155',
    background: focused === field ? 'rgba(4,120,87,0.04)' : 'rgba(15, 23, 42, 0.75)',
    color: '#fff',
    fontSize: '0.88rem',
    outline: 'none',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    boxShadow: focused === field ? '0 0 0 1px rgba(4,120,87,0.2), 0 0 20px rgba(4,120,87,0.05)' : 'none',
  })

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ padding: 'clamp(5rem, 10vw, 8rem) 0', position: 'relative', overflow: 'hidden' }}
    >
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-10%', left: '-10%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(4,120,87,0.05) 0%, transparent 70%)',
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
            {c.eyebrow}
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem',
          }}>
            <span className="text-gradient">{c.title}</span>
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '34rem', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
            {c.subtitle}
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))', gap: 'clamp(2rem, 4vw, 3rem)' }}>
          {/* LEFT — Encrypted Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              borderRadius: '1rem',
              border: '2px solid #334155',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            }}>
              {/* Encrypted Handshake readout */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.5rem 0.85rem', borderRadius: '0.25rem',
                background: 'rgba(4,120,87,0.08)', border: '1px solid #10b981',
                marginBottom: '1.5rem', fontSize: '0.7rem', color: '#34d399',
                fontFamily: 'JetBrains Mono, monospace', fontWeight: 700,
              }}>
                <ShieldCheck size={14} className="text-[#fbbf24] animate-pulse" />
                SECURE END-TO-END AES-256 TUNNEL ACTIVE
              </div>

              <h3 style={{ fontWeight: 800, color: '#fff', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '-0.01em' }}>
                {c.formTitle}
              </h3>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.45rem', fontFamily: 'JetBrains Mono, monospace' }}>
                    {c.name}
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Mirkarim Furqatov"
                    required
                    style={inputStyle('name')}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.45rem', fontFamily: 'JetBrains Mono, monospace' }}>
                    {c.email}
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="hello@example.com"
                    required
                    style={inputStyle('email')}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.45rem', fontFamily: 'JetBrains Mono, monospace' }}>
                    {c.message}
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="I'd like to initiate an official project audit regarding..."
                    required
                    style={{ ...inputStyle('message'), resize: 'none' }}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary"
                  style={{
                    width: '100%', padding: '1rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.85rem', fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    opacity: status === 'sending' ? 0.7 : 1,
                    cursor: status === 'sending' ? 'wait' : 'pointer',
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                      />
                      {c.sending}
                    </>
                  ) : (
                    <><Send size={15} /> {c.send}</>
                  )}
                </motion.button>

                {status === 'ok' && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#22c55e', fontSize: '0.85rem', fontWeight: 600, justifyContent: 'center' }}
                  >
                    <CheckCircle2 size={15} /> {c.success}
                  </motion.div>
                )}
                {status === 'err' && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.85rem', fontWeight: 600, justifyContent: 'center' }}
                  >
                    <AlertCircle size={15} /> {c.error}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* RIGHT — Terminal + Social links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {/* Terminal Panel */}
            <TerminalPanel />

            {/* Verification Status Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {[
                { icon: <MapPin size={13} />, label: c.info.location, color: '#34d399' },
                { icon: <Clock size={13} />, label: c.info.timezone, color: '#fbbf24' },
                { icon: <Key size={13} />, label: c.info.open, color: '#22c55e' },
              ].map(({ icon, label, color }) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.45rem 0.9rem', borderRadius: '0.25rem',
                  border: `1px solid ${color}30`, background: `${color}06`,
                  fontSize: '0.78rem', color: '#94a3b8',
                  fontFamily: 'JetBrains Mono, monospace', fontWeight: 600,
                }}>
                  <span style={{ color }}>{icon}</span>
                  {label}
                </div>
              ))}
            </div>

            {/* Social directories */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {SOCIALS.map((s, i) => (
                <motion.a
                  key={s.name}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                  whileHover={{ x: 4 }}
                  className="glass-hover"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.85rem 1rem', borderRadius: '0.5rem',
                    border: '1px solid #334155',
                    background: 'rgba(15, 23, 42, 0.7)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${s.color}50`
                    e.currentTarget.style.background = `${s.color}05`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#334155'
                    e.currentTarget.style.background = 'rgba(15, 23, 42, 0.7)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '0.375rem',
                      background: `${s.color}15`, border: `1px solid ${s.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: s.color,
                    }}>
                      {s.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.85rem', letterSpacing: '-0.01em' }}>{s.name}</div>
                      <div style={{ color: '#64748b', fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{s.handle}</div>
                    </div>
                  </div>
                  <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>GOV ↗</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

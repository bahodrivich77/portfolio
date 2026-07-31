import { useEffect, useState, useRef, lazy, Suspense } from 'react'
import { LazyMotion } from 'framer-motion'
import Header from './components/Header'
import Hero from './sections/Hero'
import CustomCursor from './components/CustomCursor'
import GovBackground from './components/GovBackground'
import { useSectionKeyNav } from './hooks/useSectionKeyNav'

const loadMotionFeatures = () => import('./lib/motionFeatures').then((mod) => mod.default)

const About = lazy(() => import('./sections/About'))
const Skills = lazy(() => import('./sections/Skills'))
const Projects = lazy(() => import('./sections/Projects'))
const Experience = lazy(() => import('./sections/Experience'))
const Blog = lazy(() => import('./sections/Blog'))
const Contact = lazy(() => import('./sections/Contact'))
const Footer = lazy(() => import('./components/Footer'))

const SECTIONS = ['hero', 'about', 'skills', 'projects', 'experience', 'blog', 'contact']

function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: '100%', height: 1, overflow: 'hidden',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.06) 30%, rgba(168,85,247,0.06) 70%, transparent 100%)',
      }}
    />
  )
}

function SectionFallback() {
  return (
    <div
      style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      aria-hidden="true"
    >
      <div className="w-6 h-6 border-2 border-t-transparent rounded-full"
        style={{ borderColor: 'rgba(0,212,255,0.3)', borderTopColor: '#00d4ff', animation: 'spin 1s linear infinite' }} />
    </div>
  )
}

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const lenisRef = useRef(null)

  useSectionKeyNav(SECTIONS, lenisRef)

  // Lenis smooth scroll
  useEffect(() => {
    let lenis
    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('@studio-freight/lenis')
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
        })
        lenisRef.current = lenis

        const raf = (time) => {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
      } catch {
        // Lenis not available, use native scroll
      }
    }
    initLenis()
    return () => {
      lenis?.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = []
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.25, rootMargin: '-80px 0px -80px 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <div className="relative overflow-x-hidden min-h-screen" style={{ background: '#050816', color: '#fff' }}>
        {/* Custom cursor — desktop only */}
        <CustomCursor />

        {/* Neural Network Background */}
        <GovBackground />

        <Header activeSection={activeSection} scrolled={scrolled} />

        <main id="main-content" className="relative z-10">
          <Hero />
          <Suspense fallback={<SectionFallback />}>
            <SectionDivider />
            <About />
            <SectionDivider />
            <Skills />
            <SectionDivider />
            <Projects />
            <SectionDivider />
            <Experience />
            <SectionDivider />
            <Blog />
            <SectionDivider />
            <Contact />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </LazyMotion>
  )
}

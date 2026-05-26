import { useEffect, useState, lazy, Suspense } from 'react'
import Header   from './components/Header'
import Footer   from './components/Footer'
import GovBackground from './components/GovBackground'
import Hero     from './sections/Hero'

// ✅ Lazy load — below-the-fold sections (TTI yaxshilanadi)
const About      = lazy(() => import('./sections/About'))
const Skills     = lazy(() => import('./sections/Skills'))
const Projects   = lazy(() => import('./sections/Projects'))
const Experience = lazy(() => import('./sections/Experience'))
const Blog       = lazy(() => import('./sections/Blog'))
const Contact    = lazy(() => import('./sections/Contact'))

const SECTIONS = ['hero', 'about', 'skills', 'projects', 'experience', 'blog', 'contact']

// ✅ Minimal fallback — CLS oldini olish uchun height berilgan
function SectionFallback() {
  return <div style={{ minHeight: 400 }} aria-hidden="true" />
}

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
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
        { threshold: 0.3, rootMargin: '-60px 0px -60px 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="relative bg-[var(--bg-page)] text-[var(--text-primary)] overflow-x-hidden min-h-screen">
      <GovBackground />

      <div className="hidden dark:block fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="orb orb-blue absolute -top-32 -right-32 opacity-80" />
        <div className="orb orb-light absolute bottom-0 -left-40 opacity-60" />
      </div>

      <Header activeSection={activeSection} scrolled={scrolled} />

      <main id="main-content" className="relative z-10">
        {/* ✅ Hero — NOT lazy (LCP element) */}
        <Hero />

        {/* ✅ Rest — lazy loaded */}
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Blog />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}

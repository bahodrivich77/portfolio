import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import GovBackground from './components/GovBackground'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Blog from './sections/Blog'
import Contact from './sections/Contact'

const SECTIONS = ['hero', 'about', 'skills', 'projects', 'experience', 'blog', 'contact']

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
        { threshold: 0.35, rootMargin: '-60px 0px -60px 0px' }
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

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Blog />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

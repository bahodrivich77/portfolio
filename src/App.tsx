import { useEffect } from "react";
import TelegramPoll from "./components/TelegramPoll";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SEO from "./components/SEO";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Blog from "./sections/Blog";
import Contact from "./sections/Contact";
export default function App() {
  useEffect(() => {
    // Vite mounts after the browser's initial fragment lookup.
    const frame = requestAnimationFrame(() => {
      try {
        const id = decodeURIComponent(window.location.hash.slice(1));
        if (id)
          document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
      } catch {
        /* Ignore malformed external fragments. */
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <>
      <SEO />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Projects />
        <TelegramPoll />
        <About />
        <Skills />
        <Experience />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

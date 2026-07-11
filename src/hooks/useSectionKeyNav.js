import { useEffect } from 'react'

/**
 * Section-by-section keyboard navigation.
 *
 * Why not CSS `scroll-snap-type`? This project drives scrolling with Lenis
 * (see App.jsx) and animates sections in/out with framer-motion's
 * `useInView`. CSS scroll-snap fights both: it forces its own scroll
 * physics on top of Lenis's virtual scroll, and the hard snap can cut off
 * in-progress enter/exit animations. A plain keydown handler avoids all of
 * that — it only reacts to PageDown/PageUp/ArrowDown/ArrowUp/Space and asks
 * Lenis (or, if Lenis isn't ready yet, the native API) to smooth-scroll to
 * the next/previous <section>. Mouse wheel and touch scrolling are left
 * completely alone.
 *
 * @param {string[]} sectionIds - ordered list of section element ids
 * @param {React.RefObject} lenisRef - ref holding the active Lenis instance (or null)
 */
export function useSectionKeyNav(sectionIds, lenisRef) {
  useEffect(() => {
    const isTypingTarget = (el) => {
      if (!el) return false
      const tag = el.tagName
      return (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        el.isContentEditable
      )
    }

    const getSections = () =>
      sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean)

    const getCurrentIndex = (sections) => {
      // The section whose top is closest to (but not far past) the viewport top.
      let closestIndex = 0
      let closestDistance = Infinity
      sections.forEach((el, i) => {
        const distance = Math.abs(el.getBoundingClientRect().top)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = i
        }
      })
      return closestIndex
    }

    const scrollToSection = (el) => {
      const lenis = lenisRef?.current
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(el, { offset: 0, duration: 1 })
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    const onKeyDown = (e) => {
      if (isTypingTarget(document.activeElement)) return
      if (e.ctrlKey || e.metaKey || e.altKey) return

      const isNext = e.key === 'PageDown' || e.key === 'ArrowDown' || (e.key === ' ' && !e.shiftKey)
      const isPrev = e.key === 'PageUp' || e.key === 'ArrowUp' || (e.key === ' ' && e.shiftKey)
      if (!isNext && !isPrev) return

      const sections = getSections()
      if (sections.length === 0) return

      e.preventDefault()

      const currentIndex = getCurrentIndex(sections)
      const targetIndex = isNext
        ? Math.min(currentIndex + 1, sections.length - 1)
        : Math.max(currentIndex - 1, 0)

      scrollToSection(sections[targetIndex])
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [sectionIds, lenisRef])
}

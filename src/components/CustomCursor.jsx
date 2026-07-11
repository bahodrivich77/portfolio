import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return

    const dot = dotRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    dot.style.opacity = '1'
    ringEl.style.opacity = '1'

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      ringEl.style.left = ring.current.x + 'px'
      ringEl.style.top = ring.current.y + 'px'
      rafRef.current = requestAnimationFrame(animate)
    }

    const onEnterLink = () => {
      dot.style.width = '12px'
      dot.style.height = '12px'
      ringEl.style.width = '60px'
      ringEl.style.height = '60px'
      ringEl.style.borderColor = 'rgba(168, 85, 247, 0.6)'
    }

    const onLeaveLink = () => {
      dot.style.width = '8px'
      dot.style.height = '8px'
      ringEl.style.width = '40px'
      ringEl.style.height = '40px'
      ringEl.style.borderColor = 'rgba(0, 212, 255, 0.4)'
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    const interactives = document.querySelectorAll('a, button, [data-cursor="pointer"]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    // MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll('a, button, [data-cursor="pointer"]')
      newInteractives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink)
        el.removeEventListener('mouseleave', onLeaveLink)
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 0, transition: 'width 0.2s, height 0.2s, opacity 0.3s' }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: 0, transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, opacity 0.3s' }}
        aria-hidden="true"
      />
    </>
  )
}

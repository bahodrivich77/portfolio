import { useEffect, useRef } from 'react'

export default function GovBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []
    let mouse = { x: null, y: null, radius: 150 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x
        this.y = y
        this.directionX = directionX
        this.directionY = directionY
        this.size = size
        this.color = color
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY

        // Mouse interaction
        let dx = mouse.x - this.x
        let dy = mouse.y - this.y
        let distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < mouse.radius) {
          if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 10
          if (mouse.x > this.x && this.x > this.size * 10) this.x -= 10
          if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 10
          if (mouse.y > this.y && this.y > this.size * 10) this.y -= 10
        }

        this.x += this.directionX
        this.y += this.directionY
        this.draw()
      }
    }

    const init = () => {
      particles = []
      let numberOfParticles = (canvas.width * canvas.height) / 9000
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1
        let x = Math.random() * (window.innerWidth - size * 2) + size * 2
        let y = Math.random() * (window.innerHeight - size * 2) + size * 2
        let directionX = (Math.random() * 2) - 1
        let directionY = (Math.random() * 2) - 1
        let color = 'rgba(0, 212, 255, 0.3)'
        particles.push(new Particle(x, y, directionX, directionY, size, color))
      }
    }

    const connect = () => {
      let opacityValue = 1
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
            + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y))
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - (distance / 20000)
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacityValue * 0.2})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
      }
      connect()
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x
      mouse.y = e.y
    })
    window.addEventListener('mouseout', () => {
      mouse.x = undefined
      mouse.y = undefined
    })

    resize()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: '#050816'
      }}
    />
  )
}

import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, subtitle, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`section-heading-official text-center mb-20 ${className}`}
    >
      <span className="official-eyebrow">{eyebrow}</span>
      <h2 className="official-title">{title}</h2>
      <div className="section-divider official-divider" />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="official-subtitle"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}

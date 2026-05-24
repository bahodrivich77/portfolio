import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../ThemeContext'
import { useLanguage } from '../i18n/LanguageContext'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  const { tx } = useLanguage()

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={tx.theme.toggle}
      title={isDark ? tx.theme.light : tx.theme.dark}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--card-bg)] text-[var(--linkedin-blue)] shadow-sm hover:border-[var(--linkedin-blue)]/40 transition-colors"
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -30, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.div>
    </motion.button>
  )
}

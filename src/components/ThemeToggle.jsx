import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../ThemeContext'
import { useLanguage } from '../i18n/LanguageContext'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  const { tx } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={tx.theme.toggle}
      title={isDark ? tx.theme.light : tx.theme.dark}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--card-bg)] text-[var(--linkedin-blue)] shadow-sm hover:border-[var(--linkedin-blue)]/40 transition-transform duration-200 hover:-translate-y-0.5"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

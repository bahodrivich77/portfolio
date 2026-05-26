import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { ThemeProvider } from './ThemeContext.jsx'

// ✅ Skip to content link — accessibility (Lighthouse best practice)
const skipLink = document.createElement('a')
skipLink.href = '#hero'
skipLink.className = 'skip-to-content'
skipLink.textContent = 'Asosiy mazmunга o\'tish'
document.body.insertBefore(skipLink, document.body.firstChild)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)

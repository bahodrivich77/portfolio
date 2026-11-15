import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useLanguage, type Language } from "../i18n/LanguageContext";
import { useTheme } from "../ThemeContext";
import { editorial } from "../i18n/editorial";
const sections = [
  "projects",
  "about",
  "skills",
  "experience",
  "blog",
  "contact",
] as const;
export default function Header() {
  const { lang, setLang, tx } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const c = editorial[lang];
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (open) {
      menu.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
    menu.current?.close();
  }, [open]);
  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  const languageSelect = (
    <label className="language-select">
      <span className="sr-only">{c.language}</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as Language)}
      >
        {[
          ["uz", "UZ"],
          ["en", "EN"],
          ["ru", "RU"],
        ].map(([value, name]) => (
          <option value={value} key={value}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
  return (
    <>
      <a href="#main-content" className="skip-link">
        {c.skip}
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a
            href="#hero"
            className="brand"
            aria-label="Mirkarim Furqatov — home"
          >
            <span className="brand-symbol" aria-hidden="true">
              m<span>.</span>
            </span>
            <span>
              mirkarim<span className="brand-suffix"> / dev</span>
            </span>
          </a>
          <nav aria-label={c.menu} className="desktop-nav">
            {sections.slice(0, 4).map((id) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
              >
                {tx.nav[id]}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            {languageSelect}
            <button
              className="icon-button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? c.light : c.dark}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href="#contact" className="header-contact">
              {tx.nav.cta}
              <ArrowUpRight size={16} />
            </a>
            <button
              ref={trigger}
              className="icon-button menu-trigger"
              aria-label={c.menu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <Menu size={21} />
            </button>
          </div>
        </div>
      </header>
      <dialog
        id="mobile-menu"
        ref={menu}
        className="mobile-menu"
        aria-label={c.menu}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === menu.current) close();
        }}
        onClose={() => setOpen(false)}
      >
        <div className="mobile-menu-top">
          <span className="mono">MIRKARIM / NAVIGATION</span>
          <button
            autoFocus
            className="icon-button"
            onClick={close}
            aria-label={c.close}
          >
            <X />
          </button>
        </div>
        <nav>
          {sections.map((id, i) => (
            <a href={`#${id}`} onClick={close} key={id}>
              <span className="mono">0{i + 1}</span>
              {tx.nav[id]}
              <ArrowUpRight size={22} />
            </a>
          ))}
        </nav>
      </dialog>
    </>
  );
}

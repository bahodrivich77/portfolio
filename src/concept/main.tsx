import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Atom,
  ArrowDown,
  ArrowUpRight,
  Braces,
  Github,
  Linkedin,
  Menu,
  Moon,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import {
  LanguageProvider,
  useLanguage,
  type Language,
} from "../i18n/LanguageContext";
import { profile } from "../lib/content";
import { conceptMedia } from "./media";
import "./style.css";
const copy = {
  uz: {
    home: "Bosh sahifa",
    about: "Men haqimda",
    work: "Loyihalar",
    contact: "Bog‘lanish",
    status: "Yangi loyihalar uchun ochiq",
    greeting: "Salom, men",
    name: "Mirkarim.",
    role: "Frontend",
    roleEnd: "dasturchiman.",
    intro:
      "G‘oyalarni chiroyli, tezkor va foydalanish uchun qulay veb-interfeyslarga aylantiraman.",
    cta: "Loyihalarimni ko‘ring",
    aboutTitle: "QISQACHA MEN HAQIMDA",
    aboutText:
      "Toshkentlik frontend dasturchi. React, TypeScript va puxta o‘ylangan foydalanuvchi tajribasiga e’tibor beraman.",
    aboutLink: "Yaqinroq tanishamiz",
    focusTitle: "HOZIRGI YO‘NALISHIM",
    focusText:
      "Real loyihalar. Toza komponentlar. Har bir ekranda qulay ishlaydigan interfeyslar.",
    social: "MEN BILAN BOG‘LANING",
    portrait: "Portretingiz uchun joy",
    portraitNote: "Rasmni keyin o‘zingiz joylaysiz",
    stack: "ISHLAYDIGAN TEXNOLOGIYALARIM",
    location: "Toshkent, O‘zbekiston",
    scroll: "Loyihalar sari",
    theme: "Rang rejimini almashtirish",
    lang: "Til",
    menu: "Menyu",
    close: "Yopish",
  },
  en: {
    home: "Home",
    about: "About me",
    work: "My work",
    contact: "Let’s talk",
    status: "Available for new projects",
    greeting: "Hello, I’m",
    name: "Mirkarim.",
    role: "Frontend",
    roleEnd: "developer.",
    intro:
      "I turn ideas into beautiful, fast, and easy-to-use web experiences.",
    cta: "Explore my work",
    aboutTitle: "A LITTLE ABOUT ME",
    aboutText:
      "A frontend developer based in Tashkent. Focused on React, TypeScript, and thoughtful user experiences.",
    aboutLink: "Get to know me",
    focusTitle: "WHAT I’M FOCUSED ON",
    focusText:
      "Real projects. Clean components. Interfaces that feel right on every screen.",
    social: "LET’S CONNECT",
    portrait: "Your portrait goes here",
    portraitNote: "You’ll add your own photo later",
    stack: "MY EVERYDAY TOOLKIT",
    location: "Tashkent, Uzbekistan",
    scroll: "Explore the work",
    theme: "Toggle color theme",
    lang: "Language",
    menu: "Menu",
    close: "Close",
  },
  ru: {
    home: "Главная",
    about: "Обо мне",
    work: "Проекты",
    contact: "Связаться",
    status: "Открыт к новым проектам",
    greeting: "Привет, я",
    name: "Миркарим.",
    role: "Frontend-",
    roleEnd: "разработчик.",
    intro: "Превращаю идеи в красивые, быстрые и удобные веб-интерфейсы.",
    cta: "Посмотреть проекты",
    aboutTitle: "НЕМНОГО ОБО МНЕ",
    aboutText:
      "Frontend-разработчик из Ташкента. Мой фокус — React, TypeScript и продуманный пользовательский опыт.",
    aboutLink: "Познакомимся ближе",
    focusTitle: "МОЙ ФОКУС СЕЙЧАС",
    focusText:
      "Реальные проекты. Чистые компоненты. Удобный интерфейс на каждом экране.",
    social: "БУДЕМ НА СВЯЗИ",
    portrait: "Место для вашего портрета",
    portraitNote: "Вы добавите свою фотографию позже",
    stack: "МОИ ОСНОВНЫЕ ИНСТРУМЕНТЫ",
    location: "Ташкент, Узбекистан",
    scroll: "К проектам",
    theme: "Сменить тему",
    lang: "Язык",
    menu: "Меню",
    close: "Закрыть",
  },
};
function Concept() {
  const { lang, setLang } = useLanguage();
  const c = copy[lang];
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!menu) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        menuTrigger.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menu]);
  const [imageFailed, setImageFailed] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.conceptTheme = dark ? "dark" : "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#1d2025" : "#f9f9f6");
  }, [dark]);
  const links = [
    { label: c.home, href: "#top" },
    { label: c.about, href: "/#about" },
    { label: c.work, href: "/#projects" },
  ];
  return (
    <div className="concept-page" id="top">
      <a className="concept-skip" href="#intro">
        {c.home}
      </a>
      <header className="concept-header concept-container">
        <a className="concept-brand" href="#top" aria-label="Mirkarim — home">
          <Braces aria-hidden="true" />
          <span>
            Mirkarim<span className="brand-dot">.</span>
          </span>
        </a>
        <nav className="concept-nav" aria-label={c.menu}>
          {links.map((l) => (
            <a href={l.href} key={l.label}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="concept-controls">
          <label>
            <span className="visually-hidden">{c.lang}</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
            >
              <option value="uz">UZ</option>
              <option value="en">EN</option>
              <option value="ru">RU</option>
            </select>
          </label>
          <button
            className="concept-icon"
            aria-label={c.theme}
            onClick={() => setDark((v) => !v)}
          >
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <a
            className="concept-contact"
            href={profile.telegram}
            target="_blank"
            rel="noreferrer"
          >
            {c.contact}
            <ArrowUpRight size={17} />
          </a>
          <button
            ref={menuTrigger}
            className="concept-menu-toggle concept-icon"
            aria-expanded={menu}
            aria-controls="concept-mobile-menu"
            aria-label={menu ? c.close : c.menu}
            onClick={() => setMenu((v) => !v)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {menu && (
        <nav
          id="concept-mobile-menu"
          className="concept-mobile-nav"
          aria-label={c.menu}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenu(false)}>
              {l.label}
              <ArrowUpRight size={18} />
            </a>
          ))}
        </nav>
      )}
      <main id="intro" className="concept-container">
        <div className="concept-topline">
          <p>
            <span className="concept-status-dot" />
            {c.status}
          </p>
          <span>{c.location} · UTC+5</span>
        </div>
        <section className="concept-hero" aria-labelledby="concept-title">
          <div className="concept-intro">
            <div className="concept-title-rule" />
            <p className="concept-greeting">{c.greeting}</p>
            <h1 id="concept-title">
              {c.name}
              <br />
              <span>{c.role}</span>
              <br />
              {c.roleEnd}
            </h1>
            <p className="concept-description">{c.intro}</p>
            <div className="concept-cta-row">
              <a className="concept-primary" href="/#projects">
                {c.cta}
                <ArrowUpRight size={19} />
              </a>
              <a
                className="concept-github"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github size={23} />
              </a>
            </div>
            <a className="concept-down" href="/#projects" aria-label={c.scroll}>
              <ArrowDown size={21} />
              <span>{c.scroll}</span>
            </a>
          </div>
          <div className="concept-portrait">
            <div className="portrait-orbit" aria-hidden="true" />
            <div
              className="portrait-cross portrait-cross-top"
              aria-hidden="true"
            >
              +
            </div>
            <div className="portrait-photo">
              {conceptMedia.portrait && !imageFailed ? (
                <img
                  src={conceptMedia.portrait}
                  alt="Mirkarim Furqatov"
                  width="800"
                  height="1000"
                  fetchPriority="high"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div className="portrait-placeholder">
                  <span className="placeholder-number">01 / PORTRAIT</span>
                  <div className="placeholder-person" aria-hidden="true">
                    <UserRound size={110} strokeWidth={0.65} />
                  </div>
                  <div className="placeholder-caption">
                    <strong>{c.portrait}</strong>
                    <span>{c.portraitNote}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="portrait-name-tag">
              <span className="concept-status-dot" />
              <span>Mirkarim Furqatov</span>
              <span className="portrait-tag-icon" aria-hidden="true">
                &lt;/&gt;
              </span>
            </div>
            <span
              className="portrait-cross portrait-cross-bottom"
              aria-hidden="true"
            >
              +
            </span>
          </div>
          <aside className="concept-aside">
            <div className="concept-aside-block">
              <h2>{c.aboutTitle}</h2>
              <p>{c.aboutText}</p>
              <a href="/#about">
                {c.aboutLink}
                <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="concept-aside-block">
              <h2>{c.focusTitle}</h2>
              <p>{c.focusText}</p>
              <div className="concept-small-stack">
                <span>React</span>
                <span>TypeScript</span>
                <span>UI/UX</span>
              </div>
            </div>
            <div className="concept-follow">
              <h2>{c.social}</h2>
              <div>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={profile.telegram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Telegram"
                >
                  <ArrowUpRight size={22} />
                </a>
              </div>
            </div>
          </aside>
        </section>
        <div className="concept-tech-strip">
          <p>{c.stack}</p>
          <div>
            <span>
              <Atom className="tech-react" size={23} /> React
            </span>
            <span>
              <b className="tech-ts">TS</b> TypeScript
            </span>
            <span>
              <b className="tech-js">JS</b> JavaScript
            </span>
            <span>
              <b className="tech-tailwind">≈</b> Tailwind CSS
            </span>
            <span>
              <Github size={19} /> Git & GitHub
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <Concept />
    </LanguageProvider>
  </StrictMode>,
);

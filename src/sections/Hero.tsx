import { ArrowDown, ArrowUpRight, Github } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { editorial } from "../i18n/editorial";
import { profile } from "../lib/content";
export default function Hero() {
  const { lang, tx } = useLanguage();
  const c = editorial[lang];
  return (
    <section id="hero" className="hero container" aria-labelledby="hero-title">
      <div className="hero-topline">
        <p className="eyebrow">{c.greeting}</p>
        <span className="availability">
          <i />
          {tx.hero.badge}
        </span>
      </div>
      <div className="hero-composition">
        <div className="hero-copy">
          <p className="hero-name">
            Mirkarim Furqatov <ArrowUpRight size={17} />
          </p>
          <h1 id="hero-title">
            {c.headline[0]}
            <br />
            <span>{c.headline[1]}</span>
          </h1>
          <p className="hero-intro">{c.intro}</p>
          <div className="hero-ctas">
            <a className="button button-primary" href="#projects">
              {tx.hero.ctaProjects}
              <ArrowUpRight size={19} />
            </a>
            <a
              className="text-link"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={18} />
              GitHub
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-grid" />
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-axis" />
          <div className="sculpture">
            <div className="sculpture-face face-left" />
            <div className="sculpture-face face-middle" />
            <div className="sculpture-face face-right" />
          </div>
          <span className="art-coordinate coordinate-top">MF — 41.2995° N</span>
          <span className="art-coordinate coordinate-bottom">
            DESIGN ∩ ENGINEERING
          </span>
          <div className="art-label">
            <span className="status-dot" /> {c.discipline}
            <span className="mono">&lt;/&gt;</span>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#projects" className="scroll-cue">
          <ArrowDown size={16} />
          {tx.hero.scroll}
        </a>
        <p>{c.heroNote}</p>
        <span className="mono">{c.index}</span>
      </div>
    </section>
  );
}

import { ArrowUpRight, Check } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { editorial } from "../i18n/editorial";
import { profile } from "../lib/content";
import { SectionHeading } from "../components/SectionHeading";
export default function About() {
  const { lang, tx } = useLanguage();
  const c = editorial[lang];
  return (
    <section
      id="about"
      className="section about-section"
      aria-label={tx.about.title}
    >
      <div className="container">
        <SectionHeading
          number="02"
          label={tx.about.title}
          title={c.aboutTitle}
        />
        <div className="about-grid">
          <div className="portrait-panel">
            <img
              src="/Cmcoder.webp"
              width="640"
              height="640"
              loading="lazy"
              decoding="async"
              alt="Mirkarim Furqatov"
            />
            <div className="portrait-caption">
              <span>Mirkarim Furqatov</span>
              <span className="mono">{c.discipline}</span>
            </div>
            <span className="portrait-mark" aria-hidden="true">
              MF.
            </span>
          </div>
          <div className="about-copy">
            <h3>{c.aboutLead}</h3>
            <p>{tx.about.bio1.replace("{highlight}", tx.about.highlight)}</p>
            <p>{tx.about.bio2}</p>
            <ul className="principles">
              {c.principles.map((p) => (
                <li key={p}>
                  <Check size={16} />
                  {p}
                </li>
              ))}
            </ul>
            <div className="about-signoff">
              <p>{c.aboutNote}</p>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                {c.viewProfile}
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

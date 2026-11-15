import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { editorial } from "../i18n/editorial";
import { profile } from "../lib/content";
import { SectionHeading } from "../components/SectionHeading";
export default function Experience() {
  const { lang, tx } = useLanguage();
  const c = editorial[lang];
  return (
    <section
      id="experience"
      className="section experience-section"
      aria-label={tx.nav.experience}
    >
      <div className="container experience-grid">
        <div>
          <SectionHeading
            number="04"
            label={tx.nav.experience}
            title={c.experienceTitle}
          />
          <p className="experience-intro">{c.experienceIntro}</p>
          <a
            className="text-link"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
            <ArrowUpRight size={16} />
          </a>
        </div>
        <ol className="timeline">
          {tx.experience.cards.map((item, i) => (
            <li key={item.title}>
              <div className="timeline-meta">
                <span className="mono">{item.period}</span>
                <span className="timeline-number">0{i + 1}</span>
              </div>
              <h3>{item.title}</h3>
              <span className="timeline-org">{item.org}</span>
              <p>{item.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

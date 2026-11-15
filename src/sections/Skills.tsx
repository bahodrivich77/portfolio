import { Braces, Layers, Workflow } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { editorial } from "../i18n/editorial";
import { skillGroups } from "../lib/content";
import { SectionHeading } from "../components/SectionHeading";
export default function Skills() {
  const { lang, tx } = useLanguage();
  const c = editorial[lang];
  const icons = [Braces, Layers, Workflow];
  return (
    <section
      id="skills"
      className="section container"
      aria-label={tx.skills.title}
    >
      <SectionHeading number="03" label={tx.nav.skills} title={c.skillsTitle}>
        {c.skillsIntro}
      </SectionHeading>
      <div className="skills-grid">
        {skillGroups.map((skills, i) => {
          const Icon = icons[i];
          return (
            <article className="skill-group" key={i}>
              <div className="skill-icon">
                <Icon size={23} />
                <span className="mono">0{i + 1}</span>
              </div>
              <h3>{c.groups[i]}</h3>
              <p>{c.groupNotes[i]}</p>
              <ul>
                {skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

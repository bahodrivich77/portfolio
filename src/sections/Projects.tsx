import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { editorial } from "../i18n/editorial";
import { projects, profile } from "../lib/content";
import { ProjectVisual } from "../components/ProjectVisual";
import { SectionHeading } from "../components/SectionHeading";
export default function Projects() {
  const { lang, tx } = useLanguage();
  const c = editorial[lang];
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const items = projects.map((p, i) => ({
    ...p,
    ...tx.projects.items[i],
    index: i,
  }));
  useEffect(() => {
    if (selected !== null) {
      dialog.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
    dialog.current?.close();
  }, [selected]);
  function close() {
    setSelected(null);
    opener.current?.focus();
  }
  const current = selected === null ? null : items[selected];
  return (
    <section id="projects" className="section container" aria-label={c.work}>
      <SectionHeading number="01" label={c.work} title={c.workTitle}>
        {c.workDesc}
      </SectionHeading>
      <div className="work-toolbar">
        <div className="filters" role="group" aria-label={tx.nav.projects}>
          {(["all", "commerce", "personal"] as const).map((key) => (
            <button
              key={key}
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
            >
              {c[key]}
              <span>
                {key === "all" ? "03" : key === "commerce" ? "02" : "01"}
              </span>
            </button>
          ))}
        </div>
        <a
          className="text-link all-projects"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          {tx.projects.allProjects}
          <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="project-grid">
        {items
          .filter((p) => filter === "all" || p.category === filter)
          .map((p) => (
            <article
              className={`project-card ${p.index === 0 && filter === "all" ? "project-featured" : ""}`}
              key={p.id}
            >
              <button
                className="project-visual-button"
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setSelected(p.index);
                }}
                aria-label={`${c.details}: ${p.title}`}
              >
                <ProjectVisual kind={p.id} />
                <span className="project-open">
                  <ArrowUpRight size={22} />
                </span>
              </button>
              <div className="project-info">
                <div className="project-category mono">
                  <span>0{p.index + 1}</span>
                  {c.projectLabels[p.index]}
                </div>
                <h3>
                  <button
                    onClick={(e) => {
                      opener.current = e.currentTarget;
                      setSelected(p.index);
                    }}
                  >
                    {p.title}
                    <ArrowUpRight size={24} />
                  </button>
                </h3>
                <p>{p.description}</p>
                <div className="project-tags">
                  {p.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a
                    href={`${profile.github}/${p.repo}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github size={15} />
                    {c.code}
                    <span className="sr-only"> — {p.title}</span>
                  </a>
                  {p.live ? (
                    <a href={p.live} target="_blank" rel="noreferrer">
                      {c.live}
                      <ArrowUpRight size={15} />
                    </a>
                  ) : (
                    <span className="project-demo-note">{c.noLive}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
      </div>
      <dialog
        className="project-dialog"
        ref={dialog}
        aria-labelledby="project-dialog-title"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
        onClose={() => setSelected(null)}
      >
        {current && (
          <>
            <div className="dialog-top">
              <span className="mono">
                0{current.index + 1} / 03 — {c.projectLabels[current.index]}
              </span>
              <button
                autoFocus
                onClick={close}
                className="icon-button"
                aria-label={c.close}
              >
                <X />
              </button>
            </div>
            <h2 id="project-dialog-title">{current.title}</h2>
            <p>{current.longDesc}</p>
            <div className="case-study">
              <div>
                <span className="eyebrow">{tx.projects.challengeLabel}</span>
                <p>{current.challenge}</p>
              </div>
              <div>
                <span className="eyebrow">{tx.projects.solutionLabel}</span>
                <p>{current.solution}</p>
              </div>
            </div>
            <div className="dialog-actions">
              <a
                className="button button-primary"
                href={`${profile.github}/${current.repo}`}
                target="_blank"
                rel="noreferrer"
              >
                {c.code}
                <ArrowUpRight size={17} />
              </a>
              {current.live && (
                <a
                  className="text-link"
                  href={current.live}
                  target="_blank"
                  rel="noreferrer"
                >
                  {c.live}
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
            <div className="dialog-pagination">
              <button
                className="icon-button"
                aria-label={c.previous}
                onClick={() => setSelected((current.index + 2) % 3)}
              >
                <ArrowLeft />
              </button>
              <span className="mono">0{current.index + 1} / 03</span>
              <button
                className="icon-button"
                aria-label={c.next}
                onClick={() => setSelected((current.index + 1) % 3)}
              >
                <ArrowRight />
              </button>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}

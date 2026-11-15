import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { editorial } from "../i18n/editorial";
import { profile } from "../lib/content";
import { SectionHeading } from "../components/SectionHeading";
const articleUrl =
  "https://www.linkedin.com/feed/update/urn:li:activity:7438307192144977920/";
export default function Blog() {
  const { lang, tx } = useLanguage();
  const c = editorial[lang];
  return (
    <section id="blog" className="section container" aria-label={tx.nav.blog}>
      <SectionHeading number="05" label={tx.nav.blog} title={c.writingTitle}>
        {c.writingIntro}
      </SectionHeading>
      <div className="writing-grid">
        <a
          className="featured-writing"
          href={articleUrl}
          target="_blank"
          rel="noreferrer"
        >
          <div className="writing-top">
            <span className="mono">JOURNAL / 01</span>
            <ArrowUpRight size={24} />
          </div>
          <span className="writing-category">{tx.blog.categories[0]}</span>
          <h3>{tx.blog.posts[0].title}</h3>
          <p>{tx.blog.posts[0].description}</p>
          <span className="writing-read">
            {tx.blog.read} · LinkedIn <ArrowUpRight size={17} />
          </span>
        </a>
        <div className="writing-topics">
          <h3>{c.topics}</h3>
          {tx.blog.posts.slice(1).map((p, i) => (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              key={p.title}
            >
              <div>
                <span className="mono">{tx.blog.categories[i + 1]}</span>
                <h4>{p.title}</h4>
                <p>{p.description}</p>
              </div>
              <ArrowUpRight size={19} />
              <span className="sr-only"> — {c.viewProfile}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

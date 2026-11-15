import {
  ArrowUpRight,
  ShoppingBag,
  SlidersHorizontal,
  Code2,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { editorial } from "../i18n/editorial";
/** Editorial interface studies, explicitly labelled; these are not product screenshots. */
export function ProjectVisual({ kind }: { kind: string }) {
  const { lang } = useLanguage();
  const c = editorial[lang];
  return (
    <div className={`project-visual visual-${kind}`} aria-hidden="true">
      <span className="visual-caption">
        {c.preview} / 0{kind === "toys" ? 1 : kind === "food" ? 2 : 3}
      </span>
      <div className="study-window">
        <div className="study-bar">
          <span />
          <span />
          <span />
          <small>
            {kind === "toys"
              ? "playroom / objects for little minds"
              : kind === "food"
                ? "food town / made fresh"
                : "mirkarim / digital craft"}
          </small>
        </div>
        {kind === "toys" ? (
          <div className="toy-study">
            <div className="study-nav">
              <b>
                playroom<span>®</span>
              </b>
              <ShoppingBag size={14} />
            </div>
            <div className="study-title">
              Small things.
              <br />
              <em>Big imaginations.</em>
            </div>
            <div className="toy-objects">
              <div className="toy-object toy-stack">
                <i />
                <i />
                <i />
              </div>
              <div className="toy-object toy-ball" />
              <div className="toy-object toy-block">
                <span>p</span>
              </div>
            </div>
            <div className="study-footer">
              <span>Thoughtfully chosen. Endlessly loved.</span>
              <ArrowUpRight size={20} />
            </div>
          </div>
        ) : kind === "food" ? (
          <div className="food-study">
            <div className="study-nav">
              <b>
                food<span>town.</span>
              </b>
              <SlidersHorizontal size={14} />
            </div>
            <div className="food-study-body">
              <div>
                <span className="tiny-label">GOOD FOOD. GOOD MOOD.</span>
                <div className="study-title">
                  Freshly made.
                  <br />
                  <em>Happily shared.</em>
                </div>
                <span className="study-pill">Explore the menu ↗</span>
              </div>
              <div className="food-plate">
                <span>✳</span>
              </div>
            </div>
            <div className="study-footer">
              <span>Fresh / Seasonal / Local</span>
              <span>01 — 03</span>
            </div>
          </div>
        ) : (
          <div className="portfolio-study">
            <div className="study-nav">
              <b>
                m<span>.</span>
              </b>
              <Code2 size={17} />
            </div>
            <span className="tiny-label">FRONTEND DEVELOPER</span>
            <div className="study-title">
              Digital craft.
              <br />
              <em>Human focus.</em>
            </div>
            <div className="mini-sculpture">m.</div>
            <div className="study-footer">
              <span>Design meets engineering.</span>
              <ArrowUpRight size={20} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

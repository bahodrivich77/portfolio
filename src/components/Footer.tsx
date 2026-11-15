import { ArrowUp } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { editorial } from "../i18n/editorial";
export default function Footer() {
  const { lang } = useLanguage();
  const c = editorial[lang];
  return (
    <footer className="site-footer container">
      <div className="footer-signature" aria-hidden="true">
        mirkarim<span>.</span>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Mirkarim Furqatov</span>
        <span>{c.footer}</span>
        <a href="#hero">
          {c.top}
          <ArrowUp size={15} />
        </a>
      </div>
    </footer>
  );
}

import { useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { profile } from "../lib/content";
const metadata = {
  en: {
    title: "Mirkarim Furqatov — Frontend Developer",
    description:
      "Frontend developer based in Tashkent, Uzbekistan. Explore React projects, interface design, engineering decisions, and ways to work together.",
  },
  uz: {
    title: "Mirkarim Furqatov — Frontend dasturchi",
    description:
      "Toshkentlik frontend dasturchi. React loyihalari, interfeys dizayni, engineering yondashuvi va hamkorlik imkoniyatlari.",
  },
  ru: {
    title: "Миркарим Фуркатов — Frontend-разработчик",
    description:
      "Frontend-разработчик из Ташкента. React-проекты, дизайн интерфейсов, инженерные решения и возможности сотрудничества.",
  },
};
export default function SEO() {
  const { lang } = useLanguage();
  useEffect(() => {
    const current = metadata[lang];
    document.title = current.title;
    const values: Record<string, string> = {
      'meta[name="description"]': current.description,
      'meta[property="og:title"]': current.title,
      'meta[property="og:description"]': current.description,
      'meta[name="twitter:title"]': current.title,
      'meta[name="twitter:description"]': current.description,
      'meta[property="og:locale"]':
        lang === "uz" ? "uz_UZ" : lang === "ru" ? "ru_RU" : "en_US",
    };
    Object.entries(values).forEach(([selector, value]) =>
      document.querySelector(selector)?.setAttribute("content", value),
    );
    const script = document.getElementById("json-ld");
    if (script)
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: profile.name,
        url: profile.url,
        jobTitle: "Frontend Developer",
        image: `${profile.url}/Cmcoder.webp`,
        sameAs: [profile.github, profile.linkedin, profile.telegram],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tashkent",
          addressCountry: "UZ",
        },
      });
  }, [lang]);
  return null;
}

import { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

/**
 * SEO Component for Vite/React Portfolio
 * Handles dynamic metadata, Open Graph, and Structured Data (JSON-LD)
 */
export default function SEO() {
  const { lang } = useLanguage();

  const metadata = {
    en: {
      title: "Mirkarim Furqatov | Frontend Developer & React Expert",
      description: "Professional portfolio of Mirkarim Furqatov. Senior-level Frontend Developer specializing in React, Next.js, and high-performance web applications in Tashkent, Uzbekistan.",
    },
    uz: {
      title: "Mirkarim Furqatov | Frontend Dasturchi & React Mutaxassisi",
      description: "Mirkarim Furqatovning professional portfoliosi. Toshkentdagi React, Next.js va yuqori samarali veb-ilovalar bo'yicha ixtisoslashgan Frontend dasturchi.",
    },
    ru: {
      title: "Миркарим Фуркатов | Frontend Разработчик & Эксперт по React",
      description: "Профессиональное портфолио Миркарима Фуркатова. Frontend разработчик из Ташкента, специализирующийся на React, Next.js и высокопроизводительных веб-приложениях.",
    }
  };

  const current = metadata[lang] || metadata.en;
  const siteUrl = "https://mirkarim.uz";
  const canonical = `${siteUrl}/${lang}`;

  useEffect(() => {
    // 1. Update Basic Meta
    document.title = current.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", current.description);
    
    // 2. Update Canonical & Hreflang
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);

    // 3. Update Open Graph
    const ogTags = {
      'og:title': current.title,
      'og:description': current.description,
      'og:url': canonical,
      'og:locale': lang === 'uz' ? 'uz_UZ' : lang === 'ru' ? 'ru_RU' : 'en_US',
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      document.querySelector(`meta[property="${property}"]`)?.setAttribute("content", content);
    });

    // 4. Update JSON-LD
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Mirkarim Furqatov",
      "url": siteUrl,
      "image": `${siteUrl}/Cmcoder.webp`,
      "sameAs": [
        "https://github.com/bahodrivich77",
        "https://linkedin.com/in/mirkarim-furqatov", // Assuming this is your LinkedIn
        "https://t.me/mirkarim_dev"
      ],
      "jobTitle": "Frontend Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance"
      },
      "description": metadata.en.description,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tashkent",
        "addressCountry": "Uzbekistan"
      }
    };

    let script = document.getElementById('json-ld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(jsonLd);

  }, [lang, current]);

  return null;
}

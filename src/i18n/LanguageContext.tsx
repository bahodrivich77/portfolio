import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { translations, LANGUAGES } from "./translations";
import { readPreference, savePreference } from "../lib/storage";
export type Language = keyof typeof translations;
const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  tx: typeof translations.en;
  languages: typeof LANGUAGES;
} | null>(null);
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = readPreference("portfolio-lang");
    return saved === "en" || saved === "ru" ? saved : "uz";
  });
  useEffect(() => {
    document.documentElement.lang = lang;
    savePreference("portfolio-lang", lang);
  }, [lang]);
  return (
    <LanguageContext.Provider
      value={{ lang, setLang, tx: translations[lang], languages: LANGUAGES }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("LanguageProvider is required");
  return value;
}

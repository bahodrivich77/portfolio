import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Github,
  Linkedin,
  Instagram,
  Send,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { editorial } from "../i18n/editorial";
import { profile } from "../lib/content";
export default function Contact() {
  const { lang, tx } = useLanguage();
  const c = editorial[lang];
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );
  const socials = [
    { icon: Github, label: "GitHub", href: profile.github },
    { icon: Linkedin, label: "LinkedIn", href: profile.linkedin },
    { icon: Instagram, label: "Instagram", href: profile.instagram },
    { icon: Send, label: "Telegram", href: profile.telegram },
  ];
  const controller = useRef<AbortController | null>(null);
  useEffect(() => () => controller.current?.abort(), []);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    controller.current = new AbortController();
    setStatus("sending");
    const timer = setTimeout(() => controller.current?.abort(), 15000);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
        signal: controller.current.signal,
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error("Send failed");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(timer);
    }
  }
  return (
    <section
      id="contact"
      className="section contact-section"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <div className="eyebrow">
          <span>06</span>
          {tx.nav.contact}
        </div>
        <div className="contact-grid">
          <div className="contact-copy">
            <span className="availability">
              <i />
              {tx.hero.badge}
            </span>
            <h2 id="contact-title">
              {c.contactTitle}
              <br />
              <span>{c.contactLead}</span>
            </h2>
            <p>{c.contactDesc}</p>
            <a
              className="contact-telegram"
              href={profile.telegram}
              target="_blank"
              rel="noreferrer"
            >
              {c.telegram}
              <ArrowUpRight size={23} />
            </a>
            <div className="social-links">
              {socials.map(({ icon: SocialIcon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                >
                  <SocialIcon size={18} />
                </a>
              ))}
            </div>
            <p className="contact-location mono">{c.location} · UTC+5</p>
          </div>
          <form
            onSubmit={submit}
            className="contact-form"
            aria-label={tx.contact.formTitle}
          >
            <div className="form-row">
              <label htmlFor="name">{c.name}</label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                placeholder="Alex"
              />
            </div>
            <div className="form-row">
              <label htmlFor="email">{c.email}</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="hello@example.com"
              />
            </div>
            <div className="form-row">
              <label htmlFor="message">{c.message}</label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={3500}
                rows={4}
              />
            </div>
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              className="button button-primary"
              disabled={status === "sending"}
            >
              {status === "sending" ? c.sending : c.send}
              <ArrowRight size={18} />
            </button>
            <p
              role="status"
              aria-live="polite"
              className={`form-status status-${status}`}
            >
              {status === "ok" ? (
                c.success
              ) : status === "error" ? (
                c.error
              ) : (
                <>
                  {c.formNote}{" "}
                  <a href={profile.telegram} target="_blank" rel="noreferrer">
                    Telegram ↗
                  </a>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, Copy, Plus, RotateCcw, X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { initialCandidates, changeVote } from "../lib/poll";
const copy = {
  en: {
    title: "Interaction lab / Telegram poll",
    note: "Browser-only demo. Sample votes and reactions are illustrative; this does not cast a real Telegram vote.",
    question: "Who is the most active district or city leader?",
    add: "Add candidate",
    reset: "Reset demo",
    copy: "Copy poll text",
    copied: "Poll copied.",
    copyError: "Clipboard unavailable. Please try in a secure browser.",
    name: "Candidate name",
    region: "District / city",
    cancel: "Cancel",
    submit: "Add",
    close: "Close",
    views: "Demo views",
    selected: "Selected",
    updated: "Demo updated.",
    reactions: "Reactions",
  },
  uz: {
    title: "Interaktiv laboratoriya / Telegram so‘rovnomasi",
    note: "Faqat brauzerdagi demo. Ovozlar va reaksiyalar — namuna. Haqiqiy Telegram ovozi yuborilmaydi.",
    question: "Eng faol tuman/shahar sardori kim?",
    add: "Nomzod qo‘shish",
    reset: "Demoni tiklash",
    copy: "Post matnini nusxalash",
    copied: "So‘rovnoma nusxalandi.",
    copyError: "Nusxalash imkonsiz. Xavfsiz brauzerda urinib ko‘ring.",
    name: "Nomzod ismi",
    region: "Tuman / shahar",
    cancel: "Bekor qilish",
    submit: "Qo‘shish",
    close: "Yopish",
    views: "Demo ko‘rishlar",
    selected: "Tanlangan",
    updated: "Demo yangilandi.",
    reactions: "Reaksiyalar",
  },
  ru: {
    title: "Лаборатория / Опрос Telegram",
    note: "Демо в браузере. Голоса и реакции приведены для примера. Настоящий голос в Telegram не отправляется.",
    question: "Кто самый активный лидер района или города?",
    add: "Добавить кандидата",
    reset: "Сбросить демо",
    copy: "Скопировать опрос",
    copied: "Опрос скопирован.",
    copyError: "Буфер обмена недоступен. Попробуйте в безопасном браузере.",
    name: "Имя кандидата",
    region: "Район / город",
    cancel: "Отмена",
    submit: "Добавить",
    close: "Закрыть",
    views: "Демо-просмотры",
    selected: "Выбрано",
    updated: "Демо обновлено.",
    reactions: "Реакции",
  },
};
const initialReactions = [
  { emoji: "⭐", count: 1 },
  { emoji: "❤️", count: 8 },
  { emoji: "🔥", count: 5 },
  { emoji: "💖", count: 3 },
  { emoji: "🎉", count: 1 },
  { emoji: "🤩", count: 1 },
];
export default function TelegramPoll() {
  const { lang } = useLanguage();
  const c = copy[lang];
  const [candidates, setCandidates] = useState(initialCandidates);
  const [selected, setSelected] = useState<number | null>(null);
  const [reactions, setReactions] = useState(
    initialReactions.map((r) => ({ ...r, active: false })),
  );
  const [views, setViews] = useState(720);
  const [status, setStatus] = useState("");
  const [adding, setAdding] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (adding) {
      dialog.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
    dialog.current?.close();
  }, [adding]);
  function close() {
    setAdding(false);
    opener.current?.focus();
  }
  function vote(id: number) {
    setCandidates((previous) => changeVote(previous, selected, id));
    if (selected === null) setViews((v) => v + 1);
    setSelected(selected === id ? null : id);
    setStatus(c.updated);
  }
  function reset() {
    setCandidates(initialCandidates);
    setSelected(null);
    setReactions(initialReactions.map((r) => ({ ...r, active: false })));
    setViews(720);
    setStatus(c.updated);
  }
  async function copyText() {
    try {
      await navigator.clipboard.writeText(
        `${c.question}\n\n${candidates.map((candidate, i) => `${i + 1}. ${candidate.name} (${candidate.region}) — ${candidate.votes}`).join("\n")}\n\n${c.note}`,
      );
      setStatus(c.copied);
    } catch {
      setStatus(c.copyError);
    }
  }
  function add(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("candidate-name") || "").trim();
    if (name.length < 2) return;
    setCandidates((previous) => [
      ...previous,
      {
        id: Math.max(...previous.map((candidate) => candidate.id)) + 1,
        name,
        region: String(data.get("candidate-region") || "").trim(),
        votes: 0,
      },
    ]);
    close();
    setStatus(c.updated);
  }
  return (
    <section
      id="telegram-poll"
      className="container poll-section"
      aria-label={c.title}
    >
      <details className="poll-lab">
        <summary>
          <span className="mono">&lt;/&gt; {c.title}</span>
          <Plus size={20} />
        </summary>
        <div className="poll-body">
          <div className="poll-intro">
            <h3>{c.question}</h3>
            <p>{c.note}</p>
            <div className="poll-tools">
              <button ref={opener} onClick={() => setAdding(true)}>
                <Plus size={15} />
                {c.add}
              </button>
              <button onClick={reset}>
                <RotateCcw size={15} />
                {c.reset}
              </button>
              <button onClick={copyText}>
                <Copy size={15} />
                {c.copy}
              </button>
            </div>
            <p className="mono">
              {c.views}: {views}
            </p>
            <p role="status" aria-live="polite">
              {status}
            </p>
          </div>
          <div className="poll-options">
            <div className="poll-candidates">
              {candidates.map((candidate) => (
                <button
                  key={candidate.id}
                  onClick={() => vote(candidate.id)}
                  aria-pressed={selected === candidate.id}
                >
                  <span>
                    <strong>{candidate.name}</strong>
                    <small>{candidate.region}</small>
                  </span>
                  <span>
                    {selected === candidate.id && <Check size={16} />}
                    <b>{candidate.votes}</b>
                  </span>
                </button>
              ))}
            </div>
            <div
              className="poll-reactions"
              role="group"
              aria-label={c.reactions}
            >
              {reactions.map((reaction) => (
                <button
                  key={reaction.emoji}
                  aria-label={`${reaction.emoji} ${reaction.count}`}
                  aria-pressed={reaction.active}
                  onClick={() =>
                    setReactions((previous) =>
                      previous.map((r) =>
                        r.emoji === reaction.emoji
                          ? {
                              ...r,
                              active: !r.active,
                              count: r.count + (r.active ? -1 : 1),
                            }
                          : r,
                      ),
                    )
                  }
                >
                  {reaction.emoji} {reaction.count}
                </button>
              ))}
            </div>
          </div>
        </div>
      </details>
      <dialog
        ref={dialog}
        className="project-dialog poll-dialog"
        aria-labelledby="poll-add-title"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClose={() => setAdding(false)}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="dialog-top">
          <h2 id="poll-add-title">{c.add}</h2>
          <button className="icon-button" aria-label={c.close} onClick={close}>
            <X />
          </button>
        </div>
        <form onSubmit={add}>
          <div className="form-row">
            <label htmlFor="candidate-name">{c.name}</label>
            <input
              autoFocus
              id="candidate-name"
              name="candidate-name"
              required
              minLength={2}
              maxLength={100}
            />
          </div>
          <div className="form-row">
            <label htmlFor="candidate-region">{c.region}</label>
            <input
              id="candidate-region"
              name="candidate-region"
              maxLength={100}
            />
          </div>
          <div className="dialog-actions">
            <button className="button button-primary" type="submit">
              {c.submit}
            </button>
            <button className="text-link" type="button" onClick={close}>
              {c.cancel}
            </button>
          </div>
        </form>
      </dialog>
    </section>
  );
}

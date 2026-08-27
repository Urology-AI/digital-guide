import { useEffect, useRef, useState } from "react";
import type { GuideContent } from "./content";
import { offlineAnswer } from "./chatKb";
import { askCompass, type Citation } from "../../services/compassChat";
import { useLang } from "../../i18n/LanguageContext";

interface ChatMsg {
  role: "user" | "bot";
  text: string;
  offline?: boolean;
  citations?: Citation[];
}

export function GuideChat({ c, activeChapterLabel }: { c: GuideContent; activeChapterLabel?: string }) {
  const { lang } = useLang();
  const cc = c.chat;
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const logRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [msgs, busy]);

  async function ask(q: string) {
    const question = q.trim();
    if (!question || busy) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", text: question }]);
    setBusy(true);
    const { text, source, citations } = await askCompass(question, {
      lang,
      context: activeChapterLabel ? `The reader is on the "${activeChapterLabel}" chapter.` : undefined,
      offlineAnswer,
    });
    setMsgs((m) => [
      ...m,
      { role: "bot", text, offline: source === "offline", citations },
    ]);
    setBusy(false);
  }

  return (
    <>
      <button
        type="button"
        className="guide-chat-launch"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true">💬</span> {open ? cc.close : cc.launch}
      </button>

      {open && (
        <div className="guide-chat-panel" role="dialog" aria-label={cc.title}>
          <div className="guide-chat-head">
            <div>
              <strong>{cc.title}</strong>
              <span>{cc.subtitle}</span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label={cc.close}>
              ✕
            </button>
          </div>

          <div className="guide-chat-log" ref={logRef}>
            <div className="guide-msg bot">{cc.intro}</div>
            <div className="guide-msg note">{cc.disclaimer}</div>
            {msgs.map((m, i) => (
              <div key={i}>
                <div className={`guide-msg ${m.role}`}>{m.text}</div>
                {m.citations && m.citations.length > 0 && (
                  <div className="guide-msg-cites">
                    {m.citations.map((csource) => (
                      <span key={csource.n}>
                        [{csource.n}]{" "}
                        {csource.url ? (
                          <a href={csource.url} target="_blank" rel="noopener noreferrer">
                            {csource.title}
                          </a>
                        ) : (
                          csource.title
                        )}
                      </span>
                    ))}
                  </div>
                )}
                {m.offline && <div className="guide-msg note">{cc.offlineNote}</div>}
              </div>
            ))}
            {busy && <div className="guide-msg bot guide-msg-typing">…</div>}
          </div>

          {msgs.length === 0 && (
            <div className="guide-chat-suggest">
              {cc.suggestions.map((s) => (
                <button key={s} type="button" onClick={() => ask(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <p className="guide-chat-more">{cc.moreHelp}</p>

          <form
            className="guide-chat-form"
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={cc.placeholder}
              aria-label={cc.placeholder}
              autoComplete="off"
            />
            <button type="submit" disabled={busy}>
              {cc.send}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

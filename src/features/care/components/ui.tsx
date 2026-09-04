import { useState, type ReactNode } from "react";
import type { ContentItem, Reference } from "../../../types/care";

export function Section({
  eyebrow,
  title,
  lead,
  children,
  tone = "plain",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  tone?: "plain" | "tint";
}) {
  return (
    <section className={tone === "tint" ? "bg-slate-50" : ""}>
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <header className="max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-sinai-magenta">
              {eyebrow}
            </p>
          )}
          <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">{title}</h2>
          {lead && <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">{lead}</p>}
        </header>
        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  );
}

export function Card({
  title,
  description,
  onClick,
  href,
  meta,
  children,
}: {
  title: string;
  description?: string;
  onClick?: () => void;
  href?: string;
  meta?: string;
  children?: ReactNode;
}) {
  const inner = (
    <>
      {meta && (
        <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-slate-400">
          {meta}
        </span>
      )}
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      {description && <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>}
      {children}
    </>
  );

  const cls =
    "group block h-full rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-sinai-400 hover:shadow-lg hover:shadow-slate-200/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sinai-400";

  if (href) {
    return (
      <a className={cls} href={href}>
        {inner}
      </a>
    );
  }
  if (onClick) {
    return (
      <button type="button" className={cls} onClick={onClick}>
        {inner}
      </button>
    );
  }
  return <div className={cls.replace("group ", "")}>{inner}</div>;
}

export function Grid({ children, cols = 3 }: { children: ReactNode; cols?: 2 | 3 | 4 }) {
  const map = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  } as const;
  return <div className={`grid gap-4 ${map[cols]}`}>{children}</div>;
}

/** A term with a plain-language explanation available on hover/focus. */
export function Term({ word, meaning }: { word: string; meaning: string }) {
  return (
    <span className="group relative inline-block">
      <button
        type="button"
        className="cursor-help border-b border-dotted border-sinai-500 font-medium text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sinai-400"
        aria-describedby={`term-${word}`}
      >
        {word}
      </button>
      <span
        id={`term-${word}`}
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-64 -translate-x-1/2 rounded-xl bg-slate-900 p-3 text-xs leading-relaxed text-white opacity-0 shadow-xl transition group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {meaning}
      </span>
    </span>
  );
}

export function Disclaimer({ text }: { text: string }) {
  return (
    <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500">
      {text}
    </p>
  );
}

export function DemoBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-800 ring-1 ring-amber-200">
      <span aria-hidden="true">●</span>
      {label}
    </span>
  );
}

export function References({ title, items }: { title: string; items: Reference[] }) {
  if (!items.length) return null;
  return (
    <details className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
      <summary className="cursor-pointer text-sm font-semibold text-slate-900">
        {title} ({items.length})
      </summary>
      <ol className="mt-4 space-y-3">
        {items.map((r) => (
          <li key={r.id} className="text-xs leading-relaxed text-slate-600">
            {r.url ? (
              <a className="text-sinai-600 underline underline-offset-2" href={r.url} target="_blank" rel="noreferrer">
                {r.cite}
              </a>
            ) : (
              r.cite
            )}
          </li>
        ))}
      </ol>
    </details>
  );
}

/** Renders one structured content item: sections, questions, and sources. */
export function ContentBlock({ item, askTitle, refsTitle }: { item: ContentItem; askTitle: string; refsTitle: string }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
      <p className="mt-2 text-sm text-slate-500">{item.description}</p>

      <div className="mt-6 space-y-6">
        {item.sections.map((s, i) => (
          <div key={i}>
            {s.heading && <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-900">{s.heading}</h4>}
            {s.body && <p className="text-[15px] leading-relaxed text-slate-700">{s.body}</p>}
            {s.items && (
              <ul className="mt-2 space-y-2">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-2.5 text-[15px] leading-relaxed text-slate-700">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sinai-400" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            )}
            {s.note && (
              <p className="mt-3 rounded-xl border-l-2 border-sinai-400 bg-sinai-50/60 px-4 py-3 text-sm leading-relaxed text-slate-700">
                {s.note}
              </p>
            )}
          </div>
        ))}
      </div>

      {item.questions.length > 0 && (
        <div className="mt-7 rounded-xl bg-slate-50 p-5">
          <h4 className="text-sm font-bold text-slate-900">{askTitle}</h4>
          <ul className="mt-3 space-y-2">
            {item.questions.map((q) => (
              <li key={q} className="flex gap-2.5 text-sm leading-relaxed text-slate-700">
                <span aria-hidden="true" className="text-sinai-magenta">?</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <References title={refsTitle} items={item.references} />
    </article>
  );
}

export function CopyButton({ text, label, done }: { text: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sinai-400 hover:text-sinai-600"
      onClick={() => {
        navigator.clipboard?.writeText(text).then(
          () => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          },
          () => setCopied(false)
        );
      }}
    >
      {copied ? done : label}
    </button>
  );
}

import { useState } from "react";
import type { ContentItem, Reference } from "../../../types/care";
import { Card, SourcePanel, Surface } from "../design/primitives";

/**
 * Content-specific components. Layout primitives live in design/primitives and
 * are re-exported here so existing imports keep working and there is only one
 * implementation of each.
 */
export { Card, Grid, Section, DemoBadge, Button, Alert, Surface, SourcePanel } from "../design/primitives";

/** A term with a plain-language explanation available on hover or focus. */
export function Term({ word, meaning }: { word: string; meaning: string }) {
  return (
    <span className="group relative inline-block">
      <button
        type="button"
        className="cursor-help border-b border-dotted border-[var(--c-blue-deep)] font-medium text-[var(--c-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--c-blue-deep)]"
        aria-describedby={`term-${word}`}
      >
        {word}
      </button>
      <span
        id={`term-${word}`}
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-64 -translate-x-1/2 rounded-[var(--r-md)] bg-[var(--c-ink)] p-3 text-fine leading-relaxed text-white opacity-0 shadow-[var(--e-3)] transition group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
      >
        {meaning}
      </span>
    </span>
  );
}

export function Disclaimer({ text }: { text: string }) {
  return (
    <p className="rounded-[var(--r-md)] border border-[var(--c-line)] bg-[var(--c-surface-sunken)] px-4 py-3 text-fine leading-relaxed text-[var(--c-muted)]">
      {text}
    </p>
  );
}

export function References({ title, items }: { title: string; items: Reference[] }) {
  return <SourcePanel title={title} items={items} />;
}

/** Renders one structured content item: sections, questions, and sources. */
export function ContentBlock({
  item,
  askTitle,
  refsTitle,
}: {
  item: ContentItem;
  askTitle: string;
  refsTitle: string;
}) {
  return (
    <Surface as="article" className="p-6 sm:p-8">
      <h3 className="text-h3 font-bold text-[var(--c-ink)]">{item.title}</h3>
      <p className="mt-2 text-small text-[var(--c-muted)]">{item.description}</p>

      <div className="mt-6 space-y-6">
        {item.sections.map((s, i) => (
          <div key={i}>
            {s.heading && (
              <h4 className="mb-2 text-fine font-bold uppercase tracking-wide text-[var(--c-ink)]">{s.heading}</h4>
            )}
            {s.body && <p className="max-w-[var(--measure)] text-body text-[var(--c-ink)]">{s.body}</p>}
            {s.items && (
              <ul className="mt-2 space-y-2">
                {s.items.map((it) => (
                  <li key={it} className="flex max-w-[var(--measure)] gap-2.5 text-body text-[var(--c-ink)]">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--c-blue)]" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            )}
            {s.note && (
              <p className="mt-3 max-w-[var(--measure)] rounded-[var(--r-md)] border-l-[3px] border-[var(--c-blue)] bg-[var(--c-surface-accent)] px-4 py-3 text-small leading-relaxed text-[var(--c-ink)]">
                {s.note}
              </p>
            )}
          </div>
        ))}
      </div>

      {item.questions.length > 0 && (
        <div className="mt-7 rounded-[var(--r-md)] bg-[var(--c-surface-sunken)] p-5">
          <h4 className="text-fine font-bold uppercase tracking-wide text-[var(--c-ink)]">{askTitle}</h4>
          <ul className="mt-3 space-y-2">
            {item.questions.map((q) => (
              <li key={q} className="flex gap-2.5 text-small leading-relaxed text-[var(--c-ink)]">
                <span aria-hidden="true" className="font-bold text-[var(--c-magenta)]">?</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <SourcePanel title={refsTitle} items={item.references} />
    </Surface>
  );
}

export function CopyButton({ text, label, done }: { text: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="rounded-[var(--r-md)] border border-[var(--c-line-strong)] px-4 py-2 text-small font-semibold text-[var(--c-ink-soft)] transition hover:border-[var(--c-blue-deep)] hover:text-[var(--c-accent-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--c-blue-deep)]"
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

/** Marks Card usable where a plain wrapper is expected. */
export { Card as TopicCard };

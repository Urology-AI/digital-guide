import type { ReactNode } from "react";
import type { Block, Callout as CalloutData, CmpRow } from "./content";

export function Chapter({
  id,
  alt,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  alt?: boolean;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section className={`guide-chapter${alt ? " alt" : ""}`} id={id} aria-labelledby={`${id}-h`}>
      <div className="guide-chapter-head">
        <span className="eyebrow">{eyebrow}</span>
        <h2 id={`${id}-h`}>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
      {children}
    </section>
  );
}

export function Callout({ data, tone }: { data: CalloutData; tone?: "info" | "warn" }) {
  return (
    <div className={`guide-callout${tone === "warn" ? " warn" : ""}`}>
      <strong>{data.label}</strong>
      <p>{data.body}</p>
    </div>
  );
}

/** Horizontally-scrollable wrapper for wide tables on small screens. */
export function ScrollX({ children }: { children: ReactNode }) {
  return <div className="guide-wrap-x">{children}</div>;
}

function BlockBody({ b }: { b: Block }) {
  return (
    <>
      {b.body && <p>{b.body}</p>}
      {b.items && (
        <ul>
          {b.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      )}
    </>
  );
}

/**
 * Renders titled blocks. When `collapsible`, each block is an accordion so the
 * reader meets one idea at a time; `openFirst` leaves the first one expanded.
 */
export function Blocks({
  blocks,
  collapsible,
  openFirst = true,
}: {
  blocks: Block[];
  collapsible?: boolean;
  openFirst?: boolean;
}) {
  if (!collapsible) {
    return (
      <>
        {blocks.map((b) => (
          <div key={b.title} className="guide-block">
            <h3>{b.title}</h3>
            <BlockBody b={b} />
          </div>
        ))}
      </>
    );
  }
  return (
    <div className="guide-accordion-set">
      {blocks.map((b, i) => (
        <details key={b.title} className="guide-accordion" open={openFirst && i === 0}>
          <summary>{b.title}</summary>
          <div className="body">
            <BlockBody b={b} />
          </div>
        </details>
      ))}
    </div>
  );
}

/** A single collapsible detail block with a one-line teaser. */
export function Expandable({
  title,
  children,
  open,
}: {
  title: string;
  children: ReactNode;
  open?: boolean;
}) {
  return (
    <details className="guide-accordion" open={open}>
      <summary>{title}</summary>
      <div className="body">{children}</div>
    </details>
  );
}

/** Two-column definition-style comparison table (label + one value column). */
export function DefTable({ head, rows }: { head: [string, string]; rows: CmpRow[] }) {
  return (
    <ScrollX>
      <table className="guide-cmp">
        <thead>
          <tr>
            <th>{head[0]}</th>
            <th>{head[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <td>
                <strong>{r.label}</strong>
              </td>
              <td>{r.a}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollX>
  );
}

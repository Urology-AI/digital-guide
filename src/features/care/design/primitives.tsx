import type { ReactNode } from "react";

/**
 * Shared primitives. Every card, button, source panel and alert in the product
 * comes from here, so a change to the visual language is one edit rather than
 * forty inline class strings.
 */

type ButtonTone = "primary" | "secondary" | "quiet";

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-[transform,background-color,border-color,box-shadow] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--c-blue-deep)] disabled:opacity-60 motion-reduce:transition-none";

const BUTTON_TONE: Record<ButtonTone, string> = {
  primary:
    "bg-[var(--c-blue-deep)] text-white shadow-[var(--e-2)] hover:bg-[#02638f] hover:-translate-y-px motion-reduce:hover:translate-y-0",
  secondary:
    "border border-[var(--c-line-strong)] bg-white text-[var(--c-ink)] hover:border-[var(--c-blue-deep)] hover:text-[var(--c-accent-ink)]",
  quiet: "text-[var(--c-accent-ink)] hover:underline underline-offset-4 px-0 py-1",
};

export function Button({
  children,
  tone = "primary",
  href,
  onClick,
  type = "button",
  external,
  className = "",
  ...rest
}: {
  children: ReactNode;
  tone?: ButtonTone;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  external?: boolean;
  className?: string;
} & Record<string, unknown>) {
  const cls = `${BUTTON_BASE} ${BUTTON_TONE[tone]} ${className}`;
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  );
}

export function Surface({
  children,
  as: Tag = "div",
  tone = "raised",
  className = "",
}: {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  tone?: "raised" | "sunken" | "accent";
  className?: string;
}) {
  const tones = {
    raised: "bg-[var(--c-surface)] border-[var(--c-line)]",
    sunken: "bg-[var(--c-surface-sunken)] border-[var(--c-line)]",
    accent: "bg-[var(--c-surface-accent)] border-[#bfe4f7]",
  } as const;
  return (
    <Tag className={`rounded-[var(--r-lg)] border ${tones[tone]} ${className}`}>{children}</Tag>
  );
}

/** A card that may be static, a link, or a button, without changing its look. */
export function Card({
  title,
  description,
  eyebrow,
  href,
  onClick,
  children,
  className = "",
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  href?: string;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}) {
  const inner = (
    <>
      {eyebrow && (
        <span className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--c-magenta)]">
          {eyebrow}
        </span>
      )}
      <h3 className="text-[1.02rem] font-bold leading-snug text-[var(--c-ink)]">{title}</h3>
      {description && (
        <p className="mt-2 text-small leading-relaxed text-[var(--c-ink-soft)]">{description}</p>
      )}
      {children}
    </>
  );

  const base = `block h-full rounded-[var(--r-lg)] border border-[var(--c-line)] bg-[var(--c-surface)] p-5 text-left shadow-[var(--e-1)] ${className}`;
  const interactive =
    "transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[var(--c-blue)] hover:shadow-[var(--e-2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--c-blue-deep)] motion-reduce:hover:translate-y-0 motion-reduce:transition-none";

  if (href) return <a href={href} className={`${base} ${interactive}`}>{inner}</a>;
  if (onClick)
    return (
      <button type="button" onClick={onClick} className={`${base} ${interactive} w-full`}>
        {inner}
      </button>
    );
  return <div className={base}>{inner}</div>;
}

/** Page section with a consistent header and rhythm. */
export function Section({
  eyebrow,
  title,
  lead,
  children,
  tone = "plain",
  as = "section",
  /** Page-level sections are the document's h1; sections within a page are h2. */
  level = "h2",
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  children?: ReactNode;
  tone?: "plain" | "sunken";
  as?: "section" | "div";
  level?: "h1" | "h2";
}) {
  const Tag = as;
  const Heading = level;
  return (
    <Tag className={tone === "sunken" ? "bg-[var(--c-surface-sunken)]" : ""}>
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        {(eyebrow || title || lead) && (
          <header className="max-w-3xl">
            {eyebrow && (
              <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--c-magenta)]">
                {eyebrow}
              </p>
            )}
            {title && (
              <Heading
                className={`${level === "h1" ? "text-h1" : "text-h2"} font-bold leading-[var(--lh-tight)] tracking-tight text-[var(--c-ink)]`}
              >
                {title}
              </Heading>
            )}
            {lead && (
              <p className="mt-3 text-body leading-[var(--lh-body)] text-[var(--c-ink-soft)]">{lead}</p>
            )}
          </header>
        )}
        {children && <div className={eyebrow || title || lead ? "mt-8" : ""}>{children}</div>}
      </div>
    </Tag>
  );
}

/**
 * Alerts. Urgent must be unmistakable at a glance and never styled like
 * ordinary content — it carries different weight, colour and an icon slot.
 */
export function Alert({
  tone,
  heading,
  children,
}: {
  tone: "urgent" | "caution" | "info";
  heading: string;
  children: ReactNode;
}) {
  const tones = {
    urgent: {
      wrap: "border-[var(--c-urgent-line)] bg-[var(--c-urgent-bg)]",
      bar: "bg-[var(--c-urgent)]",
      head: "text-[var(--c-urgent)]",
      role: "alert" as const,
    },
    caution: {
      wrap: "border-[#fcd34d] bg-[var(--c-caution-bg)]",
      bar: "bg-[var(--c-caution)]",
      head: "text-[var(--c-caution)]",
      role: "status" as const,
    },
    info: {
      wrap: "border-[#bfe4f7] bg-[var(--c-surface-accent)]",
      bar: "bg-[var(--c-blue-deep)]",
      head: "text-[var(--c-accent-ink)]",
      role: "status" as const,
    },
  };
  const t = tones[tone];
  return (
    <div className={`overflow-hidden rounded-[var(--r-lg)] border ${t.wrap}`} role={t.role}>
      <div className={`h-1 w-full ${t.bar}`} aria-hidden="true" />
      <div className="p-5">
        <h3 className={`text-sm font-bold ${t.head}`}>{heading}</h3>
        <div className="mt-2 text-small leading-relaxed text-[var(--c-ink)]">{children}</div>
      </div>
    </div>
  );
}

/** Where every citation is shown, so sources look the same product-wide. */
export function SourcePanel({
  title,
  items,
}: {
  title: string;
  items: { id: string; cite: string; url?: string }[];
}) {
  if (!items.length) return null;
  return (
    <details className="group mt-6 rounded-[var(--r-md)] border border-[var(--c-line)] bg-[var(--c-surface-sunken)]">
      <summary className="cursor-pointer list-none px-4 py-3 text-fine font-semibold text-[var(--c-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--c-blue-deep)]">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="text-[var(--c-accent-ink)] transition-transform group-open:rotate-90">
            ▸
          </span>
          {title} ({items.length})
        </span>
      </summary>
      <ol className="space-y-2 border-t border-[var(--c-line)] px-4 py-3">
        {items.map((r) => (
          <li key={r.id} className="text-fine leading-relaxed text-[var(--c-ink-soft)]">
            {r.url ? (
              <a
                className="text-[var(--c-accent-ink)] underline underline-offset-2"
                href={r.url}
                target="_blank"
                rel="noreferrer"
              >
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

export function Grid({ children, cols = 3 }: { children: ReactNode; cols?: 2 | 3 | 4 }) {
  const map = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" } as const;
  return <div className={`grid gap-4 ${map[cols]}`}>{children}</div>;
}

/** Marks synthetic data everywhere it appears. */
export function DemoBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[var(--r-pill)] bg-[var(--c-caution-bg)] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-[var(--c-caution)] ring-1 ring-[#fcd34d]">
      <span aria-hidden="true">●</span>
      {label}
    </span>
  );
}

import { useLang } from "../../../i18n/LanguageContext";
import { tc } from "../../../i18n/care";
import { ENTRY_POINTS, JOURNEY } from "../../../data/care/journey";
import { Search } from "../components/Search";
import { Button, Card, Grid, Section, Surface } from "../design/primitives";

/**
 * Home answers, in order: what this is, what it can do, where to begin.
 *
 * Two primary actions are kept deliberately distinct rather than merged into
 * one ambiguous input — looking up a term from a report is deterministic and
 * instant; asking a question is retrieval with different guarantees. Blurring
 * them would hide which one a patient is getting.
 */
export function Home() {
  const { lang } = useLang();

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--c-line)] bg-[var(--c-surface)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 h-[28rem] bg-[radial-gradient(52rem_22rem_at_18%_0%,rgba(0,174,239,0.10),transparent_66%),radial-gradient(40rem_18rem_at_92%_8%,rgba(33,32,112,0.08),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--c-magenta)]">
            Milton and Carroll Petrie Department of Urology · Mount Sinai
          </p>
          <h1 className="mt-4 max-w-3xl text-display font-bold leading-[1.08] tracking-tight text-[var(--c-ink)]">
            {tc(lang, "app.name")}
          </h1>
          <p className="mt-4 max-w-2xl text-[1.15rem] leading-[1.55] text-[var(--c-ink-soft)]">
            {tc(lang, "home.title")}
          </p>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Surface className="p-6">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--c-magenta)]">
                Have a report in front of you
              </p>
              <h2 className="mt-2 text-h3 font-bold text-[var(--c-ink)]">Look up a term</h2>
              <p className="mt-1.5 text-small leading-relaxed text-[var(--c-ink-soft)]">
                PI-RADS, Gleason, Grade Group, PSA density — type what is written and go straight to the
                explanation.
              </p>
              <div className="mt-4">
                <Search variant="hero" />
              </div>
            </Surface>

            <Surface className="flex flex-col p-6">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--c-magenta)]">
                Have a question in your own words
              </p>
              <h2 className="mt-2 text-h3 font-bold text-[var(--c-ink)]">Ask Urology Copilot</h2>
              <p className="mt-1.5 text-small leading-relaxed text-[var(--c-ink-soft)]">
                Answers come from this guide, shown as written and with their sources. It will say so when the
                guide does not cover something, and it cannot interpret your own results.
              </p>
              <div className="mt-auto pt-4">
                <Button href="#/ask">Ask a question →</Button>
              </div>
            </Surface>
          </div>

          <p className="mt-6 max-w-2xl rounded-[var(--r-md)] border border-[var(--c-line)] bg-[var(--c-surface-sunken)] px-4 py-3 text-fine leading-relaxed text-[var(--c-muted)]">
            {tc(lang, "disclaimer")} If you need help now, contact your care team — Mount Sinai cancer
            appointments 844-MD-CANCER, Urology 212-241-9955. In an emergency, call 911.
          </p>
        </div>
      </section>

      <Section
        eyebrow="Start where you are"
        title={tc(lang, "start.title")}
        lead="Pick what fits today. Each one opens the part of the guide written for that point."
        tone="sunken"
      >
        <Grid cols={2}>
          {ENTRY_POINTS.map((e) => (
            <Card key={e.id} title={e.label} description={e.detail} href={`#${e.route}`} />
          ))}
        </Grid>
      </Section>

      <Section
        eyebrow="Explore care"
        title="Browse by stage"
        lead="The same material organised as a journey, if you would rather read it in order."
      >
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.map((s) => (
            <li key={s.id}>
              <Card eyebrow={s.n} title={s.title} description={s.blurb} href={`#${s.route}`} />
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Support" title="Help for appointments — and for the people alongside you" tone="sunken">
        <Grid cols={3}>
          <Card
            title={tc(lang, "questions.title")}
            description="Question lists by stage — before a PSA test, after an elevated result, after an MRI or biopsy, before treatment. Copy them and take them with you."
            href="#/questions"
          />
          <Card
            title="Supporting someone through prostate cancer"
            description="For family and caregivers: understanding the journey, preparing for appointments, helping track results."
            href="#/caregiver"
          />
          <Card
            title={tc(lang, "deepdive.title")}
            description="The full referenced clinical guide — treatment comparison, published trial outcomes, the department's surgical approach and its literature."
            href="#/guide"
          />
        </Grid>
      </Section>
    </>
  );
}

import { useLang } from "../../../i18n/LanguageContext";
import { tc } from "../../../i18n/care";
import { ENTRY_POINTS, JOURNEY } from "../../../data/care/journey";
import { Card, Disclaimer, Grid, Section } from "../components/ui";

export function Home() {
  const { lang } = useLang();
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 h-96 bg-[radial-gradient(60rem_24rem_at_20%_0%,rgba(0,174,239,0.13),transparent_65%),radial-gradient(45rem_20rem_at_95%_10%,rgba(33,32,112,0.10),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sinai-magenta">
            Milton and Carroll Petrie Department of Urology · Mount Sinai
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
            {tc(lang, "app.name")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-700 sm:text-xl">
            {tc(lang, "home.title")}
          </p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">{tc(lang, "home.lead")}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#/start"
              className="rounded-xl bg-sinai-400 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sinai-400/25 transition hover:-translate-y-0.5 hover:bg-sinai-500"
            >
              {tc(lang, "home.cta.primary")} →
            </a>
            <a
              href="#/health"
              className="rounded-xl border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-sinai-400 hover:text-sinai-600"
            >
              {tc(lang, "home.cta.secondary")}
            </a>
          </div>

          <div className="mt-10 max-w-2xl">
            <Disclaimer text={tc(lang, "disclaimer")} />
          </div>
        </div>
      </section>

      <Section
        eyebrow="Your care journey"
        title={tc(lang, "home.journey.title")}
        lead={tc(lang, "home.journey.lead")}
        tone="tint"
      >
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.route}`}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-sinai-400 hover:shadow-lg hover:shadow-slate-200/70"
              >
                <span className="font-mono text-xs font-bold text-sinai-400">{s.n}</span>
                <span className="mt-2 text-base font-bold text-slate-900">{s.title}</span>
                <span className="mt-2 text-sm leading-relaxed text-slate-600">{s.blurb}</span>
                <span className="mt-4 text-sm font-semibold text-sinai-600 group-hover:underline">
                  {tc(lang, "readmore")} →
                </span>
              </a>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Start here" title={tc(lang, "start.title")} lead={tc(lang, "start.lead")}>
        <Grid cols={2}>
          {ENTRY_POINTS.map((e) => (
            <Card key={e.id} title={e.label} description={e.detail} href={`#${e.route}`} />
          ))}
        </Grid>
      </Section>

      <Section eyebrow="Go deeper" title={tc(lang, "deepdive.title")} lead={tc(lang, "deepdive.lead")} tone="tint">
        <a
          href="#/guide"
          className="inline-block rounded-xl bg-sinai-violet px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
        >
          {tc(lang, "deepdive.cta")} →
        </a>
      </Section>
    </>
  );
}

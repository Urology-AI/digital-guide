import { useLang } from "../../../i18n/LanguageContext";
import { tc } from "../../../i18n/care";
import { byCategory, byId } from "../../../data/care/content";
import { JOURNEY } from "../../../data/care/journey";
import { Card, ContentBlock, Grid, Section } from "../components/ui";

/** A single explanation, reachable directly by id — the target of every search hit. */
export function TopicDetail({ id }: { id: string }) {
  const { lang } = useLang();
  const item = byId(id);

  if (!item) {
    return (
      <Section title="That page could not be found" lead="The link may be out of date.">
        <a
          href="#/"
          className="inline-block rounded-xl bg-sinai-400 px-5 py-3 text-sm font-bold text-white transition hover:bg-sinai-500"
        >
          Back to the start →
        </a>
      </Section>
    );
  }

  const stage = JOURNEY.find((s) => s.id === item.category);
  const siblings = byCategory(item.category).filter((c) => c.id !== item.id);

  return (
    <Section eyebrow={stage ? `${stage.n} · ${stage.title}` : undefined} title={item.title} lead={item.description}>
      <ContentBlock item={item} askTitle={tc(lang, "ask.title")} refsTitle={tc(lang, "refs.title")} />

      {stage && (
        <p className="mt-6">
          <a className="text-sm font-semibold text-sinai-600 hover:underline" href={`#${stage.route}`}>
            Read the whole {stage.title.toLowerCase()} section →
          </a>
        </p>
      )}

      {siblings.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-900">Related</h3>
          <Grid cols={3}>
            {siblings.slice(0, 6).map((s) => (
              <Card key={s.id} title={s.title} description={s.description} href={`#/t/${s.id}`} />
            ))}
          </Grid>
        </div>
      )}
    </Section>
  );
}

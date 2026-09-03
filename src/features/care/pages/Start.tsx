import { useLang } from "../../../i18n/LanguageContext";
import { tc } from "../../../i18n/care";
import { ENTRY_POINTS } from "../../../data/care/journey";
import { Card, Disclaimer, Grid, Section } from "../components/ui";

export function Start() {
  const { lang } = useLang();
  return (
    <Section eyebrow="Start your guide" title={tc(lang, "start.title")} lead={tc(lang, "start.lead")}>
      <Grid cols={2}>
        {ENTRY_POINTS.map((e) => (
          <Card key={e.id} title={e.label} description={e.detail} href={`#${e.route}`} />
        ))}
      </Grid>
      <div className="mt-8 max-w-2xl">
        <Disclaimer text={tc(lang, "disclaimer")} />
      </div>
    </Section>
  );
}

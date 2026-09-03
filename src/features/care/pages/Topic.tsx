import { useLang } from "../../../i18n/LanguageContext";
import { tc } from "../../../i18n/care";
import { byCategory } from "../../../data/care/content";
import type { StageId } from "../../../types/care";
import { ContentBlock, Section } from "../components/ui";
import { StageStrip } from "../components/Chrome";

/** A stage page: every content item filed under that stage, in order. */
export function Topic({
  stage,
  eyebrow,
  title,
  lead,
  before,
  after,
}: {
  stage: StageId;
  eyebrow: string;
  title: string;
  lead: string;
  before?: JSX.Element;
  after?: JSX.Element;
}) {
  const { lang } = useLang();
  const items = byCategory(stage);

  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 pt-5 sm:px-8">
          <StageStrip activeId={stage} />
        </div>
      </div>
      <Section eyebrow={eyebrow} title={title} lead={lead}>
        {before}
        <div className="mt-8 space-y-5">
          {items.map((item) => (
            <ContentBlock
              key={item.id}
              item={item}
              askTitle={tc(lang, "ask.title")}
              refsTitle={tc(lang, "refs.title")}
            />
          ))}
        </div>
        {after}
      </Section>
    </>
  );
}

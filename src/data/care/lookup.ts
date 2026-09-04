import { CONTENT } from "./content";

/**
 * Term index for direct lookup. Someone holding a report should be able to type
 * what is written on it — "PI-RADS 4", "Gleason 3+4", "Grade Group 2" — and land
 * on the explanation, rather than navigating a stage at a time.
 *
 * `contentId` must name a real item in CONTENT; a test enforces that.
 */
export interface LookupTerm {
  term: string;
  aliases: string[];
  contentId: string;
  hint: string;
}

export const TERMS: LookupTerm[] = [
  { term: "PSA", aliases: ["prostate specific antigen", "psa test", "psa level", "psa blood test"], contentId: "psa-what-is-it", hint: "What the blood test measures" },
  { term: "PSA above 4.0", aliases: ["4.0", "4 ng/ml", "high psa", "elevated psa", "raised psa"], contentId: "psa-what-is-it", hint: "What an abnormal result does and does not mean" },
  { term: "What happens after an elevated PSA", aliases: ["next steps psa", "psa follow up", "repeat psa"], contentId: "psa-after-elevated", hint: "The evaluation that may follow" },
  { term: "PSA density", aliases: ["psad", "density"], contentId: "psa-what-influences", hint: "PSA related to prostate size" },
  { term: "Things that raise PSA", aliases: ["cycling", "ejaculation", "infection psa", "what affects psa"], contentId: "psa-what-influences", hint: "Causes other than cancer" },

  { term: "PI-RADS", aliases: ["pirads", "pi rads", "mri score"], contentId: "mri-pirads", hint: "The 1–5 MRI scale" },
  { term: "PI-RADS 1", aliases: ["pirads 1"], contentId: "mri-pirads", hint: "Very low likelihood" },
  { term: "PI-RADS 2", aliases: ["pirads 2"], contentId: "mri-pirads", hint: "Low likelihood" },
  { term: "PI-RADS 3", aliases: ["pirads 3"], contentId: "mri-pirads", hint: "Intermediate or equivocal" },
  { term: "PI-RADS 4", aliases: ["pirads 4"], contentId: "mri-pirads", hint: "High likelihood" },
  { term: "PI-RADS 5", aliases: ["pirads 5"], contentId: "mri-pirads", hint: "Very high likelihood" },
  { term: "Prostate MRI", aliases: ["mri", "multiparametric mri", "mpmri", "scan"], contentId: "mri-why", hint: "Why it is done and what happens" },

  { term: "Gleason score", aliases: ["gleason"], contentId: "gleason-grade-group", hint: "How the cells look under a microscope" },
  { term: "Gleason 3+3", aliases: ["3+3", "gleason 6", "3 + 3 = 6"], contentId: "gleason-grade-group", hint: "Grade Group 1" },
  { term: "Gleason 3+4", aliases: ["3+4", "gleason 7 favourable", "3 + 4 = 7"], contentId: "gleason-grade-group", hint: "Grade Group 2" },
  { term: "Gleason 4+3", aliases: ["4+3", "4 + 3 = 7"], contentId: "gleason-grade-group", hint: "Grade Group 3" },
  { term: "Gleason 8", aliases: ["4+4", "gleason 4 + 4"], contentId: "gleason-grade-group", hint: "Grade Group 4" },
  { term: "Gleason 9 or 10", aliases: ["gleason 9", "gleason 10", "5+4", "4+5"], contentId: "gleason-grade-group", hint: "Grade Group 5" },
  { term: "Grade Group", aliases: ["grade group 1", "grade group 2", "grade group 3", "grade group 4", "grade group 5", "gg1", "gg2", "gg3"], contentId: "gleason-grade-group", hint: "The 1–5 grade on your pathology report" },
  { term: "Perineural invasion", aliases: ["pni", "cribriform", "intraductal", "asap", "high-grade pin"], contentId: "gleason-grade-group", hint: "Other findings on a pathology report" },

  { term: "Stage", aliases: ["tnm", "t1", "t2", "t3", "clinical stage", "staging"], contentId: "staging-risk", hint: "How far the cancer appears to extend" },
  { term: "Risk group", aliases: ["low risk", "intermediate risk", "high risk", "favorable intermediate", "unfavourable intermediate", "very low risk"], contentId: "staging-risk", hint: "PSA, grade and stage combined" },

  { term: "Biopsy", aliases: ["prostate biopsy", "fusion biopsy", "transperineal", "transrectal", "cores"], contentId: "biopsy", hint: "How it is done and what follows" },

  { term: "Active surveillance", aliases: ["surveillance", "monitoring instead of treatment", "watchful waiting"], contentId: "active-surveillance", hint: "Monitoring rather than treating, and when" },
  { term: "Surgery", aliases: ["prostatectomy", "radical prostatectomy", "robotic surgery", "nerve sparing", "rarp"], contentId: "surgery", hint: "Removing the prostate" },
  { term: "Radiation", aliases: ["radiotherapy", "ebrt", "imrt", "brachytherapy", "seeds"], contentId: "radiation", hint: "External beam and brachytherapy" },
  { term: "Hormone therapy", aliases: ["adt", "androgen deprivation", "how long hormone therapy"], contentId: "radiation", hint: "When it is added, and for how long" },
  { term: "Focal therapy", aliases: ["hifu", "cryotherapy", "cryoablation", "clinical trial"], contentId: "other-approaches", hint: "Treating part of the gland, and trials" },

  { term: "Incontinence", aliases: ["leakage", "urinary control", "pads", "continence"], contentId: "recovery-continence", hint: "Urinary control after surgery" },
  { term: "Erections after treatment", aliases: ["erectile dysfunction", "ed", "sexual function", "impotence", "fertility"], contentId: "recovery-sexual", hint: "What recovery may look like" },

  { term: "PSA after treatment", aliases: ["undetectable psa", "psa follow-up", "recurrence"], contentId: "monitoring-after-treatment", hint: "How response is tracked" },
  { term: "Enlarged prostate", aliases: ["bph", "benign enlargement", "weak stream", "getting up at night"], contentId: "benign-enlargement", hint: "Benign growth, not cancer" },
  { term: "Prostatitis", aliases: ["inflammation", "prostate infection"], contentId: "prostatitis", hint: "Inflammation or infection" },
  { term: "Symptoms", aliases: ["blood in urine", "blood in semen", "bone pain"], contentId: "symptoms", hint: "What to report" },
  { term: "When to get screened", aliases: ["screening age", "should i be screened", "uspstf", "when to start psa"], contentId: "when-to-talk", hint: "Age and risk guidance" },
];

export interface LookupHit {
  id: string;
  title: string;
  hint: string;
  matched: string;
}

/** Ranked lookup over terms, aliases, and content titles. */
export function search(query: string, limit = 8): LookupHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const scored: { hit: LookupHit; score: number }[] = [];
  const seen = new Set<string>();

  for (const t of TERMS) {
    const candidates = [t.term, ...t.aliases];
    let best = 0;
    let matched = t.term;
    for (const c of candidates) {
      const lc = c.toLowerCase();
      // Exact, then prefix, then substring — so "gleason 3+4" beats "gleason".
      const score = lc === q ? 100 : lc.startsWith(q) ? 70 : lc.includes(q) ? 45 : q.includes(lc) ? 35 : 0;
      if (score > best) {
        best = score;
        matched = c;
      }
    }
    if (!best) continue;
    const key = `${t.contentId}:${t.term}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const item = CONTENT.find((c) => c.id === t.contentId);
    if (!item) continue;
    scored.push({ hit: { id: t.contentId, title: t.term, hint: t.hint, matched }, score: best });
  }

  for (const item of CONTENT) {
    if (!item.title.toLowerCase().includes(q)) continue;
    if (seen.has(`${item.id}:title`)) continue;
    seen.add(`${item.id}:title`);
    scored.push({ hit: { id: item.id, title: item.title, hint: item.description, matched: item.title }, score: 60 });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.hit.title.length - b.hit.title.length)
    .slice(0, limit)
    .map((s) => s.hit);
}

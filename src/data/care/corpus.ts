import { CONTENT } from "./content";
import type { Reference } from "../../types/care";

/**
 * Retrieval corpus, derived at runtime from the typed content layer.
 *
 * The TypeScript content stays the source of truth — it keeps compile-time
 * validation and the citation tests. This module only projects it into
 * passages, so retrieval can never surface text that is not approved content,
 * and every passage carries the citations of the item it came from.
 */
export interface Passage {
  id: string;
  contentId: string;
  title: string;
  heading?: string;
  text: string;
  references: Reference[];
  questions: string[];
}

function buildCorpus(): Passage[] {
  const passages: Passage[] = [];
  for (const item of CONTENT) {
    item.sections.forEach((section, i) => {
      const parts = [section.body, section.items?.join(" "), section.note].filter(Boolean);
      const text = parts.join(" ").trim();
      if (!text) return;
      passages.push({
        id: `${item.id}#${i}`,
        contentId: item.id,
        title: item.title,
        heading: section.heading,
        text,
        references: item.references,
        questions: item.questions,
      });
    });
  }
  return passages;
}

export const CORPUS: Passage[] = buildCorpus();

const STOP = new Set([
  "a","an","and","are","as","at","be","but","by","can","could","did","do","does","for","from","had","has","have",
  "how","i","if","in","is","it","its","me","my","of","on","or","should","so","than","that","the","their","them",
  "there","these","they","this","to","was","were","what","when","where","which","who","why","will","with","you",
  "your","am","been","being","get","got","after","before","about","would","im","ive",
]);

/**
 * Patients do not use the words the clinical content uses. "Incontinent" never
 * appears in the guide — "urinary leakage" does. Expanding the question (never
 * the content) keeps retrieval lexical and inspectable while closing the most
 * common vocabulary gaps. Semantic embeddings would generalize further; this is
 * the part that works without a model.
 */
const SYNONYMS: Record<string, string[]> = {
  incontinent: ["leakage", "continence", "urinary"],
  incontinence: ["leakage", "continence", "urinary"],
  leaking: ["leakage", "continence"],
  pads: ["leakage", "continence"],
  bike: ["cycling"],
  biking: ["cycling"],
  cycle: ["cycling"],
  riding: ["cycling"],
  wife: ["family", "caregiver", "relatives"],
  husband: ["family", "caregiver", "relatives"],
  spouse: ["family", "caregiver", "relatives"],
  partner: ["family", "caregiver", "relatives"],
  sex: ["sexual", "erectile", "erections"],
  impotent: ["erectile", "erections"],
  impotence: ["erectile", "erections"],
  erection: ["erectile", "erections"],
  scan: ["mri", "imaging"],
  operation: ["surgery", "prostatectomy"],
  surgeon: ["surgery", "prostatectomy"],
  recover: ["recovery"],
  recovering: ["recovery"],
  waiting: ["surveillance", "monitoring"],
  nervous: ["anxiety", "surveillance"],
  worried: ["anxiety", "surveillance"],
  spread: ["metastasis", "advanced", "regional"],
  aggressive: ["grade", "grading"],
  consult: ["consultation", "appointment", "team"],
  appointment: ["team", "clinician"],
};

function expand(terms: string[]): string[] {
  const out = [...terms];
  for (const t of terms) {
    const extra = SYNONYMS[t];
    if (extra) out.push(...extra);
  }
  return out;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP.has(t));
}

// Inverse document frequency, so a rare word like "cycling" outweighs a common
// one like "prostate" — which appears in nearly every passage.
const DF = new Map<string, number>();
for (const p of CORPUS) {
  for (const term of new Set(tokenize(`${p.title} ${p.heading ?? ""} ${p.text}`))) {
    DF.set(term, (DF.get(term) ?? 0) + 1);
  }
}
const idf = (term: string) => Math.log(1 + CORPUS.length / (1 + (DF.get(term) ?? 0)));

export interface Retrieved {
  passage: Passage;
  score: number;
  matched: string[];
}

/**
 * Scores passages against a free-text question. Returns only passages that
 * clear `minScore`; an empty result is the correct answer to a question this
 * content does not cover, and the caller must say so rather than improvise.
 */
export function retrieve(question: string, limit = 3, minScore = 1.6): Retrieved[] {
  const terms = expand(tokenize(question));
  if (!terms.length) return [];

  const scored: Retrieved[] = [];
  for (const passage of CORPUS) {
    const haystack = `${passage.title} ${passage.heading ?? ""} ${passage.text}`.toLowerCase();
    const body = tokenize(haystack);
    const counts = new Map<string, number>();
    for (const t of body) counts.set(t, (counts.get(t) ?? 0) + 1);

    let score = 0;
    const matched: string[] = [];
    for (const term of new Set(terms)) {
      const tf = counts.get(term) ?? 0;
      if (!tf) continue;
      matched.push(term);
      // Saturating term frequency: a passage repeating a word is not
      // proportionally more relevant.
      score += idf(term) * (tf / (tf + 1.2));
      if (passage.title.toLowerCase().includes(term)) score += 0.6;
      if (passage.heading?.toLowerCase().includes(term)) score += 0.3;
    }
    // Reward covering more of the question rather than one word very often.
    score *= 0.6 + 0.4 * (matched.length / new Set(terms).size);
    if (score >= minScore) scored.push({ passage, score, matched });
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}

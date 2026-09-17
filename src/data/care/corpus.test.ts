import { describe, expect, it } from "vitest";
import { CORPUS, retrieve } from "./corpus";
import { CONTENT } from "./content";

describe("retrieval corpus", () => {
  it("is built only from approved content", () => {
    const ids = new Set(CONTENT.map((c) => c.id));
    expect(CORPUS.length).toBeGreaterThan(20);
    for (const p of CORPUS) {
      expect(ids.has(p.contentId), `passage ${p.id} has no source item`).toBe(true);
      expect(p.text.length, `passage ${p.id} is empty`).toBeGreaterThan(20);
    }
  });

  it("carries citations on every passage", () => {
    for (const p of CORPUS) {
      expect(p.references.length, `passage ${p.id} is uncited`).toBeGreaterThan(0);
    }
  });
});

describe("retrieve", () => {
  it("answers free-text questions the content covers", () => {
    const cases: [string, string][] = [
      ["What does active surveillance mean?", "active-surveillance"],
      ["I am on active surveillance and nervous about waiting", "active-surveillance"],
      ["will I be incontinent after surgery", "recovery-continence"],
      ["why do I need another PSA if I already had an MRI", "psa-after-elevated"],
      ["how long will I be on hormone therapy", "radiation"],
    ];
    for (const [q, expected] of cases) {
      const hits = retrieve(q);
      expect(hits.length, `no answer for "${q}"`).toBeGreaterThan(0);
      expect(hits.map((h) => h.passage.contentId), `"${q}" retrieved the wrong content`).toContain(expected);
    }
  });

  it("expands patient vocabulary to the words the content uses", () => {
    // "incontinent" appears nowhere in the content; "leakage" does.
    const raw = CORPUS.some((p) => p.text.toLowerCase().includes("incontinent"));
    expect(raw).toBe(false);
    expect(retrieve("incontinent").length).toBeGreaterThan(0);
  });

  it("returns nothing rather than a weak guess", () => {
    // The refusal path is a feature: an empty result is what makes the UI say
    // "I couldn't find this" instead of improvising.
    expect(retrieve("what is the weather today")).toHaveLength(0);
    expect(retrieve("how do I fix my car")).toHaveLength(0);
    expect(retrieve("a")).toHaveLength(0);
  });

  it("ranks the most relevant passage first", () => {
    const hits = retrieve("what does active surveillance involve");
    expect(hits[0].passage.contentId).toBe("active-surveillance");
  });
});

describe("safety", () => {
  it("answers red-flag symptoms with urgent guidance before any retrieval", async () => {
    const { checkRedFlags } = await import("./redFlags");
    const urgent = [
      "I can't pass urine since my biopsy",
      "I have a fever and chills after my biopsy",
      "I'm passing blood clots",
      "I have chest pain",
    ];
    for (const q of urgent) {
      expect(checkRedFlags(q), `no urgent guidance for "${q}"`).toBeTruthy();
    }
  });

  it("does not raise urgent guidance on ordinary questions", async () => {
    const { checkRedFlags } = await import("./redFlags");
    for (const q of ["what does active surveillance mean", "will I be incontinent after surgery"]) {
      expect(checkRedFlags(q), `false alarm on "${q}"`).toBeNull();
    }
  });

  it("every suggested starter is actually answerable", () => {
    // The starters set expectations; one that returns nothing would teach
    // patients the tool is broken.
    const starters = [
      "What does active surveillance mean?",
      "What happens after a biopsy?",
      "Will I be incontinent after surgery?",
      "Why do I need another PSA if I already had an MRI?",
      "What can raise my PSA apart from cancer?",
      "How long does hormone therapy last?",
    ];
    for (const q of starters) {
      expect(retrieve(q).length, `starter has no answer: "${q}"`).toBeGreaterThan(0);
    }
  });
});

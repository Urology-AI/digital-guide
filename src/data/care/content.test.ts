import { describe, expect, it } from "vitest";
import { CONTENT } from "./content";
import { REFS, refs } from "./references";
import { ENTRY_POINTS, JOURNEY } from "./journey";
import { TERMS, search } from "./lookup";
import { ROUTES } from "../../features/care/CareApp";

/**
 * These tests guard the part of this product that actually matters: that every
 * clinical statement is attached to a real source, and that nothing links into
 * a page that does not exist.
 */

const KNOWN_REFS = new Set(Object.values(REFS));

describe("citation registry", () => {
  it("keys match the id on each reference", () => {
    for (const [key, ref] of Object.entries(REFS)) {
      expect(ref.id, `REFS.${key}.id`).toBe(key);
    }
  });

  it("every reference has a citation and an https source URL", () => {
    for (const ref of Object.values(REFS)) {
      expect(ref.cite.length, `${ref.id} citation`).toBeGreaterThan(20);
      expect(ref.url, `${ref.id} url`).toMatch(/^https:\/\//);
    }
  });

  it("refs() drops unknown ids, so a typo must not silently strip a citation", () => {
    // Documents the failure mode the next test protects against.
    expect(refs("nciPsa", "definitelyNotAnId")).toHaveLength(1);
  });
});

describe("educational content", () => {
  it("has unique ids", () => {
    const ids = CONTENT.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every item a description, a section, and a question to ask", () => {
    for (const item of CONTENT) {
      expect(item.description.length, `${item.id} description`).toBeGreaterThan(10);
      expect(item.sections.length, `${item.id} sections`).toBeGreaterThan(0);
      expect(item.questions.length, `${item.id} questions`).toBeGreaterThan(0);
    }
  });

  it("cites at least one source for every item", () => {
    for (const item of CONTENT) {
      expect(item.references.length, `${item.id} is uncited`).toBeGreaterThan(0);
    }
  });

  it("only cites references that exist in the registry", () => {
    for (const item of CONTENT) {
      for (const ref of item.references) {
        expect(KNOWN_REFS.has(ref), `${item.id} cites an unknown reference`).toBe(true);
      }
    }
  });

  it("gives every section something to render", () => {
    for (const item of CONTENT) {
      for (const [i, section] of item.sections.entries()) {
        const hasContent = Boolean(section.body || section.items?.length || section.note);
        expect(hasContent, `${item.id} section ${i} is empty`).toBe(true);
      }
    }
  });

  it("avoids language that would diagnose or promise an outcome", () => {
    // Clinical safety rule: the guide describes what may happen, never what will.
    const banned = /\b(you have cancer|will cure|guarantees?|guaranteed|cures your)\b/i;
    for (const item of CONTENT) {
      const text = JSON.stringify(item);
      expect(banned.test(text), `${item.id} uses absolute clinical language`).toBe(false);
    }
  });
});

describe("navigation", () => {
  it("routes every journey stage to a page that exists", () => {
    for (const stage of JOURNEY) {
      expect(ROUTES[stage.route], `journey stage ${stage.id}`).toBeTypeOf("function");
    }
  });

  it("routes every entry point to a page that exists", () => {
    for (const entry of ENTRY_POINTS) {
      const path = entry.route.split("#")[0];
      expect(ROUTES[path], `entry point ${entry.id}`).toBeTypeOf("function");
    }
  });

  it("has content filed under every journey stage", () => {
    const categories = new Set(CONTENT.map((c) => c.category));
    for (const stage of JOURNEY) {
      // "risk" is a checklist page rather than a content category.
      if (stage.id === "risk") continue;
      expect(categories.has(stage.id), `no content for stage ${stage.id}`).toBe(true);
    }
  });
});

describe("term lookup", () => {
  it("points every term at content that exists", () => {
    const ids = new Set(CONTENT.map((c) => c.id));
    for (const t of TERMS) {
      expect(ids.has(t.contentId), `term "${t.term}" targets missing content`).toBe(true);
    }
  });

  it("finds the terms a patient reads off a report", () => {
    const cases: [string, string][] = [
      ["PI-RADS 4", "mri-pirads"],
      ["pirads 3", "mri-pirads"],
      ["Gleason 3+4", "gleason-grade-group"],
      ["grade group 2", "gleason-grade-group"],
      ["psa", "psa-what-is-it"],
      ["brachytherapy", "radiation"],
      ["active surveillance", "active-surveillance"],
      ["incontinence", "recovery-continence"],
    ];
    for (const [query, expected] of cases) {
      const hits = search(query);
      expect(hits.length, `no result for "${query}"`).toBeGreaterThan(0);
      expect(hits[0].id, `"${query}" ranked the wrong result first`).toBe(expected);
    }
  });

  it("ignores queries too short to be meaningful", () => {
    expect(search("p")).toHaveLength(0);
  });

  it("returns nothing for a term that is not covered", () => {
    expect(search("zzzznotaterm")).toHaveLength(0);
  });
});

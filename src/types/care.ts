/** Content model for the Tewari Prostate Care guide. */

export type StageId =
  | "health"
  | "risk"
  | "psa"
  | "imaging"
  | "diagnosis"
  | "treatment"
  | "recovery"
  | "monitoring";

/** A citation attached to a piece of educational content. */
export interface Reference {
  id: string;
  cite: string;
  url?: string;
}

export interface ContentSection {
  heading?: string;
  body?: string;
  items?: string[];
  note?: string;
}

/**
 * One reviewable unit of educational content. Kept as data (not JSX) so it can
 * later be versioned, clinically reviewed, translated, or served from a CMS.
 */
export interface ContentItem {
  id: string;
  title: string;
  category: StageId;
  description: string;
  sections: ContentSection[];
  questions: string[];
  references: Reference[];
}

export interface JourneyStage {
  id: StageId;
  n: string;
  title: string;
  verb: string;
  blurb: string;
  route: string;
}

/** Where a visitor says they are, used to route them into the right pathway. */
export interface EntryPoint {
  id: string;
  label: string;
  detail: string;
  route: string;
}

export interface DemoResult {
  label: string;
  value: string;
  meta: string;
  state: "done" | "pending" | "upcoming";
}

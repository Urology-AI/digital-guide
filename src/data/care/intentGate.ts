/**
 * Questions this product must not answer, caught before retrieval runs.
 *
 * Lexical retrieval will always find *something* — asking "Do I have cancer?"
 * scores against the prostate cancer passage. That passage is not an answer to
 * that question, and showing it would read as though the product were offering
 * a diagnosis. These gates abstain first and hand off to the care team.
 *
 * Wording is deliberately non-apologetic and explains *why* the product is not
 * the right place to ask, so a patient is redirected rather than dismissed.
 */

export type GateKind =
  | "diagnosis"
  | "treatment-choice"
  | "prognosis"
  | "medication"
  | "activity"
  | "individual-result";

export interface Gate {
  kind: GateKind;
  /** Shown in place of retrieved content. */
  message: string;
  /** Short label for the heading above it. */
  heading: string;
}

interface Rule {
  kind: GateKind;
  heading: string;
  match: RegExp;
  message: string;
}

const RULES: Rule[] = [
  {
    kind: "prognosis",
    heading: "Only your care team can discuss your outlook",
    match:
      /\b(how long (do|have) i|will i die|am i going to die|life expectancy|how long have i got|will i survive|am i cured|will it come back for me)\b/i,
    message:
      "Outlook depends on the specifics of your cancer and your health, and general statistics describe groups rather than individuals. Your care team can talk through what your own findings suggest.",
  },
  {
    kind: "diagnosis",
    heading: "Only your care team can answer this",
    match:
      /\b(do|does|did) (i|he|my husband|my father|my dad) (have|got) (cancer|prostate cancer|a tumou?r|it\b|this\b)|\bam i (sick|ill)\b|\bis (it|this|mine) cancer\b|\bdoes (this|that) mean (i have )?cancer\b/i,
    message:
      "Whether cancer is present is established by a biopsy and a pathologist's report, read alongside your PSA, examination and imaging. This guide explains what those tests and reports mean, but it cannot tell you what yours show. Your urology team can go through your results with you.",
  },
  {
    kind: "individual-result",
    heading: "This needs your own results in front of a clinician",
    match:
      /\bis my\b.*\b(bad|serious|high|low|dangerous|worrying|concerning|ok|okay|normal|aggressive)\b|\bmy (psa|gleason|grade group|pi-?rads|score|result)\b.*\b(mean|bad|serious|high|ok|okay|normal|worry)\b|\bwhat does my\b/i,
    message:
      "Numbers on a report are interpreted together — PSA alongside prostate size and trend, grade alongside how much cancer is present, imaging alongside both. A single value read on its own can mislead. This guide explains what each term means in general; what yours mean for you is a conversation with your urologist.",
  },
  {
    kind: "treatment-choice",
    heading: "This is a decision to make with your care team",
    match:
      /\b(should|shall) i (choose|pick|have|get|go with|opt for|do)\b|\bwhich (treatment|option|one)\b.*\b(should|best|better)\b|\b(surgery|radiation|prostatectomy) (or|vs\.?|versus) (surgery|radiation|radiotherapy|prostatectomy)\b|\bwhat would you (do|recommend|choose)\b|\bwhat's best for me\b|\bbest treatment for me\b/i,
    message:
      "When more than one option is reasonable, the right choice depends on your grade, stage and PSA, your age and health, your anatomy, and what matters most to you — which is why guidelines describe this as a shared decision rather than a rule. The Treatment section sets out what each approach involves and the tradeoffs, so you can weigh them with your team.",
  },
  {
    kind: "medication",
    heading: "Do not change medication based on a guide",
    match:
      /\b(should i|can i|shall i) (stop|start|skip|pause|halve|double|change)\b.*\b(taking|medication|medicine|tablets?|pills?|drug|therapy|treatment|hormone|adt)\b|\b(stop|skip) (my|the) (medication|medicine|tablets?|pills?)\b/i,
    message:
      "Starting, stopping or changing a medication is a clinical decision, and some need to be tapered or timed around procedures. Please contact whoever prescribed it before making any change.",
  },
  {
    kind: "activity",
    heading: "Your discharge instructions cover this",
    match:
      /\b(can|when can|how soon can|may) i\b.*\b(cycle|cycling|bike|biking|ride|exercise|work ?out|gym|run|running|swim|swimming|drive|driving|fly|flying|travel|lift|lifting|work|return to work|have sex|shower|bathe)\b/i,
    message:
      "The approved guide does not include activity instructions after a procedure. That guidance is specific to the procedure you had and to you, and it comes from the discharge instructions your team gave you — or from the team directly if you no longer have them.",
  },
];

/** Returns a gate when the question is one this product must not answer. */
export function gateQuestion(question: string): Gate | null {
  for (const rule of RULES) {
    if (rule.match.test(question)) {
      return { kind: rule.kind, heading: rule.heading, message: rule.message };
    }
  }
  return null;
}

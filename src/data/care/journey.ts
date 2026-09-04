import type { EntryPoint, JourneyStage } from "../../types/care";

export const JOURNEY: JourneyStage[] = [
  { id: "health", n: "01", title: "Prostate Health", verb: "Understand", blurb: "What the prostate is, what it does, and the common conditions that affect it.", route: "/health" },
  { id: "risk", n: "02", title: "Risk Assessment", verb: "Assess Your Risk", blurb: "Factors that may influence prostate cancer risk, and how to raise them with a clinician.", route: "/risk" },
  { id: "psa", n: "03", title: "PSA Testing", verb: "Screening", blurb: "What PSA measures, what can move it, and what may follow an elevated result.", route: "/psa" },
  { id: "imaging", n: "04", title: "Imaging", verb: "Imaging", blurb: "Why a prostate MRI may be done, and how PI-RADS is used.", route: "/imaging" },
  { id: "diagnosis", n: "05", title: "Biopsy & Diagnosis", verb: "Diagnosis", blurb: "Biopsy, pathology, Gleason score, Grade Group, and staging.", route: "/diagnosis" },
  { id: "treatment", n: "06", title: "Treatment", verb: "Treatment", blurb: "The approaches a care team may discuss, and what to ask about each.", route: "/treatment" },
  { id: "recovery", n: "07", title: "Recovery", verb: "Recovery", blurb: "What recovery involves, including urinary and sexual function.", route: "/recovery" },
  { id: "monitoring", n: "08", title: "Monitoring", verb: "Monitoring", blurb: "PSA follow-up, active surveillance, and long-term care.", route: "/monitoring" },
];

/** "Where are you right now?" — the demo entry into a pathway. */
export const ENTRY_POINTS: EntryPoint[] = [
  { id: "learning", label: "I'm learning about prostate health", detail: "Start with the basics — what the prostate is and what can go wrong.", route: "/health" },
  { id: "had-psa", label: "I just had a PSA test", detail: "Understand what PSA measures and how results are read.", route: "/psa" },
  { id: "elevated-psa", label: "My PSA is elevated", detail: "What can raise PSA, and what evaluation may follow.", route: "/psa#after" },
  { id: "had-mri", label: "I had an MRI", detail: "Understand prostate MRI and the PI-RADS scale.", route: "/imaging" },
  { id: "had-biopsy", label: "I had a biopsy", detail: "Read a pathology report: Gleason score, Grade Group, staging.", route: "/diagnosis" },
  { id: "diagnosed", label: "I've been diagnosed with prostate cancer", detail: "Understand your diagnosis before comparing options.", route: "/diagnosis" },
  { id: "considering", label: "I'm considering treatment", detail: "Compare the approaches a care team may discuss.", route: "/treatment" },
  { id: "surveillance", label: "I'm on active surveillance", detail: "What monitoring involves and what may change the plan.", route: "/monitoring" },
];

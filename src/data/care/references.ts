import type { Reference } from "../../types/care";

/**
 * Shared citation registry. Every clinical statement in the guide points at one
 * of these; nothing is asserted without a source a reviewer can check.
 */
export const REFS: Record<string, Reference> = {
  seer: {
    id: "seer",
    cite: "NCI Surveillance, Epidemiology, and End Results Program. Cancer Stat Facts: Prostate Cancer (SEER 21 survival 2016–2022; stage distribution 2019–2023).",
    url: "https://seer.cancer.gov/statfacts/html/prost.html",
  },
  nciPsa: {
    id: "nciPsa",
    cite: "National Cancer Institute. Prostate-Specific Antigen (PSA) Test.",
    url: "https://www.cancer.gov/types/prostate/psa-fact-sheet",
  },
  nciTreat: {
    id: "nciTreat",
    cite: "National Cancer Institute. Prostate Cancer Treatment (PDQ) — Patient Version.",
    url: "https://www.cancer.gov/types/prostate/patient/prostate-treatment-pdq",
  },
  uspstf: {
    id: "uspstf",
    cite: "U.S. Preventive Services Task Force. Prostate Cancer: Screening (recommendation statement).",
    url: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/prostate-cancer-screening",
  },
  acs: {
    id: "acs",
    cite: "American Cancer Society. Recommendations for Prostate Cancer Early Detection.",
    url: "https://www.cancer.org/cancer/types/prostate-cancer/detection-diagnosis-staging/acs-recommendations.html",
  },
  nccn: {
    id: "nccn",
    cite: "NCCN Clinical Practice Guidelines in Oncology: Prostate Cancer, Version 5.2026 (January 23, 2026).",
    url: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1459",
  },
  aua: {
    id: "aua",
    cite: "Eastham JA, et al. Clinically Localized Prostate Cancer: AUA/ASTRO Guideline (2022), Parts I–III. J Urol. 2022;208(1):10–33.",
    url: "https://www.auanet.org/guidelines-and-quality/guidelines/clinically-localized-prostate-cancer",
  },
  protect: {
    id: "protect",
    cite: "Hamdy FC, Donovan JL, Lane JA, et al. Fifteen-year outcomes after monitoring, surgery, or radiotherapy for prostate cancer. N Engl J Med. 2023;388(17):1547–1558.",
    url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2214122",
  },
  pirads: {
    id: "pirads",
    cite: "American College of Radiology. PI-RADS: Prostate Imaging–Reporting and Data System, Version 2.1.",
    url: "https://www.acr.org/Clinical-Resources/Reporting-and-Data-Systems/PI-RADS",
  },
  tewari2011: {
    id: "tewari2011",
    cite: "Tewari AK, Srivastava A, Huang MW, et al. Anatomical grades of nerve sparing: a risk-stratified approach to neural-hammock sparing during robot-assisted radical prostatectomy. BJU Int. 2011;108(6b):984–992.",
    url: "https://pubmed.ncbi.nlm.nih.gov/21917101/",
  },
  martini2018: {
    id: "martini2018",
    cite: "Martini A, Gupta A, Lewis SC, et al. Development and internal validation of a side-specific, multiparametric MRI-based nomogram for the prediction of extracapsular extension. BJU Int. 2018;122(6):1025–1033.",
    url: "https://pubmed.ncbi.nlm.nih.gov/29676063/",
  },
  martini2019: {
    id: "martini2019",
    cite: "Martini A, Cumarasamy S, Haines KG, Tewari AK. An updated approach to incremental nerve sparing for robot-assisted radical prostatectomy. BJU Int. 2019;124(1):103–108.",
    url: "https://pubmed.ncbi.nlm.nih.gov/30575261/",
  },
  wagaskar2021: {
    id: "wagaskar2021",
    cite: "Wagaskar VG, Mittal A, Sobotka S, et al. Hood technique for robotic radical prostatectomy. Eur Urol. 2021;80(2):213–221.",
    url: "https://pubmed.ncbi.nlm.nih.gov/33067016/",
  },
  vis2019: {
    id: "vis2019",
    cite: "Vis AN, van der Poel HG, Ruiter AEC, et al. Posterior, anterior, and periurethral surgical reconstruction of urinary continence mechanisms in robot-assisted radical prostatectomy. Eur Urol. 2019;76(6):814–822.",
    url: "https://pubmed.ncbi.nlm.nih.gov/30514568/",
  },
  asProgram: {
    id: "asProgram",
    cite: "Tewari Active Surveillance Program — Mount Sinai protocol tool (patient and clinician versions).",
    url: "https://as.millionstrongmen.com/patient/",
  },
};

export function refs(...ids: string[]): Reference[] {
  return ids.map((id) => REFS[id]).filter(Boolean);
}

/**
 * Patient Guide content — single translation surface.
 *
 * Source: "Understanding Localized Prostate Cancer — Mount Sinai Patient Guide"
 * (Milton and Carroll Petrie Department of Urology / The Tisch Cancer Institute),
 * DRAFT for medical + brand review, dated August 2026. Content is adapted
 * verbatim in substance from that draft — do not add medical claims beyond it.
 * The draft used the 2023 Prostate Cancer Foundation patient guide as a scope
 * reference only; wording, structure, and tools are Mount Sinai's.
 *
 * English (`EN`) is fully populated. Other locales are intentionally left as
 * TODO stubs; `getGuideContent()` falls back to English until the clinical /
 * patient-education / translation teams review them.
 */
import type { LangCode } from "../../i18n";

export interface NavItem {
  id: string;
  n: string;
  label: string;
}

export interface Block {
  title: string;
  body?: string;
  items?: string[];
}

export interface Callout {
  label: string;
  body: string;
}

export interface CmpRow {
  label: string;
  a: string;
  b?: string;
  c?: string;
  d?: string;
}

export interface JourneyStep {
  n: string;
  title: string;
  detail: string;
}

export interface GleasonRow {
  id: string;
  group: string;
  gleason: string;
  meaning: string;
}

export interface RiskTier {
  id: string;
  label: string;
  gist: string;
}

export interface TreatmentPath {
  id: string;
  n: string;
  title: string;
  summary: string;
  blocks: Block[];
  callout?: Callout;
}

export interface GlossaryTerm {
  term: string;
  def: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
}

export interface RecordField {
  id: string;
  label: string;
}

export interface SourceRef {
  cite: string;
  url?: string;
}

export interface SourceGroup {
  heading: string;
  refs: SourceRef[];
}

export interface PathwayCard {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href?: string;
  note?: string;
}

export interface GuideContent {
  brandName: string;
  brandDept: string;
  brandInstitute: string;
  disclaimerBar: string;
  draftNotice: string;
  theme: { auto: string; light: string; dark: string; label: string };
  nav: NavItem[];

  welcome: {
    eyebrow: string;
    title: string;
    lead: string;
    reassurance: string;
    startLabel: string;
    continueLabel: string;
    highlights: { label: string; text: string }[];
    footNote: string;
  };

  tools: {
    eyebrow: string;
    title: string;
    intro: string;
    items: PathwayCard[];
    ruoNote: string;
  };

  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    reassurance: string;
    chips: string[];
  };
  stats: { num: string; cap: string }[];

  start: {
    eyebrow: string;
    title: string;
    intro: string;
    firstStep: Callout;
    howToUse: string[];
    canCannot: string;
    languageNote: string;
    epsaLabel: string;
    epsaBody: string;
    epsaLinkText: string;
    epsaUrl: string;
  };

  journey: {
    eyebrow: string;
    title: string;
    caption: string;
    steps: JourneyStep[];
    localizedMeans: string;
    notOneTest: string;
    reassuringFact: string;
  };

  basics: {
    eyebrow: string;
    title: string;
    intro: string;
    anatomyCaption: string;
    dailyLife: string;
    symptoms: string;
  };

  psa: {
    eyebrow: string;
    title: string;
    intro: string;
    factors: CmpRow[];
    testsThatFollow: string[];
    beforeTest: Callout;
  };

  diagnosis: {
    eyebrow: string;
    title: string;
    intro: string;
    howDoneTitle: string;
    howDone: string;
    prepareTitle: string;
    prepare: string[];
    whatToExpect: Callout;
    gleasonIntro: string;
    tableHead: [string, string, string];
    rows: GleasonRow[];
    tableFoot: string;
    alsoLookFor: string[];
    worthAsking: Callout;
    ifNegativeTitle: string;
    ifNegative: string;
  };

  staging: {
    eyebrow: string;
    title: string;
    continuumTitle: string;
    continuumFoot: string;
    tiers: RiskTier[];
    clinicalStage: string;
    riskGroup: string;
    imaging: string[];
    sayItBack: Callout;
  };

  team: {
    eyebrow: string;
    title: string;
    intro: string;
    chairName: string;
    chairRole: string;
    chairBody: string;
    roles: CmpRow[];
    secondOpinionTitle: string;
    secondOpinionItems: string[];
    msApproach: Callout;
    prioritiesTitle: string;
    prioritiesIntro: string;
    priorities: CmpRow[];
    decisionCheck: Callout;
  };

  treatment: {
    eyebrow: string;
    title: string;
    intro: string;
    byStageTitle: string;
    byStageIntro: string;
    byStageRows: CmpRow[];
    byStageFoot: string;
    expandHint: string;
    paths: TreatmentPath[];
    compareTitle: string;
    compareIntro: string;
    compareHead: [string, string, string, string];
    compareRows: CmpRow[];
    compareFoot: string;
    fairQuestionsTitle: string;
    fairQuestions: string[];
  };

  quality: {
    eyebrow: string;
    title: string;
    intro: string;
    blocks: Block[];
    fertility: Callout;
  };

  recovery: {
    eyebrow: string;
    title: string;
    intro: string;
    blocks: Block[];
    callUrgently: Callout;
  };

  living: {
    eyebrow: string;
    title: string;
    intro: string;
    basics: CmpRow[];
    emotionalTitle: string;
    emotionalBody: string;
    crisis: Callout;
  };

  genetics: {
    eyebrow: string;
    title: string;
    intro: string;
    counselingWhenTitle: string;
    counselingWhen: string[];
    twoKindsTitle: string;
    twoKindsBody: string;
    beforeAfterTitle: string;
    beforeAfterBody: string;
    familyAction: Callout;
  };

  glossary: {
    eyebrow: string;
    title: string;
    intro: string;
    searchPlaceholder: string;
    empty: string;
    terms: GlossaryTerm[];
  };

  checklist: {
    eyebrow: string;
    title: string;
    intro: string;
    progress: string;
    reset: string;
    questionsTitle: string;
    questions: ChecklistItem[];
    teachBack: Callout;
    recordTitle: string;
    recordIntro: string;
    recordFields: RecordField[];
    prioritiesLabel: string;
    careTeamLabel: string;
    careTeamRoles: string[];
    recordSavedNote: string;
  };

  sources: {
    eyebrow: string;
    title: string;
    intro: string;
    groups: SourceGroup[];
    reviewTitle: string;
    reviewItems: string[];
    version: string;
  };

  footer: { fine: string; brandline: string; contact: string };

  chat: {
    launch: string;
    title: string;
    subtitle: string;
    intro: string;
    disclaimer: string;
    placeholder: string;
    send: string;
    close: string;
    offlineNote: string;
    moreHelp: string;
    suggestions: string[];
  };
}

const EN: GuideContent = {
  brandName: "Understanding Localized Prostate Cancer",
  brandDept: "Milton and Carroll Petrie Department of Urology",
  brandInstitute: "The Tisch Cancer Institute · Mount Sinai",
  disclaimerBar:
    "This guide is for general education and does not replace your care team.",
  draftNotice:
    "Draft for medical and brand review. Treatment standards change — confirm all clinical details with your Mount Sinai care team.",
  theme: { auto: "Auto", light: "Light", dark: "Dark", label: "Color theme" },
  welcome: {
    eyebrow: "Milton and Carroll Petrie Department of Urology · The Tisch Cancer Institute",
    title: "Understanding Localized Prostate Cancer",
    lead: "How to read your pathology and imaging, how PSA, Grade Group, and stage combine into a risk group, and how active surveillance, surgery, and radiation actually differ — from the Mount Sinai Department of Urology, chaired by Dr. Ashutosh K. Tewari.",
    reassurance:
      "Most localized prostate cancer gives you weeks to decide, not days. Use that time to get your pathology and imaging right and to define what outcome matters most to you.",
    startLabel: "Start the guide",
    continueLabel: "Continue where you left off",
    highlights: [
      { label: "16 chapters", text: "diagnosis through follow-up, one at a time" },
      { label: "Built to write in", text: "question checklist and a diagnosis record that stays on your device" },
      { label: "Ask as you go", text: "a quick-answer assistant grounded in this guide" },
    ],
    footNote:
      "For education and shared decision-making. This draft is pending Mount Sinai clinical review and does not replace your care team.",
  },

  tools: {
    eyebrow: "Your toolkit",
    title: "Mount Sinai prostate tools",
    intro:
      "Two tools built in the Department of Urology sit alongside this guide — one before a diagnosis, one when surgery is already on the table.",
    items: [
      {
        id: "epsa",
        eyebrow: "Before a diagnosis",
        title: "ePSA — risk assessment",
        body: "A short questionnaire (family history, symptoms, lifestyle, and — if you have it — your PSA and MRI results) that estimates your risk and flags whether a PSA test is worth discussing. Useful to revisit as your numbers change so you can see where you stand.",
        cta: "Open ePSA",
        href: "https://epsa.millionstrongmen.com/",
      },
      {
        id: "compass",
        eyebrow: "Planning surgery",
        title: "COMPASS — surgical digital twin",
        body: "For patients already choosing robot-assisted radical prostatectomy. COMPASS combines clinical data with MRI, micro-ultrasound, and PSMA PET to predict adverse pathology, biochemical recurrence, side-specific nerve-sparing, and functional recovery (urinary control and erections) — shown on a 3D model to plan the operation.",
        cta: "Open COMPASS",
        href: "https://urology-ai.github.io/digital-twin/",
        note: "Research use only, not FDA cleared (IRB STUDY-14-00050, Mount Sinai). It is decision support for your surgical team — bring the results to your consultation rather than acting on them alone.",
      },
    ],
    ruoNote:
      "Functional-recovery estimates depend heavily on your baseline urinary and sexual function and on factors you can influence — staying active, cardiovascular health, not smoking, and pelvic floor physical therapy. Ask your team what you can do before and after surgery.",
  },

  nav: [
    { id: "start", n: "00", label: "Start here" },
    { id: "journey", n: "01", label: "The journey" },
    { id: "basics", n: "02", label: "Prostate cancer basics" },
    { id: "psa", n: "03", label: "PSA, explained" },
    { id: "diagnosis", n: "04", label: "Your biopsy report" },
    { id: "staging", n: "05", label: "Stage & risk group" },
    { id: "team", n: "06", label: "Care team & priorities" },
    { id: "treatment", n: "07", label: "Treatment choices" },
    { id: "quality", n: "08", label: "Quality of life" },
    { id: "recovery", n: "09", label: "Recovery & follow-up" },
    { id: "living", n: "10", label: "Healthy living" },
    { id: "genetics", n: "11", label: "Genetics & family" },
    { id: "glossary", n: "12", label: "Glossary" },
    { id: "checklist", n: "13", label: "Your toolkit" },
    { id: "tools", n: "14", label: "Mount Sinai tools" },
    { id: "sources", n: "15", label: "Sources" },
  ],

  hero: {
    eyebrow: "Patient Guide",
    title: "Understanding Localized Prostate Cancer",
    lead: "Reading your biopsy and MRI, turning PSA, Grade Group, and stage into a risk group, and comparing active surveillance, surgery, and radiation on the terms that matter to you — from the Mount Sinai Department of Urology, chaired by Dr. Ashutosh K. Tewari.",
    reassurance:
      "Localized prostate cancer rarely forces a same-week decision. The productive use of that time is confirming your pathology and imaging and naming the outcome you most want to protect.",
    chips: [
      "For patients and the people supporting them",
      "Record your own numbers as you go",
      "Works on any device",
    ],
  },
  // TODO(clinical review): verify every figure below against a current, citable
  // source (SEER / ACS) and confirm the phrasing "localized" matches how that
  // source defines the stage. ">99%" is widely reported as ~100% 5-year
  // relative survival for local/regional disease — pin the exact source + date.
  stats: [
    { num: ">99%", cap: "5-year relative survival for localized prostate cancer" },
    { num: "T1–T2", cap: "how most localized disease is staged" },
    { num: "1–5", cap: "Grade Groups, from lower-grade to highest-grade" },
    { num: "5", cap: "common treatment approaches to compare" },
  ],

  start: {
    eyebrow: "Start here",
    title: "Where to begin",
    intro:
      "This guide is for people whose cancer appears confined to the prostate or the tissue immediately around it — clinical stage T1 or T2, sometimes early T3 — and for the people helping them decide.",
    firstStep: {
      label: "Get these five things on one page",
      body: "Your PSA value and date, your Grade Group (and the Gleason score it came from), your clinical T stage, your MRI result including the PI-RADS score, and the risk group your team assigns. Every treatment conversation runs on these five inputs; walking in without them slows everything down.",
    },
    howToUse: [
      "Read Basics through Stage & risk group first — they decode the words in your reports.",
      "Use Treatment choices to see which options your risk group actually puts on the table, and what each one costs you.",
      "Fill in the diagnosis record in Your toolkit and bring it, plus the question checklist, to every appointment.",
      "Decide early which outcome you would protect first if forced to choose: cancer control, urinary control, erections, bowel function, or avoiding treatment altogether for now.",
    ],
    canCannot:
      "This guide explains the standard pathways and prepares you to decide with your team. It does not recommend a treatment for you — that needs clinicians who have seen your pathology slides, your imaging, and your full history.",
    languageNote:
      "This guide says \"men\" where the studies it draws on reported results that way. Anyone with a prostate — including transgender women and nonbinary people — can develop prostate cancer and may need this care.",
    epsaLabel: "Not yet diagnosed?",
    epsaBody:
      "If you are still deciding whether to start PSA testing, the Mount Sinai ePSA tool weighs your age, family history, symptoms, and any prior PSA or MRI results into an estimate of your risk of clinically significant prostate cancer, and whether testing is worth raising with your doctor.",
    epsaLinkText: "Open the ePSA risk tool",
    epsaUrl: "https://epsa.millionstrongmen.com/",
  },

  journey: {
    eyebrow: "The journey",
    title: "Six steps from diagnosis to follow-up",
    caption:
      "The path is not always linear — a second opinion, a pathology re-read, or a repeat biopsy can send you back a step, and that is often the right call.",
    steps: [
      { n: "1", title: "Confirm", detail: "Biopsy pathology + PSA" },
      { n: "2", title: "Map", detail: "Multiparametric MRI" },
      { n: "3", title: "Stratify", detail: "TNM stage + risk group" },
      { n: "4", title: "Compare", detail: "Options for that risk group" },
      { n: "5", title: "Decide", detail: "Shared plan with your team" },
      { n: "6", title: "Follow up", detail: "PSA monitoring + recovery" },
    ],
    localizedMeans:
      "\"Localized\" means every test so far points to cancer that is still inside the prostate capsule (stage T1–T2). \"Locally advanced\" (some T3–T4) means it has grown through the capsule, into the seminal vesicles, or into an adjacent structure. \"Regional\" means it has reached nearby pelvic lymph nodes. These distinctions change which treatments apply, so confirm exactly which one your report describes.",
    notOneTest:
      "The plan comes from combining the biopsy grade and extent, PSA and how fast it has moved, the digital rectal exam, MRI (and PSMA PET or bone imaging when risk is higher), your age and other health conditions, family and genetic history, and the outcome you most want to protect.",
    // TODO(clinical review): keep the survival framing qualitative until a cited
    // SEER/ACS figure and date are confirmed alongside `stats`.
    reassuringFact:
      "For cancer that is genuinely localized, long-term survival is high and death from the cancer within the first several years is uncommon. That is why there is usually room to get the pathology re-read, complete imaging, and take a second opinion before committing.",
  },

  basics: {
    eyebrow: "The essentials",
    title: "Prostate cancer basics",
    intro:
      "Almost all prostate cancer is adenocarcinoma — it starts in the gland cells that make seminal fluid, usually in the peripheral zone at the back of the prostate, near the rectum. Behavior ranges widely: some of these cancers would never cause harm in a person's lifetime, while others spread if untreated. Grade and extent are what separate the two.",
    anatomyCaption:
      "The walnut-sized prostate sits below the bladder and wraps around the top of the urethra. The seminal vesicles attach behind it; the nerve bundles that control erections run along its left and right edges; the rectum lies directly behind it. Every treatment decision is shaped by these neighbors.",
    dailyLife:
      "Because the erectile nerves, the urinary sphincter, and the rectum are millimeters from the gland, treating the cancer and preserving those functions are the same planning problem. MRI and biopsy maps are used to see where the cancer sits relative to each structure before choosing an approach.",
    symptoms:
      "Localized prostate cancer usually causes no symptoms — it is found through a PSA test or an exam, not because something feels wrong. Weak stream, frequency, and getting up at night are far more often benign prostatic enlargement, which is a separate condition. Report new urinary or bone symptoms, but do not read them as staging information.",
  },

  psa: {
    eyebrow: "The essentials",
    title: "PSA: a signal, not a diagnosis",
    intro:
      "PSA is a protein made by both normal and cancerous prostate cells, so it measures prostate activity, not cancer specifically. It rises with benign enlargement, prostatitis, a urinary infection, a recent catheter or biopsy, and even ejaculation in the prior day or two. It falls by roughly half on finasteride or dutasteride, which your team has to correct for. After a diagnosis, PSA becomes one of the three inputs — with grade and stage — that set your risk group.",
    factors: [
      { label: "Kinetics", a: "The slope over several readings — PSA velocity, and PSA doubling time once cancer is known — often carries more weight than any single value." },
      { label: "PSA density", a: "PSA divided by the prostate volume measured on MRI. A high value in a small gland is more concerning than the same PSA in a large one; density near or above 0.15 raises suspicion." },
      { label: "Gland size", a: "Benign enlargement adds PSA on its own, which is why a large prostate can produce a mildly elevated value with no cancer present." },
      { label: "Confounders", a: "Recent infection, instrumentation, ejaculation, 5-alpha-reductase inhibitors, and lab-to-lab assay variation all shift the number — repeat before acting on a surprise result." },
    ],
    testsThatFollow: [
      "A confirmatory PSA a few weeks later, after treating any infection, since a meaningful share of elevated values fall on their own.",
      "Multiparametric MRI, read as a PI-RADS score of 1 to 5, to locate suspicious areas before any biopsy.",
      "A blood or urine biomarker (for example 4Kscore, PHI, SelectMDx, or ExoDx) in borderline cases, to refine whether a biopsy is worthwhile.",
      "A targeted plus systematic prostate biopsy — the only test that establishes whether cancer is present and its Grade Group.",
    ],
    beforeTest: {
      label: "Before a PSA test",
      body: "Tell the lab about any recent urinary infection, catheter, cystoscopy, or biopsy, and about finasteride or dutasteride. Avoid ejaculation and vigorous cycling for 48 hours beforehand. If a value comes back high and you feel well, ask to repeat it before scheduling anything else.",
    },
  },

  diagnosis: {
    eyebrow: "Your diagnosis",
    title: "Reading your biopsy report",
    intro:
      "The biopsy report is the single most important document you own. It tells you the cancer's Grade Group, how many of the cores contained cancer and what fraction of each, which side of the gland is involved, and whether any higher-risk microscopic features are present. Treatment eligibility follows almost entirely from these details.",
    howDoneTitle: "How the biopsy is done",
    howDone:
      "A thin needle takes cores of tissue under ultrasound guidance. Modern biopsies are MRI-guided: the MRI is fused with live ultrasound so the needle can target each PI-RADS lesion, and a systematic set of 10 to 12 cores is taken as well, because MRI misses some cancers. The needle enters either through the rectum (transrectal) or through the skin behind the scrotum (transperineal); the transperineal route has a markedly lower infection risk and is increasingly the default.",
    prepareTitle: "Preparing for a biopsy",
    prepare: [
      "Take antibiotics if your doctor prescribes them.",
      "Tell your team about all medicines, especially blood thinners — some may need to be paused beforehand.",
      "If the biopsy is through the rectum, you may be asked to use an enema first.",
      "Arrange a ride home if you will have sedation or anesthesia.",
      "Ask what your results could mean and what the next steps would be either way.",
    ],
    whatToExpect: {
      label: "What to expect afterward",
      body: "Mild soreness and blood in the urine or semen for a few weeks are common and usually settle on their own. Seek urgent care for fever or chills, trouble urinating, severe pain, or heavy bleeding with clots — these can signal infection or another complication.",
    },
    gleasonIntro:
      "The pathologist grades the two most common architectural patterns in your cores on a 3-to-5 scale and writes them as a sum — the Gleason score, e.g. 3 + 4 = 7. The first number is the dominant pattern. Because 3 + 4 = 7 and 4 + 3 = 7 behave differently, the score is also mapped to a Grade Group from 1 to 5, which is the term your team will use. Grade Group is the strongest single predictor of how the cancer will behave.",
    tableHead: ["Grade Group", "Common Gleason score", "Plain-language meaning"],
    rows: [
      { id: "gg1", group: "1", gleason: "3 + 3 = 6", meaning: "No pattern 4 or 5. Does not spread while it stays Grade Group 1; active surveillance is the preferred management when stage and PSA are also low." },
      { id: "gg2", group: "2", gleason: "3 + 4 = 7", meaning: "Predominantly pattern 3 with a minority of pattern 4. Usually favorable intermediate risk; surveillance is still reasonable for selected cases with low volume and low PSA density." },
      { id: "gg3", group: "3", gleason: "4 + 3 = 7", meaning: "Pattern 4 now dominant. Behaves more aggressively than Grade Group 2; treatment is generally recommended." },
      { id: "gg4", group: "4", gleason: "4 + 4 = 8 (also 3+5, 5+3)", meaning: "High-grade. Treatment is recommended; staging imaging beyond MRI is often added." },
      { id: "gg5", group: "5", gleason: "9–10", meaning: "Any pattern 5. Highest grade; usually treated with combined or intensified therapy and full metastatic staging." },
    ],
    tableFoot:
      "The table is a simplification. A small amount of pattern 4, cribriform architecture, or a high tumor volume can move you between management options even within one Grade Group.",
    alsoLookFor: [
      "Number of positive cores out of the total, and the percentage of cancer in the most involved core — together these estimate tumor volume.",
      "Unilateral versus bilateral disease, and whether a targeted MRI lesion was confirmed on pathology.",
      "Cribriform or intraductal carcinoma, or perineural invasion — adverse features that can rule out surveillance and influence surgical planning even at Grade Group 2.",
      "ASAP (atypical small acinar proliferation) or high-grade PIN are not cancer but often warrant a repeat biopsy, usually with MRI targeting.",
    ],
    // TODO(clinical review): "roughly one in four ... higher grade" — biopsy
    // upgrading rates at prostatectomy range ~25–35% across series and depend
    // on biopsy technique (systematic vs MRI-fusion). Confirm the figure and
    // qualifier, or soften to "a meaningful share".
    worthAsking: {
      label: "Worth asking",
      body: "Can a genitourinary subspecialty pathologist re-read my slides before I decide? Grade Group is reproducible but not perfect between pathologists, and a biopsy samples a fraction of the gland — a meaningful share of cancers prove higher grade at surgery than the biopsy showed. A re-read changes management often enough to be worth the delay.",
    },
    ifNegativeTitle: "If the biopsy does not find cancer",
    ifNegative:
      "A negative biopsy lowers the probability of significant cancer but does not exclude it, since only part of the gland was sampled. Follow-up depends on why the biopsy was done: continued PSA monitoring if everything else was reassuring; a repeat MRI-targeted biopsy if a PI-RADS 4–5 lesion was not adequately sampled, if the PSA keeps climbing, if the exam is abnormal, or if you carry a BRCA2 or other high-risk germline variant. If PSA and MRI stay stable, intervals lengthen.",
  },

  staging: {
    eyebrow: "Your diagnosis",
    title: "Stage, imaging, and risk group",
    continuumTitle: "Three inputs, one risk group",
    continuumFoot: "PSA + Grade Group + clinical T stage → risk group. MRI, genomics, and your health then refine the plan.",
    tiers: [
      { id: "low", label: "Low", gist: "PSA < 10, Grade Group 1, T1–T2a — surveillance preferred" },
      { id: "int", label: "Intermediate", gist: "PSA 10–20, or Grade Group 2–3, or T2b–T2c — split into favorable and unfavorable" },
      { id: "high", label: "High", gist: "PSA > 20, or Grade Group 4–5, or T3–T4 — treatment, often multimodal" },
    ],
    clinicalStage:
      "Clinical T stage is your team's estimate of tumor extent before any surgery, from the exam, MRI, and biopsy. T1c means cancer found on biopsy after an elevated PSA with a normal exam — the most common presentation. T2 means a nodule felt or seen confined to the gland (T2a one lobe, T2c both). T3 means extension through the capsule (T3a) or into a seminal vesicle (T3b). N and M describe lymph nodes and distant spread and are 0 in truly localized disease.",
    riskGroup:
      "The NCCN and AUA risk groups take your PSA, Grade Group, and T stage and sort you into very low, low, favorable intermediate, unfavorable intermediate, high, or very high risk. The favorable/unfavorable split within intermediate risk is decisive: it often determines whether surveillance is still offered and whether radiation is paired with hormone therapy. Ask which subgroup you are in, not just \"intermediate.\"",
    imaging: [
      "Multiparametric MRI is standard before biopsy and before treatment — it locates the tumor, estimates whether it has reached the capsule, and guides nerve-sparing and radiation planning.",
      "PSMA PET has largely replaced CT and bone scan for detecting nodal or distant spread in unfavorable intermediate, high, and very high risk disease; it is not needed for low or favorable intermediate risk.",
      "A genomic classifier (Decipher, Prolaris, or Oncotype DX GPS) run on the biopsy tissue can reclassify borderline cases up or down when the decision is close.",
    ],
    sayItBack: {
      label: "Say it back",
      body: "Ask your clinician to name your risk group and subgroup, and to point to the exact PSA, Grade Group, and T stage that placed you there. If a genomic test was run, ask how its result changed — or did not change — the recommendation.",
    },
  },

  team: {
    eyebrow: "Making a decision",
    title: "Build the right care team",
    intro:
      "Surgery and radiation are delivered by different specialists who each see patients that did well on their own modality. That is exactly why a urologist and a radiation oncologist should both weigh in before you choose — a single-specialty recommendation is not a second opinion.",
    chairName: "Dr. Ashutosh K. Tewari",
    chairRole: "Chair, Milton and Carroll Petrie Department of Urology · Mount Sinai",
    chairBody:
      "Dr. Tewari is a urologic surgeon known for advancing robotic radical prostatectomy and athermal nerve-sparing technique aimed at preserving continence and erections, and for integrating MRI, micro-ultrasound, and molecular imaging into surgical planning. A surgical consultation here covers whether nerve-sparing is feasible on one or both sides for your tumor, and what continence and erectile recovery look like for a patient with your age, baseline function, and pathology — not a published average.",
    roles: [
      { label: "Urologic oncologist", a: "Confirms diagnosis and discusses surgery, surveillance, focal approaches, and urinary care." },
      { label: "Radiation oncologist", a: "Explains external-beam radiation, brachytherapy, schedules, and radiation-specific effects." },
      { label: "Medical oncologist", a: "May join for higher-risk disease, hormone therapy, systemic treatment, or clinical trials." },
      { label: "Radiologist + pathologist", a: "Interpret imaging and tissue — the evidence underlying your risk group." },
      { label: "Sexual medicine + pelvic health", a: "Help protect and restore sexual and urinary function before and after treatment." },
      { label: "Nurse, social worker + navigator", a: "Coordinate care and help with symptoms, logistics, insurance, and resources." },
    ],
    secondOpinionTitle: "A second opinion may be especially helpful when",
    secondOpinionItems: [
      "Pathology, imaging, or risk group is uncertain.",
      "The options carry very different quality-of-life tradeoffs.",
      "You are considering focal therapy or a clinical trial.",
      "Your priorities are not reflected in the recommendation you received.",
    ],
    msApproach: {
      label: "Mount Sinai approach",
      body: "Complex cases are taken to a multidisciplinary tumor board — urology, radiation oncology, medical oncology, radiology, and pathology reviewing the same slides and images together — so the recommendation you get reflects more than one specialty.",
    },
    prioritiesTitle: "Start with your priorities",
    prioritiesIntro:
      "When the options give similar cancer control, the decision is driven by which side effects you are least willing to accept and on what timeline. Age is one input among several — life expectancy, other illnesses, anatomy, baseline urinary and sexual function, and your own ranking of these outcomes all carry weight.",
    priorities: [
      { label: "Cancer control", a: "How much uncertainty can I live with? How do the options compare for my risk group?" },
      { label: "Urinary function", a: "What is my baseline function and my chance of short- or long-term leakage or irritation?" },
      { label: "Sexual function", a: "How important are erections, ejaculation, orgasm, fertility, and spontaneity to me?" },
      { label: "Bowel function", a: "What is my baseline bowel health and the chance of urgency, bleeding, or irritation?" },
      { label: "Time + convenience", a: "How many visits, how long is recovery, and what are the work or caregiving effects?" },
      { label: "Future options", a: "If the cancer returns, what treatments remain possible and what becomes more complex?" },
    ],
    decisionCheck: {
      label: "Decision check",
      body: "Before choosing, be able to explain: what happens next, the goal of treatment, the main alternatives, the most likely side effects, and the follow-up plan.",
    },
  },

  treatment: {
    eyebrow: "Treatment choices",
    title: "Compare the approaches",
    intro:
      "For most localized prostate cancer, more than one option gives similar cancer control, and the decision turns on side-effect profile and your priorities. Your risk group sets which options are on the table; the sections below lay out what each one involves. This is a discussion framework, not a recommendation.",
    byStageTitle: "What is usually on the table, by risk group",
    byStageIntro:
      "Risk group — from your PSA, Grade Group, and T stage — is the main filter. This maps the standard options for localized disease (per AUA/ASTRO and NCCN); your own plan depends on MRI findings, genomics, age, and health.",
    byStageRows: [
      {
        label: "Very low / low risk",
        a: "Active surveillance is the recommended management. Surgery or radiation remain available if you prefer treatment or if surveillance later shows progression.",
      },
      {
        label: "Favorable intermediate (Grade Group 1–2, one intermediate factor, < 50% cores positive)",
        a: "Active surveillance is still a reasonable choice for selected patients, often supported by a genomic classifier. Otherwise surgery or radiation alone; hormone therapy is generally not added.",
      },
      {
        label: "Unfavorable intermediate",
        a: "Surgery (with pelvic lymph node dissection if nodal risk is elevated), or radiation plus a short course of hormone therapy — roughly 4 to 6 months. PSMA PET is used for staging.",
      },
      {
        label: "High / very high risk",
        a: "Surgery with extended lymph node dissection, or radiation with 18 months to 3 years of hormone therapy, sometimes with a brachytherapy boost. Treated by a multidisciplinary team; enrollment in a trial is often appropriate.",
      },
      {
        label: "Beyond the prostate (locally advanced, node-positive, or recurrence)",
        a: "A different pathway — combinations of radiation, longer hormone therapy, and systemic agents. This guide covers localized disease; ask your team for guidance specific to your situation.",
      },
    ],
    byStageFoot:
      "A recurrence after surgery or radiation, or newly detected spread, reopens the decision on different terms — which is why your current stage and risk group are the reference point for everything that follows.",
    expandHint: "Select a card for how it works, tradeoffs, and what to ask.",
    paths: [
      {
        id: "as",
        n: "OPTION A",
        title: "Active surveillance",
        summary: "Closely monitor selected cancers; start treatment if there are signs of progression.",
        blocks: [
          {
            title: "Who may consider it",
            body: "The preferred approach for many people with very-low or low-risk prostate cancer — typically Grade Group 1, PSA under 10, and a limited amount of cancer on biopsy — with a life expectancy of about 10 years or more and comfort with ongoing monitoring. It is sometimes an option for carefully selected favorable intermediate-risk cancers, for example when only a small amount of Gleason pattern 4 is present, PSA density is low, or genomic tests suggest low risk.",
          },
          {
            title: "Confirming you are a good candidate",
            body: "Because a first biopsy can under-read a cancer, confirmatory testing is common before committing: a repeat biopsy (usually within 12–24 months), an MRI with PSA density, and sometimes a genomic test. Even with these, an aggressive cancer can occasionally go undetected.",
          },
          {
            title: "What monitoring may include",
            items: [
              "A PSA blood test roughly every 6 months.",
              "A clinical visit and, about once a year, an examination.",
              "MRI and repeat biopsy on a schedule your team sets, often every 1–3 years, sooner if something changes.",
              "Imaging and genomic tests support decisions but do not replace biopsy.",
            ],
          },
          {
            title: "When surveillance may change to treatment",
            items: [
              "A higher Grade Group on a repeat biopsy.",
              "A meaningful increase in the amount of cancer, or a concerning rise in PSA density.",
              "A new or growing suspicious area on MRI.",
              "Significant anxiety, or your own preference to treat despite stable results.",
            ],
          },
          {
            title: "Benefits and tradeoffs",
            items: [
              "Avoids or delays treatment-related urinary, sexual, and bowel effects, and keeps curative treatment available if the cancer changes.",
              "Requires reliable follow-up and repeat testing, and living with an untreated cancer can be emotionally difficult.",
              "Many men on surveillance eventually need treatment; a smaller number are found to have, or develop, a more aggressive cancer.",
            ],
          },
        ],
        callout: {
          label: "Not the same as watchful waiting",
          body: "Active surveillance aims to preserve the option of cure and uses regular testing. Watchful waiting is less intensive, is usually chosen when life expectancy is shorter or other health problems outweigh the cancer risk, and focuses on treating symptoms if they arise.",
        },
      },
      {
        id: "surgery",
        n: "OPTION B",
        title: "Surgery: radical prostatectomy",
        summary: "Removes the whole prostate and seminal vesicles, usually robot-assisted; pelvic lymph nodes are removed when nodal risk is elevated.",
        blocks: [
          {
            title: "How it is done at Mount Sinai",
            body: "Almost all radical prostatectomies here are robot-assisted — the surgeon works through keyhole incisions with a magnified 3D view and wristed instruments, and the patient typically goes home the next day with a catheter for one to two weeks. The prostate, seminal vesicles, and vasa are removed and the bladder is rejoined to the urethra. MRI, micro-ultrasound, and the biopsy map are used to plan where the dissection can stay close to the gland and where it needs a wider margin.",
          },
          {
            title: "What it gives you",
            items: [
              "Whole-gland pathology: the true Grade Group, margin status, and whether the cancer reached the capsule, seminal vesicles, or nodes — information no other option provides.",
              "A clear PSA endpoint: PSA should become undetectable within about six weeks, so any later rise is an unambiguous early signal.",
              "Radiation stays available afterward as salvage treatment if pathology is adverse or PSA rises.",
            ],
          },
          {
            title: "The tradeoffs",
            items: [
              "It is major surgery under general anesthesia, with a catheter and a recovery period measured in weeks.",
              "Urinary leakage is near-universal right after the catheter comes out and improves over 3 to 12 months for most; a minority have lasting stress incontinence that may need a sling or artificial sphincter.",
              "Erections depend on nerve-sparing and baseline function, and recovery takes 1 to 2 years when it happens; some men do not return to baseline and use medication or devices.",
              "Ejaculation ends permanently and natural fertility is lost; orgasm is usually still possible. Bank sperm beforehand if biological children matter to you.",
            ],
          },
          {
            title: "Nerve-sparing, graded",
            body: "The neurovascular bundles running along each side of the prostate carry the erectile nerves. Surgeons grade how close they stay to the gland — full, partial, or non-nerve-sparing — on each side separately, based on where the cancer sits. Sparing both sides gives the best functional odds; a bundle next to the tumor is sacrificed to avoid a positive margin. Athermal technique (no heat near the nerves) is used to reduce injury.",
          },
          {
            title: "Volume matters",
            body: "AUA/ASTRO guidance is explicit that continence and potency recovery, and positive-margin rates, correlate with how many of these operations a surgeon and center perform. It is reasonable to ask any surgeon their annual volume and their own outcome data.",
          },
        ],
        callout: {
          label: "Ask for your numbers, not the average",
          body: "Ask the surgeon to estimate your cancer control, your one-year continence, and your erectile recovery given your age, baseline function, and pathology — and which of those factors is pulling your estimate away from the published figures.",
        },
      },
      {
        id: "radiation",
        n: "OPTION C",
        title: "Radiation therapy",
        summary: "Delivers targeted radiation to the prostate, from outside the body or from sources placed inside it. Cancer control for localized disease is comparable to surgery.",
        blocks: [
          {
            title: "External-beam options",
            body: "Modern external-beam radiation is IMRT or VMAT with daily image guidance, and increasingly a hydrogel spacer placed between the prostate and rectum to protect the bowel. Schedules have shortened: moderate hypofractionation runs about 20 to 28 sessions over 4 to 6 weeks, and SBRT (ultra-hypofractionation) delivers 5 sessions over 1 to 2 weeks. ASTRO/ASCO/AUA guidance endorses the shorter courses for appropriately selected localized disease.",
          },
          {
            title: "Brachytherapy",
            body: "Radiation sources placed directly in the gland under anesthesia. LDR brachytherapy implants permanent seeds in a single procedure; HDR places temporary catheters for one or a few high-dose treatments. Either can be used alone for low or favorable intermediate risk, or as a boost added to external-beam radiation for higher-risk disease.",
          },
          {
            title: "What it gives you",
            items: [
              "No operation, no anesthesia for external-beam, and no immediate incontinence — early urinary control is usually preserved.",
              "Delivered as an outpatient while you keep working; SBRT and brachytherapy compress this to days.",
              "Erections are typically preserved longer than after surgery, though they decline over the following years.",
            ],
          },
          {
            title: "The tradeoffs",
            items: [
              "Urinary urgency, frequency, and a weaker stream are common during treatment and for weeks after; a hydrogel spacer does not prevent these.",
              "Bowel urgency, loose stools, or minor rectal bleeding can occur; serious rectal injury is rare with current technique and spacers.",
              "Erectile function declines gradually over 2 to 5 years rather than abruptly.",
              "PSA falls slowly and can briefly bounce; the prostate stays in place, so follow-up relies on a PSA trend rather than an undetectable value. Salvage surgery after radiation is possible but technically harder.",
              "Intermediate- and high-risk disease usually means adding hormone therapy, with its own side effects.",
            ],
          },
        ],
        callout: {
          label: "Ask the radiation oncologist",
          body: "Which technique and how many sessions; whether a rectal spacer and fiducial markers are used; whether hormone therapy is recommended and for how long; and how your gland size, urinary symptoms, and any prior pelvic surgery or bowel disease change your risk.",
        },
      },
      {
        id: "focal",
        n: "OPTION D",
        title: "Focal therapy and clinical trials",
        summary: "Ablates the part of the gland that contains the cancer, leaving the rest intact. Best evidence is for a single MRI-visible intermediate-risk lesion; long-term data are still maturing.",
        blocks: [
          {
            title: "Techniques in use",
            body: "HIFU (high-intensity focused ultrasound) and cryoablation are the most established; TULSA (MRI-guided transurethral ultrasound ablation), focal laser ablation, and irreversible electroporation are newer. AUA/ASTRO treats focal therapy as an option to discuss for select intermediate-risk patients, ideally within a trial or registry, not as an equivalent alternative to surgery or radiation.",
          },
          {
            title: "Questions that decide eligibility",
            items: [
              "Is the cancer a single lesion, clearly visible on MRI, confirmed by targeted and systematic biopsy, and away from the urethra and sphincter?",
              "What are this center's selection criteria, in-field and out-of-field recurrence rates, and re-treatment rate?",
              "What is the follow-up protocol — the whole prostate still needs PSA, MRI, and biopsy surveillance afterward?",
              "If cancer persists or recurs, does salvage surgery or radiation still work, and does insurance cover the ablation and the follow-up?",
            ],
          },
          {
            title: "Clinical trials",
            body: "Trials give access to newer imaging, treatment, or monitoring strategies and are worth asking about at any risk level. Ask what question the trial is testing, whether there is randomization and to what, what extra visits and costs are involved, and what happens after the study ends.",
          },
        ],
        callout: {
          label: "Not a smaller version of standard treatment",
          body: "Focal therapy trades whole-gland side effects for the risk of undertreating cancer the imaging did not show. It commits you to intensive lifelong monitoring of the untreated prostate.",
        },
      },
      {
        id: "hormone",
        n: "OPTION E",
        title: "Hormone therapy (ADT) with radiation",
        summary: "Androgen deprivation therapy removes the testosterone that fuels prostate cancer. In localized disease it is an add-on to radiation for higher-risk cases, not a treatment on its own.",
        blocks: [
          {
            title: "How it is given",
            body: "An LHRH agonist (leuprolide, goserelin) by injection every 1 to 6 months is the usual approach; a GnRH antagonist — injectable degarelix or oral relugolix — suppresses testosterone faster and may carry lower cardiovascular risk. A short course of an anti-androgen pill often covers the initial testosterone flare with agonists.",
          },
          {
            title: "How long, and why",
            body: "Added to radiation, ADT improves cancer control for unfavorable intermediate risk (about 4 to 6 months) and high risk (roughly 18 months to 3 years). It is not used with surgery in localized disease, and ADT alone does not cure otherwise-treatable localized cancer — it only delays it.",
          },
          {
            title: "Side effects to expect",
            items: [
              "Physical: hot flashes, fatigue, loss of muscle, weight gain around the middle, breast tenderness, and bone density loss over time.",
              "Sexual: loss of libido and erectile function while on treatment, usually partly recovering months after it ends.",
              "Metabolic and cardiovascular: higher blood sugar and cholesterol, and added cardiac risk — relevant if you already have heart disease.",
              "Mood, sleep, and concentration changes for some people.",
            ],
          },
          {
            title: "Set up supportive care first",
            body: "Before starting, it helps to review cardiac and diabetes risk with your primary doctor, get a baseline bone density scan with calcium and vitamin D as advised, and begin resistance plus aerobic exercise — the single most effective countermeasure to the muscle, metabolic, and fatigue effects.",
          },
        ],
        callout: {
          label: "Medication list",
          body: "Give your oncology team a full list of prescriptions, over-the-counter drugs, and supplements. Supplements marketed for prostate health have no proven anticancer effect and some interact with treatment.",
        },
      },
    ],
    compareTitle: "Compare the approaches",
    compareIntro:
      "Cancer control for low and intermediate risk is broadly similar across surveillance, surgery, and radiation — the columns that separate them are what happens to urinary, sexual, and bowel function, and on what timeline.",
    compareHead: ["Approach", "What it does", "Main advantage", "Main tradeoff"],
    compareRows: [
      { label: "Active surveillance", a: "Monitor with PSA, MRI, and biopsy; treat if it progresses", b: "No treatment side effects for as long as it is safe", c: "Ongoing testing; ~half eventually need treatment; small risk of missed progression" },
      { label: "Radical prostatectomy", a: "Remove the whole gland and seminal vesicles", b: "Whole-gland pathology and an undetectable PSA endpoint", c: "Surgery; early incontinence; erectile recovery over 1–2 years; ejaculation ends" },
      { label: "External-beam radiation", a: "IMRT/VMAT over 5–28 sessions", b: "No surgery; continence usually preserved early", c: "Urinary/bowel irritation; slow PSA decline; sexual decline over years; often needs ADT" },
      { label: "Brachytherapy", a: "Radioactive sources placed in the gland", b: "One or few procedures; highly conformal dose", c: "Urinary irritation/retention; eligibility limited by gland size and urinary symptoms" },
      { label: "Focal therapy", a: "Ablate the lesion, spare the rest of the gland", b: "Lower rates of incontinence and erectile loss", c: "Maturing evidence; variable coverage; whole-gland surveillance continues" },
    ],
    compareFoot:
      "ADT is added to radiation for unfavorable intermediate and high risk. High-risk disease may combine external-beam radiation, a brachytherapy boost, and long-course ADT.",
    fairQuestionsTitle: "Questions that keep a comparison honest",
    fairQuestions: [
      "For my risk group, is cancer control actually different between these options, or mainly the side effects?",
      "Given my age, baseline function, and pathology, what are my personal odds of cancer control and of each major side effect?",
      "How will we know it worked, and what is the salvage plan if it does not?",
      "How many weeks do I realistically have to decide?",
      "If my top priority were ______, which option would you pick, and why?",
    ],
  },

  quality: {
    eyebrow: "Quality of life",
    title: "Urinary, bowel, and sexual recovery",
    intro:
      "These outcomes are more manageable when they are measured before treatment and worked on early. A baseline assessment — often with a validated questionnaire such as the EPIC or IIEF — gives you and your team a reference point to track against.",
    blocks: [
      {
        title: "Urinary",
        items: [
          "Pelvic floor physical therapy, started before surgery and resumed once the catheter is out, shortens the time to continence.",
          "Radiation-related frequency, urgency, and burning are usually worst in the weeks around treatment; alpha-blockers, anti-inflammatories, and fluid timing help.",
          "Leakage that is not improving by 6 to 12 months after surgery, new retention, visible blood, or recurrent infections warrant a urology work-up rather than waiting it out.",
        ],
      },
      {
        title: "Bowel",
        items: [
          "External-beam radiation can cause urgency, loose or mucusy stools, and mild rectal bleeding, mostly temporary; a hydrogel rectal spacer lowers the dose to the rectum.",
          "Rectal bleeding that persists or recurs is evaluated on its own — it is not automatically attributed to radiation.",
          "Inflammatory bowel disease, prior pelvic radiation, or significant hemorrhoids change the risk calculus and are worth raising before choosing radiation.",
        ],
      },
      {
        title: "Sexual",
        items: [
          "Recovery covers erections, desire, orgasm, ejaculation (which ends after prostatectomy), penile length, and Peyronie-type curvature — each is addressed separately.",
          "Penile rehabilitation may combine a PDE5 inhibitor (sildenafil, tadalafil), a vacuum erection device, intracavernosal injections, and, if those fall short, a penile implant.",
          "A partner can be part of these conversations if you want; the clinic follows your preference on that.",
        ],
      },
    ],
    fertility: {
      label: "Fertility",
      body: "Surgery ends natural fertility and radiation and ADT can impair it. If biological children are a possibility, bank sperm before treatment starts — it cannot be done retroactively.",
    },
  },

  recovery: {
    eyebrow: "Recovery + follow-up",
    title: "What happens after treatment",
    intro:
      "Follow-up is built around PSA, but the expected pattern is different for each treatment. Keep the written discharge plan and the after-hours number, and log every PSA result with its date in one place — the trend is what your team reads.",
    blocks: [
      {
        title: "After surgery",
        items: [
          "The catheter stays in about 1 to 2 weeks; a cystogram is sometimes done before it is removed.",
          "Discharge covers lifting limits, walking to prevent clots, stool softeners, and incision care; most men are back to desk work in 2 to 4 weeks.",
          "Final pathology (margins, stage, nodes) and the first PSA at about 6 weeks set the follow-up schedule. Adjuvant or early salvage radiation is discussed if margins are positive or PSA is detectable.",
        ],
      },
      {
        title: "During and after radiation",
        items: [
          "Most sessions need a comfortably full bladder and an empty rectum; the team gives a prep routine.",
          "Urinary and bowel symptoms and fatigue often peak in the week or two after the course ends, then ease over 1 to 2 months.",
          "PSA drifts down over 18 to 24 months to a nadir. A rise of 2 ng/mL above that nadir (the Phoenix definition) is what defines recurrence — a small temporary 'bounce' before then is common and not failure.",
        ],
      },
      {
        title: "Long-term monitoring",
        body: "PSA every 3 to 6 months for the first years, then annually. After surgery the target is undetectable; after radiation it is a stable low nadir. Your clinician names the value or trend that would trigger imaging (usually PSMA PET) and a change in plan.",
      },
    ],
    callUrgently: {
      label: "Call urgently",
      body: "Chest pain, trouble breathing, fainting, a swollen or painful calf, inability to urinate, heavy bleeding or large clots, fever or chills after a procedure, or severe worsening pain — these need urgent care, along with anything specifically flagged in your discharge instructions.",
    },
  },

  living: {
    eyebrow: "Whole-person care",
    title: "Healthy living and emotional wellbeing",
    intro:
      "Habits do not substitute for treatment and none can guarantee the cancer stays away. What they reliably do is speed recovery, protect continence and erectile recovery, and blunt the metabolic and muscle effects of hormone therapy — which is why the care team treats them as part of the plan.",
    basics: [
      { label: "Move", a: "Combine aerobic exercise with resistance training. This is the best-evidenced countermeasure to ADT-related muscle loss, fatigue, bone loss, and insulin resistance, and it supports pelvic recovery after surgery." },
      { label: "Eat", a: "A mostly plant-based pattern — vegetables, fruit, whole grains, legumes, nuts, fish — supports cardiovascular and metabolic health, which matters more once ADT is involved. Adjust for diabetes, kidney disease, or other conditions." },
      { label: "Protect sleep", a: "Hot flashes, nocturia, and anxiety all fragment sleep after treatment; each is treatable, so raise them rather than adapting around them." },
      { label: "Tobacco and alcohol", a: "Smoking worsens both cancer and treatment outcomes — ask for a cessation program. Keep alcohol within the limits your clinicians set." },
    ],
    emotionalTitle: "Distress is a tracked part of cancer care",
    emotionalBody:
      "Anxiety spikes around PSA checks ('scanxiety'), and low mood, anger, and decision regret are common for patients and partners alike. Oncology social work, individual counseling, peer support groups, and sexual-health counseling are all part of the service. When distress disrupts sleep, function, relationships, or safety, tell the team so support can be arranged quickly.",
    crisis: {
      label: "If you are in immediate emotional danger",
      body: "In the United States, call or text 988 for the Suicide & Crisis Lifeline, or call 911 / go to the nearest emergency department for immediate danger.",
    },
  },

  genetics: {
    eyebrow: "Family health",
    title: "Genetics and inherited risk",
    intro:
      "Inherited variants — most importantly in BRCA2, and also BRCA1, ATM, CHEK2, PALB2, and the Lynch syndrome genes — raise the risk of aggressive prostate cancer and of related cancers in relatives. A germline result can also change your own management: BRCA2 in particular argues against surveillance for borderline disease and opens PARP-inhibitor options if the cancer ever advances.",
    counselingWhenTitle: "Genetic counseling is indicated when",
    counselingWhen: [
      "The prostate cancer is high, very high, regional, or metastatic risk — germline testing is guideline-recommended regardless of family history here.",
      "Close relatives have had prostate, breast, ovarian, pancreatic, or colorectal cancer, or the family is of Ashkenazi Jewish ancestry.",
      "Cancers appeared at young ages, or one relative had more than one primary cancer.",
      "Tumor sequencing flagged a variant that could be inherited.",
    ],
    twoKindsTitle: "Germline versus tumor testing",
    twoKindsBody:
      "Germline testing uses blood or saliva to find variants you were born with — these carry implications for your children and siblings. Tumor (somatic) testing sequences the cancer itself to find treatment targets; when it reports a variant in a gene like BRCA2, that result is followed up with germline testing to see whether it was inherited.",
    beforeAfterTitle: "Working with a genetic counselor",
    beforeAfterBody:
      "A counselor helps choose the right panel, interprets variants of uncertain significance, and walks through the US GINA protections and their limits (GINA does not cover life, disability, or long-term-care insurance). A negative result in the setting of a strong family history does not remove that history from your risk picture.",
    familyAction: {
      label: "Family action",
      body: "Relatives need the actual lab report, not a summary — it names the exact variant they can be tested for. Encourage first-degree relatives to take it to their own clinicians to plan earlier or more frequent screening.",
    },
  },

  glossary: {
    eyebrow: "Your toolkit",
    title: "Glossary",
    intro: "Plain-language definitions for the terms you'll hear most.",
    searchPlaceholder: "Search terms…",
    empty: "No terms match your search.",
    terms: [
      { term: "PSA", def: "Prostate-specific antigen — a protein made by normal and cancerous prostate cells and measured by blood test. An elevated value does not by itself prove cancer." },
      { term: "PSA density", def: "PSA divided by the prostate volume from MRI. Values near or above 0.15 raise the suspicion that an elevation is due to cancer rather than gland size." },
      { term: "PSA doubling time", def: "How long PSA takes to double, calculated from serial values. A short doubling time signals a more active cancer or recurrence." },
      { term: "Gleason score", def: "The sum of the two most common growth patterns a pathologist sees, written as e.g. 3 + 4 = 7. The first number is the dominant pattern." },
      { term: "Grade Group", def: "A 1–5 scale derived from the Gleason score; it is the strongest single predictor of how the cancer will behave. Grade Group 1 does not spread while it stays Grade Group 1." },
      { term: "PI-RADS", def: "A 1–5 score for how suspicious a lesion looks on prostate MRI. 4 and 5 usually prompt a targeted biopsy; 1 and 2 are reassuring." },
      { term: "Clinical (T) stage", def: "The pre-surgery estimate of tumor extent from exam, MRI, and biopsy. T1c = found on biopsy after high PSA; T2 = confined nodule; T3 = through the capsule or into a seminal vesicle." },
      { term: "TNM", def: "Staging system for the primary tumor (T), lymph nodes (N), and distant spread (M). Truly localized disease is N0 M0." },
      { term: "Risk group", def: "PSA, Grade Group, and T stage combined (NCCN/AUA) into very low through very high risk. Intermediate risk splits into favorable and unfavorable, which changes treatment." },
      { term: "Genomic classifier", def: "A test (Decipher, Prolaris, Oncotype DX GPS) run on biopsy tissue that estimates aggressiveness and can reclassify borderline cases." },
      { term: "Extraprostatic extension", def: "Cancer growing through the prostate capsule into surrounding fat — pathologic stage T3a." },
      { term: "Positive margin", def: "Cancer cells found at the inked cut edge of the removed prostate, meaning some may have been left behind; may lead to added radiation." },
      { term: "Localized", def: "Every test points to cancer confined within the prostate capsule (T1–T2)." },
      { term: "Locally advanced", def: "Growth through the capsule, into a seminal vesicle, or into an adjacent structure (some T3–T4)." },
      { term: "Active surveillance", def: "Structured monitoring with PSA, MRI, and repeat biopsy, with curative treatment held in reserve for signs of progression." },
      { term: "Watchful waiting", def: "Lighter monitoring, chosen when life expectancy or other illness outweighs the cancer risk; focuses on treating symptoms if they arise." },
      { term: "Radical prostatectomy", def: "Surgical removal of the whole prostate and seminal vesicles, usually robot-assisted, sometimes with a pelvic lymph node dissection." },
      { term: "Neurovascular bundle", def: "The paired strips of nerves and vessels along each side of the prostate that carry the erectile nerves; the target of nerve-sparing." },
      { term: "Nerve-sparing", def: "Dissecting close to the prostate to preserve the neurovascular bundle, graded per side; a bundle next to tumor is sacrificed to avoid a positive margin." },
      { term: "IMRT / VMAT", def: "Intensity-modulated external-beam radiation with daily image guidance that conforms the dose to the prostate." },
      { term: "Hypofractionation / SBRT", def: "Fewer, larger radiation sessions — about 20–28 for moderate hypofractionation, 5 for SBRT — with cancer control comparable to longer courses." },
      { term: "Brachytherapy", def: "Radiation from sources placed in the gland: permanent LDR seeds, or temporary HDR catheters. Used alone or as a boost with external-beam." },
      { term: "Hydrogel spacer", def: "A temporary gel injected between the prostate and rectum before radiation to lower the dose to the bowel." },
      { term: "ADT", def: "Androgen deprivation therapy — an LHRH agonist or GnRH antagonist that removes the testosterone prostate cancer depends on. Added to radiation for higher-risk localized disease." },
      { term: "Biochemical recurrence", def: "A rising PSA after treatment: any detectable value after surgery, or nadir + 2 ng/mL after radiation (the Phoenix definition)." },
      { term: "PSA bounce", def: "A small, temporary PSA rise in the first two years after radiation that settles on its own and does not mean failure." },
      { term: "Focal therapy", def: "Ablating just the part of the gland with cancer (HIFU, cryoablation, TULSA), leaving the rest — with continued whole-gland surveillance." },
      { term: "PSMA PET", def: "A scan targeting a protein on most prostate cancer cells; used to stage unfavorable intermediate and higher risk disease, and to find recurrence." },
      { term: "Multiparametric MRI", def: "An MRI combining several sequences to find and score suspicious areas before biopsy and to plan treatment." },
      { term: "Transperineal biopsy", def: "Biopsy through the skin behind the scrotum rather than the rectum; markedly lower infection risk." },
      { term: "Genitourinary pathologist", def: "A pathologist who subspecializes in prostate and urinary-tract tissue; a re-read can change Grade Group." },
      { term: "Germline testing", def: "Blood or saliva testing for inherited variants (e.g. BRCA2). Affects relatives and can change your own treatment options." },
    ],
  },

  checklist: {
    eyebrow: "Your toolkit",
    title: "Your toolkit",
    intro:
      "Bring these to your next appointment. Check off questions as you cover them; the diagnosis record and your progress stay on this device.",
    progress: "covered",
    reset: "Reset",
    questionsTitle: "Questions for your next appointment",
    questions: [
      { id: "q1", text: "What is my exact Grade Group, clinical T stage, PSA density, and risk subgroup (favorable or unfavorable if intermediate)?" },
      { id: "q2", text: "Should my biopsy slides be re-read by a GU pathologist, and do I need repeat or additional imaging (MRI, PSMA PET)?" },
      { id: "q3", text: "Would a genomic classifier (Decipher, Prolaris, Oncotype) change the recommendation for me?" },
      { id: "q4", text: "Which options are medically reasonable for me, and which are off the table — and why?" },
      { id: "q5", text: "If I chose active surveillance today, what exactly would the monitoring schedule and triggers to treat be?" },
      { id: "q6", text: "For a patient with my age, baseline function, and pathology, what are your own cancer-control, continence, and erectile-recovery results?" },
      { id: "q7", text: "Is nerve-sparing feasible on one or both sides for my tumor?" },
      { id: "q8", text: "If radiation: which schedule, is a rectal spacer used, and is hormone therapy recommended — for how long?" },
      { id: "q9", text: "How would treatment affect fertility, erections, orgasm, ejaculation, urinary control, and bowel function, and on what timeline?" },
      { id: "q10", text: "What supportive care (pelvic floor PT, sperm banking, bone health, exercise) should start before treatment?" },
      { id: "q11", text: "Is a second opinion, multidisciplinary review, or clinical trial appropriate for me?" },
      { id: "q12", text: "How many weeks do I safely have to decide?" },
    ],
    teachBack: {
      label: "Teach-back",
      body: "Before leaving, say: \"I want to make sure I understood. My cancer is ______. The reasonable options are ______. The next step is ______ by ______.\"",
    },
    recordTitle: "My diagnosis and decision record",
    recordIntro: "Fill this in as you learn your numbers. It stays on this device.",
    recordFields: [
      { id: "r_dx_date", label: "Date of diagnosis" },
      { id: "r_psa", label: "PSA and date" },
      { id: "r_grade", label: "Grade Group / Gleason score" },
      { id: "r_stage", label: "Clinical stage" },
      { id: "r_risk", label: "Risk group" },
      { id: "r_mri", label: "MRI findings / PI-RADS" },
      { id: "r_imaging", label: "Other imaging" },
      { id: "r_genomic", label: "Genomic / biomarker tests" },
      { id: "r_genetic", label: "Genetic counseling / germline test" },
      { id: "r_plan", label: "Chosen plan and start date" },
    ],
    prioritiesLabel: "My top three priorities",
    careTeamLabel: "My care team (name / phone / portal)",
    careTeamRoles: ["Urology", "Radiation oncology", "Nurse / navigator", "After-hours contact"],
    recordSavedNote: "Saved on this device only — not sent anywhere.",
  },

  sources: {
    eyebrow: "Sources",
    title: "Trusted information and review notes",
    intro:
      "Writing, organization, decision tools, diagrams, and visual system are original to this guide. Clinical content follows the AUA/ASTRO Clinically Localized Prostate Cancer guideline (2022, amended 2026), NCCN Prostate Cancer guidelines, the EAU-EANM-ESTRO-ESUR-ISUP-SIOG guideline, the ASTRO/ASCO/AUA hypofractionation guideline, and NCI PDQ patient summaries. Every figure and recommendation here is pending verification against current Mount Sinai protocols.",
    groups: [
      {
        heading: "Clinical practice guidelines",
        refs: [
          {
            cite: "Eastham JA, Auffenberg GB, Barocas DA, et al. Clinically localized prostate cancer: AUA/ASTRO guideline, part I — introduction, risk assessment, staging, and risk-based management. J Urol. 2022;208(1):10–18.",
            url: "https://www.auanet.org/guidelines-and-quality/guidelines/clinically-localized-prostate-cancer",
          },
          {
            cite: "Eastham JA, Auffenberg GB, Barocas DA, et al. Clinically localized prostate cancer: AUA/ASTRO guideline, part II — principles of active surveillance, principles of surgery, and follow-up. J Urol. 2022;208(1):19–25.",
            url: "https://www.auanet.org/guidelines-and-quality/guidelines/clinically-localized-prostate-cancer",
          },
          {
            cite: "Eastham JA, Auffenberg GB, Barocas DA, et al. Clinically localized prostate cancer: AUA/ASTRO guideline, part III — principles of radiation and future directions. J Urol. 2022;208(1):26–33.",
            url: "https://www.auanet.org/guidelines-and-quality/guidelines/clinically-localized-prostate-cancer",
          },
          {
            cite: "Schaeffer EM, Srinivas S, Adra N, et al. NCCN Guidelines Insights: Prostate Cancer, Version 3.2024. J Natl Compr Canc Netw. 2024;22(3):140–150. PMID: 38626801.",
            url: "https://pubmed.ncbi.nlm.nih.gov/38626801/",
          },
          {
            cite: "Cornford P, et al. EAU-EANM-ESTRO-ESUR-ISUP-SIOG Guidelines on Prostate Cancer — 2024 Update. Part I: screening, diagnosis, and local treatment with curative intent. Eur Urol. 2024;86(2):148–163.",
            url: "https://uroweb.org/guidelines/prostate-cancer",
          },
          {
            cite: "American Urological Association / ASTRO. Clinically Localized Prostate Cancer: AUA/ASTRO Guideline (2022; amended 2026) — overview and full text.",
            url: "https://www.auanet.org/guidelines-and-quality/guidelines/clinically-localized-prostate-cancer",
          },
          {
            cite: "Morgan SC, Hoffman K, Loblaw DA, et al. Hypofractionated Radiation Therapy for Localized Prostate Cancer: An ASTRO, ASCO, and AUA Evidence-Based Guideline. J Clin Oncol / Pract Radiat Oncol. 2018 (with subsequent updates).",
            url: "https://www.astro.org/provider-resources/guidelines/prostate-cancer-hypofractionation",
          },
          {
            cite: "Shore ND, Saad F, Cookson MS, et al. Oral Relugolix for Androgen-Deprivation Therapy in Advanced Prostate Cancer (HERO trial). N Engl J Med. 2020;382:2187–2196.",
            url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2004325",
          },
        ],
      },
      {
        heading: "Patient-education references",
        refs: [
          {
            cite: "National Cancer Institute. Prostate Cancer Treatment (PDQ) — Patient Version.",
            url: "https://www.cancer.gov/types/prostate/patient/prostate-treatment-pdq",
          },
          {
            cite: "National Cancer Institute. Prostate-Specific Antigen (PSA) Test.",
            url: "https://www.cancer.gov/types/prostate/psa-fact-sheet",
          },
          {
            cite: "National Cancer Institute. Genetics of Prostate Cancer (PDQ).",
            url: "https://www.cancer.gov/types/prostate/hp/prostate-genetics-pdq",
          },
          {
            cite: "American Cancer Society. Key Statistics and Survival Rates for Prostate Cancer.",
            url: "https://www.cancer.org/cancer/types/prostate-cancer.html",
          },
          {
            cite: "Mount Sinai Health System. Prostate cancer care and multidisciplinary program overview.",
            url: "https://www.mountsinai.org/care",
          },
        ],
      },
    ],
    reviewTitle: "Required review before publication",
    reviewItems: [
      "Confirm all clinical language against current Mount Sinai protocols and specialist consensus.",
      "Confirm logo minimum size, clear space, and reproduction against current Mount Sinai Brand Center standards.",
      "Confirm official center name, locations, appointment pathways, phone numbers, QR codes, and URLs.",
      "Complete accessibility, reading-level, legal, privacy, translation, and print-production review.",
    ],
    version:
      "Draft created August 27, 2026. Review source dates and update the guide at least annually or when practice standards change.",
  },

  footer: {
    fine: "Education and shared decision-making only — this guide does not replace your care team. Treatment decisions depend on your own pathology, imaging, and health history and should be made with clinicians who have reviewed them. Any figures are population-level and may not reflect your individual outcome. This is a draft pending Mount Sinai clinical, brand, legal, and accessibility review.",
    brandline: "Mount Sinai Health System · Milton and Carroll Petrie Department of Urology · The Tisch Cancer Institute",
    contact: "mountsinai.org · 1-800-MD-SINAI",
  },

  chat: {
    launch: "Ask a question",
    title: "Ask a question",
    subtitle: "Quick answers from this guide",
    intro:
      "Ask a quick question about anything in this guide — PSA, Grade Group, staging, treatment options, side effects, recovery, or genetics.",
    disclaimer:
      "This is an automated assistant, not a member of the Mount Sinai clinical team. It does not give medical advice about your specific case.",
    placeholder: "Type a question…",
    send: "Send",
    close: "Close",
    offlineNote: "Offline answer from the guide — the assistant is unavailable right now.",
    moreHelp:
      "Have more questions after reading? You can book a separate live session — Chat with Dr. Tewari (AI) — for a fuller conversation.",
    suggestions: [
      "What does my Grade Group mean?",
      "How do the treatment options compare?",
      "What is active surveillance?",
      "What should I ask before a PSA test?",
    ],
  },
};

// TODO(i18n): translate for es, zh, hi, it, fr, pt, pt-BR, ar, tr, ru, mr, bn.
// Until each is reviewed by the clinical + translation teams, fall back to English.
const LOCALES: Partial<Record<LangCode, GuideContent>> = {
  en: EN,
};

export function getGuideContent(lang: LangCode): GuideContent {
  return LOCALES[lang] ?? EN;
}

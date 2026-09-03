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
    portraitCaption: string;
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
    chairTitles: string[];
    chairBody: string;
    chairSourceUrl: string;
    chairSourceLabel: string;
    roles: CmpRow[];
    secondOpinionTitle: string;
    secondOpinionItems: string[];
    msApproach: Callout;
    prioritiesTitle: string;
    prioritiesIntro: string;
    priorities: CmpRow[];
    decisionCheck: Callout;
    facultyTitle: string;
    facultyIntro: string;
    facultyNote: string;
    faculty: {
      name: string;
      creds: string;
      role: string;
      focus: string;
      url: string;
    }[];
    msCare: {
      title: string;
      intro: string;
      items: CmpRow[];
      contactTitle: string;
      contactLines: string[];
      sourceUrl: string;
      sourceLabel: string;
    };
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
    lead: "A step-by-step guide to a prostate cancer diagnosis — the tests, the terms, your treatment choices, recovery, and the questions worth asking — from the Mount Sinai Department of Urology, led by Dr. Ashutosh K. Tewari.",
    reassurance:
      "A diagnosis can feel urgent. Your decision does not have to feel rushed. The right plan begins with understanding your cancer and your priorities.",
    portraitCaption:
      "Ashutosh K. Tewari, MBBS, MCh, FRCS (Hon.) — Professor and System Chair, Milton and Carroll Petrie Department of Urology",
    startLabel: "Start the guide",
    continueLabel: "Continue where you left off",
    highlights: [
      { label: "16 short chapters", text: "one at a time, in plain language" },
      { label: "Built to write in", text: "check off questions, save your diagnosis record" },
      { label: "Ask as you go", text: "a quick-answer assistant grounded in this guide" },
    ],
    footNote:
      "For general education and shared decision-making. This draft is pending medical review and does not replace your care team.",
  },

  tools: {
    eyebrow: "Your toolkit",
    title: "Mount Sinai prostate tools",
    intro:
      "Two research tools from the Department of Urology sit alongside this guide, for different points in the journey.",
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
    lead: "A clear guide to diagnosis, treatment choices, recovery, and the questions that matter most — from the Mount Sinai Department of Urology, led by Dr. Ashutosh K. Tewari, a pioneer of robotic prostate surgery.",
    reassurance:
      "A diagnosis can feel urgent. Your decision does not have to feel rushed. The right plan begins with understanding your cancer and your priorities.",
    chips: [
      "For patients and the people supporting them",
      "Written to be written in — record your own answers",
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
    title: "You are not alone",
    intro:
      "This guide is designed for people with cancer that appears confined to the prostate or nearby tissues, and for the families and friends supporting them.",
    firstStep: {
      label: "The most important first step",
      body: "Know your PSA, Grade Group, clinical stage, imaging results, and risk group. These pieces work together; no single number tells the whole story.",
    },
    howToUse: [
      "Read the essentials chapters first to understand the language in your reports.",
      "Use the treatment chapters to compare approaches and tradeoffs.",
      "Bring the toolkit — questions and your diagnosis record — to appointments.",
      "Write down what matters most to you: cancer control, urinary function, sexual function, bowel function, recovery time, convenience, fertility, and peace of mind.",
    ],
    canCannot:
      "This guide can help you understand common pathways and prepare for shared decision-making. It cannot recommend a specific treatment or replace advice from clinicians who know your full history.",
    languageNote:
      "This guide uses \"men\" when summarizing studies that reported results that way. Anyone with a prostate — including transgender women and nonbinary people — may need prostate care.",
    epsaLabel: "Not yet diagnosed?",
    epsaBody:
      "If you are weighing whether to start PSA testing, the Mount Sinai ePSA tool estimates your risk of clinically significant prostate cancer and whether a PSA test is worth discussing with your doctor.",
    epsaLinkText: "Open the ePSA risk tool",
    epsaUrl: "https://epsa.millionstrongmen.com/",
  },

  journey: {
    eyebrow: "The journey",
    title: "Six steps from diagnosis to follow-up",
    caption:
      "Your path may move back and forth. A second opinion or more testing can be part of good decision-making.",
    steps: [
      { n: "1", title: "Confirm", detail: "Pathology + PSA" },
      { n: "2", title: "Map", detail: "MRI / imaging" },
      { n: "3", title: "Stratify", detail: "Stage + risk group" },
      { n: "4", title: "Compare", detail: "Benefits + tradeoffs" },
      { n: "5", title: "Decide", detail: "Shared plan" },
      { n: "6", title: "Follow up", detail: "Monitoring + recovery" },
    ],
    localizedMeans:
      "Localized prostate cancer generally means that available testing suggests the cancer is confined to the prostate. \"Locally advanced\" or \"regional\" may mean growth just outside the prostate or into nearby structures or lymph nodes. Your clinician may use TNM stage, a risk group, or both.",
    notOneTest:
      "Your team combines pathology, PSA, examination, MRI and other imaging when needed, overall health, life expectancy, family history, and what matters most to you.",
    // TODO(clinical review): same figure as `stats` — keep both in sync with one cited source.
    reassuringFact:
      "Five-year relative survival for localized prostate cancer is greater than 99%. Statistics describe groups, not individual outcomes, but they help explain why there is often time for thoughtful decision-making.",
  },

  basics: {
    eyebrow: "The essentials",
    title: "Prostate cancer basics",
    intro:
      "Prostate cancer begins when cells in the prostate grow in an uncontrolled way. Many prostate cancers grow slowly; others need prompt treatment.",
    anatomyCaption:
      "The prostate sits below the bladder and surrounds part of the urethra. The bladder stores urine; the urethra carries urine out.",
    dailyLife:
      "Nearby are nerves, muscles, blood vessels, the rectum, and structures involved in erections, ejaculation, and urinary control. Treatment planning aims to control cancer while protecting these functions whenever safely possible.",
    symptoms:
      "Early prostate cancer often causes no symptoms. Urinary changes are common as people age and are frequently caused by benign prostate enlargement rather than cancer. Report new symptoms, but do not assume they identify the cause.",
  },

  psa: {
    eyebrow: "The essentials",
    title: "PSA: useful, but not a diagnosis",
    intro:
      "Prostate-specific antigen (PSA) is a protein made by prostate tissue. A blood test can detect elevated PSA, but an elevated value does not by itself prove cancer. PSA can also rise with benign enlargement, inflammation, infection, recent procedures, and other factors.",
    factors: [
      { label: "Trend", a: "How PSA changes over time can matter more than a single result." },
      { label: "Prostate size", a: "A larger prostate can produce more PSA without cancer." },
      { label: "Density", a: "PSA density relates PSA to prostate volume, often measured on MRI or ultrasound." },
      { label: "Context", a: "Age, medications, inflammation, procedures, and lab variation can affect interpretation." },
    ],
    testsThatFollow: [
      "Repeat PSA and clinical examination when appropriate.",
      "Multiparametric MRI to look for suspicious areas and help guide biopsy.",
      "Biomarker or genomic tests in selected situations when they may change a decision.",
      "Prostate biopsy to determine whether cancer is present and, if so, its grade.",
    ],
    beforeTest: {
      label: "Before a PSA test",
      body: "Ask whether recent infection, ejaculation, cycling, urinary procedures, or medications could affect your result — and whether any preparation is recommended for you.",
    },
  },

  diagnosis: {
    eyebrow: "Your diagnosis",
    title: "Reading your biopsy report",
    intro:
      "A biopsy is the definitive way to confirm whether prostate cancer is present. A pathologist examines tissue removed during biopsy and reports the type, grade, amount, and location of cancer.",
    howDoneTitle: "How the biopsy is done",
    howDone:
      "Small tissue samples are taken with ultrasound guidance, often combined with MRI images to target suspicious areas (a \"fusion\" biopsy). Samples may be taken through the rectum or through the perineum, the skin between the scrotum and anus; the perineal route generally carries a lower infection risk. Sampling both targeted lesions and a systematic set of cores is the most thorough approach. No biopsy method finds every cancer.",
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
      "Most prostate cancers are adenocarcinomas. The pathologist identifies the two most common growth patterns. Their Gleason patterns are added, and the result is also translated into a Grade Group from 1 to 5. Higher Grade Groups generally indicate more aggressive-looking cancer.",
    tableHead: ["Grade Group", "Common Gleason score", "Plain-language meaning"],
    rows: [
      { id: "gg1", group: "1", gleason: "3 + 3 = 6", meaning: "Lower grade; active surveillance is often preferred when other findings are low risk." },
      { id: "gg2", group: "2", gleason: "3 + 4 = 7", meaning: "Mostly pattern 3 with some pattern 4; often called favorable intermediate in the right context." },
      { id: "gg3", group: "3", gleason: "4 + 3 = 7", meaning: "More pattern 4; generally behaves differently from Grade Group 2." },
      { id: "gg4", group: "4", gleason: "4 + 4 = 8 (and selected patterns)", meaning: "High-grade disease; treatment is usually discussed." },
      { id: "gg5", group: "5", gleason: "9–10", meaning: "Highest grade group; often needs combined or intensified treatment planning." },
    ],
    tableFoot:
      "This table is simplified. Your full pathology, imaging, PSA, stage, and health determine the plan.",
    alsoLookFor: [
      "How many cores contain cancer and how much cancer is in each core.",
      "Whether cancer is found on one or both sides of the prostate.",
      "Features such as cribriform or intraductal patterns, or perineural invasion, which your team weighs carefully.",
      "Findings such as ASAP or high-grade PIN are not cancer themselves but often prompt a repeat biopsy.",
    ],
    // TODO(clinical review): "roughly one in four ... higher grade" — biopsy
    // upgrading rates at prostatectomy range ~25–35% across series and depend
    // on biopsy technique (systematic vs MRI-fusion). Confirm the figure and
    // qualifier, or soften to "a meaningful share".
    worthAsking: {
      label: "Worth asking",
      body: "Would review by a genitourinary pathologist change my Grade Group or treatment options? Because a biopsy samples only part of the gland, roughly one in four cancers turns out to be higher grade than the first biopsy suggested.",
    },
    ifNegativeTitle: "If the biopsy does not find cancer",
    ifNegative:
      "A negative biopsy is reassuring but does not completely rule cancer out, because only part of the prostate is sampled. Your team may still recommend repeat PSA testing, an MRI, or a repeat biopsy — especially if your PSA keeps rising, an MRI shows a suspicious area, the exam is abnormal, or you have a strong family history or a known inherited mutation. If everything stays stable, monitoring intervals can often be stretched out.",
  },

  staging: {
    eyebrow: "Your diagnosis",
    title: "Stage, imaging, and risk group",
    continuumTitle: "Risk is a continuum, not a single test result",
    continuumFoot: "PSA + Grade Group + clinical stage + imaging + overall health + your priorities.",
    tiers: [
      { id: "low", label: "Low", gist: "Often monitored" },
      { id: "int", label: "Intermediate", gist: "May need treatment" },
      { id: "high", label: "High", gist: "Usually needs treatment" },
    ],
    clinicalStage:
      "Clinical stage estimates how far the cancer extends based on examination, biopsy, imaging, and other findings. TNM describes the primary tumor (T), nearby lymph nodes (N), and distant spread (M). Localized disease is commonly T1 or T2; some T3 disease is described as locally advanced.",
    riskGroup:
      "Risk groups combine PSA, Grade Group, and clinical stage to estimate the likelihood of growth or recurrence. Terms may include very low, low, favorable intermediate, unfavorable intermediate, high, or very high risk. Different systems can classify the same case slightly differently.",
    imaging: [
      "MRI can show the prostate and surrounding tissues and help identify suspicious areas.",
      "CT, bone scan, or PSMA PET may be considered when risk or symptoms make spread more likely.",
    ],
    sayItBack: {
      label: "Say it back",
      body: "Ask your clinician to state your risk group in plain language and explain which exact findings put you there.",
    },
  },

  team: {
    eyebrow: "Making a decision",
    title: "Build the right care team",
    intro:
      "Localized prostate cancer care can involve several specialists. Hearing more than one perspective is a strength, not a failure to decide.",
    chairName: "Dr. Ashutosh K. Tewari",
    chairRole: "Professor and System Chair, Milton and Carroll Petrie Department of Urology · Icahn School of Medicine at Mount Sinai",
    chairTitles: [
      "Director, Center of Excellence for Prostate Cancer · The Tisch Cancer Center",
      "Professor of Urology, Oncological Sciences, and Artificial Intelligence and Human Health",
      "Board certified by the American Board of Urology",
    ],
    chairBody:
      "Dr. Tewari is a urologic surgeon internationally recognized for advancing robotic-assisted radical prostatectomy and nerve-sparing techniques aimed at preserving urinary control and sexual function — including the total reconstruction technique used to help men recover continence. His clinical work covers MRI-targeted biopsy, active surveillance, robotic prostatectomy, and focal therapy protocols; his lab studies the genomic causes of prostate cancer, imaging biomarkers, and a prostate cancer vaccine supported by the NIH and Department of Defense. If you are considering surgery, your consultation will cover which approach fits your anatomy and your cancer, and what outcomes to expect in a patient like you.",
    chairSourceUrl: "https://profiles.mountsinai.org/ashutosh-tewari",
    chairSourceLabel: "Mount Sinai physician profile",
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
      body: "A multidisciplinary team can align pathology, imaging, treatment options, and supportive care into one personalized plan.",
    },
    prioritiesTitle: "Start with your priorities",
    prioritiesIntro:
      "When cancer-control outcomes are expected to be similar, quality-of-life differences can drive the decision. Your age alone does not decide treatment; overall health, life expectancy, cancer risk, anatomy, baseline function, and preferences all matter.",
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
    facultyTitle: "The department behind this guide",
    facultyIntro:
      "Prostate cancer care at Mount Sinai is delivered by the Milton and Carroll Petrie Department of Urology together with radiation and medical oncology. These are some of the faculty whose work touches a prostate cancer diagnosis — you will not meet all of them, and your own team may include others.",
    faculty: [
      {
        name: "Ashutosh K. Tewari",
        creds: "MBBS, MCh, FRCS (Hon.)",
        role: "Professor and System Chair, Urology · Director, Center of Excellence for Prostate Cancer",
        focus: "Robotic radical prostatectomy, nerve-sparing and reconstruction, MRI-targeted biopsy, active surveillance, focal therapy protocols.",
        url: "https://profiles.mountsinai.org/ashutosh-tewari",
      },
      {
        name: "Ketan K. Badani",
        creds: "MD",
        role: "Vice Chair, Urology and Robotic Operations · Professor of Urology",
        focus: "Robotic urologic oncology across prostate and kidney cancer, and reconstructive urology.",
        url: "https://profiles.mountsinai.org/ketan-k-badani",
      },
      {
        name: "Michael A. Palese",
        creds: "MD",
        role: "System Vice Chair, Clinical Operations · Site Chair, Mount Sinai Downtown–Union Square",
        focus: "Minimally invasive robotic, laparoscopic, and endoscopic surgery for prostate, kidney, and bladder disease.",
        url: "https://profiles.mountsinai.org/michael-a-palese",
      },
      {
        name: "Peter Wiklund",
        creds: "MD, PhD",
        role: "Professor of Urology · Director, Bladder Cancer Program",
        focus: "Robotic prostate and bladder surgery, prostate biopsy, and evaluation of an elevated PSA.",
        url: "https://profiles.mountsinai.org/peter-wiklund",
      },
      {
        name: "John P. Sfakianos",
        creds: "MD",
        role: "Professor of Urology and Urologic Oncology",
        focus: "Open, laparoscopic, and robotic surgery for prostate, kidney, bladder, and testicular cancers.",
        url: "https://profiles.mountsinai.org/john-p-sfakianos",
      },
      {
        name: "Reza Mehrazin",
        creds: "MD",
        role: "Professor of Urology · Director, Society of Urologic Oncology Fellowship",
        focus: "Nerve-sparing prostatectomy and organ-preserving surgery across urologic cancers.",
        url: "https://profiles.mountsinai.org/reza-mehrazin",
      },
      {
        name: "Michael A. Gorin",
        creds: "MD",
        role: "Associate Professor of Urology and of Artificial Intelligence and Human Health",
        focus: "Prostate cancer screening and treatment, MRI-guided prostate biopsy, minimally invasive procedures.",
        url: "https://profiles.mountsinai.org/michael-gorin",
      },
      {
        name: "Richard G. Stock",
        creds: "MD",
        role: "Professor, Radiation Oncology",
        focus: "Prostate brachytherapy and intensity-modulated radiation therapy (IMRT) for prostate cancer.",
        url: "https://profiles.mountsinai.org/richard-g-stock",
      },
      {
        name: "Natasha Kyprianou",
        creds: "PhD",
        role: "Vice Chair for Research, Urology · Professor of Urology, Pathology, and Oncological Sciences",
        focus: "Laboratory research into prostate cancer biology and why some cancers resist treatment.",
        url: "https://profiles.mountsinai.org/natasha-kyprianou",
      },
      {
        name: "Nihal E. Mohamed",
        creds: "PhD",
        role: "Director, Patient Education and Behavioral Research, Urology",
        focus: "How patients weigh treatment decisions, quality of life, and emotional adjustment after diagnosis.",
        url: "https://profiles.mountsinai.org/nihal-e-mohamed",
      },
    ],
    facultyNote:
      "Titles and roles are drawn from public Mount Sinai physician profiles and may change. Your care team is assigned through your appointment, not through this list.",
    msCare: {
      title: "What care looks like at Mount Sinai",
      intro:
        "The Center of Excellence for Prostate Cancer sits inside The Tisch Cancer Center, an NCI-designated comprehensive cancer center. Urologic, radiation, and medical oncologists review cases alongside pathologists, radiologists, sexual medicine specialists, and oncology nurses, so one plan comes out of one discussion.",
      items: [
        { label: "Diagnosis", a: "MRI-fusion targeted biopsy, expert genitourinary pathology review, and genomic marker testing to sharpen your risk group." },
        { label: "Surgery", a: "Robot-assisted, laparoscopic, and open prostatectomy, with nerve-sparing and reconstruction techniques developed in the department." },
        { label: "Radiation", a: "Intensity-modulated radiation therapy (IMRT) and brachytherapy, planned with the surgical team rather than in isolation." },
        { label: "Surveillance & focal therapy", a: "Structured active surveillance programs and clinical protocols for focal treatment of selected tumors." },
        { label: "Research access", a: "Clinical trials in immunotherapy, vaccines, and imaging, through the department's research programs." },
        { label: "Screening outreach", a: "The Robert F. Smith Mobile Prostate Cancer Screening Unit brings screening into New York communities." },
      ],
      contactTitle: "Making an appointment",
      contactLines: [
        "Mount Sinai cancer appointments: 844-MD-CANCER (844-632-2262)",
        "Milton and Carroll Petrie Department of Urology / robotic prostate surgery: 212-241-9955",
        "Main urology practice, 1425 Madison Avenue, 6th floor, Suite L6-50, New York, NY 10029",
      ],
      sourceUrl: "https://www.mountsinai.org/care/cancer/services/prostate",
      sourceLabel: "Mount Sinai Prostate Cancer Center of Excellence",
    },
  },

  treatment: {
    eyebrow: "Treatment choices",
    title: "Compare the approaches",
    intro:
      "There may be more than one reasonable option. This is a discussion tool — not a recommendation. Which options are even on the table depends on where you are in your cancer journey — mainly your risk group.",
    byStageTitle: "What is usually on the table, by risk group",
    byStageIntro:
      "Your PSA, Grade Group, and stage set a risk group, and that is the biggest factor in which treatments your team will discuss. This is a simplified map for localized disease — your own plan depends on the full picture.",
    byStageRows: [
      {
        label: "Very low / low risk",
        a: "Active surveillance is usually preferred. Surgery or radiation are options if you choose treatment.",
      },
      {
        label: "Favorable intermediate",
        a: "Active surveillance may still be an option for some. Surgery or radiation are the common choices; radiation is sometimes given alone.",
      },
      {
        label: "Unfavorable intermediate / high risk",
        a: "Surgery, or radiation combined with a period of hormone therapy. A multidisciplinary discussion is especially valuable here.",
      },
      {
        label: "Beyond the prostate (locally advanced, spread, or recurrence)",
        a: "A different pathway — often combinations of radiation, hormone therapy, and systemic treatment. This guide focuses on localized disease; ask your team for guidance specific to your situation.",
      },
    ],
    byStageFoot:
      "Recurrence after treatment, or cancer that has spread, changes the options again — this is why knowing your current stage and risk group matters before comparing anything.",
    expandHint: "Select a card for advantages, tradeoffs, and what to ask.",
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
        summary: "Removes the prostate and seminal vesicles, often robot-assisted; may include nearby lymph nodes.",
        blocks: [
          {
            title: "How it is done at Mount Sinai",
            body: "Most radical prostatectomies here are robot-assisted: the surgeon operates through small incisions with a magnified 3D view and wristed instruments. The Department of Urology, chaired by Dr. Ashutosh K. Tewari, has helped develop nerve-sparing and precision approaches, and uses MRI and pathology to plan the operation around your specific tumor — sometimes described as a surgical \"digital twin\" of the prostate.",
          },
          {
            title: "Potential advantages",
            items: [
              "Removes the prostate and provides final pathology and pathologic stage.",
              "PSA is expected to fall to a very low or undetectable level after recovery, which makes follow-up straightforward.",
              "Radiation can remain an option if additional treatment is later needed.",
            ],
          },
          {
            title: "Important tradeoffs",
            items: [
              "An operation, anesthesia, catheter, and recovery period are required.",
              "Urinary leakage is common early and improves for most people over months; it can persist in a smaller number.",
              "Erectile function may take months to recover and may not return to baseline.",
              "Ejaculation and natural fertility are lost after prostate removal; orgasm may still be possible.",
            ],
          },
          {
            title: "Nerve-sparing",
            body: "Nerve-sparing aims to preserve the nerves involved in erections when it is safe and anatomically feasible. Cancer location, baseline function, age, medical conditions, and whether nerves can be spared on one or both sides all affect outcomes.",
          },
          {
            title: "Surgeon experience matters",
            body: "Guidelines note that outcomes after prostatectomy — cancer control, continence, and erectile recovery — vary with surgeon and center experience. Ask any surgeon how often they perform this operation and what their own results are.",
          },
        ],
        callout: {
          label: "Ask for personal numbers",
          body: "Request the surgeon's estimate of your cancer-control, continence, and erectile-function outcomes — and ask what factors make your estimate different from a published average.",
        },
      },
      {
        id: "radiation",
        n: "OPTION C",
        title: "Radiation therapy",
        summary: "Damages cancer-cell DNA. Approaches vary by energy source, delivery, dose, and number of treatments.",
        blocks: [
          {
            title: "External-beam radiation",
            body: "A machine delivers radiation from outside the body. Image guidance and modern planning shape the dose around the prostate while limiting exposure to nearby structures. Schedules may range from a small number of high-dose treatments to several weeks.",
          },
          {
            title: "Brachytherapy",
            body: "Radioactive sources are placed in or near the prostate. Some patients receive permanent low-dose seeds; others receive temporary high-dose treatment. It may be used alone or with external-beam radiation in selected cases.",
          },
          {
            title: "Potential advantages",
            items: [
              "No surgical incision or removal of the prostate.",
              "Multiple effective schedules can fit different clinical and practical needs.",
            ],
          },
          {
            title: "Important tradeoffs",
            items: [
              "Urinary frequency, urgency, weak stream, or burning may occur, especially early.",
              "Bowel urgency, irritation, or bleeding can occur; serious bowel injury is uncommon with modern techniques.",
              "Erectile function can decline gradually over time.",
              "Surgery after radiation is possible in selected cases but is more complex.",
            ],
          },
        ],
        callout: {
          label: "Ask about dose + image guidance",
          body: "Have the radiation oncologist explain the exact technique, number of visits, preparation, whether hormone therapy is recommended, and how your anatomy affects risk.",
        },
      },
      {
        id: "focal",
        n: "OPTION D",
        title: "Focal therapy and clinical trials",
        summary: "Treats a targeted area of the prostate rather than the whole gland. Long-term evidence and eligibility vary by technique.",
        blocks: [
          {
            title: "Examples",
            items: [
              "High-intensity focused ultrasound (HIFU)",
              "Cryoablation",
              "Laser, irreversible electroporation, or other investigational approaches",
            ],
          },
          {
            title: "Questions to resolve",
            items: [
              "Is my cancer truly limited to one treatable target on high-quality imaging and biopsy?",
              "What are the center's selection criteria, outcomes, retreatment rates, and follow-up protocol?",
              "What happens if cancer remains, returns, or is found elsewhere in the prostate?",
              "Will insurance cover the procedure and required follow-up?",
            ],
          },
          {
            title: "Clinical trials",
            body: "Trials can offer access to new imaging, treatment, monitoring, or supportive-care strategies. Participation is voluntary. Ask about the purpose of the trial, randomization, alternatives, extra visits, costs, risks, and what happens after the study.",
          },
        ],
        callout: {
          label: "Important",
          body: "Focal therapy is not simply a smaller version of standard treatment. It requires careful selection and ongoing monitoring of the whole prostate.",
        },
      },
      {
        id: "hormone",
        n: "OPTION E",
        title: "Hormone therapy and combined treatment",
        summary: "Androgen deprivation therapy (ADT) lowers or blocks testosterone signals that can help prostate cancer grow.",
        blocks: [
          {
            title: "Why it may be added",
            body: "For localized disease, ADT is most often combined with radiation in selected intermediate- and high-risk cases. The benefit and duration depend on risk group, radiation plan, overall health, and competing medical risks. ADT alone is generally not a curative treatment for otherwise treatable localized prostate cancer.",
          },
          {
            title: "Possible effects",
            items: [
              "Body: hot flashes, fatigue, muscle loss, weight gain, breast tenderness, reduced bone density.",
              "Sexual health: lower desire, erectile difficulty, and changes in genital tissues.",
              "Metabolic health: changes in blood sugar, cholesterol, and cardiovascular risk.",
              "Mood + thinking: mood changes, sleep difficulty, or cognitive concerns for some people.",
            ],
          },
          {
            title: "Plan supportive care before starting",
            items: [
              "Review cardiovascular, diabetes, bone, and fall risk.",
              "Begin or continue resistance and aerobic exercise as medically appropriate.",
              "Ask whether calcium, vitamin D, bone density testing, or other measures are appropriate for you.",
            ],
          },
        ],
        callout: {
          label: "Medication safety",
          body: "Tell your team about every prescription, over-the-counter medicine, vitamin, and supplement. Do not start supplements as cancer treatment without discussing evidence and interactions.",
        },
      },
    ],
    compareTitle: "Compare the approaches",
    compareIntro:
      "This is a discussion tool — not a recommendation. The best option depends on your specific cancer, health, anatomy, and priorities.",
    compareHead: ["Approach", "Primary goal", "Potential advantage", "Key tradeoff"],
    compareRows: [
      { label: "Active surveillance", a: "Monitor; treat if needed", b: "Avoids treatment effects while appropriate", c: "Repeat PSA, MRI/biopsy; uncertainty" },
      { label: "Surgery", a: "Remove prostate", b: "Final pathology; PSA should become very low", c: "Operation; leakage; erectile/fertility effects" },
      { label: "External-beam radiation", a: "Treat prostate with planned radiation", b: "No operation; several schedule options", c: "Urinary/bowel irritation; later sexual effects" },
      { label: "Brachytherapy", a: "Place radiation in/near prostate", b: "Focused treatment; often short procedure", c: "Urinary irritation; eligibility depends on anatomy" },
      { label: "Focal therapy", a: "Treat selected lesion/region", b: "May reduce some whole-gland effects", c: "Evidence/coverage vary; intensive follow-up" },
    ],
    compareFoot:
      "Hormone therapy may be added to radiation for some risk groups. Some patients need combinations not shown here.",
    fairQuestionsTitle: "Questions that make comparisons fair",
    fairQuestions: [
      "What is the goal of this option for my risk group?",
      "What are my personal chances of cancer control and major side effects?",
      "How will we know whether it worked — and what would we do next if it did not?",
      "How much time do I reasonably have to decide?",
      "Which option would you choose if my top priority were ______, and why?",
    ],
  },

  quality: {
    eyebrow: "Quality of life",
    title: "Urinary, bowel, and sexual health",
    intro:
      "Ask about supportive care before treatment. Baseline assessment and early rehabilitation can make needs easier to identify and address.",
    blocks: [
      {
        title: "Urinary health",
        items: [
          "Pelvic floor muscle training may be recommended before or after surgery.",
          "Radiation may cause frequency, urgency, burning, or a weaker stream; medicines and diet adjustments may help.",
          "Persistent leakage, retention, blood in urine, or recurrent infection deserves evaluation.",
        ],
      },
      {
        title: "Bowel health",
        items: [
          "Radiation may cause temporary urgency, loose stools, mucus, or irritation.",
          "Report persistent rectal bleeding. Do not assume it is \"just radiation.\"",
          "Tell your team about inflammatory bowel disease, prior pelvic radiation, or major bowel problems before treatment.",
        ],
      },
      {
        title: "Sexual health",
        items: [
          "Discuss erections, desire, orgasm, ejaculation, penile length changes, and intimacy — not just one definition of function.",
          "Options may include oral medicine, vacuum devices, injections, counseling, or implants, depending on goals and medical safety.",
          "Include a partner if you want, but your privacy and preferences come first.",
        ],
      },
    ],
    fertility: {
      label: "Fertility",
      body: "If future biological children matter to you, ask about sperm banking before surgery, radiation, or hormone therapy. Do not wait until after treatment begins.",
    },
  },

  recovery: {
    eyebrow: "Recovery + follow-up",
    title: "What happens after treatment",
    intro:
      "Your team will provide a plan tailored to the treatment you receive. Keep the written plan and know whom to call after hours.",
    blocks: [
      {
        title: "After surgery",
        items: [
          "A urinary catheter is usually temporary; timing varies.",
          "Activity restrictions, pain control, bowel care, wound care, and blood-clot prevention should be explained before discharge.",
          "Final pathology and the first postoperative PSA guide follow-up.",
        ],
      },
      {
        title: "During and after radiation",
        items: [
          "Daily routines vary by technique; follow bladder and bowel preparation instructions carefully.",
          "Some urinary, bowel, or fatigue effects can peak after treatment ends before improving.",
          "PSA usually declines gradually because the prostate remains in place.",
        ],
      },
      {
        title: "Long-term monitoring",
        body: "PSA is central after surgery or radiation, but the expected pattern differs. Your clinician will define the threshold or trend that would trigger further evaluation. Keep every PSA result in one place.",
      },
    ],
    callUrgently: {
      label: "Call urgently",
      body: "Seek urgent medical advice for chest pain, trouble breathing, fainting, signs of a serious allergic reaction, inability to urinate, heavy bleeding, fever or chills after a procedure, severe or worsening pain, or symptoms specifically listed in your discharge instructions.",
    },
  },

  living: {
    eyebrow: "Whole-person care",
    title: "Healthy living and emotional wellbeing",
    intro:
      "Healthy habits support recovery and long-term health, but no diet, supplement, or exercise plan can guarantee that prostate cancer will not progress or return.",
    basics: [
      { label: "Move", a: "Aim for regular aerobic activity, strength work, balance, and less sitting — adapted to your health and treatment." },
      { label: "Eat", a: "Emphasize vegetables, fruit, whole grains, beans, nuts, fish, and minimally processed foods; personalize for other conditions." },
      { label: "Protect sleep", a: "Treat pain, hot flashes, urinary symptoms, anxiety, and sleep apnea rather than accepting poor sleep as inevitable." },
      { label: "Avoid tobacco", a: "Ask for evidence-based help to stop smoking; keep alcohol within the limits your clinicians recommend." },
    ],
    emotionalTitle: "Emotional health is part of cancer care",
    emotionalBody:
      "Anxiety, sadness, anger, numbness, and decision regret can affect patients and caregivers. Ask for oncology social work, counseling, peer support, spiritual care, or sexual health support. If distress interferes with sleep, daily function, or safety, tell your team promptly.",
    crisis: {
      label: "If you are in immediate emotional danger",
      body: "In the United States, call or text 988 for the Suicide & Crisis Lifeline, or call 911 / go to the nearest emergency department for immediate danger.",
    },
  },

  genetics: {
    eyebrow: "Family health",
    title: "Genetics and inherited risk",
    intro:
      "Some inherited gene changes raise the risk of prostate and other cancers and may affect treatment or screening recommendations for relatives.",
    counselingWhenTitle: "Ask about genetic counseling when",
    counselingWhen: [
      "Prostate cancer is high-risk, very high-risk, regional, or metastatic.",
      "Several close relatives have prostate, breast, ovarian, pancreatic, colorectal, endometrial, or other related cancers.",
      "Cancer occurred at young ages in the family or there are multiple cancers in one person.",
      "Tumor testing suggests an inherited variant, or ancestry/family history raises concern.",
    ],
    twoKindsTitle: "Two kinds of testing",
    twoKindsBody:
      "Germline testing looks for inherited variants present throughout the body and can have implications for relatives. Tumor or somatic testing looks for changes in the cancer itself; some findings may point toward germline testing.",
    beforeAfterTitle: "Before and after testing",
    beforeAfterBody:
      "A genetic counselor can discuss which test fits, what results can and cannot tell you, privacy and insurance considerations, and how to share results. A \"negative\" result does not erase a strong family history.",
    familyAction: {
      label: "Family action",
      body: "Give relatives a copy of the final report — not only a verbal summary — and encourage them to discuss personalized screening with their own clinicians.",
    },
  },

  glossary: {
    eyebrow: "Your toolkit",
    title: "Glossary",
    intro: "Plain-language definitions for the terms you'll hear most.",
    searchPlaceholder: "Search terms…",
    empty: "No terms match your search.",
    terms: [
      { term: "PSA", def: "Prostate-specific antigen — a protein measured by blood test; an elevated value does not by itself prove cancer." },
      { term: "PSA density", def: "PSA related to prostate volume, often measured on MRI or ultrasound." },
      { term: "Gleason score", def: "The sum of the two most common growth patterns a pathologist sees (e.g. 3 + 4 = 7)." },
      { term: "Grade Group", def: "A 1–5 scale translated from the Gleason score; higher generally means more aggressive-looking cancer." },
      { term: "Clinical stage", def: "An estimate of how far the cancer extends, based on exam, biopsy, and imaging." },
      { term: "TNM", def: "A staging system describing the primary tumor (T), lymph nodes (N), and distant spread (M)." },
      { term: "Risk group", def: "PSA, Grade Group, and stage combined to estimate the chance of growth or recurrence." },
      { term: "Localized", def: "Testing suggests the cancer is confined to the prostate." },
      { term: "Locally advanced", def: "Growth just outside the prostate or into nearby structures or lymph nodes." },
      { term: "Active surveillance", def: "Closely monitoring selected cancers and treating only if there are signs of progression." },
      { term: "Watchful waiting", def: "Less intensive monitoring focused on treating symptoms if they arise." },
      { term: "Radical prostatectomy", def: "Surgery to remove the prostate and seminal vesicles, sometimes with nearby lymph nodes." },
      { term: "Nerve-sparing", def: "A surgical technique to preserve nerves involved in erections when safe and feasible." },
      { term: "Brachytherapy", def: "Radiation delivered by placing radioactive sources in or near the prostate." },
      { term: "ADT", def: "Androgen deprivation therapy — lowers or blocks testosterone signals that can help cancer grow." },
      { term: "Focal therapy", def: "Treatment of a targeted area of the prostate rather than the whole gland." },
      { term: "PSMA PET", def: "An imaging scan that targets a protein on most prostate cancer cells; used when spread is more likely." },
      { term: "Multiparametric MRI", def: "An MRI that combines several image types to find and characterize suspicious areas." },
      { term: "Genitourinary pathologist", def: "A pathologist who specializes in prostate and urinary-tract tissue." },
      { term: "Germline testing", def: "Looks for inherited gene variants present throughout the body; can matter for relatives." },
    ],
  },

  checklist: {
    eyebrow: "Your toolkit",
    title: "Your toolkit",
    intro:
      "Bring these to your next appointment. Check off the questions you've covered; your diagnosis record and progress are saved on this device.",
    progress: "covered",
    reset: "Reset",
    questionsTitle: "Questions for your next appointment",
    questions: [
      { id: "q1", text: "What is my exact Grade Group, clinical stage, and risk group?" },
      { id: "q2", text: "Do I need a pathology review, MRI review, or additional imaging?" },
      { id: "q3", text: "Which options are medically reasonable for me — and which are not?" },
      { id: "q4", text: "What happens if I choose active surveillance now?" },
      { id: "q5", text: "What are your own outcomes for cancer control, urinary function, and sexual function in patients like me?" },
      { id: "q6", text: "Would hormone therapy improve my outcome? If so, for how long and with what health plan?" },
      { id: "q7", text: "How could treatment affect fertility, erections, orgasm, ejaculation, urine control, and bowel function?" },
      { id: "q8", text: "What supportive care should start before treatment?" },
      { id: "q9", text: "Is a second opinion or clinical trial appropriate?" },
      { id: "q10", text: "How long can I safely take to decide?" },
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
      "This guide used the 2023 Prostate Cancer Foundation patient guide as a scope reference only. The writing, organization, decision tools, diagrams, and visual system are newly created for Mount Sinai review. The clinical content is drawn from current AUA/ASTRO, NCCN, EAU, and NCI guidance.",
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
            cite: "American Urological Association / ASTRO. Clinically Localized Prostate Cancer Guideline (overview and full text).",
            url: "https://www.auanet.org/guidelines-and-quality/guidelines/clinically-localized-prostate-cancer",
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
            cite: "Mount Sinai Health System. Center of Excellence for Prostate Cancer — services, multidisciplinary team, and screening programs.",
            url: "https://www.mountsinai.org/care/cancer/services/prostate",
          },
          {
            cite: "Mount Sinai. Ashutosh K. Tewari, MD — physician profile, titles, specialties, and research focus.",
            url: "https://profiles.mountsinai.org/ashutosh-tewari",
          },
          {
            cite: "Mount Sinai. Milton and Carroll Petrie Department of Urology — urologic care and services.",
            url: "https://www.mountsinai.org/care/urology",
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
    fine: "This guide is for general education and does not replace a conversation with your care team. Every case is different — treatment decisions should always be made with your own doctors, based on your own pathology, imaging, and health history. Statistics are general population figures and may not reflect your individual outcome.",
    brandline: "Mount Sinai Health System · Milton and Carroll Petrie Department of Urology",
    contact: "mountsinai.org · Cancer appointments 844-MD-CANCER · Urology 212-241-9955",
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

/**
 * Offline fallback knowledge base for the guide chat widget.
 * Used only when the AI proxy (VITE_COMPASS_CHAT_URL) is unreachable or unset.
 * Answers are drawn from the Mount Sinai Localized Prostate Cancer guide draft.
 */

interface KbEntry {
  keys: string[];
  a: string;
}

const KB: KbEntry[] = [
  {
    keys: ["grade group", "gleason", "score mean", "biopsy report"],
    a: "A pathologist adds the two most common Gleason growth patterns and translates the result into a Grade Group from 1 to 5. Grade Group 1 (Gleason 3+3=6) is lower grade and often suited to active surveillance; Grade Group 5 (Gleason 9–10) is the highest grade. See the \"Your biopsy report\" chapter.",
  },
  {
    keys: ["psa", "blood test", "psa density"],
    a: "PSA is a protein made by prostate tissue. An elevated value does not by itself prove cancer — it can rise with benign enlargement, inflammation, infection, or recent procedures. The trend over time, prostate size, PSA density, and your overall context all matter. See \"PSA, explained.\"",
  },
  {
    keys: ["before a psa", "prepare psa", "psa preparation"],
    a: "Before a PSA test, ask whether recent infection, ejaculation, cycling, urinary procedures, or medications could affect your result, and whether any preparation is recommended for you.",
  },
  {
    keys: ["stage", "tnm", "risk group", "localized mean", "t1", "t2", "t3"],
    a: "Clinical stage (TNM) estimates how far the cancer extends. Localized disease is commonly T1 or T2. Your risk group — low, intermediate, or high — combines PSA, Grade Group, and stage, and is the biggest factor in choosing treatment. See \"Stage & risk group.\"",
  },
  {
    keys: ["treatment option", "compare treatment", "which treatment", "approaches"],
    a: "The approaches to compare for localized disease are active surveillance, surgery (radical prostatectomy), external-beam radiation, brachytherapy, and focal therapy or clinical trials; hormone therapy may be added to radiation for some risk groups. The best choice depends on your cancer, health, anatomy, and priorities. See \"Treatment choices.\"",
  },
  {
    keys: ["active surveillance", "watchful waiting"],
    a: "Active surveillance closely monitors selected low-risk (and some favorable intermediate-risk) cancers with PSA, exams, MRI, and repeat biopsy, and starts treatment if there are signs of progression. It is not the same as watchful waiting, which is less intensive and focuses on treating symptoms.",
  },
  {
    keys: ["surgery", "prostatectomy", "nerve-sparing"],
    a: "Radical prostatectomy removes the prostate and seminal vesicles and provides final pathology. PSA is expected to fall to a very low or undetectable level. Tradeoffs include an operation and catheter, early urinary leakage, erectile changes, and loss of ejaculation and natural fertility. Nerve-sparing may help erectile recovery when safe. See \"Treatment choices.\"",
  },
  {
    keys: ["radiation", "brachytherapy", "external beam"],
    a: "Radiation can be external-beam (from outside the body, over a range of schedules) or brachytherapy (radioactive sources placed in or near the prostate). No incision is needed. Early urinary and bowel irritation can occur; erectile function can decline gradually. See \"Treatment choices.\"",
  },
  {
    keys: ["hormone", "adt", "testosterone", "combined"],
    a: "Androgen deprivation therapy (ADT) lowers or blocks testosterone. For localized disease it is most often combined with radiation in selected intermediate- and high-risk cases; it is generally not curative on its own. Plan supportive care for bone, cardiovascular, and metabolic health before starting.",
  },
  {
    keys: ["focal", "hifu", "cryo", "clinical trial"],
    a: "Focal therapy (e.g. HIFU or cryoablation) treats a targeted area rather than the whole gland; long-term evidence and eligibility vary, and the whole prostate still needs monitoring. Clinical trials are voluntary and can offer access to new strategies — ask about purpose, alternatives, extra visits, and costs.",
  },
  {
    keys: ["side effect", "urinary", "bowel", "erectile", "incontinence", "quality of life"],
    a: "Ask about supportive care before treatment. Urinary: pelvic floor training, and evaluation for persistent leakage or infection. Bowel: report persistent rectal bleeding rather than assuming it is \"just radiation.\" Sexual: options include medicine, devices, injections, counseling, or implants. See \"Quality of life.\"",
  },
  {
    keys: ["fertility", "sperm bank"],
    a: "If future biological children matter to you, ask about sperm banking before surgery, radiation, or hormone therapy — do not wait until after treatment begins.",
  },
  {
    keys: ["recovery", "after treatment", "follow up", "catheter", "recurrence"],
    a: "After surgery a catheter is temporary and the first postoperative PSA guides follow-up. After radiation, PSA declines gradually because the prostate stays in place. Long-term, your clinician defines the PSA threshold or trend that would trigger further evaluation. See \"Recovery & follow-up.\"",
  },
  {
    keys: ["genetic", "brca", "family history", "inherit", "germline"],
    a: "Ask about genetic counseling if your cancer is high-risk or metastatic, or if close relatives have prostate, breast, ovarian, pancreatic, colorectal, or endometrial cancers. Germline testing looks for inherited variants (relevant to relatives); tumor/somatic testing looks at the cancer itself. See \"Genetics & family.\"",
  },
  {
    keys: ["care team", "second opinion", "specialist"],
    a: "Localized prostate cancer care can involve a urologic oncologist, radiation oncologist, medical oncologist, radiologist and pathologist, sexual medicine and pelvic health, and a nurse or navigator. A second opinion is especially helpful when pathology or risk group is uncertain or the options carry different quality-of-life tradeoffs.",
  },
  {
    keys: ["tewari", "who is dr", "chair", "robotic", "robot"],
    a: "The Mount Sinai Department of Urology is chaired by Dr. Ashutosh K. Tewari, a urologic surgeon known for advancing robot-assisted radical prostatectomy and nerve-sparing techniques to preserve urinary control and sexual function. Radical prostatectomy here is usually robot-assisted and planned around your specific tumor using MRI and pathology. Outcomes vary with surgeon experience — ask any surgeon about their own results. See \"Care team & priorities\" and \"Treatment choices.\"",
  },
  {
    keys: ["epsa", "not diagnosed", "should i get a psa", "screening tool"],
    a: "If you are not yet diagnosed and are weighing whether to start PSA testing, the Mount Sinai ePSA tool (epsa.millionstrongmen.com) estimates your risk of clinically significant prostate cancer and whether a PSA test is worth discussing with your doctor.",
  },
  {
    keys: ["priorit", "decide", "how long", "shared decision"],
    a: "When cancer-control outcomes are expected to be similar, quality-of-life differences can drive the decision. Weigh cancer control, urinary/sexual/bowel function, time and convenience, and future options. Ask your team how long you can safely take to decide. See \"Care team & priorities.\"",
  },
  {
    keys: ["emotional", "anxiety", "cope", "support", "distress"],
    a: "Anxiety, sadness, anger, and decision regret are common for patients and caregivers. Ask for oncology social work, counseling, peer support, or spiritual care. If distress interferes with sleep, function, or safety, tell your team promptly. In the US, call or text 988 for the Suicide & Crisis Lifeline in an emergency.",
  },
  {
    keys: ["healthy", "diet", "exercise", "lifestyle", "smoking", "alcohol"],
    a: "Regular activity, a diet rich in vegetables, fruit, whole grains, beans, nuts, and fish, protected sleep, and avoiding tobacco all support recovery — but no diet or supplement plan can guarantee the cancer will not progress. See \"Healthy living.\"",
  },
];

export function offlineAnswer(question: string): string {
  const ql = question.toLowerCase();
  let best: KbEntry | null = null;
  let bestScore = 0;
  for (const entry of KB) {
    let score = 0;
    for (const k of entry.keys) if (ql.includes(k)) score += k.length;
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  if (best) return best.a;
  return "I don't have that answer in this guide yet. Try asking about PSA, Grade Group, staging, treatment options, side effects, recovery, or genetics — or reach out to your care team directly for anything specific to your case.";
}

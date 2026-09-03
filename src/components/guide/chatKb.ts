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
    keys: ["tewari", "who is the chair", "surgeon", "dr ash"],
    a: "Dr. Ashutosh K. Tewari is Professor and System Chair of the Milton and Carroll Petrie Department of Urology at the Icahn School of Medicine at Mount Sinai, and Director of the Center of Excellence for Prostate Cancer at The Tisch Cancer Center. He is board certified by the American Board of Urology and is known for advancing robotic-assisted radical prostatectomy, nerve-sparing, and reconstruction techniques; his research covers the genomic causes of prostate cancer, imaging biomarkers, and a prostate cancer vaccine. See \"Care team & priorities.\"",
  },
  {
    keys: ["mount sinai", "center of excellence", "appointment", "phone", "where to go"],
    a: "Prostate cancer care at Mount Sinai is delivered through the Center of Excellence for Prostate Cancer within The Tisch Cancer Center, an NCI-designated comprehensive cancer center: MRI-fusion targeted biopsy and genomic testing, robotic, laparoscopic and open surgery, IMRT and brachytherapy, structured active surveillance, focal therapy protocols, and clinical trials. To make an appointment, call 844-MD-CANCER (844-632-2262), or the Department of Urology at 212-241-9955. See \"Care team & priorities.\"",
  },
  {
    keys: ["grade group", "gleason", "score mean", "biopsy report"],
    a: "A pathologist adds the two most common Gleason growth patterns and translates the result into a Grade Group from 1 to 5. Grade Group 1 (Gleason 3+3=6) is lower grade and often suited to active surveillance; Grade Group 5 (Gleason 9–10) is the highest grade. See the \"Your biopsy report\" chapter.",
  },
  {
    keys: ["psa", "blood test", "psa density"],
    a: "PSA is a protein made by prostate tissue. An elevated value does not by itself prove cancer — it can rise with benign enlargement, inflammation, infection, or recent procedures. The trend over time, prostate size, PSA density, and your overall context all matter. See \"PSA, explained.\"",
  },
  {
    keys: ["psa level", "psa number", "4.0", "how high", "normal psa"],
    a: "There is no PSA level that proves or rules out cancer. By convention a PSA above 4.0 ng/mL is called abnormal, though clinicians adjust for age and context. For scale, the National Cancer Institute reports that about 6–7% of men have a false-positive PSA, and about 25% of men biopsied for an elevated PSA are found to have cancer. Your trend, prostate size, PSA density, and exam all matter. See \"PSA, explained.\"",
  },
  {
    keys: ["when to screen", "screening age", "should i get screened", "uspstf", "start psa testing"],
    a: "Guidelines differ. The USPSTF frames PSA screening as an individual decision for ages 55–69 and does not recommend routine screening at 70 and older. The American Cancer Society suggests starting the conversation at 50 at average risk, 45 at high risk (Black men, or a father or brother diagnosed before 65), and 40 with more than one first-degree relative diagnosed young. If you already have a diagnosis, these ages matter for your relatives rather than for you. See \"PSA, explained.\"",
  },
  {
    keys: ["survival", "prognosis", "life expectancy", "how serious"],
    a: "In NCI SEER data (2016–2022), 5-year relative survival for localized prostate cancer is essentially 100%, and about 69% of prostate cancers are found before they spread beyond the prostate. Relative survival compares a group with the diagnosis to the general population — it describes groups, not any one person, and your own outlook depends on your grade, stage, PSA, and health. See \"Start here.\"",
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
    keys: ["protect trial", "long term", "which is better", "survival difference", "evidence"],
    a: "The ProtecT trial randomized 1,643 men with PSA-detected localized cancer to active monitoring, surgery, or radiotherapy and followed them for a median of 15 years. Prostate-cancer deaths were low and statistically similar in all three groups (3.1% monitoring, 2.2% surgery, 2.9% radiotherapy). The groups differed in metastasis (9.4% vs 4.7% vs 5.0%) and local progression (25.9% vs 10.5% vs 11.0%). Its \"active monitoring\" was a PSA-triggered protocol from the 2000s, less intensive than today's MRI-based surveillance. See \"Treatment choices.\"",
  },
  {
    keys: ["how long hormone", "adt duration", "months of hormone", "length of hormone therapy"],
    a: "In the 2022 AUA/ASTRO guideline, ADT given with radiation runs about 4–6 months for unfavorable intermediate-risk disease and generally 18–36 months for high-risk disease; selected very high-risk or node-positive cases may get ADT with abiraterone and prednisone for about 24 months. Your own duration may differ — ask why that length was chosen and what would change it. See \"Treatment choices.\"",
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
    keys: ["epsa", "not diagnosed", "should i get a psa", "screening tool", "where i stand", "check my risk"],
    a: "If you are not yet diagnosed and are weighing whether to start PSA testing, the Mount Sinai ePSA tool (epsa.millionstrongmen.com) estimates your risk of clinically significant prostate cancer and whether a PSA test is worth discussing with your doctor. It is worth revisiting as your PSA or MRI results come in so you can see where you stand. See the \"Mount Sinai tools\" chapter.",
  },
  {
    keys: ["compass", "digital twin", "surgical planning", "3d model", "nerve spar"],
    a: "COMPASS is a Mount Sinai surgical \"digital twin\" for patients who have already chosen robot-assisted prostatectomy. It combines clinical data with MRI, micro-ultrasound, and PSMA PET to predict adverse pathology, recurrence risk, side-specific nerve-sparing, and functional recovery on a 3D model, to help your surgical team plan the operation. It is a research tool (IRB STUDY-14-00050, not FDA cleared) — bring the results to your consultation, don't act on them alone. See the \"Mount Sinai tools\" chapter.",
  },
  {
    keys: ["diet", "exercise", "improve outcome", "recovery better", "what can i do"],
    a: "Functional recovery after surgery depends most on your baseline urinary and sexual function, but factors you can influence help: staying active, cardiovascular health, not smoking, and pelvic floor physical therapy before and after surgery. No diet or exercise plan guarantees an outcome — ask your team what fits your situation. See \"Quality of life\" and \"Recovery & follow-up.\"",
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

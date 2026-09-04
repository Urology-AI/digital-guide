import type { ContentItem } from "../../types/care";
import { refs } from "./references";

/**
 * Educational content as data. Each item carries its own questions and
 * references so it can be clinically reviewed, versioned, and translated
 * independently of the components that render it.
 *
 * Editorial rules: describe what may happen, never what will; never diagnose;
 * never recommend a treatment for an individual.
 */
export const CONTENT: ContentItem[] = [
  {
    id: "what-is-the-prostate",
    title: "What is the prostate?",
    category: "health",
    description: "A small gland below the bladder, part of the male reproductive system.",
    sections: [
      {
        body: "The prostate is a gland that sits below the bladder and surrounds part of the urethra — the tube that carries urine out of the body. It is usually described as walnut-sized in younger adults, and it commonly grows with age.",
      },
      {
        heading: "What is around it",
        body: "Nerves involved in erections run along both sides of the prostate. The rectum sits behind it, and the muscles involved in urinary control sit below it. This anatomy is why prostate treatment can affect urinary and sexual function, and why treatment planning tries to protect these structures where it is safe to do so.",
      },
    ],
    questions: ["Where is my prostate in relation to the structures you would be working near?"],
    references: refs("nciTreat"),
  },
  {
    id: "what-does-the-prostate-do",
    title: "What does the prostate do?",
    category: "health",
    description: "It makes fluid that forms part of semen.",
    sections: [
      {
        body: "The prostate produces fluid that mixes with sperm to form semen. It also produces prostate-specific antigen (PSA), a protein that can be measured in blood — which is why PSA is used in prostate testing.",
      },
    ],
    questions: ["If I have prostate treatment, how might ejaculation and fertility change?"],
    references: refs("nciPsa", "nciTreat"),
  },
  {
    id: "benign-enlargement",
    title: "Benign prostate enlargement (BPH)",
    category: "health",
    description: "Non-cancerous growth of the prostate, common with age.",
    sections: [
      {
        body: "Benign prostatic hyperplasia is a non-cancerous enlargement of the prostate that becomes more common with age. Because the prostate surrounds the urethra, enlargement can cause urinary symptoms such as a weaker stream, going more often, or getting up at night.",
      },
      {
        note: "BPH is not prostate cancer and does not become prostate cancer. It can, however, raise PSA — which is one reason an elevated PSA does not by itself mean cancer.",
      },
    ],
    questions: ["Could benign enlargement explain my urinary symptoms or my PSA level?"],
    references: refs("nciPsa"),
  },
  {
    id: "prostatitis",
    title: "Prostatitis",
    category: "health",
    description: "Inflammation or infection of the prostate.",
    sections: [
      {
        body: "Prostatitis means inflammation of the prostate, which may be caused by infection. It can cause pain, urinary symptoms, and fever, and it can raise PSA temporarily. Treatment depends on the cause and is directed by a clinician.",
      },
    ],
    questions: ["Could inflammation or infection be affecting my PSA result?", "Should my PSA be repeated after treatment?"],
    references: refs("nciPsa"),
  },
  {
    id: "prostate-cancer",
    title: "Prostate cancer",
    category: "health",
    description: "Cancer that begins in the cells of the prostate. Many grow slowly; some do not.",
    sections: [
      {
        body: "Prostate cancer begins when cells in the prostate grow in an uncontrolled way. Behaviour varies widely: many prostate cancers grow slowly and may never cause symptoms, while others grow and spread and need prompt treatment. Which of those a particular cancer resembles is estimated from the grade, the stage, the PSA, and imaging.",
      },
      {
        heading: "How often it is caught early",
        body: "In United States registry data, about 69% of prostate cancers are found while still confined to the prostate, and 5-year relative survival at that stage is essentially 100%. Relative survival compares a group of people with the diagnosis to the general population; it describes groups, not individuals.",
      },
    ],
    questions: ["What do my grade and stage suggest about how this cancer is likely to behave?"],
    references: refs("seer", "nccn"),
  },
  {
    id: "symptoms",
    title: "Common symptoms",
    category: "health",
    description: "Early prostate cancer often causes no symptoms at all.",
    sections: [
      {
        body: "Early prostate cancer frequently causes no symptoms. Urinary changes — a weaker stream, urgency, going more often, getting up at night — are common as people age and are more often caused by benign enlargement than by cancer.",
      },
      {
        heading: "Worth reporting promptly",
        items: [
          "Blood in urine or semen",
          "New difficulty passing urine, or being unable to pass urine",
          "New, persistent pain in the back, hips, or pelvis",
          "Unexplained weight loss",
        ],
        note: "These symptoms have many possible causes. Reporting them lets a clinician work out which one applies to you.",
      },
    ],
    questions: ["Which of my symptoms would you want to hear about between visits?"],
    references: refs("nciTreat"),
  },
  {
    id: "when-to-talk",
    title: "When to talk to a doctor",
    category: "health",
    description: "Screening conversations are usually framed by age and risk.",
    sections: [
      {
        heading: "Widely used starting points",
        items: [
          "USPSTF: for ages 55–69, PSA screening is an individual decision made after discussing benefits and harms; routine screening is not recommended at 70 and older.",
          "American Cancer Society: begin the conversation at 50 at average risk with at least a 10-year life expectancy; at 45 at high risk, including Black men and those with a father or brother diagnosed before 65; at 40 with more than one first-degree relative diagnosed young.",
          "NCI notes that men at higher risk — including Black men, BRCA2 carriers, and those with a family history — may begin screening discussions at 40 to 45.",
        ],
        note: "Guidelines differ from one another. That is why this is a conversation with a clinician rather than a fixed rule.",
      },
    ],
    questions: ["Given my age and history, when would you suggest we discuss PSA testing?"],
    references: refs("uspstf", "acs", "nciPsa"),
  },

  {
    id: "psa-what-is-it",
    title: "What is PSA?",
    category: "psa",
    description: "A protein made by prostate tissue that can be measured in blood.",
    sections: [
      {
        body: "Prostate-specific antigen is made by prostate tissue — both normal and abnormal. A blood test measures how much is circulating. PSA is specific to the prostate, but not to cancer: it can rise for several reasons that have nothing to do with cancer.",
      },
      {
        heading: "What the number means",
        items: [
          "By convention, a PSA above 4.0 ng/mL is described as abnormal, though clinicians adjust that for age and context.",
          "The National Cancer Institute is explicit that there is no PSA level that means a person has prostate cancer.",
          "About 6–7% of men have a false-positive PSA — an elevated result with no cancer found.",
          "About 25% of men who have a biopsy because of an elevated PSA are found to have prostate cancer.",
        ],
      },
    ],
    questions: ["What is my PSA, and how does it compare with my previous results?"],
    references: refs("nciPsa"),
  },
  {
    id: "psa-what-influences",
    title: "What can influence PSA?",
    category: "psa",
    description: "Several everyday things can move a PSA result.",
    sections: [
      {
        items: [
          "Benign prostate enlargement — a larger prostate produces more PSA",
          "Prostate infection or inflammation",
          "A recent prostate biopsy or urinary procedure — the effect can last a month or two",
          "Ejaculation shortly before the test",
          "Vigorous exercise such as cycling",
          "Some medications, including those used for benign enlargement",
        ],
        note: "Testing is often delayed until a temporary cause has resolved, so the result reflects your baseline.",
      },
    ],
    questions: ["Should anything be avoided before my PSA test?", "Could anything recent have affected this result?"],
    references: refs("nciPsa"),
  },
  {
    id: "psa-after-elevated",
    title: "What may happen after an elevated PSA",
    category: "psa",
    description: "An elevated PSA usually leads to more information, not straight to treatment.",
    sections: [
      {
        items: [
          "Repeating the PSA, sometimes after treating a temporary cause",
          "A clinical examination",
          "Calculating PSA density, which relates PSA to prostate size",
          "A multiparametric MRI to look for suspicious areas",
          "Biomarker or genomic tests in selected situations",
          "A prostate biopsy, if the overall picture supports one",
        ],
      },
      {
        note: "An elevated PSA is a reason to gather more information. It does not establish a diagnosis on its own.",
      },
    ],
    questions: ["Should my PSA be repeated before anything else?", "Do you recommend an MRI before considering a biopsy?"],
    references: refs("nciPsa", "nccn"),
  },

  {
    id: "mri-why",
    title: "Why a prostate MRI may be done",
    category: "imaging",
    description: "MRI can show suspicious areas and help decide whether — and where — to biopsy.",
    sections: [
      {
        body: "A multiparametric MRI combines several types of image to show the prostate in detail. It may be used before a biopsy to look for suspicious areas, to guide a biopsy toward a target, and to help assess whether cancer appears confined to the gland.",
      },
      {
        heading: "During the scan",
        items: [
          "You lie still inside the scanner; the scan commonly takes around 30–45 minutes",
          "The scanner is noisy — ear protection is usually provided",
          "A contrast injection may be used",
          "Tell the team about implants, devices, or previous surgery before the scan",
        ],
        note: "Exactly how the scan is performed varies between centres — your own instructions come from the imaging department.",
      },
    ],
    questions: ["Will my MRI be done before any biopsy?", "Will the biopsy use the MRI images as a target?"],
    references: refs("pirads", "nccn"),
  },
  {
    id: "mri-pirads",
    title: "What PI-RADS means",
    category: "imaging",
    description: "A 1–5 scale describing how suspicious an area looks on MRI.",
    sections: [
      {
        body: "PI-RADS — Prostate Imaging–Reporting and Data System — is a standard way for radiologists to describe how likely it is that an area seen on MRI represents clinically significant prostate cancer. It runs from 1 (very low) to 5 (very high).",
      },
      {
        note: "PI-RADS is one component of clinical assessment and does not by itself establish a cancer diagnosis.",
      },
    ],
    questions: ["What was my PI-RADS score, and where was the area?", "Does this change whether you recommend a biopsy?"],
    references: refs("pirads"),
  },

  {
    id: "biopsy",
    title: "What is a prostate biopsy?",
    category: "diagnosis",
    description: "Small tissue samples are taken so a pathologist can look for cancer cells.",
    sections: [
      {
        body: "A biopsy takes small cores of tissue from the prostate using ultrasound guidance, often combined with MRI images to target suspicious areas — a fusion biopsy. Samples may be taken through the rectum or through the perineum, the skin between the scrotum and anus; the perineal route generally carries a lower infection risk.",
      },
      {
        heading: "Afterwards",
        body: "Mild soreness and blood in the urine or semen for a few weeks are common and usually settle on their own. Fever or chills, trouble passing urine, severe pain, or heavy bleeding with clots need urgent medical attention.",
      },
      {
        note: "A biopsy samples part of the gland, not all of it. A negative biopsy is reassuring but does not completely exclude cancer, which is why monitoring may continue.",
      },
    ],
    questions: ["Which route will my biopsy use, and why?", "What happens if the biopsy does not find cancer?"],
    references: refs("aua", "nccn"),
  },
  {
    id: "gleason-grade-group",
    title: "Gleason score and Grade Group",
    category: "diagnosis",
    description: "How a pathologist describes how the cancer cells look.",
    sections: [
      {
        body: "A pathologist identifies the two most common growth patterns in the tissue. Their Gleason patterns are added together, and the result is also translated into a Grade Group from 1 to 5. Higher Grade Groups generally indicate more aggressive-looking cancer.",
      },
      {
        heading: "Also in the report",
        items: [
          "How many cores contain cancer, and how much cancer is in each",
          "Whether cancer is found on one or both sides",
          "Features such as cribriform or intraductal patterns, or perineural invasion",
          "Findings such as ASAP or high-grade PIN, which are not cancer but may prompt a repeat biopsy",
        ],
      },
      {
        note: "Because a biopsy samples only part of the gland, a share of cancers turn out to be higher grade once the whole prostate is examined. Published rates vary widely and are highest for Grade Group 1.",
      },
    ],
    questions: ["What is my Grade Group?", "Would review by a genitourinary pathologist change it?"],
    references: refs("nccn", "aua"),
  },
  {
    id: "staging-risk",
    title: "Staging and risk group",
    category: "diagnosis",
    description: "How far the cancer appears to extend, and what that implies.",
    sections: [
      {
        body: "Clinical stage (TNM) estimates how far the cancer extends, based on examination, biopsy, imaging, and other findings. Localized disease is commonly T1 or T2. Risk groups combine PSA, Grade Group, and stage to estimate the likelihood of growth or recurrence.",
      },
      {
        heading: "Terms you may hear",
        items: [
          "Low risk",
          "Favorable intermediate risk",
          "Unfavorable intermediate risk",
          "High risk",
          "Very high risk",
        ],
        note: "NCCN removed the separate \"very low risk\" category in its 2026 update, folding those cancers into low risk. Older reports and websites may still use the term.",
      },
    ],
    questions: ["What is my risk group, and which exact findings put me there?"],
    references: refs("nccn", "aua"),
  },

  {
    id: "active-surveillance",
    title: "Active surveillance",
    category: "treatment",
    description: "Monitoring selected cancers closely, and treating if there are signs of change.",
    sections: [
      {
        body: "Active surveillance means monitoring a cancer with scheduled PSA tests, clinical visits, imaging, and repeat biopsy, and moving to treatment if findings change. NCCN describes active surveillance as the preferred approach for most low-risk prostate cancer in appropriately selected patients.",
      },
      {
        heading: "Not the same as watchful waiting",
        body: "Active surveillance aims to keep the option of cure open and uses regular testing. Watchful waiting is less intensive, is usually chosen when life expectancy is shorter or other health problems outweigh the cancer risk, and focuses on treating symptoms if they arise.",
      },
    ],
    questions: [
      "Am I a candidate for active surveillance, and why or why not?",
      "What exactly would my monitoring schedule be?",
      "What findings would mean moving to treatment?",
    ],
    references: refs("nccn", "aua", "asProgram"),
  },
  {
    id: "surgery",
    title: "Surgery (radical prostatectomy)",
    category: "treatment",
    description: "Removing the prostate and seminal vesicles, often robot-assisted.",
    sections: [
      {
        body: "A radical prostatectomy removes the prostate and seminal vesicles, and may include nearby lymph nodes. It provides final pathology, and PSA is expected to fall to a very low or undetectable level afterwards, which makes follow-up straightforward.",
      },
      {
        heading: "Tradeoffs to weigh",
        items: [
          "An operation, anaesthetic, catheter, and recovery period",
          "Urinary leakage is common early and improves for most people over months; it can persist for some",
          "Erectile function may take months to recover and may not return to baseline",
          "Ejaculation and natural fertility are lost after prostate removal",
        ],
      },
      {
        note: "Guidelines note that outcomes after prostatectomy vary with surgeon and centre experience. It is reasonable to ask any surgeon how often they perform the operation and what their own results are.",
      },
    ],
    questions: [
      "What are my chances of cancer control, continence, and erectile recovery in your hands?",
      "What makes my estimate different from a published average?",
    ],
    references: refs("aua", "nciTreat", "tewari2011"),
  },
  {
    id: "radiation",
    title: "Radiation therapy",
    category: "treatment",
    description: "External-beam radiation or brachytherapy, sometimes with hormone therapy.",
    sections: [
      {
        body: "External-beam radiation is delivered from outside the body over a schedule that may range from a few high-dose treatments to several weeks. Brachytherapy places radioactive sources in or near the prostate. Either may be used alone or, in selected cases, together.",
      },
      {
        heading: "Tradeoffs to weigh",
        items: [
          "No incision and no removal of the prostate",
          "Urinary frequency, urgency, or burning may occur, especially early",
          "Bowel urgency or irritation can occur; serious bowel injury is uncommon with modern technique",
          "Erectile function can decline gradually over time",
          "Surgery after radiation is possible in selected cases but is more complex",
        ],
      },
      {
        heading: "When hormone therapy may be added",
        items: [
          "Unfavorable intermediate risk with radiation: short-course ADT, about 4 to 6 months",
          "High risk with definitive radiation: generally 18 to 36 months",
          "Selected very high-risk or node-positive disease: ADT with abiraterone and prednisone for about 24 months",
        ],
        note: "These are the durations in the 2022 AUA/ASTRO guideline. An individual plan may differ.",
      },
    ],
    questions: ["What technique and schedule would you use, and why?", "Would hormone therapy be recommended, and for how long?"],
    references: refs("aua", "nciTreat"),
  },
  {
    id: "other-approaches",
    title: "Other treatment approaches",
    category: "treatment",
    description: "Focal therapy and clinical trials, in carefully selected situations.",
    sections: [
      {
        body: "Focal therapy treats a targeted area of the prostate rather than the whole gland, using techniques such as high-intensity focused ultrasound (HIFU) or cryoablation. Eligibility and the strength of long-term evidence vary by technique.",
      },
      {
        note: "NCCN's 2026 update urges caution in using focal therapy for newly diagnosed prostate cancer. It is reasonable to ask whether you would be treated on a protocol, and what evidence applies to your situation.",
      },
      {
        heading: "Clinical trials",
        body: "Trials can offer access to new imaging, treatment, monitoring, or supportive-care strategies. Participation is voluntary. Ask about the purpose of the trial, randomisation, alternatives, extra visits, costs, risks, and what happens after the study.",
      },
    ],
    questions: ["Is my cancer suitable for a focal approach, and on what evidence?", "Are there clinical trials I could consider?"],
    references: refs("nccn", "nciTreat"),
  },

  {
    id: "recovery-continence",
    title: "Urinary control after surgery",
    category: "recovery",
    description: "Leakage is common early and usually improves over months.",
    sections: [
      {
        body: "After prostate removal a catheter is used for a short period. Urinary leakage is common once it comes out and improves for most people over the following months. Pelvic floor physiotherapy is often part of recovery, and a smaller number of people have longer-lasting leakage.",
      },
      {
        heading: "How surgical technique tries to protect it",
        body: "Continence is treated as its own surgical objective. Techniques described by this department preserve and reconstruct the structures that support urinary control rather than simply avoiding them.",
      },
    ],
    questions: ["What is my baseline urinary function, and what does that mean for recovery?", "When would pelvic floor physiotherapy start?"],
    references: refs("wagaskar2021", "vis2019"),
  },
  {
    id: "recovery-sexual",
    title: "Sexual function after treatment",
    category: "recovery",
    description: "Recovery varies widely and depends heavily on baseline function.",
    sections: [
      {
        body: "Erectile function may take months to recover after surgery and may not return to baseline. After radiation, erectile function can decline gradually over a longer period. Recovery depends on baseline function, age, cardiovascular health, whether nerves could be spared, and other factors.",
      },
      {
        heading: "Worth arranging early",
        items: [
          "A conversation about baseline function before treatment, so recovery can be measured against it",
          "Referral to sexual medicine or pelvic health services",
          "A discussion about fertility preservation before treatment if that matters to you",
        ],
      },
    ],
    questions: ["What is realistic for someone with my baseline function?", "What support is available, and when does it start?"],
    references: refs("tewari2011", "aua"),
  },

  {
    id: "monitoring-after-treatment",
    title: "PSA follow-up after treatment",
    category: "monitoring",
    description: "PSA is the main way treatment response is tracked over time.",
    sections: [
      {
        body: "After surgery, PSA is expected to fall to a very low or undetectable level, and follow-up watches for any rise. After radiation the prostate remains in place, so PSA falls more slowly and is interpreted differently. Your team will explain the schedule and what change would prompt action.",
      },
    ],
    questions: ["What PSA level or change would concern you?", "How often will PSA be checked, and for how long?"],
    references: refs("aua", "nccn"),
  },
  {
    id: "monitoring-surveillance",
    title: "Being on active surveillance",
    category: "monitoring",
    description: "Scheduled testing designed to catch change early.",
    sections: [
      {
        body: "Surveillance protocols typically combine regular PSA tests and clinical visits with periodic imaging and repeat biopsy. The Tewari Active Surveillance Program describes risk stratification after a positive biopsy, a confirmatory biopsy with genomic testing before enrolment, and then a standard monitoring protocol.",
      },
      {
        heading: "What may prompt a change of plan",
        items: [
          "A higher Grade Group on a repeat biopsy",
          "A meaningful increase in the amount of cancer, or a concerning change in PSA",
          "A new or growing suspicious area on MRI",
          "Your own preference to move to treatment",
        ],
      },
    ],
    questions: ["What is my exact surveillance schedule?", "What would trigger a change in plan?"],
    references: refs("asProgram", "nccn"),
  },
];

export const byId = (id: string) => CONTENT.find((c) => c.id === id);
export const byCategory = (cat: string) => CONTENT.filter((c) => c.category === cat);

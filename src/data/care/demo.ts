/**
 * SYNTHETIC demonstration data. Not a real person and not a real record.
 * Every screen that renders this must label it as example data.
 */
export const DEMO_LABEL = "Example data — not a real patient record";

export const DEMO_PSA_HISTORY = [
  { date: "2022", value: 2.1 },
  { date: "2023", value: 2.8 },
  { date: "2024", value: 3.4 },
  { date: "2025", value: 4.1 },
];

export const RISK_FACTORS = [
  { id: "family", label: "Family history of prostate cancer" },
  { id: "psa", label: "Previous elevated PSA" },
  { id: "biopsy", label: "Previous prostate biopsy" },
  { id: "genetic", label: "Known genetic risk (for example BRCA2)" },
  { id: "age", label: "Age 50 or older" },
  { id: "ancestry", label: "Black or African ancestry" },
  { id: "other", label: "Other factors my clinician has mentioned" },
];

export const QUESTION_SETS = [
  {
    id: "before-psa",
    stage: "Before a PSA test",
    questions: [
      "Why am I having a PSA test?",
      "Is there anything I should avoid before the test?",
      "How will we use the result?",
    ],
  },
  {
    id: "after-elevated",
    stage: "After an elevated PSA",
    questions: [
      "What could be contributing to my PSA?",
      "Should the PSA be repeated?",
      "Do I need additional evaluation, such as an MRI?",
    ],
  },
  {
    id: "after-mri",
    stage: "After an MRI",
    questions: [
      "What was my PI-RADS score?",
      "What does the MRI show, and where?",
      "Do you recommend a biopsy?",
    ],
  },
  {
    id: "after-biopsy",
    stage: "After a biopsy",
    questions: [
      "What is my Grade Group?",
      "What does my pathology report mean?",
      "What is my risk group, and which findings put me there?",
      "What treatment options should I consider?",
    ],
  },
  {
    id: "before-treatment",
    stage: "Before treatment",
    questions: [
      "What is the goal of this treatment for me?",
      "What are the potential side effects, and how likely are they?",
      "What alternatives are available, including monitoring?",
      "How will we know whether it worked, and what happens if it does not?",
    ],
  },
  {
    id: "caregiver",
    stage: "For family and caregivers",
    questions: [
      "What should we watch for at home after treatment?",
      "Who do we contact out of hours?",
      "How can I help track results and appointments?",
      "What support is available for me as a caregiver?",
    ],
  },
];

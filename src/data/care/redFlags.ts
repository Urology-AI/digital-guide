/**
 * Symptoms that need care now, checked before anything is retrieved.
 *
 * A patient-facing tool must not answer "I can't pass urine" with a passage
 * about biopsy aftercare. These strings are matched on the question, and the
 * guidance is shown above any retrieved content. It never replaces triage — it
 * points at it.
 */
export const RED_FLAGS: { match: RegExp; advice: string }[] = [
  {
    match: /\b(can'?t|cannot|unable to|difficulty) (pass|passing|pee|urinat\w*)\b|\bretention\b/i,
    advice:
      "Being unable to pass urine needs urgent medical attention — contact your care team now or go to an emergency department. Do not wait for a scheduled appointment.",
  },
  {
    match: /\b(fever|chills|shivering|rigors)\b/i,
    advice:
      "Fever or chills after a prostate biopsy can signal infection and needs urgent medical attention. Contact your care team now or go to an emergency department.",
  },
  {
    match: /\b(heavy bleeding|blood clots?|bleeding a lot|haemorrhag\w*|hemorrhag\w*)\b/i,
    advice:
      "Heavy bleeding or passing clots needs urgent medical attention. Contact your care team now or go to an emergency department.",
  },
  {
    match: /\b(chest pain|short of breath|shortness of breath|breathless|collapsed?|fainted)\b/i,
    advice:
      "Chest pain, breathlessness, or fainting are medical emergencies. Call 911 (or your local emergency number) now.",
  },
  {
    match: /\b(severe pain|unbearable pain|excruciating)\b/i,
    advice:
      "Severe pain should be assessed promptly — contact your care team today, or seek urgent care if it is worsening.",
  },
  {
    match: /\b(suicidal|kill myself|end my life|want to die)\b/i,
    advice:
      "If you are thinking about harming yourself, please talk to someone now — call or text 988 (Suicide and Crisis Lifeline, US), or call 911. Your care team can also connect you with support.",
  },
];

/** Returns urgent guidance when a question mentions a red-flag symptom. */
export function checkRedFlags(question: string): string | null {
  for (const flag of RED_FLAGS) {
    if (flag.match.test(question)) return flag.advice;
  }
  return null;
}

/**
 * Records questions the content could not answer, so gaps can be found from
 * real use rather than guessed at.
 *
 * Deliberately local-only: questions a patient types are sensitive, and this
 * app has no consented backend to send them to. Export is manual and explicit.
 * If this ever becomes server-side it needs consent, retention, and review.
 */
const KEY = "care_ask_misses";
const LIMIT = 200;

export interface AskMiss {
  q: string;
  at: string;
}

export function logMiss(question: string): void {
  try {
    const existing = readMisses();
    existing.push({ q: question, at: new Date().toISOString() });
    localStorage.setItem(KEY, JSON.stringify(existing.slice(-LIMIT)));
  } catch {
    /* storage unavailable — a lost log must never break the answer */
  }
}

export function readMisses(): AskMiss[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AskMiss[]) : [];
  } catch {
    return [];
  }
}

export function clearMisses(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

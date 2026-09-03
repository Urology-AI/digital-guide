/**
 * Adapter for @urology-ai/epsa-engine — the department's shared ePSA
 * calculator (Urology-AI/epsa-engine), the same engine behind
 * millionstrongmen.com and the MSSM screening tool.
 *
 * The package is private (GitHub Packages, scope @urology-ai), so it is NOT a
 * hard dependency here: this app must keep building and deploying without it.
 * The import is dynamic and guarded — when the engine is installed the guide
 * scores in-browser; when it is not, callers fall back to the checklist and a
 * link to the hosted tool.
 *
 * To enable locally (per the engine's own convention of a file: dependency):
 *   npm install ../epsa-engine
 *
 * Every result is stamped with the engine and guideline versions, as the
 * engine's README requires for traceability of any persisted assessment.
 */

export interface EpsaInput {
  age: number;
  /** Free-text ancestry value; the engine treats "black" as the risk encoding. */
  race: string;
  bmi: number;
  /** IPSS item scores (urinary symptoms). */
  ipss: number[];
  /** SHIM item scores (erectile function). */
  shim: number[];
  /** 0 = regular, 1 = some, 2 = none. */
  exercise: 0 | 1 | 2;
  familyHistory: boolean;
  hypertension: boolean;
  hyperlipidemia: boolean;
  coronaryArteryDisease: boolean;
  diabetes: boolean;
  priorBiopsyHistory?: boolean;
}

export interface EpsaTier {
  key: string;
  label: string;
  description: string;
  guidelineCriteriaMet: boolean;
}

export interface EpsaAssessment {
  tier: EpsaTier;
  score: number;
  recommendPSA: boolean | null;
  reason: string | null;
  alerts: { level: string; title: string; message: string }[];
  engineVersion: string;
  guidelineVersion: string;
}

type EngineModule = {
  calculateDynamicEPsa: (formData: Record<string, unknown>, config?: unknown) => Record<string, unknown>;
  checkGuardrails?: (formData: Record<string, unknown>, pathwayMode: string) => unknown;
  ENGINE_VERSION: string;
  GUIDELINE_VERSION: string;
};

let cached: EngineModule | null | undefined;

/**
 * Loads the engine once. Returns null when it is not installed, rather than
 * throwing — the specifier is held in a variable so the bundler does not try to
 * resolve it at build time.
 */
export async function loadEpsaEngine(): Promise<EngineModule | null> {
  if (cached !== undefined) return cached;
  try {
    const mod = (await import("@urology-ai/epsa-engine")) as unknown as EngineModule & {
      EPSA_ENGINE_STUB?: boolean;
    };
    // vite.config.ts aliases the specifier to a stub when the package is absent.
    cached = mod.EPSA_ENGINE_STUB ? null : mod;
  } catch {
    cached = null;
  }
  return cached;
}

export async function isEpsaEngineAvailable(): Promise<boolean> {
  return (await loadEpsaEngine()) !== null;
}

/**
 * Runs the engine's Part 1 (pre-PSA screening) model.
 * Educational output only — it does not diagnose and does not replace a
 * clinician's assessment.
 */
export async function assessScreening(input: EpsaInput): Promise<EpsaAssessment | null> {
  const engine = await loadEpsaEngine();
  if (!engine) return null;

  const formData: Record<string, unknown> = {
    age: input.age,
    race: input.race,
    bmi: input.bmi,
    ipss: input.ipss,
    shim: input.shim,
    exercise: input.exercise,
    familyHistory: input.familyHistory,
    hypertension: input.hypertension,
    hyperlipidemia: input.hyperlipidemia,
    coronaryArteryDisease: input.coronaryArteryDisease,
    diabetes: input.diabetes,
    priorBiopsyHistory: input.priorBiopsyHistory ?? false,
  };

  const result = engine.calculateDynamicEPsa(formData);
  if (!result || typeof result !== "object") return null;

  const tier = result.part1Tier as EpsaTier | undefined;
  if (!tier) return null;

  const rawAlerts = engine.checkGuardrails?.(formData, "screening");
  const alerts = Array.isArray(rawAlerts)
    ? (rawAlerts as { level: string; title: string; message: string }[])
    : [];

  return {
    tier,
    score: Number(result.score ?? 0),
    recommendPSA: (result.recommendPSA as boolean | null) ?? null,
    reason: (result.psaRecommendReason as string | null) ?? null,
    alerts,
    engineVersion: engine.ENGINE_VERSION,
    guidelineVersion: engine.GUIDELINE_VERSION,
  };
}

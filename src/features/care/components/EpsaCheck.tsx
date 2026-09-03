import { useEffect, useState } from "react";
import {
  assessScreening,
  isEpsaEngineAvailable,
  type EpsaAssessment,
} from "../../../services/epsaEngine";

const TIER_STYLE: Record<string, string> = {
  screening_recommended: "border-sinai-400 bg-sinai-50",
  discussion_advised_extended_risk: "border-amber-300 bg-amber-50",
  discussion_optional: "border-slate-300 bg-slate-50",
  screening_not_indicated: "border-slate-300 bg-slate-50",
};

const EXERCISE = [
  { v: 0, label: "Regular exercise" },
  { v: 1, label: "Some exercise" },
  { v: 2, label: "Little or none" },
];

const ANCESTRY = [
  { v: "white", label: "White" },
  { v: "black", label: "Black or African ancestry" },
  { v: "asian", label: "Asian" },
  { v: "hispanic", label: "Hispanic or Latino" },
  { v: "other", label: "Other or prefer not to say" },
];

/**
 * Runs the department's own ePSA engine in the browser when it is installed.
 * Output is an educational screening-conversation tier, never a diagnosis.
 */
export function EpsaCheck() {
  const [available, setAvailable] = useState<boolean | null>(null);
  const [age, setAge] = useState(60);
  const [race, setRace] = useState("white");
  const [bmi, setBmi] = useState(27);
  const [exercise, setExercise] = useState<0 | 1 | 2>(1);
  const [familyHistory, setFamilyHistory] = useState(false);
  const [priorBiopsy, setPriorBiopsy] = useState(false);
  const [conditions, setConditions] = useState({
    hypertension: false,
    hyperlipidemia: false,
    coronaryArteryDisease: false,
    diabetes: false,
  });
  const [result, setResult] = useState<EpsaAssessment | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    isEpsaEngineAvailable().then(setAvailable);
  }, []);

  if (available === null) return null;

  if (!available) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900">Check your risk with ePSA</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          ePSA is the department's educational screening tool. It asks about your history and, if you have them, your
          PSA and MRI results, then describes whether a PSA conversation is worth having. It is not a diagnosis.
        </p>
        <a
          className="mt-5 inline-block rounded-xl bg-sinai-400 px-5 py-3 text-sm font-bold text-white transition hover:bg-sinai-500"
          href="https://epsa.millionstrongmen.com/"
          target="_blank"
          rel="noreferrer"
        >
          Open the ePSA tool →
        </a>
      </div>
    );
  }

  const run = async () => {
    setBusy(true);
    try {
      const assessment = await assessScreening({
        age,
        race,
        bmi,
        // Neutral mid-range questionnaire values: this screen asks the fields
        // that change the screening conversation, not the full IPSS/SHIM
        // instruments, which belong in the ePSA tool itself.
        ipss: [1, 1, 1, 1, 1, 1, 1],
        shim: [3, 3, 3, 3, 3],
        exercise,
        familyHistory,
        priorBiopsyHistory: priorBiopsy,
        ...conditions,
      });
      setResult(assessment);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-slate-900">Check your risk</h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
          Runs on this device
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        This uses the department's ePSA screening model to describe what kind of PSA conversation your profile
        suggests. It is educational: it does not diagnose cancer and does not estimate whether you have it.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-slate-800">Age</span>
          <input
            type="number"
            min={40}
            max={90}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sinai-400"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-800">Ancestry</span>
          <select
            value={race}
            onChange={(e) => setRace(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sinai-400"
          >
            {ANCESTRY.map((a) => (
              <option key={a.v} value={a.v}>
                {a.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-800">Body mass index (BMI)</span>
          <input
            type="number"
            min={15}
            max={60}
            value={bmi}
            onChange={(e) => setBmi(Number(e.target.value))}
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sinai-400"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-800">Physical activity</span>
          <select
            value={exercise}
            onChange={(e) => setExercise(Number(e.target.value) as 0 | 1 | 2)}
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sinai-400"
          >
            {EXERCISE.map((e2) => (
              <option key={e2.v} value={e2.v}>
                {e2.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-slate-800">History</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4 accent-sinai-400"
              checked={familyHistory}
              onChange={() => setFamilyHistory((v) => !v)}
            />
            Family history of prostate cancer
          </label>
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4 accent-sinai-400"
              checked={priorBiopsy}
              onChange={() => setPriorBiopsy((v) => !v)}
            />
            Previous prostate biopsy
          </label>
          {(
            [
              ["hypertension", "High blood pressure"],
              ["hyperlipidemia", "High cholesterol"],
              ["coronaryArteryDisease", "Coronary artery disease"],
              ["diabetes", "Diabetes"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 accent-sinai-400"
                checked={conditions[key]}
                onChange={() => setConditions((c) => ({ ...c, [key]: !c[key] }))}
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={run}
        disabled={busy}
        className="mt-6 rounded-xl bg-sinai-400 px-6 py-3 text-sm font-bold text-white transition hover:bg-sinai-500 disabled:opacity-60"
      >
        {busy ? "Checking…" : "Check my screening profile"}
      </button>

      {result && (
        <div
          className={`mt-6 rounded-2xl border-l-4 p-5 ${TIER_STYLE[result.tier.key] ?? "border-slate-300 bg-slate-50"}`}
          role="status"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">What this suggests</p>
          <h4 className="mt-1 text-lg font-bold text-slate-900">{result.tier.label}</h4>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{result.tier.description}</p>
          {/* The engine returns machine-readable reason codes (e.g.
              "age_guideline_50_69"); only show a reason that is prose. */}
          {result.reason && !/^[a-z0-9]+(_[a-z0-9]+)+$/.test(result.reason) && (
            <p className="mt-2 text-sm text-slate-600">{result.reason}</p>
          )}

          {result.alerts.length > 0 && (
            <ul className="mt-4 space-y-2">
              {result.alerts.map((a) => (
                <li key={a.title} className="rounded-xl bg-white/70 p-3 text-sm">
                  <strong className="block text-slate-900">{a.title}</strong>
                  <span className="text-slate-600">{a.message}</span>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-4 border-t border-black/5 pt-3 text-xs leading-relaxed text-slate-500">
            Educational output only — it describes what kind of screening conversation guidelines point to, not
            whether you have cancer. Take it to your clinician. ePSA engine {result.engineVersion}, thresholds
            anchored to {result.guidelineVersion}.
          </p>
        </div>
      )}
    </div>
  );
}

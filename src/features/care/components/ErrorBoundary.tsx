import { Component, type ErrorInfo, type ReactNode } from "react";

/**
 * Catches render errors so a fault in one component does not blank the whole
 * page — which is what happened when the language provider threw. A patient
 * reading about their diagnosis should get a usable page and a way onward,
 * not a white screen.
 */
export class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Left as console output on purpose: there is no telemetry sink in this
    // app, and patient-facing pages must not ship errors anywhere by default.
    console.error("Care guide render error:", error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-5 py-16">
        <div className="max-w-lg text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sinai-magenta">
            Something went wrong
          </p>
          <h1 className="mt-3 text-2xl font-bold text-slate-900">This page didn't load properly</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            The problem is with this page, not with anything you did. Reloading usually fixes it. Nothing you have
            entered is sent anywhere, and anything saved stays on this device.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-xl bg-sinai-400 px-5 py-3 text-sm font-bold text-white transition hover:bg-sinai-500"
            >
              Reload the page
            </button>
            <a
              href="#/"
              onClick={() => this.setState({ error: null })}
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-sinai-400 hover:text-sinai-600"
            >
              Back to the start
            </a>
          </div>
          <p className="mt-8 text-xs leading-relaxed text-slate-500">
            If you need clinical help now, contact your care team — Mount Sinai cancer appointments
            844-MD-CANCER, Urology 212-241-9955. In an emergency, call 911.
          </p>
        </div>
      </div>
    );
  }
}

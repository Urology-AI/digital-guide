import { useEffect } from "react";
import { PatientGuide } from "../../components/guide/PatientGuide";
import { BottomNav, Footer, Header } from "./components/Chrome";
import { routePath, useRoute } from "./router";
import { Home } from "./pages/Home";
import { Start } from "./pages/Start";
import { Journey } from "./pages/Journey";
import { Caregiver, Questions } from "./pages/Questions";
import { Diagnosis, Health, Imaging, Monitoring, Psa, Recovery, Risk, Treatment } from "./pages/Stages";

export const ROUTES: Record<string, () => JSX.Element> = {
  "/": Home,
  "/start": Start,
  "/health": Health,
  "/risk": Risk,
  "/psa": Psa,
  "/imaging": Imaging,
  "/diagnosis": Diagnosis,
  "/treatment": Treatment,
  "/recovery": Recovery,
  "/monitoring": Monitoring,
  "/journey": Journey,
  "/questions": Questions,
  "/caregiver": Caregiver,
};

export function CareApp() {
  const [route] = useRoute();
  const path = routePath(route);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [path]);

  // The in-depth clinical guide keeps its own full-screen chrome.
  if (path === "/guide") {
    return (
      <div className="min-h-screen bg-white">
        <a
          href="#/"
          className="fixed left-4 top-4 z-[70] rounded-full border border-slate-300 bg-white/95 px-4 py-2 text-xs font-bold text-slate-700 shadow-sm backdrop-blur hover:border-sinai-400 hover:text-sinai-600"
        >
          ← Tewari Prostate Care
        </a>
        <PatientGuide />
      </div>
    );
  }

  const Page = ROUTES[path] ?? Home;

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-sinai-violet focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to content
      </a>
      <Header path={path} />
      <main id="main" className="flex-1">
        <Page />
      </main>
      <Footer />
      <BottomNav path={path} />
    </div>
  );
}

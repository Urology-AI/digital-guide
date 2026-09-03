import type { LangCode } from "./index";

/**
 * UI strings for the care guide. Content lives in /data/care; this file holds
 * only chrome, so a translator can work on the two independently.
 * Languages beyond those defined here fall back to English.
 */
const EN = {
  "app.name": "Tewari Prostate Care",
  "app.tagline": "Your Digital Guide to Prostate Health, Screening & Cancer Care",
  "nav.home": "Home",
  "nav.health": "Prostate Health",
  "nav.screening": "Screening",
  "nav.diagnosis": "Diagnosis",
  "nav.treatment": "Treatment",
  "nav.recovery": "Recovery",
  "nav.monitoring": "Monitoring",
  "nav.menu": "Menu",
  "nav.language": "Language",
  "home.title": "A clearer way to understand your prostate health and care journey.",
  "home.lead":
    "Explore prostate health, screening, diagnosis, treatment options, recovery, and long-term monitoring — all in one place.",
  "home.cta.primary": "Start your prostate care guide",
  "home.cta.secondary": "Explore the guide",
  "home.journey.title": "Where are you in your prostate care journey?",
  "home.journey.lead": "Each stage below opens a plain-language explanation. You can start anywhere.",
  "start.title": "Where are you right now?",
  "start.lead": "Choose what fits best. You can change this at any time.",
  "disclaimer":
    "This guide is for educational purposes and does not replace advice from your healthcare professional.",
  "demo.badge": "Example data",
  "questions.title": "Questions for your doctor",
  "questions.lead": "Written to be taken to an appointment. Copy them, or add your own.",
  "questions.copy": "Copy questions",
  "questions.copied": "Copied",
  "refs.title": "Sources",
  "ask.title": "Questions to discuss with your care team",
  "back": "Back",
  "readmore": "Read more",
  "deepdive.title": "The full clinical guide",
  "deepdive.lead":
    "A longer, referenced guide to localized prostate cancer — diagnosis, treatment comparison, published outcomes, and the department's own literature.",
  "deepdive.cta": "Open the full guide",
};

type Dict = typeof EN;

const ES: Partial<Dict> = {
  "app.tagline": "Su guía digital sobre la salud de la próstata, las pruebas de detección y el cáncer de próstata",
  "nav.home": "Inicio",
  "nav.health": "Salud de la próstata",
  "nav.screening": "Detección",
  "nav.diagnosis": "Diagnóstico",
  "nav.treatment": "Tratamiento",
  "nav.recovery": "Recuperación",
  "nav.monitoring": "Seguimiento",
  "nav.menu": "Menú",
  "nav.language": "Idioma",
  "home.title": "Una forma más clara de entender su salud prostática y su recorrido de atención.",
  "home.lead":
    "Explore la salud de la próstata, las pruebas de detección, el diagnóstico, las opciones de tratamiento, la recuperación y el seguimiento a largo plazo, todo en un mismo lugar.",
  "home.cta.primary": "Comenzar su guía",
  "home.cta.secondary": "Explorar la guía",
  "home.journey.title": "¿En qué etapa se encuentra?",
  "start.title": "¿Dónde se encuentra ahora?",
  "disclaimer":
    "Esta guía tiene fines educativos y no sustituye el consejo de su profesional de salud.",
  "demo.badge": "Datos de ejemplo",
  "questions.title": "Preguntas para su médico",
  "refs.title": "Fuentes",
  "ask.title": "Preguntas para conversar con su equipo de atención",
  "back": "Atrás",
};

const HI: Partial<Dict> = {
  "app.tagline": "प्रोस्टेट स्वास्थ्य, स्क्रीनिंग और कैंसर देखभाल के लिए आपकी डिजिटल गाइड",
  "nav.home": "होम",
  "nav.health": "प्रोस्टेट स्वास्थ्य",
  "nav.screening": "स्क्रीनिंग",
  "nav.diagnosis": "निदान",
  "nav.treatment": "उपचार",
  "nav.recovery": "रिकवरी",
  "nav.monitoring": "निगरानी",
  "nav.menu": "मेन्यू",
  "nav.language": "भाषा",
  "home.title": "अपने प्रोस्टेट स्वास्थ्य और देखभाल की यात्रा को समझने का एक स्पष्ट तरीका।",
  "home.lead":
    "प्रोस्टेट स्वास्थ्य, स्क्रीनिंग, निदान, उपचार विकल्प, रिकवरी और दीर्घकालिक निगरानी — सब एक ही जगह।",
  "home.cta.primary": "अपनी गाइड शुरू करें",
  "home.cta.secondary": "गाइड देखें",
  "home.journey.title": "आप अपनी यात्रा में कहाँ हैं?",
  "start.title": "आप अभी कहाँ हैं?",
  "disclaimer":
    "यह गाइड केवल शैक्षिक उद्देश्यों के लिए है और आपके स्वास्थ्य पेशेवर की सलाह का विकल्प नहीं है।",
  "demo.badge": "उदाहरण डेटा",
  "questions.title": "अपने डॉक्टर के लिए प्रश्न",
  "refs.title": "स्रोत",
  "ask.title": "अपनी देखभाल टीम से चर्चा करने के लिए प्रश्न",
  "back": "वापस",
};

const DICTS: Partial<Record<LangCode, Partial<Dict>>> = { es: ES, hi: HI };

/** Look up a UI string, falling back to English for untranslated keys. */
export function tc(lang: LangCode, key: keyof Dict): string {
  return DICTS[lang]?.[key] ?? EN[key];
}

/** Languages with a care-guide translation, for the header selector. */
export const CARE_LANGS: { code: LangCode; label: string }[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "hi", label: "हिन्दी" },
];

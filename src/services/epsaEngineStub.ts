/**
 * Stand-in for @urology-ai/epsa-engine when that private package is not
 * installed. vite.config.ts aliases the engine specifier here so the app builds
 * and deploys without it; the adapter sees the null marker and falls back to
 * linking out to the hosted ePSA tool.
 */
export const EPSA_ENGINE_STUB = true;
export const ENGINE_VERSION = "";
export const GUIDELINE_VERSION = "";
export function calculateDynamicEPsa(): null {
  return null;
}

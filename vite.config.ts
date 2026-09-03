import { createRequire } from "node:module";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * @urology-ai/epsa-engine is a private package (GitHub Packages). The app must
 * build with or without it: when it is absent we alias the specifier to a stub
 * so the bundle still resolves, and the ePSA feature degrades to linking out to
 * the hosted tool. Install it with `npm install ../epsa-engine` to enable
 * in-browser scoring.
 */
const require = createRequire(import.meta.url);
function epsaEngineAlias(): Record<string, string> {
  try {
    require.resolve("@urology-ai/epsa-engine");
    return {};
  } catch {
    return { "@urology-ai/epsa-engine": "/src/services/epsaEngineStub.ts" };
  }
}

export default defineConfig({
  plugins: [react()],
  resolve: { alias: epsaEngineAlias() },
  // GitHub Pages deploys to https://www.urology.edu.eu.org/digital-guide/
  // (CI overrides this with --base from the repo name; this covers local prod builds.)
  base: process.env.NODE_ENV === "production" ? "/digital-guide/" : "/",
  server: {
    port: 5173,
    host: true, // Allow external connections
    hmr: {
      // Enable Hot Module Replacement
      overlay: true, // Show errors in browser overlay
    },
    watch: {
      // Watch for file changes
      usePolling: false, // Use native file system events (faster)
      interval: 100, // Polling interval if usePolling is true
    },
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/media": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
  build: {
    // Enable source maps for better debugging
    sourcemap: true,
    // Watch mode for production builds (useful for testing)
    watch: null, // Set to {} to enable watch mode
  },
});

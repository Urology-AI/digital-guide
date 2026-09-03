import { useState } from "react";

/**
 * Mount Sinai lockup.
 *
 * If an official logo file is present at public/mount-sinai-logo.svg (or .png)
 * it is used. Otherwise this falls back to a typographic wordmark in the brand
 * colours — the official asset should be dropped in from the Mount Sinai Brand
 * Center before publication, and no approximation of the official mark is drawn
 * here.
 */
export function MountSinaiLogo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [failed, setFailed] = useState(false);
  const src = `${import.meta.env.BASE_URL}mount-sinai-logo.svg`;

  if (!failed) {
    return (
      <img
        src={src}
        alt="Mount Sinai"
        className="h-7 w-auto"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span
      className={`rounded px-1.5 py-1 text-[10px] font-bold leading-none tracking-[0.14em] ${
        variant === "light" ? "bg-white text-sinai-violet" : "bg-sinai-violet text-white"
      }`}
    >
      MOUNT SINAI
    </span>
  );
}

/** Full brand lockup: mark plus department line. */
export function BrandLockup() {
  return (
    <span className="flex items-center gap-3">
      <MountSinaiLogo />
      <span className="hidden border-l border-slate-200 pl-3 sm:block">
        <span className="block text-[15px] font-bold leading-tight text-slate-900">Tewari Prostate Care</span>
        <span className="block text-[10px] uppercase tracking-[0.1em] text-slate-500">
          Petrie Department of Urology
        </span>
      </span>
    </span>
  );
}

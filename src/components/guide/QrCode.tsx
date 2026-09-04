import { useEffect, useState } from "react";
import QRCode from "qrcode";

/** Renders a QR code for `value` as an inline data-URI image (generated locally). */
export function QrCode({ value, label }: { value: string; label: string }) {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    let live = true;
    QRCode.toDataURL(value, {
      margin: 1,
      width: 320,
      errorCorrectionLevel: "M",
      color: { dark: "#212070ff", light: "#ffffffff" },
    })
      .then((url) => {
        if (live) setSrc(url);
      })
      .catch(() => {
        /* a missing QR is not worth breaking the page over */
      });
    return () => {
      live = false;
    };
  }, [value]);

  if (!src) return null;
  return (
    <figure className="guide-qr">
      <img src={src} alt={`QR code linking to ${value}`} width={104} height={104} />
      <figcaption>{label}</figcaption>
    </figure>
  );
}

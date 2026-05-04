import { useState } from "react";
import { FALLBACK_ICON } from "@/lib/format";

interface AppIconProps {
  iconUrl: string | null | undefined;
  packageName: string;
  name: string;
  size?: number;
  className?: string;
  modLabel?: string | null;
  showRibbon?: boolean;
  rounded?: "md" | "lg" | "xl" | "2xl";
}

export function AppIcon({
  iconUrl,
  packageName,
  name,
  size = 64,
  className = "",
  modLabel,
  showRibbon = true,
  rounded = "xl",
}: AppIconProps) {
  // Prefer the direct PlayMods CDN url, fallback to Google Play icon, then placeholder.
  const fallback = `https://play-lh.googleusercontent.com/vi/${packageName}/512`;
  const initial = iconUrl || fallback;
  const [src, setSrc] = useState(initial);
  const [stage, setStage] = useState<"primary" | "google" | "placeholder">(
    iconUrl ? "primary" : "google",
  );

  const handleError = () => {
    if (stage === "primary") {
      setSrc(fallback);
      setStage("google");
    } else {
      setSrc(FALLBACK_ICON);
      setStage("placeholder");
    }
  };

  const radiusClass = {
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  }[rounded];

  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        loading="lazy"
        onError={handleError}
        className={`h-full w-full ${radiusClass} border border-border bg-muted object-cover`}
      />
      {showRibbon && modLabel && (
        <span className="absolute -right-1.5 -top-1.5 rounded-md bg-mod px-1.5 py-0.5 text-[10px] font-extrabold leading-none text-mod-foreground shadow-sm">
          {modLabel}
        </span>
      )}
    </div>
  );
}

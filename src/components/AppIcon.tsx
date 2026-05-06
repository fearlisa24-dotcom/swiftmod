import { useState } from "react";
import { FALLBACK_ICON } from "@/lib/format";

interface AppIconProps {
  iconUrl?: string | null;
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
  rounded = "lg",
}: AppIconProps) {
  const primary = iconUrl || `https://play-lh.googleusercontent.com/vi/${packageName}/s256`;
  const secondary = `https://play-lh.googleusercontent.com/vi/${packageName}/s256`;
  const [src, setSrc] = useState(primary);
  const [stage, setStage] = useState<"primary" | "secondary" | "placeholder">("primary");

  const handleError = () => {
    if (stage === "primary") {
      setSrc(secondary);
      setStage("secondary");
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
      {showRibbon && (
        <span
          className="absolute right-0 top-0 rounded-bl-md rounded-tr-md px-1.5 py-0.5 text-[10px] font-extrabold leading-none text-white"
          style={{ backgroundColor: "#22C55E" }}
        >
          {modLabel || "MOD"}
        </span>
      )}
    </div>
  );
}

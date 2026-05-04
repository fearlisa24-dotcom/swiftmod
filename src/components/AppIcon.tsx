import { useState } from "react";
import { iconUrl, FALLBACK_ICON } from "@/lib/format";

interface AppIconProps {
  packageName: string;
  name: string;
  size?: number;
  className?: string;
  modLabel?: string | null;
  showRibbon?: boolean;
}

export function AppIcon({
  packageName,
  name,
  size = 64,
  className = "",
  modLabel,
  showRibbon = true,
}: AppIconProps) {
  const [src, setSrc] = useState(iconUrl(packageName));
  const ribbon = modLabel || null;

  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setSrc(FALLBACK_ICON)}
        className="h-full w-full rounded-xl border border-border bg-muted object-cover"
      />
      {showRibbon && ribbon && (
        <span className="absolute -right-1 -top-1 rounded-md bg-mod px-1.5 py-0.5 text-[10px] font-bold leading-none text-mod-foreground">
          {ribbon}
        </span>
      )}
    </div>
  );
}

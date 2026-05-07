import { useEffect, useRef } from "react";

interface Props {
  slot?: string;
  format?: string;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({ slot, format = "auto", className, label = "Advertisement" }: Props) {
  const ref = useRef<HTMLModElement>(null);
  useEffect(() => {
    if (typeof window === "undefined" || !slot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ignore */
    }
  }, [slot]);

  return (
    <div className={`my-4 flex flex-col items-center ${className ?? ""}`}>
      <span className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground/60">
        {label}
      </span>
      {slot ? (
        <ins
          ref={ref}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", minHeight: 90 }}
          data-ad-client="ca-pub-4578595376204328"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex h-[90px] w-full max-w-[728px] items-center justify-center rounded-md border border-dashed border-border text-xs text-muted-foreground">
          Ad space
        </div>
      )}
    </div>
  );
}

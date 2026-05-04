import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { AppIcon } from "./AppIcon";
import type { AppRow } from "./AppCard";

export function HeroCarousel({ apps }: { apps: AppRow[] }) {
  const [idx, setIdx] = useState(0);
  const slides = apps.slice(0, 5);

  useEffect(() => {
    if (slides.length === 0) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [slides.length]);

  if (slides.length === 0) return null;
  const a = slides[idx];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-brand/10 via-card to-primary/10">
      <Link
        to="/app/$packageName"
        params={{ packageName: a.package_name }}
        className="flex items-center gap-5 p-6 sm:p-8"
      >
        <AppIcon
          iconUrl={a.icon_url}
          packageName={a.package_name}
          name={a.name}
          size={104}
          modLabel={a.mod_label}
          rounded="2xl"
        />
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand">
            Featured · {a.category}
          </div>
          <h2 className="mt-1 truncate text-xl font-extrabold text-foreground sm:text-2xl">
            {a.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            v{a.version} · {a.size_mb} MB · ★ {a.rating.toFixed(1)}
          </p>
          <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">
            <Download className="h-3.5 w-3.5" />
            Download MOD APK
          </span>
        </div>
      </Link>

      <button
        onClick={() => setIdx((i) => (i - 1 + slides.length) % slides.length)}
        aria-label="Previous"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-card/90 p-1.5 hover:bg-card"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={() => setIdx((i) => (i + 1) % slides.length)}
        aria-label="Next"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-card/90 p-1.5 hover:bg-card"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-6 bg-brand" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

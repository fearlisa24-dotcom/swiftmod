import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Download, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AppIcon } from "@/components/AppIcon";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/download/$packageName")({
  component: DownloadPage,
});

interface AppRow {
  id: string;
  package_name: string;
  name: string;
  version: string;
  size_mb: number;
  mod_label: string | null;
  icon_url: string | null;
  description: string | null;
  downloads: number;
}

const COUNT = 5;
const FEATURES = [
  "Mod Menu Unlocked",
  "No Ads",
  "Anti-Ban Protection",
  "Verified Safe — Malware Free",
];

function DownloadPage() {
  const { packageName } = Route.useParams();
  const [app, setApp] = useState<AppRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [seconds, setSeconds] = useState(COUNT);

  useEffect(() => {
    supabase
      .from("apps")
      .select("id,package_name,name,version,size_mb,mod_label,icon_url,description,downloads")
      .eq("package_name", packageName)
      .maybeSingle()
      .then(({ data }) => {
        setApp(data as AppRow | null);
        setLoading(false);
      });
  }, [packageName]);

  useEffect(() => {
    if (loading || !app) return;
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, loading, app]);

  const startDownload = async () => {
    if (!app) return;
    await supabase
      .from("apps")
      .update({ downloads: (app.downloads ?? 0) + 1 })
      .eq("id", app.id);
    window.location.href = `/api/public/fetch-download?pkg=${encodeURIComponent(app.package_name)}`;
  };

  if (loading) return <div className="py-20 text-center text-muted-foreground">Loading…</div>;
  if (!app) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">App not found.</p>
        <Link to="/" className="mt-4 inline-block text-brand">Back home</Link>
      </div>
    );
  }

  const ready = seconds <= 0;
  const radius = 52;
  const circ = 2 * Math.PI * radius;
  const progress = ((COUNT - seconds) / COUNT) * circ;

  return (
    <div className="mx-auto max-w-xl space-y-6 py-6">
      <AdSlot label="Advertisement" />
      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <div className="mb-4 flex justify-center">
          <AppIcon
            iconUrl={app.icon_url}
            packageName={app.package_name}
            name={app.name}
            size={96}
            modLabel={app.mod_label}
            rounded="2xl"
          />
        </div>
        <h1 className="text-xl font-bold text-foreground">{app.name}</h1>
        {app.mod_label && (
          <span
            className="mt-2 inline-block rounded px-2 py-0.5 text-[11px] font-bold uppercase text-white"
            style={{ backgroundColor: "#ff6d00" }}
          >
            {app.mod_label}
          </span>
        )}
        <p className="mt-2 text-xs text-muted-foreground">
          v{app.version} · {app.size_mb} MB
        </p>

        <ul className="mt-5 space-y-2 text-left text-sm">
          {FEATURES.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <Check className="h-4 w-4" strokeWidth={3} style={{ color: "#22C55E" }} />
              <span className="text-foreground/80">{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-center">
          {!ready ? (
            <>
              <div className="relative h-32 w-32">
                <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
                  <circle cx="60" cy="60" r={radius} stroke="#E5E7EB" strokeWidth="8" fill="none" />
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="#22C55E"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={circ - progress}
                    style={{ transition: "stroke-dashoffset 1s linear" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-foreground">
                  {seconds}
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">Preparing your download…</p>
            </>
          ) : (
            <button
              type="button"
              onClick={startDownload}
              className="inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#22C55E" }}
            >
              <Download className="h-5 w-5" />
              Download APK
            </button>
          )}
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" style={{ color: "#22C55E" }} />
          Security Verified
        </div>
      </div>
      <AdSlot label="Advertisement" />
    </div>
  );
}

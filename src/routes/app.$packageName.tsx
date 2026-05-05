import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Star, ShieldCheck, Download, Zap, Check, ChevronRight, ThumbsUp, ThumbsDown, MessageSquare, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AppIcon } from "@/components/AppIcon";
import { SafetyBar } from "@/components/SafetyBar";
import { formatDownloads } from "@/lib/format";

export const Route = createFileRoute("/app/$packageName")({
  component: AppDetail,
  head: ({ params }) => ({
    meta: [
      { title: `${params.packageName} – Download Mod APK | PlayMods` },
      { name: "description", content: `Download the latest mod APK for ${params.packageName}. Verified safe, malware-free.` },
    ],
  }),
});

interface AppFull {
  id: string;
  package_name: string;
  name: string;
  category: string;
  type: string;
  version: string;
  rating: number;
  downloads: number;
  mod_label: string | null;
  size_mb: number;
  description: string | null;
  updated_on: string;
  icon_url?: string | null;
  download_url?: string | null;
}

const SECURITY_ITEMS = ["No Virus", "Malware Scanned", "Verified Safe"];

interface VersionRow {
  id: string;
  version: string;
  size_mb: number;
  released_on: string;
  notes: string | null;
}

const COMMENTS = [
  {
    id: "1",
    user: "ModMaster_X",
    role: "Mod Creator",
    avatar: "MX",
    time: "2 days ago",
    body: "Latest patch fixes the multiplayer crash on Android 14. Tested on Pixel 8 Pro — runs at a stable 60fps. Let me know if you hit any issues!",
    helpful: 142,
    notHelpful: 4,
  },
  {
    id: "2",
    user: "GameFan99",
    role: null,
    avatar: "GF",
    time: "5 hours ago",
    body: "Works perfectly. Unlimited resources unlocked as advertised. Install was clean — no ads, no weird permissions.",
    helpful: 38,
    notHelpful: 1,
  },
  {
    id: "3",
    user: "SafeInstaller",
    role: "Verified",
    avatar: "SI",
    time: "1 day ago",
    body: "Scanned the APK with VirusTotal — 0/72 detections. Confirmed safe. Thanks for the quick mod release!",
    helpful: 87,
    notHelpful: 0,
  },
];

const RATING_DIST = [
  { stars: 5, pct: 78 },
  { stars: 4, pct: 14 },
  { stars: 3, pct: 5 },
  { stars: 2, pct: 2 },
  { stars: 1, pct: 1 },
];

function AppDetail() {
  const { packageName } = Route.useParams();
  const [app, setApp] = useState<AppFull | null>(null);
  const [versions, setVersions] = useState<VersionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [versionOpen, setVersionOpen] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("apps")
        .select("*, download_url")
        .eq("package_name", packageName)
        .maybeSingle();
      setApp(data as AppFull | null);
      if (data) {
        const { data: v } = await supabase
          .from("app_versions")
          .select("*")
          .eq("app_id", data.id)
          .order("released_on", { ascending: false });
        setVersions((v ?? []) as VersionRow[]);
      }
      setLoading(false);
    })();
  }, [packageName]);

  const rows: VersionRow[] = useMemo(
    () =>
      versions.length > 0
        ? versions
        : app
        ? [
            {
              id: "current",
              version: app.version,
              size_mb: app.size_mb,
              released_on: app.updated_on,
              notes: "Current release",
            },
          ]
        : [],
    [versions, app],
  );

  if (loading) return <div className="py-20 text-center text-muted-foreground">Loading…</div>;
  if (!app) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">App not found.</p>
        <Link to="/" className="mt-4 inline-block text-brand">
          Back home
        </Link>
      </div>
    );
  }

  return (
    <article className="space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-brand">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/games" className="hover:text-brand">{app.type === "app" ? "Apps" : "Games"}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-semibold text-foreground">{app.category}</span>
        <ChevronRight className="h-3 w-3" />
        <span className="truncate text-foreground/70">{app.name}</span>
      </nav>

      {/* Hero card */}
      <div className="flex flex-col gap-6 rounded-lg border border-border bg-card p-6 md:flex-row">
        <div className="relative">
          <AppIcon
            iconUrl={(app as AppFull & { icon_url?: string | null }).icon_url}
            packageName={app.package_name}
            name={app.name}
            size={120}
            modLabel={app.mod_label}
            rounded="2xl"
          />
          <div className="mt-2 flex items-center justify-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-[11px] font-bold text-primary">
            <ShieldCheck className="h-3.5 w-3.5" /> Verified Safe
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">
            {app.type} · {app.category}
          </div>
          <h1 className="mt-1 text-2xl font-bold text-foreground">{app.name}</h1>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 stroke-amber-400" />
              <span className="font-semibold text-foreground">{app.rating.toFixed(1)}</span>
            </span>
            <span>{formatDownloads(app.downloads)} downloads</span>
            <span>{app.size_mb} MB</span>
            {app.mod_label && (
              <span className="rounded px-2 py-0.5 text-[11px] font-bold uppercase text-white" style={{ backgroundColor: "#ff6d00" }}>
                {app.mod_label}
              </span>
            )}
          </div>

          {/* Version dropdown */}
          <div className="relative mt-3 inline-block">
            <button
              type="button"
              onClick={() => setVersionOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold hover:bg-secondary"
            >
              Version History: v{app.version}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {versionOpen && (
              <div className="absolute z-10 mt-1 w-64 overflow-hidden rounded-md border border-border bg-card">
                {rows.slice(0, 6).map((v) => (
                  <div key={v.id} className="flex items-center justify-between border-b border-border px-3 py-2 text-xs last:border-0 hover:bg-secondary">
                    <span className="font-semibold">v{v.version}</span>
                    <span className="text-muted-foreground">{v.released_on}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="mt-4 text-sm text-foreground/80">
            {app.description ?? "No description provided."}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={app.download_url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#00c853" }}
            >
              <Download className="h-5 w-5" />
              Download APK v{app.version} ({app.size_mb} MB)
            </a>
            <a
              href={app.download_url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-primary bg-card px-6 py-3 text-base font-bold text-primary transition-colors hover:bg-primary/5"
            >
              <ShieldCheck className="h-5 w-5" />
              <Zap className="h-5 w-5" />
              Fast Download
            </a>
          </div>
        </div>
      </div>

      <SafetyBar />

      {/* Security */}
      <section className="rounded-lg border border-border bg-card p-5">
        <h2 className="mb-3 text-sm font-bold">Security</h2>
        <ul className="grid gap-2 sm:grid-cols-3">
          {SECURITY_ITEMS.map((label) => (
            <li
              key={label}
              className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium"
              style={{ color: "#00c853" }}
            >
              <Check className="h-4 w-4" strokeWidth={3} />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Ratings + distribution */}
      <section className="grid gap-4 rounded-lg border border-border bg-card p-5 md:grid-cols-[200px_1fr]">
        <div className="flex flex-col items-center justify-center border-b border-border pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
          <div className="text-5xl font-extrabold text-foreground">{app.rating.toFixed(1)}</div>
          <div className="mt-1 flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i <= Math.round(app.rating) ? "fill-amber-400 stroke-amber-400" : "stroke-muted-foreground"}`}
              />
            ))}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{formatDownloads(app.downloads)} reviews</div>
        </div>
        <div className="space-y-1.5">
          {RATING_DIST.map(({ stars, pct }) => (
            <div key={stars} className="flex items-center gap-3 text-xs">
              <span className="w-3 font-semibold">{stars}</span>
              <Star className="h-3 w-3 fill-amber-400 stroke-amber-400" />
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: "#00c853" }} />
              </div>
              <span className="w-8 text-right text-muted-foreground">{pct}%</span>
            </div>
          ))}
        </div>
      </section>

      {/* Version table */}
      <section className="rounded-lg border border-border bg-card">
        <div className="border-b border-border px-5 py-3 text-sm font-bold">Version History</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-5 py-2.5 font-semibold">Version</th>
                <th className="px-5 py-2.5 font-semibold">Size</th>
                <th className="px-5 py-2.5 font-semibold">Released</th>
                <th className="px-5 py-2.5 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((v) => (
                <tr key={v.id} className="border-t border-border">
                  <td className="px-5 py-3 font-semibold text-foreground">v{v.version}</td>
                  <td className="px-5 py-3 text-muted-foreground">{v.size_mb} MB</td>
                  <td className="px-5 py-3 text-muted-foreground">{v.released_on}</td>
                  <td className="px-5 py-3 text-muted-foreground">{v.notes ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Community Discussion */}
      <section className="rounded-lg border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold">Community Discussion</h2>
          <span className="text-xs text-muted-foreground">({COMMENTS.length} comments)</span>
        </div>

        {/* Compose */}
        <div className="mb-5 rounded-md border border-border bg-background p-3">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience (50+ words earns XP)…"
            rows={3}
            className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{comment.trim().split(/\s+/).filter(Boolean).length} words</span>
            <button
              type="button"
              className="rounded-md px-3 py-1.5 text-xs font-bold text-white"
              style={{ backgroundColor: "#00c853" }}
            >
              Post Comment
            </button>
          </div>
        </div>

        <ul className="space-y-4">
          {COMMENTS.map((c) => (
            <li key={c.id} className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {c.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-foreground">{c.user}</span>
                  {c.role === "Mod Creator" && (
                    <span className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase text-white" style={{ backgroundColor: "#ff6d00" }}>
                      Mod Creator
                    </span>
                  )}
                  {c.role === "Verified" && (
                    <span className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase text-white" style={{ backgroundColor: "#00c853" }}>
                      Verified
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">{c.time}</span>
                </div>
                <p className="mt-1 text-sm text-foreground/80">{c.body}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>Was this helpful?</span>
                  <button type="button" className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 hover:border-primary hover:text-primary">
                    <ThumbsUp className="h-3 w-3" /> {c.helpful}
                  </button>
                  <button type="button" className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 hover:border-destructive hover:text-destructive">
                    <ThumbsDown className="h-3 w-3" /> {c.notHelpful}
                  </button>
                  <button type="button" className="ml-auto hover:text-brand">Reply</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

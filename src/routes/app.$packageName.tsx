import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Star, ShieldCheck, Download, Zap, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AppIcon } from "@/components/AppIcon";
import { SafetyBar } from "@/components/SafetyBar";
import { formatDownloads } from "@/lib/format";

export const Route = createFileRoute("/app/$packageName")({
  component: AppDetail,
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

function AppDetail() {
  const { packageName } = Route.useParams();
  const [app, setApp] = useState<AppFull | null>(null);
  const [versions, setVersions] = useState<VersionRow[]>([]);
  const [loading, setLoading] = useState(true);

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

  const rows: VersionRow[] =
    versions.length > 0
      ? versions
      : [
          {
            id: "current",
            version: app.version,
            size_mb: app.size_mb,
            released_on: app.updated_on,
            notes: "Current release",
          },
        ];

  return (
    <article className="space-y-6">
      <div className="flex flex-col gap-6 rounded-lg border border-border bg-card p-6 md:flex-row">
        <AppIcon
          iconUrl={(app as AppFull & { icon_url?: string | null }).icon_url}
          packageName={app.package_name}
          name={app.name}
          size={120}
          modLabel={app.mod_label}
        />
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
            <span>v{app.version}</span>
            <span>{app.size_mb} MB</span>
          </div>
          <p className="mt-4 text-sm text-foreground/80">
            {app.description ?? "No description provided."}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={app.download_url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Download className="h-5 w-5" />
              Download v{app.version} ({app.size_mb} MB)
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

      <section className="rounded-lg border border-border bg-card p-5">
        <h2 className="mb-3 text-sm font-bold">Security</h2>
        <ul className="grid gap-2 sm:grid-cols-3">
          {SECURITY_ITEMS.map((label) => (
            <li
              key={label}
              className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium"
              style={{ color: "#22C55E" }}
            >
              <Check className="h-4 w-4" strokeWidth={3} />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </section>


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
    </article>
  );
}

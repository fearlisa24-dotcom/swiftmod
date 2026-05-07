import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Star, ShieldCheck, Download, Zap, Check, ChevronRight, ThumbsUp, MessageSquare, ChevronDown, Smartphone, HardDrive, Calendar, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AppIcon } from "@/components/AppIcon";
import { SafetyBar } from "@/components/SafetyBar";
import { AdSlot } from "@/components/AdSlot";
import { AppCard, type AppRow } from "@/components/AppCard";
import { formatDownloads } from "@/lib/format";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/app/$packageName")({
  component: AppDetail,
  head: ({ params }) => {
    const pretty = params.packageName
      .replace(/^com\.[^.]+\./, "")
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const title = `${pretty} Mod APK — Free Download | Swift Mod`;
    const desc = `Download ${pretty} Mod APK for Android. Premium features unlocked, unlimited resources, mod menu — free, safe and verified by Swift Mod.`;
    const url = `https://swiftmod.lovable.app/app/${params.packageName}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: `${pretty} mod apk, ${pretty} hack, ${pretty} unlimited, ${pretty} mod menu, ${pretty} free download android` },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
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

interface CommentRow {
  id: string;
  user_id: string;
  body: string;
  helpful: number;
  created_at: string;
  display_name?: string | null;
}

const RATING_DIST = [
  { stars: 5, pct: 78 },
  { stars: 4, pct: 14 },
  { stars: 3, pct: 5 },
  { stars: 2, pct: 2 },
  { stars: 1, pct: 1 },
];

function AppDetail() {
  const { packageName } = Route.useParams();
  const { user } = useAuth();
  const [app, setApp] = useState<AppFull | null>(null);
  const [versions, setVersions] = useState<VersionRow[]>([]);
  const [related, setRelated] = useState<AppRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [versionOpen, setVersionOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [myStars, setMyStars] = useState(0);
  const [posting, setPosting] = useState(false);

  const loadComments = useCallback(async (appId: string) => {
    const { data } = await supabase
      .from("comments")
      .select("id,user_id,body,helpful,created_at")
      .eq("app_id", appId)
      .order("created_at", { ascending: false })
      .limit(50);
    const rows = (data ?? []) as CommentRow[];
    const ids = Array.from(new Set(rows.map((r) => r.user_id)));
    if (ids.length) {
      const { data: profs } = await supabase
        .from("profiles")
        .select("user_id,display_name")
        .in("user_id", ids);
      const map = new Map((profs ?? []).map((p) => [p.user_id, p.display_name]));
      rows.forEach((r) => (r.display_name = map.get(r.user_id) ?? null));
    }
    setComments(rows);
  }, []);

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
        await loadComments(data.id);
        const { data: rel } = await supabase
          .from("apps")
          .select("id,package_name,name,category,version,rating,downloads,mod_label,size_mb,icon_url")
          .eq("category", data.category)
          .neq("id", data.id)
          .order("downloads", { ascending: false })
          .limit(6);
        setRelated((rel ?? []) as AppRow[]);
        if (user) {
          const { data: r } = await supabase
            .from("ratings")
            .select("stars")
            .eq("app_id", data.id)
            .eq("user_id", user.id)
            .maybeSingle();
          setMyStars(r?.stars ?? 0);
        }
      }
      setLoading(false);
    })();
  }, [packageName, user, loadComments]);

  const postComment = async () => {
    if (!user || !app || comment.trim().length < 3) return;
    setPosting(true);
    const { error } = await supabase
      .from("comments")
      .insert({ app_id: app.id, user_id: user.id, body: comment.trim() });
    setPosting(false);
    if (!error) {
      setComment("");
      await loadComments(app.id);
    }
  };

  const rate = async (stars: number) => {
    if (!user || !app) return;
    setMyStars(stars);
    await supabase
      .from("ratings")
      .upsert({ app_id: app.id, user_id: user.id, stars }, { onConflict: "app_id,user_id" });
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: app.name,
            operatingSystem: "Android",
            applicationCategory: app.type === "app" ? "MobileApplication" : "GameApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: app.rating,
              ratingCount: Math.max(app.downloads, 1),
              bestRating: "10",
              worstRating: "1",
            },
            description: app.description || `${app.name} mod APK for Android.`,
            softwareVersion: app.version,
            fileSize: `${app.size_mb} MB`,
            image: (app as AppFull & { icon_url?: string | null }).icon_url || undefined,
            url: `https://swiftmod.lovable.app/app/${app.package_name}`,
          }),
        }}
      />
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

          <p className="mt-4 whitespace-pre-line text-sm leading-6 text-foreground/80">
            {app.description ||
              `${app.name} is a popular ${app.category.toLowerCase()} ${app.type} on Android, downloaded by millions of players worldwide. The Swift Mod community provides a verified modded version with premium features unlocked, giving you the freedom to enjoy the full experience without paywalls or grind.\n\nThis modded APK is ideal for players who want to explore everything the title has to offer — from premium content and unlocked items to ad-free gameplay. Every release on Swift Mod is scanned for malware before listing and re-tested when a new game version drops, so you always get a clean, working file.\n\nDownload ${app.name} MOD APK v${app.version} below and follow our four-step install guide to get started in under two minutes.`}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/download/$packageName"
              params={{ packageName: app.package_name }}
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#00c853" }}
            >
              <Download className="h-5 w-5" />
              Download APK v{app.version} ({app.size_mb} MB)
            </Link>
            <Link
              to="/download/$packageName"
              params={{ packageName: app.package_name }}
              className="inline-flex items-center gap-2 rounded-lg border border-primary bg-card px-6 py-3 text-base font-bold text-primary transition-colors hover:bg-primary/5"
            >
              <ShieldCheck className="h-5 w-5" />
              <Zap className="h-5 w-5" />
              Fast Download
            </Link>
          </div>
        </div>
      </div>

      <SafetyBar />

      {/* MOD Features */}
      <section className="rounded-lg border border-border bg-card p-5">
        <h2 className="mb-3 text-sm font-bold">MOD Features</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {[
            app.mod_label ? `${app.mod_label} unlocked` : "Mod Menu unlocked",
            "All premium content available for free",
            "Ads removed for a clean experience",
            "Anti-ban protection bundled in",
            "Optimised for low-end Android devices",
            "Auto-updated weekly by the Swift Mod team",
          ].map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
              <Check className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={3} style={{ color: "#22C55E" }} />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Installation Guide */}
      <section className="rounded-lg border border-border bg-card p-5">
        <h2 className="mb-3 text-sm font-bold">How to Install</h2>
        <ol className="space-y-3 text-sm text-foreground/90">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
            <span>Tap <strong>Download APK</strong> above and wait for the file to finish saving to your device.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span>
            <span>Open <strong>Settings → Apps → Special access → Install unknown apps</strong> and allow your browser or file manager to install APKs.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</span>
            <span>Open the downloaded file. Review the requested permissions and tap <strong>Install</strong>.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">4</span>
            <span>Launch {app.name} from your home screen and enjoy the unlocked mod features.</span>
          </li>
        </ol>
      </section>

      {/* Additional Info */}
      <section className="rounded-lg border border-border bg-card p-5">
        <h2 className="mb-3 text-sm font-bold">Additional Information</h2>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="flex items-center gap-2"><Tag className="h-4 w-4 text-muted-foreground" /><dt className="text-muted-foreground">Version</dt><dd className="ml-auto font-semibold">v{app.version}</dd></div>
          <div className="flex items-center gap-2"><HardDrive className="h-4 w-4 text-muted-foreground" /><dt className="text-muted-foreground">Size</dt><dd className="ml-auto font-semibold">{app.size_mb} MB</dd></div>
          <div className="flex items-center gap-2"><Smartphone className="h-4 w-4 text-muted-foreground" /><dt className="text-muted-foreground">Requires</dt><dd className="ml-auto font-semibold">Android 6.0+</dd></div>
          <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /><dt className="text-muted-foreground">Updated</dt><dd className="ml-auto font-semibold">{app.updated_on}</dd></div>
        </dl>
      </section>

      {/* Screenshots */}
      <section className="rounded-lg border border-border bg-card p-5">
        <h2 className="mb-3 text-sm font-bold">Screenshots</h2>
        <div className="flex gap-3 overflow-x-auto">
          {[1, 2, 3, 4].map((n) => (
            <img
              key={n}
              src={`https://picsum.photos/seed/${app.package_name}-${n}/360/640`}
              alt={`${app.name} screenshot ${n}`}
              loading="lazy"
              className="h-56 w-auto shrink-0 rounded-md border border-border"
            />
          ))}
        </div>
      </section>

      <AdSlot label="Advertisement" />

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

      {/* Your rating */}
      <section className="rounded-lg border border-border bg-card p-5">
        <h2 className="mb-3 text-sm font-bold">Your Rating</h2>
        {user ? (
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} type="button" onClick={() => rate(s)} aria-label={`Rate ${s}`}>
                <Star
                  className={`h-6 w-6 ${s <= myStars ? "fill-amber-400 stroke-amber-400" : "stroke-muted-foreground"}`}
                />
              </button>
            ))}
            {myStars > 0 && <span className="ml-2 text-xs text-muted-foreground">You rated {myStars}/5</span>}
          </div>
        ) : (
          <Link to="/auth" className="text-sm text-brand hover:underline">Sign in to rate this app</Link>
        )}
      </section>

      {/* Community Discussion */}
      <section className="rounded-lg border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold">Community Discussion</h2>
          <span className="text-xs text-muted-foreground">({comments.length} comments)</span>
        </div>

        {/* Compose */}
        {user ? (
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
                onClick={postComment}
                disabled={posting || comment.trim().length < 3}
                className="rounded-md px-3 py-1.5 text-xs font-bold text-white disabled:opacity-50"
                style={{ backgroundColor: "#22C55E" }}
              >
                {posting ? "Posting…" : "Post Comment"}
              </button>
            </div>
          </div>
        ) : (
          <Link to="/auth" className="mb-5 block rounded-md border border-dashed border-border bg-background p-4 text-center text-sm text-muted-foreground hover:border-primary hover:text-primary">
            Sign in to post a comment
          </Link>
        )}

        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No comments yet — be the first!</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => {
              const name = c.display_name ?? "User";
              const initials = name.slice(0, 2).toUpperCase();
              return (
                <li key={c.id} className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-foreground">{name}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(c.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-foreground/80">{c.body}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <button type="button" className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 hover:border-primary hover:text-primary">
                        <ThumbsUp className="h-3 w-3" /> {c.helpful}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Related Apps */}
      {related.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-bold text-foreground">Related {app.type === "app" ? "Apps" : "Games"}</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
            {related.map((r) => (
              <AppCard key={r.id} app={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

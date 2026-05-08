import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin" }, { name: "robots", content: "noindex,nofollow" }] }),
});

const SAMPLE_APPS = [
  { package_name: "com.supercell.clashofclans", name: "Clash of Clans", category: "Strategy", type: "game", version: "16.253.13", size_mb: 320, mod_label: "Unlimited Gems" },
  { package_name: "com.mojang.minecraftpe", name: "Minecraft", category: "Sandbox", type: "game", version: "1.21.0", size_mb: 180, mod_label: "Premium Unlocked" },
  { package_name: "com.king.candycrushsaga", name: "Candy Crush Saga", category: "Puzzle", type: "game", version: "1.276.0", size_mb: 95, mod_label: "Unlimited Lives" },
  { package_name: "com.gameloft.android.ANMP.GloftA9HM", name: "Asphalt 9", category: "Racing", type: "game", version: "4.5.0", size_mb: 2200, mod_label: "Unlimited Money" },
  { package_name: "com.spotify.music", name: "Spotify", category: "Music", type: "app", version: "8.10.0", size_mb: 95, mod_label: "Premium Unlocked" },
  { package_name: "com.whatsapp", name: "WhatsApp Plus", category: "Communication", type: "app", version: "17.70", size_mb: 75, mod_label: "Anti-Ban" },
  { package_name: "com.instagram.android", name: "Instagram", category: "Social", type: "app", version: "338.0.0", size_mb: 65, mod_label: "Ad-Free" },
  { package_name: "com.zhiliaoapp.musically", name: "TikTok", category: "Social", type: "app", version: "35.5.4", size_mb: 240, mod_label: "Region Unlocked" },
  { package_name: "com.netflix.mediaclient", name: "Netflix", category: "Entertainment", type: "app", version: "8.115.0", size_mb: 30, mod_label: "Premium Unlocked" },
  { package_name: "com.google.android.youtube", name: "YouTube", category: "Video", type: "app", version: "19.21.34", size_mb: 110, mod_label: "Ad-Free + Background" },
  { package_name: "com.miHoYo.GenshinImpact", name: "Genshin Impact", category: "RPG", type: "game", version: "4.7.0", size_mb: 4200, mod_label: "God Mode" },
  { package_name: "com.activision.callofduty.shooter", name: "Call of Duty Mobile", category: "Shooter", type: "game", version: "1.0.41", size_mb: 1800, mod_label: "Aimbot" },
];

function AdminPage() {
  const [count, setCount] = useState<number | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);

  const refreshCount = async () => {
    const { count } = await supabase.from("apps").select("*", { count: "exact", head: true });
    setCount(count ?? 0);
  };

  useEffect(() => {
    refreshCount();
    const i = setInterval(refreshCount, 10000);
    return () => clearInterval(i);
  }, []);

  const append = (s: string) => setLog((l) => [`${new Date().toLocaleTimeString()} — ${s}`, ...l].slice(0, 20));

  const callFn = async (name: string) => {
    setBusy(name);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${name}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );
      const text = await res.text();
      let data: any = text;
      try { data = JSON.parse(text); } catch {}
      if (!res.ok) {
        append(`${name} → ${res.status}: ${typeof data === "string" ? data : JSON.stringify(data)}`);
        alert(`${name} failed (${res.status}). The Edge Function may not be deployed.`);
      } else {
        append(`${name} → OK ${typeof data === "string" ? data : JSON.stringify(data).slice(0, 200)}`);
        alert(`Done! ${data?.saved ?? "?"} items saved`);
        refreshCount();
      }
    } catch (e: any) {
      append(`${name} → error: ${e.message}`);
      alert(`Error calling ${name}: ${e.message}`);
    } finally {
      setBusy(null);
    }
  };

  const seedSample = async () => {
    setBusy("seed");
    try {
      const { error, count: inserted } = await supabase
        .from("apps")
        .upsert(SAMPLE_APPS as any, { onConflict: "package_name", count: "exact", ignoreDuplicates: false });
      if (error) throw error;
      append(`seed → upserted ${inserted ?? SAMPLE_APPS.length} sample apps`);
      alert(`Seeded ${SAMPLE_APPS.length} sample apps`);
      refreshCount();
    } catch (e: any) {
      append(`seed → error: ${e.message}`);
      alert(`Seed failed: ${e.message}`);
    } finally {
      setBusy(null);
    }
  };

  const btn =
    "w-full rounded-lg bg-green-600 px-6 py-5 text-lg font-bold text-white transition-colors hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-3xl font-bold">Admin</h1>
        <p className="mt-1 text-sm text-zinc-400">No-auth admin tools (preview only).</p>

        <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900 p-5">
          <div className="text-sm uppercase tracking-wide text-zinc-400">Total apps in database</div>
          <div className="mt-1 text-4xl font-bold tabular-nums">{count ?? "…"}</div>
          <div className="mt-1 text-xs text-zinc-500">Refreshes every 10s</div>
        </div>

        <div className="mt-6 space-y-3">
          <button className={btn} disabled={!!busy} onClick={() => callFn("crawl-playmods")}>
            {busy === "crawl-playmods" ? "Crawling…" : "Crawl Games from PlayMods"}
          </button>
          <button className={btn} disabled={!!busy} onClick={() => callFn("crawl-playmods-apps")}>
            {busy === "crawl-playmods-apps" ? "Crawling…" : "Crawl Apps from PlayMods"}
          </button>
          <button className={btn} disabled={!!busy} onClick={seedSample}>
            {busy === "seed" ? "Seeding…" : "Seed Sample Data (12 apps)"}
          </button>
        </div>

        <div className="mt-8">
          <div className="text-sm font-semibold text-zinc-300">Activity</div>
          <div className="mt-2 max-h-72 overflow-auto rounded-lg border border-zinc-800 bg-zinc-900 p-3 font-mono text-xs text-zinc-400">
            {log.length === 0 ? <div className="text-zinc-600">No activity yet.</div> : log.map((l, i) => <div key={i}>{l}</div>)}
          </div>
          <p className="mt-3 text-xs text-amber-400">
            Note: <code>crawl-playmods</code> and <code>crawl-playmods-apps</code> Edge Functions are not deployed in
            this project. Those buttons will return 404 until the functions are created. The “Seed Sample Data” button
            works immediately.
          </p>
        </div>
      </div>
    </div>
  );
}

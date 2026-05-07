import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppCard, AppRowItem, type AppRow } from "@/components/AppCard";
import { SafetyBar } from "@/components/SafetyBar";
import { HeroCarousel } from "@/components/HeroCarousel";

const HOME_TITLE = "Swift Mod — Free Mod APKs for Android Games & Apps";
const HOME_DESC =
  "Download the best mod APKs for Android in 2025. Unlimited coins, gems, premium features unlocked for free. Safe, verified mods updated daily.";
const HOME_URL = "https://swiftmod.lovable.app/";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESC },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESC },
      { property: "og:url", content: HOME_URL },
      { name: "twitter:title", content: HOME_TITLE },
      { name: "twitter:description", content: HOME_DESC },
    ],
    links: [{ rel: "canonical", href: HOME_URL }],
  }),
});

function Section({ title, apps }: { title: string; apps: AppRow[] }) {
  return (
    <section className="mb-8">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        <a className="cursor-pointer text-xs text-muted-foreground hover:text-brand">more &gt;</a>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {apps.map((a) => (
          <AppCard key={a.id} app={a} />
        ))}
      </div>
    </section>
  );
}

function HomePage() {
  const [apps, setApps] = useState<AppRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("apps")
      .select("id,package_name,name,category,version,rating,downloads,mod_label,size_mb,icon_url")
      .order("downloads", { ascending: false })
      .then(({ data }) => {
        setApps((data ?? []) as AppRow[]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-muted-foreground">Loading…</div>;
  }

  const featured = apps.filter((a) => a.mod_label).slice(0, 12);
  const newest = apps.slice(12, 24);
  const favs = apps.slice(0, 6);
  const trending = apps.slice(0, 8);

  return (
    <>
      <h1 className="sr-only">Download Free Mod APKs for Android</h1>
      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_320px]">
        <HeroCarousel apps={featured} />
        <aside className="rounded-2xl border border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-bold text-foreground">🔥 Trending Now</h3>
          <ol className="space-y-2">
            {trending.map((a, i) => (
              <li key={a.id} className="flex items-center gap-2">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-[11px] font-bold ${
                    i < 3 ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                  }`}
                >
                  {i + 1}
                </span>
                <a
                  href={`/app/${a.package_name}`}
                  className="truncate text-sm text-foreground hover:text-brand"
                >
                  {a.name}
                </a>
                <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">
                  ★ {a.rating.toFixed(1)}
                </span>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      <div className="mb-6">
        <SafetyBar />
      </div>

      <Section title="Recommended" apps={featured.slice(0, 12)} />

      <div className="mb-8 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-bold">Players' Favorite</h3>
          <div className="space-y-2">
            {favs.map((a) => (
              <AppRowItem key={a.id} app={a} />
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-bold">New & Updated</h3>
          <div className="space-y-2">
            {newest.slice(0, 6).map((a) => (
              <AppRowItem key={a.id} app={a} />
            ))}
          </div>
        </section>
      </div>

      <Section title="Newest" apps={newest} />
    </>
  );
}

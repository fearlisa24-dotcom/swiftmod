import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppCard, type AppRow } from "@/components/AppCard";
import { SafetyBar } from "@/components/SafetyBar";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function Section({ title, apps }: { title: string; apps: AppRow[] }) {
  return (
    <section className="mb-8">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        <a className="text-xs text-muted-foreground hover:text-brand">more &gt;</a>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
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

  const featured = apps.slice(0, 6);
  const newest = apps.slice(6, 18);
  const favs = apps.slice(0, 12);

  return (
    <>
      <div className="mb-6">
        <SafetyBar />
      </div>
      <Section title="Recommended" apps={featured} />
      <Section title="Newest" apps={newest} />
      <Section title="Players' Favorite" apps={favs} />
    </>
  );
}

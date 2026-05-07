import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppCard, type AppRow } from "@/components/AppCard";

export const Route = createFileRoute("/games")({
  component: () => <ListPage type="game" title="Mod APK Games — All Categories" />,
  head: () => {
    const t = "Mod APK Games — Best Modded Android Games | Swift Mod";
    const d = "Download the best modded Android games. All mods verified and updated daily. Unlimited resources, mod menus and premium features.";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { name: "twitter:title", content: t },
        { name: "twitter:description", content: d },
      ],
      links: [{ rel: "canonical", href: "https://swiftmod.lovable.app/games" }],
    };
  },
});

export function ListPage({ type, title }: { type: "game" | "app"; title: string }) {
  const [apps, setApps] = useState<AppRow[]>([]);
  useEffect(() => {
    supabase
      .from("apps")
      .select("id,package_name,name,category,version,rating,downloads,mod_label,size_mb,icon_url")
      .eq("type", type)
      .order("downloads", { ascending: false })
      .then(({ data }) => setApps((data ?? []) as AppRow[]));
  }, [type]);

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">{title}</h1>
      <p className="mb-4 text-sm text-muted-foreground">Browse {apps.length} verified mod APKs, updated daily by the Swift Mod team. Every download is scanned for malware before listing.</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {apps.map((a) => (
          <AppCard key={a.id} app={a} />
        ))}
      </div>
    </section>
  );
}

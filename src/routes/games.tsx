import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppCard, type AppRow } from "@/components/AppCard";

export const Route = createFileRoute("/games")({
  component: () => <ListPage type="game" title="Games" />,
});

export function ListPage({ type, title }: { type: "game" | "app"; title: string }) {
  const [apps, setApps] = useState<AppRow[]>([]);
  useEffect(() => {
    supabase
      .from("apps")
      .select("id,package_name,name,category,version,rating,downloads,mod_label,size_mb")
      .eq("type", type)
      .order("downloads", { ascending: false })
      .then(({ data }) => setApps((data ?? []) as AppRow[]));
  }, [type]);

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">{title}</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {apps.map((a) => (
          <AppCard key={a.id} app={a} />
        ))}
      </div>
    </section>
  );
}

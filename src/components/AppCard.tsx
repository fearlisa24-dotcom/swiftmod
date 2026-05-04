import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { AppIcon } from "./AppIcon";
import { formatDownloads } from "@/lib/format";

export interface AppRow {
  id: string;
  package_name: string;
  name: string;
  category: string;
  version: string;
  rating: number;
  downloads: number;
  mod_label: string | null;
  size_mb: number;
}

export function AppCard({ app }: { app: AppRow }) {
  return (
    <Link
      to="/app/$packageName"
      params={{ packageName: app.package_name }}
      className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-3 transition-colors hover:border-brand"
    >
      <AppIcon
        packageName={app.package_name}
        name={app.name}
        size={72}
        modLabel={app.mod_label}
      />
      <div className="w-full min-w-0 text-center">
        <h3 className="truncate text-sm font-bold text-foreground">{app.name}</h3>
        <p className="truncate text-xs text-muted-foreground">{app.category}</p>
        <div className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-amber-400 stroke-amber-400" />
          <span className="font-medium text-foreground">{app.rating.toFixed(1)}</span>
          <span>·</span>
          <span>{formatDownloads(app.downloads)}</span>
        </div>
      </div>
    </Link>
  );
}

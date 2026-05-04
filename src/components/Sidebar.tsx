import { Link, useLocation } from "@tanstack/react-router";
import { Gamepad2, LayoutGrid, Hash, TrendingUp, Trophy, Package } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: LayoutGrid },
  { to: "/games", label: "Games", icon: Gamepad2 },
  { to: "/apps", label: "Apps", icon: Package },
  { to: "/topics", label: "Topics", icon: Hash },
  { to: "/rankings", label: "Rankings", icon: Trophy },
  { to: "/trending", label: "Trending", icon: TrendingUp },
] as const;

export function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="hidden w-56 shrink-0 border-r border-sidebar-border bg-sidebar md:block">
      <nav className="sticky top-16 flex flex-col gap-1 p-3">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

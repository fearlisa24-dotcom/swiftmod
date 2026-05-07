import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  author: string;
  thumbnail_url: string | null;
  published_at: string;
}

export const Route = createFileRoute("/articles")({
  component: ArticlesPage,
  head: () => ({
    meta: [
      { title: "Articles & Mod APK Guides – Swift Mod" },
      {
        name: "description",
        content:
          "Read the latest mod APK guides, reviews, and redeem code roundups from the Swift Mod team.",
      },
      { property: "og:title", content: "Swift Mod Articles & Guides" },
      {
        property: "og:description",
        content: "Mod APK guides, reviews, and redeem codes updated weekly.",
      },
    ],
  }),
});

function ArticlesPage() {
  const [items, setItems] = useState<Article[]>([]);
  useEffect(() => {
    supabase
      .from("articles")
      .select("id,slug,title,category,summary,author,thumbnail_url,published_at")
      .order("published_at", { ascending: false })
      .then(({ data }) => setItems((data ?? []) as Article[]));
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Articles &amp; Guides</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Mod APK guides, reviews, and redeem code roundups from the Swift Mod team.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((a) => (
          <Link
            key={a.id}
            to="/articles/$slug"
            params={{ slug: a.slug }}
            className="group overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-brand"
          >
            <img
              src={a.thumbnail_url ?? ""}
              alt={a.title}
              className="h-40 w-full object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand">
                {a.category}
              </span>
              <h2 className="mt-1 text-base font-bold text-foreground group-hover:text-brand">
                {a.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{a.summary}</p>
              <p className="mt-3 text-[11px] text-muted-foreground">
                By {a.author} · {new Date(a.published_at).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

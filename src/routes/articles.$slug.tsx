import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  author: string;
  thumbnail_url: string | null;
  published_at: string;
}

export const Route = createFileRoute("/articles/$slug")({
  component: ArticleDetail,
  head: ({ params }) => {
    const pretty = params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const title = `${pretty} | Swift Mod`;
    const desc = `Read this Swift Mod guide: ${pretty}. Tips, install steps and mod APK insights from the Swift Mod team.`;
    const url = `https://swiftmod.lovable.app/articles/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
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

function ArticleDetail() {
  const { slug } = Route.useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data }) => {
        setArticle(data as Article | null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="py-20 text-center text-muted-foreground">Loading…</div>;
  if (!article) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">Article not found.</p>
        <Link to="/articles" className="mt-4 inline-block text-brand">All articles</Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      {article.thumbnail_url && (
        <img
          src={article.thumbnail_url}
          alt={article.title}
          className="h-64 w-full rounded-lg object-cover"
        />
      )}
      <header>
        <span className="text-xs font-bold uppercase tracking-wider text-brand">
          {article.category}
        </span>
        <h1 className="mt-1 text-3xl font-bold text-foreground">{article.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          By {article.author} · {new Date(article.published_at).toLocaleDateString()}
        </p>
      </header>
      <p className="text-base text-foreground/80">{article.summary}</p>
      <div className="space-y-4 whitespace-pre-line text-[15px] leading-7 text-foreground/90">
        {article.content}
      </div>
    </article>
  );
}

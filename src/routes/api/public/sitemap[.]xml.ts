import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BASE = "https://swiftmod.lovable.app";

const STATIC_PAGES = [
  { url: "/", priority: "1.0", changefreq: "daily" },
  { url: "/games", priority: "0.9", changefreq: "daily" },
  { url: "/apps", priority: "0.9", changefreq: "daily" },
  { url: "/rankings", priority: "0.8", changefreq: "daily" },
  { url: "/articles", priority: "0.8", changefreq: "daily" },
  { url: "/topics", priority: "0.7", changefreq: "weekly" },
  { url: "/trending", priority: "0.8", changefreq: "daily" },
  { url: "/about", priority: "0.5", changefreq: "monthly" },
  { url: "/contact", priority: "0.5", changefreq: "monthly" },
  { url: "/privacy-policy", priority: "0.3", changefreq: "monthly" },
  { url: "/terms", priority: "0.3", changefreq: "monthly" },
  { url: "/dmca", priority: "0.3", changefreq: "monthly" },
];

export const Route = createFileRoute("/api/public/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split("T")[0];
        const { data: apps } = await supabaseAdmin
          .from("apps")
          .select("package_name, updated_on")
          .order("downloads", { ascending: false });
        const { data: articles } = await supabaseAdmin
          .from("articles")
          .select("slug, published_at");

        const escape = (s: string) =>
          s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

        for (const p of STATIC_PAGES) {
          xml += `\n  <url><loc>${BASE}${p.url}</loc><lastmod>${today}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`;
        }
        for (const a of apps ?? []) {
          const lastmod = (a.updated_on as string | null)?.split("T")[0] || today;
          xml += `\n  <url><loc>${BASE}/app/${escape(a.package_name)}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`;
        }
        for (const a of articles ?? []) {
          const lastmod = (a.published_at as string | null)?.split("T")[0] || today;
          xml += `\n  <url><loc>${BASE}/articles/${escape(a.slug)}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`;
        }
        xml += `\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

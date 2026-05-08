import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BROWSER_HEADERS: Record<string, string> = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  Referer: "https://www.google.com/",
};

const LOCALES = ["en", "", "fr", "es", "pt", "de", "id", "ru"];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractDownloadUrl(html: string): string | null {
  const m = html.match(/playmods_downloadurl="([^"]+\.apk[^"]*)"/i);
  return m ? m[1] : null;
}

async function scrapePlaymods(slug: string, packageName: string): Promise<string | null> {
  for (const loc of LOCALES) {
    const base = loc ? `https://playmods.net/${loc}` : "https://playmods.net";
    const candidates = [
      `${base}/game/${slug}/${packageName}`,
      `${base}/app/${slug}/${packageName}`,
    ];
    for (const url of candidates) {
      try {
        const res = await fetch(url, { headers: BROWSER_HEADERS, redirect: "follow" });
        if (!res.ok) continue;
        const html = await res.text();
        const dl = extractDownloadUrl(html);
        if (dl) return dl;
      } catch {
        /* try next */
      }
    }
  }
  return null;
}

export const Route = createFileRoute("/api/public/fetch-download")({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "*",
          },
        }),

      GET: async ({ request }) => {
        const url = new URL(request.url);
        const pkg = url.searchParams.get("pkg") || url.searchParams.get("slug");
        if (!pkg) return new Response("Missing pkg", { status: 400 });

        const { data: app } = await supabaseAdmin
          .from("apps")
          .select("id,name,version,download_url,package_name,downloads")
          .eq("package_name", pkg)
          .maybeSingle();

        if (!app) return new Response("Not found", { status: 404 });

        let finalUrl: string | null =
          app.download_url && /\.apk(\?|$)/i.test(app.download_url)
            ? app.download_url
            : null;

        if (!finalUrl) {
          const slug = slugify(app.name);
          finalUrl = await scrapePlaymods(slug, app.package_name);
          if (finalUrl) {
            await supabaseAdmin
              .from("apps")
              .update({ download_url: finalUrl })
              .eq("id", app.id);
          }
        }

        if (!finalUrl) {
          return new Response("No download URL available", {
            status: 404,
            headers: { "Access-Control-Allow-Origin": "*" },
          });
        }

        // Increment download counter (fire and forget)
        supabaseAdmin
          .from("apps")
          .update({ downloads: (app.downloads ?? 0) + 1 })
          .eq("id", app.id)
          .then(() => {});

        // Stream the APK through our origin so the browser triggers a download
        try {
          const apkRes = await fetch(finalUrl, {
            headers: {
              "User-Agent": BROWSER_HEADERS["User-Agent"],
              Accept: "*/*",
              Referer: "https://playmods.net/",
            },
            redirect: "follow",
          });
          if (!apkRes.ok || !apkRes.body) {
            return new Response(null, {
              status: 302,
              headers: {
                Location: finalUrl,
                "Access-Control-Allow-Origin": "*",
              },
            });
          }
          const fileName = `${app.name.replace(/[^a-zA-Z0-9]+/g, "_")}_v${app.version}_SwiftMod.apk`;
          const headers = new Headers();
          headers.set("Content-Type", "application/vnd.android.package-archive");
          headers.set("Content-Disposition", `attachment; filename="${fileName}"`);
          headers.set("Access-Control-Allow-Origin", "*");
          const len = apkRes.headers.get("content-length");
          if (len) headers.set("Content-Length", len);
          return new Response(apkRes.body, { status: 200, headers });
        } catch {
          return new Response(null, {
            status: 302,
            headers: {
              Location: finalUrl,
              "Access-Control-Allow-Origin": "*",
            },
          });
        }
      },
    },
  },
});

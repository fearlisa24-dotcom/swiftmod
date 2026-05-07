import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const HEADERS: Record<string, string> = {
  "User-Agent":
    "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
  Accept: "text/html,application/xhtml+xml,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  Referer: "https://playmods.net/",
};

async function tryPlaymods(slug: string, packageName: string): Promise<string | null> {
  try {
    const pageRes = await fetch(`https://playmods.net/en/game/${slug}/${packageName}`, {
      headers: HEADERS,
    });
    const html = await pageRes.text();
    const dlMatch = html.match(/href="(\/en\/game\/[^"]+\/download[^"]*)"/i);
    if (!dlMatch) return null;
    const dlRes = await fetch(`https://playmods.net${dlMatch[1]}`, { headers: HEADERS });
    const dlHtml = await dlRes.text();
    const apkMatch =
      dlHtml.match(/href="([^"]+\.apk[^"]*)"/i) ||
      dlHtml.match(/"url"\s*:\s*"([^"]+\.apk[^"]*)"/i) ||
      dlHtml.match(/window\.location\s*=\s*["']([^"']+)["']/i);
    if (!apkMatch) return null;
    return apkMatch[1].startsWith("http") ? apkMatch[1] : `https://playmods.net${apkMatch[1]}`;
  } catch {
    return null;
  }
}

async function tryHappyMod(packageName: string): Promise<string | null> {
  try {
    const ref = { ...HEADERS, Referer: "https://www.happymod.com/" };
    const searchRes = await fetch(
      `https://www.happymod.com/search.html?q=${encodeURIComponent(packageName)}`,
      { headers: ref },
    );
    const html = await searchRes.text();
    const escaped = packageName.replace(/\./g, "\\.");
    const pageMatch = html.match(new RegExp(`href="(/[^"]*${escaped}[^"]*)"`));
    if (!pageMatch) return null;
    const detailRes = await fetch(`https://www.happymod.com${pageMatch[1]}`, { headers: ref });
    const detailHtml = await detailRes.text();
    const apkMatch =
      detailHtml.match(/href="([^"]+\.apk[^"]*)"/i) ||
      detailHtml.match(/"download_url"\s*:\s*"([^"]+)"/i);
    if (!apkMatch) return null;
    return apkMatch[1].startsWith("http")
      ? apkMatch[1]
      : `https://www.happymod.com${apkMatch[1]}`;
  } catch {
    return null;
  }
}

export const Route = createFileRoute("/api/public/fetch-download")({
  server: {
    handlers: {
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

        const slug = app.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

        let finalUrl: string | null = await tryPlaymods(slug, app.package_name);
        if (!finalUrl) finalUrl = await tryHappyMod(app.package_name);
        if (!finalUrl) finalUrl = app.download_url ?? null;
        if (!finalUrl) return new Response("No download available", { status: 404 });

        // Increment download counter (fire and forget)
        supabaseAdmin
          .from("apps")
          .update({ downloads: (app.downloads ?? 0) + 1 })
          .eq("id", app.id)
          .then(() => {});

        const isDirect = /\.(apk|xapk|apks|zip)(\?|$)/i.test(finalUrl);
        if (!isDirect) {
          return new Response(null, { status: 302, headers: { Location: finalUrl } });
        }

        try {
          const apkRes = await fetch(finalUrl, {
            headers: { ...HEADERS, Accept: "*/*" },
            redirect: "follow",
          });
          if (!apkRes.ok || !apkRes.body) {
            return new Response(null, { status: 302, headers: { Location: finalUrl } });
          }
          const fileName = `${app.name.replace(/[^a-zA-Z0-9]+/g, "_")}_v${app.version}_SwiftMod.apk`;
          const headers = new Headers();
          headers.set("Content-Type", "application/vnd.android.package-archive");
          headers.set("Content-Disposition", `attachment; filename="${fileName}"`);
          const len = apkRes.headers.get("content-length");
          if (len) headers.set("Content-Length", len);
          return new Response(apkRes.body, { status: 200, headers });
        } catch {
          return new Response(null, { status: 302, headers: { Location: finalUrl } });
        }
      },
    },
  },
});

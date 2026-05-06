import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const Route = createFileRoute("/api/public/fetch-download")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const pkg = url.searchParams.get("pkg") || url.searchParams.get("slug");
        if (!pkg) return new Response("Missing pkg", { status: 400 });

        const { data: app, error } = await supabaseAdmin
          .from("apps")
          .select("name,version,download_url")
          .eq("package_name", pkg)
          .maybeSingle();

        if (error || !app) return new Response("Not found", { status: 404 });
        if (!app.download_url) return new Response("No download url", { status: 404 });

        // If the source isn't a direct file (e.g. landing page), 302 the user there.
        const isDirect = /\.(apk|xapk|apks|zip)(\?|$)/i.test(app.download_url);
        if (!isDirect) {
          return new Response(null, { status: 302, headers: { Location: app.download_url } });
        }

        const upstream = await fetch(app.download_url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36",
            Referer: "https://playmods.net/",
            Accept: "*/*",
          },
          redirect: "follow",
        });

        if (!upstream.ok || !upstream.body) {
          return new Response("Download failed", { status: 502 });
        }

        const fileName = `${app.name.replace(/\s+/g, "_")}_v${app.version}_SwiftMod.apk`;
        const headers = new Headers();
        headers.set("Content-Type", "application/vnd.android.package-archive");
        headers.set("Content-Disposition", `attachment; filename="${fileName}"`);
        const len = upstream.headers.get("content-length");
        if (len) headers.set("Content-Length", len);
        return new Response(upstream.body, { status: 200, headers });
      },
    },
  },
});

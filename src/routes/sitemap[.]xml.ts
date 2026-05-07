import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // Proxy to the public API route which has DB access
        const res = await fetch("https://swiftmod.lovable.app/api/public/sitemap.xml");
        const xml = await res.text();
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});

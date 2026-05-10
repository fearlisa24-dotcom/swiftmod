import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { CookieBar } from "@/components/CookieBar";
import { FloatingDownload } from "@/components/FloatingDownload";
import { AuthProvider } from "@/hooks/useAuth";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "9b4c43d34bb7a50e7b3397f21ba8bb6cf16e0eb0",
        content: "9b4c43d34bb7a50e7b3397f21ba8bb6cf16e0eb0",
      },
      { name: "theme-color", content: "#22C55E" },
      { name: "robots", content: "index, follow" },
      { name: "mobile-web-app-capable", content: "yes" },
      {
        name: "keywords",
        content:
          "mod apk, mod apk download, free mod apk, android mod games, modded apk, unlimited coins apk, premium apk free, hack apk, mod menu apk 2025",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Swift Mod" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", type: "image/png", href: "/icon-192.png" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://pagead2.googlesyndication.com" },
      { rel: "preconnect", href: "https://nhksomegcjsowouepbas.supabase.co" },
    ],
    scripts: [
      // First Third-Party Script
      {
        children: `(function(qcasw){
          var d = document,
              s = d.createElement('script'),
              l = d.scripts[d.scripts.length - 1];
          s.settings = qcasw || {};
          s.src = "//untimely-hello.com/bHXjV.s/dfGglG0qYNWVcY/de/mx9DuSZcUDlVkPPKT-ccwWMozXET2AMSj/UIt_NVzFAOzVMcT/Yhy-ORQS";
          s.async = true;
          s.referrerPolicy = 'no-referrer-when-downgrade';
          l.parentNode.insertBefore(s, l);
        })({})`,
      },
      // NEW Script from bony-teaching.com
      {
        src: "https://bony-teaching.com/b/3KV/0jP.3Xp/vEbnmEVKJYZlD-0T3EMsDyM/xuN-jjQNxsLATichwAMozfEg2_NaDIUN",
        async: true,
      },
      {
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4578595376204328",
        crossorigin: "anonymous",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Swift Mod",
          url: "https://swiftmod.lovable.app",
          description: "Free mod APKs for Android games and apps",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate:
                "https://swiftmod.lovable.app/?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { pathname } = useLocation();
  const bare = pathname === "/auth";

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        {!bare && <Header />}
        <div className="mx-auto flex max-w-[1400px]">
          {!bare && <Sidebar />}
          <main className="min-w-0 flex-1 px-3 py-4 pb-24 sm:px-4 sm:py-6 md:pb-6">
            <Outlet />
          </main>
        </div>
        {!bare && <Footer />}
        {!bare && <MobileNav />}
        {!bare && <FloatingDownload />}
        {!bare && <CookieBar />}
      </div>
    </AuthProvider>
  );
}

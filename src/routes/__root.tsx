import { Outlet, Link, createRootRoute, HeadContent, Scripts, useLocation } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { AuthProvider } from "@/hooks/useAuth";
import { InstallPrompt } from "@/components/InstallPrompt";

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
      { name: "google-adsense-account", content: "ca-pub-4578595376204328" },
      { name: "theme-color", content: "#22C55E" },
      { title: "SwiftMod – Safe Mod APKs for Games & Apps" },
      {
        name: "description",
        content:
          "PlayMods is a flat, high-density app store for downloading mod APKs of games and apps. Safe, malware-free, security verified.",
      },
      { property: "og:title", content: "SwiftMod – Safe Mod APKs for Games & Apps" },
      { name: "twitter:title", content: "SwiftMod – Safe Mod APKs for Games & Apps" },
      { name: "description", content: "Get the latest modded APKs with SwiftMod! Unlock unlimited coins, skins, and premium features for free. One-tap downloads for all your favorite mobile games." },
      { property: "og:description", content: "Get the latest modded APKs with SwiftMod! Unlock unlimited coins, skins, and premium features for free. One-tap downloads for all your favorite mobile games." },
      { name: "twitter:description", content: "Get the latest modded APKs with SwiftMod! Unlock unlimited coins, skins, and premium features for free. One-tap downloads for all your favorite mobile games." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7c6773f6-5db0-4c5c-9c7d-5e45ed1fe4ef/id-preview-7adcf438--6bae9ed5-b0f9-4454-9c2f-1e543078435d.lovable.app-1777937641542.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7c6773f6-5db0-4c5c-9c7d-5e45ed1fe4ef/id-preview-7adcf438--6bae9ed5-b0f9-4454-9c2f-1e543078435d.lovable.app-1777937641542.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
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
          <main className="min-w-0 flex-1 px-4 py-6">
            <Outlet />
          </main>
        </div>
        <InstallPrompt />
      </div>
    </AuthProvider>
  );
}

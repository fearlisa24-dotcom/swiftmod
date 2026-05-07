import { createFileRoute } from "@tanstack/react-router";
import { ListPage } from "./games";

export const Route = createFileRoute("/rankings")({
  component: () => <ListPage type="game" title="Top Mod APK Rankings 2025" />,
  head: () => {
    const t = "Top Mod APK Rankings 2025 — Most Downloaded | Swift Mod";
    const d = "See the most downloaded mod APKs on Swift Mod. Rankings updated daily. Find the hottest modded games and apps for Android.";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { name: "twitter:title", content: t },
        { name: "twitter:description", content: d },
      ],
      links: [{ rel: "canonical", href: "https://swiftmod.lovable.app/rankings" }],
    };
  },
});

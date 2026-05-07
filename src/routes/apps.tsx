import { createFileRoute } from "@tanstack/react-router";
import { ListPage } from "./games";

export const Route = createFileRoute("/apps")({
  component: () => <ListPage type="app" title="Mod APK Apps — Premium Unlocked" />,
  head: () => {
    const t = "Mod APK Apps — Premium Apps Unlocked | Swift Mod";
    const d = "Download premium-unlocked Android apps. All mods verified and updated daily. No subscriptions, no ads, free downloads.";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { name: "twitter:title", content: t },
        { name: "twitter:description", content: d },
      ],
      links: [{ rel: "canonical", href: "https://swiftmod.lovable.app/apps" }],
    };
  },
});

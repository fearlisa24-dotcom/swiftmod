import { createFileRoute } from "@tanstack/react-router";

const TOPICS = [
  "Open World Games",
  "Best Racing Mods",
  "Top Simulation Apps",
  "Free Premium Music",
  "Editor's Choice 2026",
  "Family Friendly",
  "Multiplayer Hits",
  "Sandbox Adventures",
];

export const Route = createFileRoute("/topics")({
  component: () => (
    <section>
      <h1 className="mb-4 text-2xl font-bold">Topics</h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map((t) => (
          <div
            key={t}
            className="rounded-lg border border-border bg-card p-4 text-sm font-semibold transition-colors hover:border-brand hover:text-brand"
          >
            #{t}
          </div>
        ))}
      </div>
    </section>
  ),
});

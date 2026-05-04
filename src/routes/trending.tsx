import { createFileRoute } from "@tanstack/react-router";
import { ListPage } from "./games";

export const Route = createFileRoute("/trending")({
  component: () => <ListPage type="game" title="Trending" />,
});

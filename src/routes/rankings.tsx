import { createFileRoute } from "@tanstack/react-router";
import { ListPage } from "./games";

export const Route = createFileRoute("/rankings")({
  component: () => <ListPage type="game" title="Rankings" />,
});

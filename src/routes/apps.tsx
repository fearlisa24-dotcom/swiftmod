import { createFileRoute } from "@tanstack/react-router";
import { ListPage } from "./games";

export const Route = createFileRoute("/apps")({
  component: () => <ListPage type="app" title="Apps" />,
});

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: Terms,
});

function Terms() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold">Terms</h1>
      <p className="text-muted-foreground mt-2">Under construction</p>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: AdminIndex,
});

function AdminIndex() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold">AdminIndex</h1>
      <p className="text-muted-foreground mt-2">Under construction</p>
    </div>
  );
}

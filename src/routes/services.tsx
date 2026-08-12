import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  component: Services,
});

function Services() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold">Services</h1>
      <p className="text-muted-foreground mt-2">Under construction</p>
    </div>
  );
}

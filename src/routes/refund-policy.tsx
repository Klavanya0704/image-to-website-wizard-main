import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/refund-policy")({
  component: RefundPolicy,
});

function RefundPolicy() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold">RefundPolicy</h1>
      <p className="text-muted-foreground mt-2">Under construction</p>
    </div>
  );
}

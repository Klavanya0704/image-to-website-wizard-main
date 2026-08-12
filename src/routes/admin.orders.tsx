import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

function AdminOrders() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold">AdminOrders</h1>
      <p className="text-muted-foreground mt-2">Under construction</p>
    </div>
  );
}

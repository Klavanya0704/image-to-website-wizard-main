import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/customers")({
  component: AdminCustomers,
});

function AdminCustomers() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold">AdminCustomers</h1>
      <p className="text-muted-foreground mt-2">Under construction</p>
    </div>
  );
}

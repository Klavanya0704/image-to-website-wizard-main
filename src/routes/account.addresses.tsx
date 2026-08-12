import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/addresses")({
  component: AccountAddresses,
});

function AccountAddresses() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold">AccountAddresses</h1>
      <p className="text-muted-foreground mt-2">Under construction</p>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/")({
  component: AccountIndex,
});

function AccountIndex() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold">AccountIndex</h1>
      <p className="text-muted-foreground mt-2">Under construction</p>
    </div>
  );
}

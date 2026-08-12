import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/category/$slug")({
  component: CategoryDetail,
});

function CategoryDetail() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold">CategoryDetail</h1>
      <p className="text-muted-foreground mt-2">Under construction</p>
    </div>
  );
}

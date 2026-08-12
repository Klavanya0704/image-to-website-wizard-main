import { Link } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2.5">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground shadow-[var(--shadow-card)]`}
        style={{ background: "var(--gradient-primary)" }}
      >
        <Lightbulb className="h-5 w-5" />
      </span>
      <span className="leading-tight">
        <span
          className={`block text-lg font-extrabold tracking-tight ${inverted ? "text-topbar-foreground" : "text-foreground"}`}
        >
          AICTE IDEA Lab
        </span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          College Innovation Store
        </span>
      </span>
    </Link>
  );
}

import { Link } from "@tanstack/react-router";
import logoImg from "@/assets/sasi-idea-lab-logo.png";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className="flex shrink-0 items-center group">
      <img
        src={logoImg}
        alt="SASI AICTE IDEA Lab"
        className="h-10 sm:h-12 w-auto max-w-[240px] sm:max-w-[280px] object-contain transition-transform group-hover:scale-105 duration-200"
      />
    </Link>
  );
}

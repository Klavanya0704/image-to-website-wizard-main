import { Link } from "@tanstack/react-router";
import logoImg from "@/assets/sasi-idea-lab-logo.png";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className="flex shrink-0 items-center group p-0.5">
      <div className="flex items-center justify-center p-1 rounded-xl bg-transparent dark:bg-white/95 transition-all shadow-none">
        <img
          src={logoImg}
          alt="SASI AICTE IDEA Lab"
          className="h-10 w-auto max-w-[220px] sm:max-w-[260px] object-contain mix-blend-multiply transition-transform group-hover:scale-105 duration-200"
        />
      </div>
    </Link>
  );
}

import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Sparkles, PackageSearch, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card p-3.5 shadow-xs animate-shimmer"
        >
          <div className="h-56 w-full rounded-xl bg-slate-100 dark:bg-slate-800/60" />
          <div className="space-y-2.5 pt-3.5">
            <div className="h-3 w-1/4 rounded bg-slate-200/70 dark:bg-slate-700/60" />
            <div className="h-4.5 w-4/5 rounded bg-slate-200/70 dark:bg-slate-700/60" />
            <div className="h-3.5 w-1/3 rounded bg-slate-200/70 dark:bg-slate-700/60" />
            <div className="h-4 w-1/2 rounded bg-slate-200/70 dark:bg-slate-700/60" />
            <div className="h-9 w-full rounded-full bg-slate-200/70 dark:bg-slate-700/60 mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
  icon,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
  onAction?: () => void;
  icon?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-card/80 backdrop-blur-md px-6 py-16 text-center shadow-xs"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-[#1455D9] shadow-inner ring-1 ring-blue-500/20">
        {icon || <PackageSearch className="h-8 w-8" />}
      </div>
      <h3 className="text-xl font-bold text-[#0B1736] dark:text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
      {actionLabel && (
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-6">
          {actionTo ? (
            <Button asChild className="rounded-full bg-[#1455D9] hover:bg-[#0F44B2] text-white px-6 font-semibold shadow-sm">
              <Link to={actionTo}>{actionLabel}</Link>
            </Button>
          ) : (
            <Button onClick={onAction} className="rounded-full bg-[#1455D9] hover:bg-[#0F44B2] text-white px-6 font-semibold shadow-sm">
              {actionLabel}
            </Button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-destructive/20 bg-destructive/5 px-6 py-12 text-center shadow-xs backdrop-blur-sm"
    >
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
        Unable to load products
      </h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
        {message ?? "Please verify your internet connection or reload the page."}
      </p>
      {onRetry && (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-6 inline-block">
          <Button variant="outline" className="rounded-full gap-2 font-semibold" onClick={onRetry}>
            <RotateCcw className="h-4 w-4" /> Try Again
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}

export function inr(value: number | string | null | undefined): string {
  const n = typeof value === "string" ? Number(value) : (value ?? 0);
  return "₹" + (n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

export function num(value: number | string | null | undefined): number {
  const n = typeof value === "string" ? Number(value) : (value ?? 0);
  return Number.isFinite(n) ? n : 0;
}

export function effectivePrice(p: {
  price: number | string;
  discount_price: number | string | null;
}) {
  return num(p.discount_price) > 0 ? num(p.discount_price) : num(p.price);
}

export function discountPercent(p: {
  price: number | string;
  discount_price: number | string | null;
}) {
  const base = num(p.price);
  const eff = effectivePrice(p);
  if (!base || eff >= base) return 0;
  return Math.round(((base - eff) / base) * 100);
}

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

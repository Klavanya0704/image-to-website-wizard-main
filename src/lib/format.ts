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

export function formatDate(value: string | number | Date | null | undefined): string {
  if (!value) return "";
  try {
    const d = new Date(value);
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return String(value);
  }
}

export async function safeCopyText(text: string): Promise<boolean> {
  if (!text) return false;

  try {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {}

  try {
    if (typeof document !== "undefined") {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      textarea.style.left = "-9999px";
      textarea.style.top = "-9999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      return successful;
    }
  } catch {}

  return false;
}

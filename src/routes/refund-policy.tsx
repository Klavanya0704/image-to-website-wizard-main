import { createFileRoute, Link } from "@tanstack/react-router";
import { RotateCcw, ShieldCheck, CheckCircle2, AlertTriangle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/refund-policy")({
  component: RefundPolicy,
});

function RefundPolicy() {
  return (
    <div className="min-h-screen bg-surface/30 pb-24">
      <section className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-black text-primary uppercase tracking-wider">
            <RotateCcw className="h-4 w-4" /> QUALITY GUARANTEE
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Refund &amp; Free Reprint Policy
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Our 100% Quality Guarantee: If a printed part has dimensional defects exceeding
            tolerances, we will reprint it for free or issue a full refund.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-10 space-y-6">
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <h2 className="text-base font-black text-foreground flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> 1. Free Reprint Guarantee
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If your fabricated prototype suffers from warping, layer delamination, or dimensional
              deviations beyond ±0.1mm not specified in the initial CAD model, simply report it
              within 48 hours of delivery for an immediate, expedited reprint at no additional cost.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-border">
            <h2 className="text-base font-black text-foreground flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-primary" /> 2. Full Refund Processing
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              For off-the-shelf electronics, filament spools, or sensor kits, returns are accepted
              within 7 days if the product packaging is unopened. Refunds are automatically credited
              to the original payment method (UPI / Card / Net Banking) within 3 to 5 business days.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-border">
            <h2 className="text-base font-black text-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" /> 3. Non-Refundable Items
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Custom fabrication jobs where design defects were present in the user-submitted CAD
              model (e.g. non-manifold geometry or unprintable overhangs flagged prior to printing)
              are not eligible for full refund, but may qualify for subsidized reprint credits.
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link to="/contact">
            <Button className="bg-primary text-primary-foreground font-bold text-xs rounded-xl px-6 py-3 cursor-pointer">
              Raise a Quality / Reprint Request
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

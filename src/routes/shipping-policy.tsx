import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Clock, ShieldCheck, MapPin, PackageCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/shipping-policy")({
  component: ShippingPolicy,
});

function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-surface/30 pb-24">
      <section className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-black text-primary uppercase tracking-wider">
            <Truck className="h-4 w-4" /> FULFILLMENT &amp; LOGISTICS
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Guidelines on standard delivery, campus pickup counters, lead times, and safe packaging
            for fabricated parts.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-10 space-y-6">
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <h2 className="text-base font-black text-foreground flex items-center gap-2">
              <PackageCheck className="h-5 w-5 text-primary" /> 1. Campus Pickup (Free)
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Students and campus personnel can opt for free local collection from the AICTE IDEA
              Lab counter (Room 304, Innovation Block). You will receive an SMS and email
              notification as soon as your job passes dimensional quality inspection.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-border">
            <h2 className="text-base font-black text-foreground flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" /> 2. Domestic Courier Delivery
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We partner with trusted express carriers (BlueDart, Delhivery, DTDC) for shipping
              orders nationwide across India. Flat standard shipping is ₹49, with free shipping on
              all orders exceeding ₹999.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-border">
            <h2 className="text-base font-black text-foreground flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" /> 3. Processing &amp; Fabrication Lead Times
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Standard 3D printing jobs take 12 to 24 hours to print and cure. CNC machined
              components take 24 to 48 hours. Express fabrication queues are available for hackathon
              and competition deadlines.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-border">
            <h2 className="text-base font-black text-foreground flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> 4. Protective Packaging
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All electronic boards and delicate acrylic parts are packed with anti-static ESD
              shielding, moisture-absorbing silica pouches, and high-density foam cushioning to
              guarantee damage-free transit.
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link to="/track-order">
            <Button className="bg-primary text-primary-foreground font-bold text-xs rounded-xl px-6 py-3 cursor-pointer">
              Track an Existing Order
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

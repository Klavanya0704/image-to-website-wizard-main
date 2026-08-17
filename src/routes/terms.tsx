import { createFileRoute } from "@tanstack/react-router";
import { FileText, ShieldAlert, Sparkles, Scale } from "lucide-react";

export const Route = createFileRoute("/terms")({
  component: Terms,
});

function Terms() {
  return (
    <div className="min-h-screen bg-surface/30 pb-24">
      <section className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-black text-primary uppercase tracking-wider">
            <Scale className="h-4 w-4" /> AICTE USER AGREEMENT
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Terms of Service &amp; Lab Protocols
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Rules governing makerspace machine booking, safety adherence, material utilization, and
            campus store purchases.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-10 space-y-6">
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <h2 className="text-base font-black text-foreground flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-primary" /> 1. Machine Safety Orientation
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Users operating 5-axis CNC mills, high-power laser beds, or solder reflow stations
              must have completed the mandatory AICTE IDEA Lab Safety Orientation and wear
              appropriate Personal Protective Equipment (PPE) at all times inside the active
              machining bays.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-border">
            <h2 className="text-base font-black text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" /> 2. Prohibited Fabrication
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Fabrication of weapons, firearms, restricted defense components without authorized
              faculty clearances, or hazardous chemical containers is strictly prohibited and
              subject to immediate institutional disciplinary action.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-border">
            <h2 className="text-base font-black text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" /> 3. Fair-Share Machine Scheduling
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              To guarantee equitable access across departments, individual print jobs exceeding 30
              hours must be scheduled during overnight queues or coordinated through our bulk
              fabrication portal.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

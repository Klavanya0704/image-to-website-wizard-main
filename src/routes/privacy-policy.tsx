import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Lock, FileCode, EyeOff, Server } from "lucide-react";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-surface/30 pb-24">
      <section className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-black text-primary uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4" /> DATA SECURITY &amp; IP PROTECTION
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Privacy &amp; Intellectual Property Policy
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            How AICTE IDEA Lab safeguards student design files, CAD blueprints, and maker
            credentials.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-10 space-y-6">
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <h2 className="text-base font-black text-foreground flex items-center gap-2">
              <FileCode className="h-5 w-5 text-primary" /> 1. 100% Student CAD &amp; IP Ownership
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All 3D models, PCB schematics, and mechanical drawings uploaded to our slicing servers
              remain the sole and exclusive intellectual property of the student or research team.
              We never share, sell, or reuse your proprietary designs.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-border">
            <h2 className="text-base font-black text-foreground flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" /> 2. Slicing File Confidentiality &amp;
              Purging
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              CAD and STEP files are stored on encrypted servers with access restricted only to the
              designated machine operator. Temporary fabrication toolpaths and sliced G-code are
              automatically purged within 30 days of job completion.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-border">
            <h2 className="text-base font-black text-foreground flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" /> 3. Student Identification Data
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Student ID cards, college roll numbers, and institutional email addresses are used
              strictly for subsidization verification under the AICTE IDEA Lab grant scheme and are
              never disclosed to external third-party marketing entities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

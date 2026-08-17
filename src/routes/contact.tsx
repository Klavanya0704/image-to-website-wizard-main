import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Navigation,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("general");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      toast.success(
        `Thank you ${name}! Your inquiry has been routed to the AICTE IDEA Lab coordinator.`,
      );
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-surface/30 pb-24">
      {/* Hero Header */}
      <section className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-black text-primary uppercase tracking-wider">
            <MessageSquare className="h-4 w-4" /> AICTE IDEA LAB HELP DESK
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Contact &amp; Visit Our Makerspace
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Have questions about CAD file slicing, CNC tooling slots, student discount validation,
            or institutional bulk orders? We&apos;re here to assist you.
          </p>
        </div>
      </section>

      {/* Main 2-Column Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-10">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
              <div className="pb-4 border-b border-border">
                <h2 className="text-lg font-black text-foreground">Send Us a Direct Message</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Our lab superintendents and technical mentors respond within 2 to 4 business
                  hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex.j@institution.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Inquiry Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none cursor-pointer"
                    >
                      <option value="general">General Inquiry &amp; Timings</option>
                      <option value="technical">3D Print / CNC Technical Support</option>
                      <option value="tour">Lab Visit &amp; Delegation Tour</option>
                      <option value="training">Equipment Safety Training &amp; Slot</option>
                      <option value="bulk">Institutional Bulk Prototyping</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 3D Print File Tolerance Query"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Your Message / Technical Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Describe your design specifications, requested machining processes, material questions, or timelines..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-3 text-xs font-medium focus:border-primary focus:outline-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs sm:text-sm py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  {isSending ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Message to Lab Desk
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column: Lab Info, Location & Interactive Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Details Card */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                Makerspace Contact Information
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground block">Physical Location</span>
                    <span className="text-muted-foreground leading-relaxed block mt-0.5">
                      Room 304, 3rd Floor, Innovation &amp; Prototyping Block,
                      <br />
                      AICTE IDEA Lab Campus, Outer Ring Road,
                      <br />
                      Bengaluru, Karnataka 560054
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground block">Operating Hours</span>
                    <span className="text-muted-foreground leading-relaxed block mt-0.5">
                      Monday – Saturday: 08:00 AM – 08:00 PM
                      <br />
                      Sunday: 10:00 AM – 04:00 PM (Research Cohorts)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground block">Official Emails</span>
                    <span className="text-muted-foreground font-mono block mt-0.5">
                      idealab@institution.edu
                      <br />
                      fabrication@idealab.gov.in
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground block">
                      Direct Phone &amp; Helpline
                    </span>
                    <span className="text-muted-foreground font-mono block mt-0.5">
                      +91 80 2360 4455 (Ext. 304)
                      <br />
                      +91 98765 43210 (Lab Supervisor)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Campus Map Graphic Card */}
            <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
              {/* Map Preview Canvas / Graphic */}
              <div className="relative h-44 bg-slate-950 p-4 flex flex-col justify-between overflow-hidden">
                {/* Visual grid pattern representing blueprint */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-primary border border-primary/30">
                    <Navigation className="h-3 w-3" /> LAT: 13.0298° N, 77.5648° E
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-primary-foreground">
                    GATE #2 ENTRY
                  </span>
                </div>

                {/* Center Pin Marker */}
                <div className="relative z-10 mx-auto flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_20px_rgba(34,197,94,0.6)] animate-bounce">
                    <Building className="h-5 w-5" />
                  </div>
                  <span className="mt-1 px-2 py-0.5 rounded bg-black/80 text-[10px] font-black text-white border border-white/10">
                    IDEA Lab • Innovation Block
                  </span>
                </div>

                <div className="relative z-10 text-[10px] text-slate-400 text-center font-mono">
                  Visitor Parking at Gate #2 • Elevator to Level 3
                </div>
              </div>

              <div className="p-4 bg-muted/20 border-t border-border flex items-center justify-between text-xs">
                <span className="font-semibold text-muted-foreground">Campus Navigation</span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-primary hover:underline flex items-center gap-1"
                >
                  Open in Google Maps <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

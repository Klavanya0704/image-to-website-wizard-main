import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Cpu,
  Printer,
  Scissors,
  Settings,
  ShieldCheck,
  Award,
  Users,
  Clock,
  Layers,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Building2,
  Lightbulb,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-surface/30 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-card py-16 sm:py-24">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[700px] bg-primary/10 blur-3xl rounded-full" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-black text-primary uppercase tracking-wider">
            <Sparkles className="h-4 w-4" /> AICTE IDEA LAB INITIATIVE
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-tight">
            Empowering Student Innovation &amp; Rapid Prototyping
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The AICTE IDEA (Idea Development, Evaluation &amp; Application) Lab is a 24/7 maker
            ecosystem equipped with industrial-grade digital fabrication tools, empowering
            engineers, researchers, and startup teams to transform STEM concepts into market-ready
            prototypes.
          </p>

          {/* Key Statistics Badges */}
          <div className="pt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-4xl mx-auto">
            {[
              { stat: "50+", label: "Prototyping Machines", icon: Settings },
              { stat: "10k+", label: "Projects Fabricated", icon: Layers },
              { stat: "24/7", label: "Makerspace Access", icon: Clock },
              { stat: "500+", label: "Patents & Papers", icon: Award },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="p-5 rounded-2xl border border-border bg-background shadow-sm text-center flex flex-col items-center justify-center space-y-1 hover:border-primary/40 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-1">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-foreground font-mono">
                    {item.stat}
                  </span>
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lab Mission & AICTE Mandate */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-14">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-primary">
              OUR MISSION &amp; VISION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              Bridging Theory and Hands-on Engineering
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Established under the prestigious scheme of the All India Council for Technical
              Education (AICTE), Ministry of Education, our laboratory serves as a central catalyst
              for multidisciplinary fabrication. We encourage students to &ldquo;think with their
              hands&rdquo; and iterate on real-world engineering challenges.
            </p>
            <div className="space-y-2.5 pt-2">
              {[
                "Democratized access to high-end CNC, laser, and additive manufacturing.",
                "Subsidized material costs and grants for college student projects.",
                "Interdisciplinary cross-pollination across mechanical, electronics, and software disciplines.",
                "Direct pipeline from proof-of-concept prototype to startup incubation.",
              ].map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-foreground font-semibold"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Lightbulb className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-foreground">Open Innovation Policy</h3>
                <p className="text-xs text-muted-foreground">
                  For All Departments &amp; Research Labs
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Any student with a validated CAD file or schematic can schedule fabrication time. Our
              trained lab technicians provide hands-on safety training, toolpath optimization, and
              design-for-manufacturing (DFM) guidance.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <Link to="/services">
                <Button className="bg-primary text-primary-foreground font-bold text-xs rounded-xl px-5 py-2.5 cursor-pointer">
                  Explore Services <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Button>
              </Link>
              <Link to="/bulk-orders">
                <Button
                  variant="outline"
                  className="text-xs font-bold rounded-xl px-5 py-2.5 cursor-pointer"
                >
                  Institutional Bulk Orders
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment & Capabilities Grid */}
      <section className="border-y border-border bg-card py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-primary">
              MACHINERY &amp; INFRASTRUCTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              Industrial-Grade Prototyping Capabilities
            </h2>
            <p className="text-xs text-muted-foreground max-w-xl mx-auto">
              Our lab houses top-tier machinery maintained to micro-millimeter calibration
              standards.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "3D Print Farm",
                desc: "16x multi-material FDM, SLA resin, and SLS nylon printers with 0.08mm layer resolution.",
                icon: Printer,
                specs: "Bambu X1-Carbon, Creality K1 Max, Formlabs 3+",
              },
              {
                title: "CO2 Laser Cutters",
                desc: "130W optical laser bed for cutting and engraving cast acrylic, plywood, Delrin, and leather.",
                icon: Scissors,
                specs: "1300x900mm Bed • 0.01mm Positioning Accuracy",
              },
              {
                title: "5-Axis CNC Milling",
                desc: "High-speed billet machining for aerospace 6061-T6 aluminum, brass, copper, and engineering plastics.",
                icon: Settings,
                specs: "24,000 RPM Spindle • Automatic Tool Changer",
              },
              {
                title: "PCB Prototyping Station",
                desc: "Double-sided FR4 milling, automated chemical tinning, UV solder mask, and SMT pick-and-place.",
                icon: Cpu,
                specs: "0.1mm Trace Width • Flying Probe Test Certified",
              },
            ].map((eq) => {
              const Icon = eq.icon;
              return (
                <div
                  key={eq.title}
                  className="rounded-3xl border border-border bg-background p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-primary/50 transition-all hover:shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-black text-foreground">{eq.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{eq.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-border/60">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                      Equipment Spec
                    </span>
                    <span className="text-[11px] font-mono font-bold text-foreground block mt-0.5">
                      {eq.specs}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mentors & Lab Team */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-primary">
            LEADERSHIP &amp; MENTORSHIP
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">
            Meet Our Lab Mentors &amp; Staff
          </h2>
          <p className="text-xs text-muted-foreground max-w-xl mx-auto">
            Experienced professors, industrial fabrication specialists, and student leads dedicated
            to guiding your prototypes from idea to reality.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Dr. Ramesh Kumar",
              role: "Lab Director & PI",
              dept: "PhD Additive Manufacturing, IIT-M",
              expertise: "Generative Design & Metals 3D Printing",
              image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
            },
            {
              name: "Prof. Anita Deshmukh",
              role: "Superintendent & CNC Lead",
              dept: "M.Tech Mechatronics",
              expertise: "4-Axis CAM Toolpaths & Rapid Tooling",
              image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80",
            },
            {
              name: "Vikram Sen",
              role: "Senior Embedded Engineer",
              dept: "IoT & Hardware Prototyping",
              expertise: "High-Speed PCB Design & Firmware",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
            },
            {
              name: "Alex Johnson",
              role: "Student Innovation Fellow",
              dept: "Robotics & Automation Lead",
              expertise: "Autonomous Drones & CAD Slicing",
              image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
            },
          ].map((person) => (
            <div
              key={person.name}
              className="rounded-3xl border border-border bg-card p-5 shadow-sm text-center space-y-3 hover:border-primary/40 transition-colors"
            >
              <img
                src={person.image}
                alt={person.name}
                className="h-24 w-24 rounded-full mx-auto object-cover border-2 border-primary/20 shadow-inner"
              />
              <div>
                <h3 className="text-sm font-black text-foreground">{person.name}</h3>
                <p className="text-xs font-bold text-primary">{person.role}</p>
                <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{person.dept}</p>
              </div>
              <div className="pt-2 border-t border-border/60">
                <span className="text-[10px] text-muted-foreground font-semibold">
                  Focus: {person.expertise}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-3xl border border-primary/30 bg-primary/5 p-8 sm:p-12 text-center space-y-4 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">
            Ready to Build Your Prototype?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            Book a slot on our high-speed printers or talk to a lab mentor today. All engineering
            students and faculty members are welcome.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link to="/services">
              <Button className="bg-primary text-primary-foreground font-black text-xs px-6 py-3 rounded-xl cursor-pointer">
                Request Fabrication Quote
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                className="text-xs font-bold px-6 py-3 rounded-xl cursor-pointer"
              >
                Visit IDEA Lab Campus Desk
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

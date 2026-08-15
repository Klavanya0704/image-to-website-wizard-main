import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import {
  Printer,
  Scissors,
  Settings,
  Cpu,
  Clock,
  UploadCloud,
  FileText,
  FileCode,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  component: Services,
});

const SERVICES_DATA = [
  {
    id: "3d-printing",
    title: "3D Printing Request",
    description:
      "FDM & SLA high-resolution polymer printing. Choose from PLA, ABS, PETG, or resin for functional prototypes, artistic designs, and mechanical enclosures.",
    time: "1-2 Business Days",
    icon: Printer,
    formats: ".STL, .OBJ, .3MF",
  },
  {
    id: "laser-cutting",
    title: "Laser Cutting & Engraving",
    description:
      "High-precision CO2 laser cutting and engraving for acrylics, wood, MDF, fabrics, and leather. Clean cuts with accuracy up to 0.1mm.",
    time: "Same Day / 24 Hours",
    icon: Scissors,
    formats: ".DXF, .SVG, .AI, .PDF",
  },
  {
    id: "cnc-machining",
    title: "CNC Machining",
    description:
      "Heavy-duty CNC milling and routing for soft metals (aluminum, brass), plastics, and hardwoods. Ideal for structural frames, brackets, and molds.",
    time: "3-5 Business Days",
    icon: Settings,
    formats: ".STEP, .IGS, .DXF",
  },
  {
    id: "pcb-prototype",
    title: "PCB Prototype Fabrication",
    description:
      "Rapid single & double-sided printed circuit board milling and etching. Complete layout stencil fabrication with solder mask application.",
    time: "2-3 Business Days",
    icon: Cpu,
    formats: ".GERBER, .ZIP, .BRD",
  },
];

function Services() {
  const [selectedService, setSelectedService] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRequestQuoteClick = (serviceId: string) => {
    setSelectedService(serviceId);
    const formElement = document.getElementById("booking-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !selectedService) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    // Simulate server request
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Quote request submitted successfully! Check your email for status updates.");
      // Reset form
      setName("");
      setEmail("");
      setSelectedService("");
      setProjectDescription("");
      setFileName("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 2000);
  };

  return (
    <div className="pb-20">
      {/* Hero Banner */}
      <section className="mx-auto max-w-[1400px] px-6 pt-6">
        <div
          className="relative overflow-hidden rounded-2xl px-6 py-12 md:px-12 md:py-16 border border-border"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="relative max-w-2xl z-10 text-white">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight md:text-5xl leading-tight text-white">
              AICTE IDEA Lab Makerspace Services
            </h1>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-[#E2E8F0] opacity-90">
              Turn your digital files and engineering blueprints into physical products. Submit your
              models for direct execution or request design guidance from lab mentors.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="mx-auto max-w-[1400px] px-6 mt-12">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          Lab Prototyping Capabilities
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-semibold mt-1">
          High-performance manufacturing machines operated by trained lab technicians.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES_DATA.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] hover:shadow-md transition-all group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground mt-5">{service.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mt-2.5 flex-1">
                  {service.description}
                </p>
                <div className="mt-5 border-t border-border/60 pt-4 flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wide">
                    <Clock className="h-3.5 w-3.5 text-primary" /> Est. Time: {service.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wide">
                    <FileCode className="h-3.5 w-3.5 text-primary" /> Formats: {service.formats}
                  </div>
                </div>
                <Button
                  onClick={() => handleRequestQuoteClick(service.id)}
                  className="mt-6 w-full text-xs font-bold py-2.5 rounded-xl border border-primary/20 hover:border-primary hover:bg-primary/5 bg-transparent text-primary hover:text-primary transition-all cursor-pointer"
                >
                  Request Fabrication Quote
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Booking Section */}
      <section id="booking-form" className="mx-auto max-w-3xl px-6 mt-16 scroll-mt-24">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-[var(--shadow-card)]">
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              Submit Lab Request
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-semibold mt-1">
              Select your fabrication service, upload models, and get status updates.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="student-name"
                  className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Student Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="student-name"
                  required
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4.5 py-3 text-sm font-medium placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="student-email"
                  className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Student Email <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  id="student-email"
                  required
                  placeholder="Enter college email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4.5 py-3 text-sm font-medium placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="service-type"
                className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
              >
                Fabrication Service <span className="text-destructive">*</span>
              </label>
              <select
                id="service-type"
                required
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4.5 py-3 text-sm font-semibold focus:border-primary focus:outline-none cursor-pointer"
              >
                <option value="">Select Service...</option>
                <option value="3d-printing">3D Printing (.STL, .OBJ, .3MF)</option>
                <option value="laser-cutting">Laser Cutting & Engraving (.DXF, .SVG)</option>
                <option value="cnc-machining">CNC Machining (.STEP, .IGS)</option>
                <option value="pcb-prototype">PCB Prototype Fabrication (.GERBER)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="project-desc"
                className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
              >
                Project Description & Material Specs
              </label>
              <textarea
                id="project-desc"
                rows={4}
                placeholder="Mention material type, thickness, infill density, or general project constraints."
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4.5 py-3 text-sm font-medium placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none resize-none"
              />
            </div>

            {/* Design File Upload */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Design File (.STL, .DXF, .GERBER)
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border hover:border-primary rounded-2xl p-6 text-center cursor-pointer transition-colors hover:bg-primary/[1%] flex flex-col items-center justify-center gap-2 group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".stl,.obj,.3mf,.dxf,.svg,.step,.igs,.gerber,.zip,.brd"
                  className="hidden"
                />
                <UploadCloud className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="text-xs font-semibold text-foreground/80">
                  {fileName ? (
                    <span className="text-primary font-bold flex items-center gap-1">
                      <FileText className="h-4 w-4" /> {fileName}
                    </span>
                  ) : (
                    <span>
                      Drag and drop design files here or{" "}
                      <span className="text-primary font-bold">Browse</span>
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground font-semibold">
                  Max file size: 50MB
                </p>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-extrabold py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98] text-sm flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting Request...
                </>
              ) : (
                "Submit Fabrication Request"
              )}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}

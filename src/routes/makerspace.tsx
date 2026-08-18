import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import {
  Printer,
  Scissors,
  Settings,
  Cpu,
  Clock,
  UploadCloud,
  FileCode,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  Compass,
  Award,
  ArrowRight,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  StationVisual3DPrinting,
  StationVisualLaserCutting,
  StationVisualCNC,
  StationVisualPCB,
} from "@/components/site/StationVisuals";

export const Route = createFileRoute("/makerspace")({
  head: () => ({
    meta: [
      { title: "Makerspace Hub & Custom Fabrication | AICTE IDEA LAB" },
      {
        name: "description",
        content:
          "Access high-precision 3D printing, laser cutting, CNC machining, and PCB prototyping services at the AICTE IDEA Lab Makerspace.",
      },
    ],
  }),
  component: MakerspacePage,
});

const LAB_STATIONS = [
  {
    id: "3d-printing",
    title: "3D Printing & Additive Station",
    description:
      "Industrial FDM & SLA high-resolution polymer printing. Choose from PLA, ABS, PETG, TPU, or engineering resin for functional prototypes and enclosures.",
    turnaround: "24-48 Hours",
    icon: Printer,
    visual: StationVisual3DPrinting,
    formats: ".STL, .OBJ, .3MF, .STEP",
    precision: "±0.05mm",
    color: "from-blue-500/10 to-indigo-500/10 border-blue-200 dark:border-blue-900/50",
    badgeColor: "bg-[#1455D9] text-white",
  },
  {
    id: "laser-cutting",
    title: "CO2 Laser Cutting & Engraving",
    description:
      "High-precision laser cutting and vector engraving for acrylic, birch plywood, MDF, fabric, and leather. Mirror finish edges with high repeatability.",
    turnaround: "Same Day / 24 Hours",
    icon: Scissors,
    visual: StationVisualLaserCutting,
    formats: ".DXF, .SVG, .AI, .PDF",
    precision: "±0.1mm",
    color: "from-rose-500/10 to-orange-500/10 border-rose-200 dark:border-rose-900/50",
    badgeColor: "bg-rose-600 text-white",
  },
  {
    id: "cnc-machining",
    title: "4-Axis CNC Milling & Machining",
    description:
      "High-torque CNC routing and precision milling for soft metals (6061-T6 Aluminum, Brass), Delrin plastics, and structural composites.",
    turnaround: "2-4 Business Days",
    icon: Settings,
    visual: StationVisualCNC,
    formats: ".STEP, .IGES, .DXF",
    precision: "±0.02mm",
    color: "from-amber-500/10 to-yellow-500/10 border-amber-200 dark:border-amber-900/50",
    badgeColor: "bg-amber-600 text-white",
  },
  {
    id: "pcb-prototype",
    title: "PCB Prototyping & IoT Station",
    description:
      "Rapid single and double-sided printed circuit board milling, surface-mount soldering stations, and full firmware testing bench.",
    turnaround: "48-72 Hours",
    icon: Cpu,
    visual: StationVisualPCB,
    formats: ".GERBER, .ZIP, .BRD",
    precision: "6mil Trace/Space",
    color: "from-emerald-500/10 to-teal-500/10 border-emerald-200 dark:border-emerald-900/50",
    badgeColor: "bg-emerald-600 text-white",
  },
];

function MakerspacePage() {
  const [selectedStation, setSelectedStation] = useState<string>("3d-printing");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectStation = (id: string) => {
    setSelectedStation(id);
    const form = document.getElementById("fabrication-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      toast.success(`Attached "${file.name}" for analysis!`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !selectedStation) {
      toast.error("Please provide your name, email, and selected lab service.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Fabrication Request Received!", {
        description: "Our lab engineers will evaluate your design and reply within 4 hours.",
      });
      setName("");
      setEmail("");
      setProjectDesc("");
      setFileName("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 1500);
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-background pb-20 space-y-12 sm:space-y-16">
      {/* 1. Hero Section */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 pt-6">
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-gradient-to-r from-[#0B1736] via-[#0F2356] to-[#1455D9] p-8 sm:p-12 lg:p-16 text-white shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-200 border border-white/15">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>AICTE IDEA LAB &bull; MAKERSPACE FACILITY</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Where Digital Blueprints Turn into{" "}
              <span className="text-[#00E5FF]">Physical Reality</span>
            </h1>

            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-2xl">
              Access world-class fabrication machinery, 3D printing farms, high-speed laser cutters,
              4-axis CNC milling, and IoT testing stations. Open for students, researchers, and
              creators.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById("fabrication-form");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#00E5FF] hover:bg-[#00c9e0] text-[#0B1736] font-extrabold px-6 py-3 text-sm shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                <Zap className="h-4 w-4 fill-current" />
                <span>Submit Fabrication Job</span>
              </button>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 text-sm border border-white/20 transition-all"
              >
                <span>Browse Store Products</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Lab Stations Grid */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1455D9]">
            FACILITY CAPABILITIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1736] dark:text-white tracking-tight">
            High-Precision Fabrication Stations
          </h2>
          <p className="text-xs sm:text-sm text-[#52627A] dark:text-slate-400">
            Select a station below to review tolerances, supported CAD formats, and request rapid
            prototyping.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LAB_STATIONS.map((st) => {
            const isSelected = selectedStation === st.id;
            const VisualComponent = st.visual;

            return (
              <div
                key={st.id}
                onClick={() => setSelectedStation(st.id)}
                className={`group relative flex flex-col justify-between rounded-2xl border bg-white dark:bg-card p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer ${
                  isSelected
                    ? "border-[#1455D9] ring-4 ring-[#1455D9]/20 shadow-md"
                    : "border-[#DCE5F2] dark:border-slate-800"
                }`}
              >
                <div className="space-y-3">
                  {/* Dynamic SVG Visual Header */}
                  <div className="relative h-32 sm:h-36 w-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-100/90 via-slate-50/60 to-transparent dark:from-slate-800/50 dark:via-slate-900/30 dark:to-transparent border border-slate-200/50 dark:border-slate-800/50 p-2 flex items-center justify-center">
                    <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out">
                      <VisualComponent />
                    </div>

                    {/* Turnaround Badge */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-xs ${st.badgeColor}`}
                      >
                        {st.turnaround}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-[#0B1736] dark:text-white group-hover:text-[#1455D9] transition-colors">
                      {st.title}
                    </h3>
                    <p className="text-xs text-[#52627A] dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                      {st.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DCE5F2]/60 dark:border-slate-800/60 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#52627A] dark:text-slate-400">
                    <span>Precision:</span>
                    <span className="font-bold text-[#0B1736] dark:text-white">{st.precision}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#52627A] dark:text-slate-400">
                    <span>Formats:</span>
                    <span className="font-bold text-[#1455D9] truncate max-w-[140px]">
                      {st.formats}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectStation(st.id);
                    }}
                    className={`w-full mt-3 flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-[#1455D9] text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-[#0B1736] dark:text-white hover:bg-[#1455D9] hover:text-white"
                    }`}
                  >
                    <span>{isSelected ? "Station Selected ✓" : "Request Fabrication"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Interactive Instant Fabrication Request Form */}
      <section id="fabrication-form" className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="rounded-[28px] bg-white dark:bg-card border border-[#DCE5F2] dark:border-border p-6 sm:p-10 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1455D9]">
                STEP-BY-STEP WORKFLOW
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B1736] dark:text-white tracking-tight">
                Submit Your Project for Lab Fabrication
              </h2>
              <p className="text-xs sm:text-sm text-[#52627A] dark:text-slate-400 leading-relaxed">
                Upload your CAD models (.STL, .DXF, .STEP, .GERBER) or technical drawings. Our lab
                mentors and engineering technicians will review geometry, verify tolerances, and
                begin manufacturing.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EBF2FE] text-[#1455D9] font-bold text-xs">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0B1736] dark:text-white">
                    Design &amp; File Review
                  </h4>
                  <p className="text-xs text-[#52627A] dark:text-slate-400">
                    Automated mesh verification &amp; material optimization.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EBF2FE] text-[#1455D9] font-bold text-xs">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0B1736] dark:text-white">
                    Instant Quote &amp; Approval
                  </h4>
                  <p className="text-xs text-[#52627A] dark:text-slate-400">
                    Receive precise material weight, laser run-time &amp; pricing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EBF2FE] text-[#1455D9] font-bold text-xs">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0B1736] dark:text-white">
                    Rapid Execution &amp; Dispatch
                  </h4>
                  <p className="text-xs text-[#52627A] dark:text-slate-400">
                    Manufactured with lab-grade precision and quality inspection.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-[#1455D9] dark:text-blue-400">
                <ShieldCheck className="h-4 w-4" /> 15% Student &amp; Academic Discount
              </div>
              <p className="text-[11px] text-[#52627A] dark:text-slate-300">
                All registered college students with valid institute ID get subsidized machine time
                and subsidized raw material rates.
              </p>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#0B1736] dark:text-white block mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-[#DCE5F2] dark:border-border bg-[#F8FAFD] dark:bg-card px-4 py-2.5 text-xs sm:text-sm text-[#0B1736] dark:text-white outline-none focus:border-[#1455D9] focus:ring-2 focus:ring-[#1455D9]/15"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0B1736] dark:text-white block mb-1.5">
                    College / Organization Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul@sasi.ac.in"
                    className="w-full rounded-xl border border-[#DCE5F2] dark:border-border bg-[#F8FAFD] dark:bg-card px-4 py-2.5 text-xs sm:text-sm text-[#0B1736] dark:text-white outline-none focus:border-[#1455D9] focus:ring-2 focus:ring-[#1455D9]/15"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0B1736] dark:text-white block mb-1.5">
                  Select Fabrication Station *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {LAB_STATIONS.map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setSelectedStation(st.id)}
                      className={`rounded-xl py-2 px-3 text-center text-xs font-bold transition-all border ${
                        selectedStation === st.id
                          ? "border-[#1455D9] bg-[#1455D9] text-white shadow-xs"
                          : "border-[#DCE5F2] dark:border-slate-800 bg-[#F8FAFD] dark:bg-card text-[#52627A] hover:border-slate-300"
                      }`}
                    >
                      {st.title.split(" ")[0]} {st.title.split(" ")[1]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0B1736] dark:text-white block mb-1.5">
                  Project Description &amp; Technical Requirements
                </label>
                <textarea
                  rows={3}
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  placeholder="Mention desired material (PLA, Acrylic, Aluminum), quantity, infill percentage, or specific tolerances required..."
                  className="w-full rounded-xl border border-[#DCE5F2] dark:border-border bg-[#F8FAFD] dark:bg-card p-4 text-xs sm:text-sm text-[#0B1736] dark:text-white outline-none focus:border-[#1455D9] focus:ring-2 focus:ring-[#1455D9]/15 resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0B1736] dark:text-white block mb-1.5">
                  Attach CAD / Vector Blueprint File (Optional)
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#DCE5F2] dark:border-slate-800 hover:border-[#1455D9] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-[#F8FAFD] dark:bg-card"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".stl,.obj,.3mf,.step,.dxf,.svg,.pdf,.zip"
                  />
                  <div className="flex flex-col items-center gap-1.5">
                    <UploadCloud className="h-8 w-8 text-[#1455D9]" />
                    <span className="text-xs sm:text-sm font-bold text-[#0B1736] dark:text-white">
                      {fileName ? fileName : "Click to upload STL, DXF, STEP, or ZIP"}
                    </span>
                    <span className="text-[10px] text-[#52627A] dark:text-slate-400">
                      Supports files up to 50MB for slicing and analysis
                    </span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-[#1455D9] hover:bg-[#0F44B2] text-white font-bold py-3 text-sm shadow-md transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Evaluating Files &amp; Submitting...</span>
                ) : (
                  <>
                    <Zap className="h-4 w-4 fill-current" />
                    <span>Submit Fabrication Job Request</span>
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

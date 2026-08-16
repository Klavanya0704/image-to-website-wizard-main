import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  UploadCloud,
  FileCode,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ArrowRight,
  Layers,
  Printer,
  Scissors,
  Cpu,
  Settings,
  HelpCircle,
  FileCheck,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { inr } from "@/lib/format";

export const Route = createFileRoute("/bulk-orders")({
  component: BulkOrders,
});

interface UploadedFile {
  name: string;
  size: string;
  type: string;
}

function BulkOrders() {
  const [orgName, setOrgName] = useState("");
  const [contactName, setContactName] = useState("Alex Johnson");
  const [email, setEmail] = useState("student.alex@innovation.edu");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [quantity, setQuantity] = useState("100");
  const [technology, setTechnology] = useState("3d_printing");
  const [material, setMaterial] = useState("PETG Carbon Black");
  const [targetDate, setTargetDate] = useState("2026-08-30");
  const [projectNotes, setProjectNotes] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    { name: "chassis_robot_v2.step", size: "4.8 MB", type: "STEP / CAD" },
    { name: "laser_mount_plate.dxf", size: "1.2 MB", type: "DXF Drawing" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquirySuccessId, setInquirySuccessId] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles: UploadedFile[] = [];
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        if (f) {
          const sizeMb = (f.size / (1024 * 1024)).toFixed(1);
          newFiles.push({
            name: f.name,
            size: `${sizeMb} MB`,
            type: f.name.split(".").pop()?.toUpperCase() || "CAD",
          });
        }
      }
      setUploadedFiles([...uploadedFiles, ...newFiles]);
      toast.success(`Uploaded ${newFiles.length} design files!`);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    toast.info("File removed from upload list.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!orgName.trim() || !contactName.trim() || !email.trim() || !phone.trim()) {
      toast.error("Please fill in all required organization and contact details.");
      return;
    }

    if (uploadedFiles.length === 0) {
      toast.error("Please attach at least one CAD/ZIP/blueprint file for quotation.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedInquiryId = "BULK-IDEA-" + Math.floor(10000 + Math.random() * 90000);
      setInquirySuccessId(generatedInquiryId);
      toast.success("Bulk fabrication inquiry submitted successfully!");
    }, 1200);
  };

  // Discount calculation preview
  const numUnits = parseInt(quantity) || 50;
  const discountPercent = numUnits >= 500 ? 35 : numUnits >= 250 ? 30 : numUnits >= 100 ? 25 : 15;

  return (
    <div className="min-h-screen bg-surface/30 pb-24">
      {/* Success Modal Overlay */}
      {inquirySuccessId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-black uppercase tracking-wider mb-1">
                AICTE IDEA LAB BULK SERVICES
              </span>
              <h3 className="text-2xl font-black text-foreground">Inquiry Received!</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Our senior makerspace engineer is reviewing your CAD blueprints for slicing,
                toolpath estimates, and material batching.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-muted/20 border border-border text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold">Inquiry Ticket No:</span>
                <span className="font-mono font-black text-foreground">{inquirySuccessId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold">Organization:</span>
                <span className="font-bold text-foreground">{orgName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold">Batch Quantity:</span>
                <span className="font-bold text-foreground">{quantity} Units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold">
                  Estimated Quote Turnaround:
                </span>
                <span className="font-bold text-success">Within 4 Business Hours</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => setInquirySuccessId(null)}
                className="flex-1 bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs py-3 rounded-xl cursor-pointer"
              >
                Submit Another Request
              </Button>
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-bold text-foreground hover:bg-muted"
              >
                View Lab Machinery
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-black text-primary uppercase tracking-wider">
            <Building2 className="h-4 w-4" /> Institutional &amp; Batch Fabrication
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Bulk Makerspace Production Orders
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Need 50 to 5,000+ units for collegiate hackathons, lab robotics teams, research
            prototypes, or startup batches? Leverage our multi-machine print farm, CNC routers, and
            laser cutters at subsidized AICTE institutional rates.
          </p>

          {/* Capabilities Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            {[
              { label: "16x 3D Print Farm (FDM/SLA/SLS)", icon: Printer },
              { label: "High-Power CO2 / Fiber Laser Cutters", icon: Scissors },
              { label: "4-Axis Precision CNC Machining", icon: Settings },
              { label: "PCB Prototyping & Pick-and-Place SMT", icon: Cpu },
            ].map((cap) => {
              const Icon = cap.icon;
              return (
                <span
                  key={cap.label}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-bold text-foreground shadow-sm"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {cap.label}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Form & Pricing Sidebar Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-10">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Form (8 cols) */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
              <div className="pb-4 border-b border-border">
                <h2 className="text-lg font-black text-foreground">
                  Bulk Fabrication Inquiry Form
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Upload CAD models or mechanical drawings to receive a formalized quote with tier
                  discounts.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Section 1: Organization Details */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    1. Organization &amp; Project Info
                  </h3>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Institution / College / Startup / Team Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dept of Robotics, MSRIT / Autonomous Drone Team"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Primary Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Johnson"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Contact Phone Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Official Institutional Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. project-lead@innovation.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Technical Specifications */}
                <div className="space-y-3 pt-3 border-t border-border">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    2. Fabrication &amp; Batch Specifications
                  </h3>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Primary Technology Required *
                      </label>
                      <select
                        value={technology}
                        onChange={(e) => setTechnology(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none cursor-pointer"
                      >
                        <option value="3d_printing">3D Printing (FDM / SLA / SLS)</option>
                        <option value="laser_cutting">Laser Cutting &amp; Engraving</option>
                        <option value="cnc_machining">4-Axis CNC Milling &amp; Turning</option>
                        <option value="pcb_fabrication">PCB Fabrication &amp; SMT Assembly</option>
                        <option value="hybrid">Multi-Process Hybrid Assembly</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Batch Quantity (Units) *
                      </label>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none cursor-pointer"
                      >
                        <option value="50">50 Units (15% Volume Discount)</option>
                        <option value="100">100 Units (25% Volume Discount)</option>
                        <option value="250">250 Units (30% Volume Discount)</option>
                        <option value="500">500 Units (35% Volume Discount)</option>
                        <option value="1000">1,000+ Units (Enterprise Custom Rate)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Material Preference *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. PETG Carbon Fiber, 6061 Aluminum, 5mm Clear Acrylic"
                        value={material}
                        onChange={(e) => setMaterial(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Required Delivery Deadline *
                      </label>
                      <input
                        type="date"
                        required
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: CAD / Blueprints File Upload Area */}
                <div className="space-y-3 pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      3. Upload CAD / STEP / DXF / Gerber Files *
                    </h3>
                    <span className="text-[10px] text-muted-foreground">Max file size: 50 MB</span>
                  </div>

                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border hover:border-primary/50 rounded-2xl bg-muted/10 hover:bg-muted/20 transition-all cursor-pointer">
                    <UploadCloud className="h-8 w-8 text-primary mb-2" />
                    <span className="text-xs font-bold text-foreground">
                      Click to Browse or Drag &amp; Drop 3D / 2D Design Files
                    </span>
                    <span className="text-[10px] text-muted-foreground mt-1">
                      Supported: .STEP, .STP, .STL, .DXF, .ZIP (Gerbers), .IGES, .PDF Blueprints
                    </span>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".step,.stp,.stl,.dxf,.zip,.pdf,.iges,.dwg,.obj"
                    />
                  </label>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2 pt-1">
                      {uploadedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-background text-xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <FileCode className="h-4 w-4 text-primary shrink-0" />
                            <span className="font-bold text-foreground truncate">{file.name}</span>
                            <span className="text-[10px] text-muted-foreground font-mono shrink-0">
                              ({file.size} • {file.type})
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Section 4: Notes */}
                <div className="space-y-1 pt-3 border-t border-border">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Additional Dimensional Tolerances / Project Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specify surface finish, heat inserts, assembly requirements, or special packaging..."
                    value={projectNotes}
                    onChange={(e) => setProjectNotes(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-3 text-xs font-medium focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Submit Action */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs sm:text-sm py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      Submit Bulk Fabrication Inquiry <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column: Volume Discount Calculator & Lab Guarantee (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Live Volume Discount Card */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <h3 className="text-xs font-black uppercase tracking-wider text-foreground">
                  Institutional Discount Matrix
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-primary/[4%] border border-primary/20 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-semibold">Selected Batch:</span>
                  <span className="font-bold text-foreground">{quantity} Units</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-semibold">Applied Discount:</span>
                  <span className="font-black text-success text-sm">{discountPercent}% OFF</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-semibold">GST Invoice:</span>
                  <span className="font-bold text-foreground">B2B / Tax Input Available</span>
                </div>
              </div>

              {/* Tier Breakdown */}
              <div className="space-y-2 text-xs">
                {[
                  {
                    tier: "50 – 99 Units",
                    discount: "15% OFF",
                    active: numUnits >= 50 && numUnits < 100,
                  },
                  {
                    tier: "100 – 249 Units",
                    discount: "25% OFF",
                    active: numUnits >= 100 && numUnits < 250,
                  },
                  {
                    tier: "250 – 499 Units",
                    discount: "30% OFF",
                    active: numUnits >= 250 && numUnits < 500,
                  },
                  { tier: "500+ Units", discount: "35% OFF", active: numUnits >= 500 },
                ].map((t) => (
                  <div
                    key={t.tier}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-[11px] transition-all ${
                      t.active
                        ? "border-primary bg-primary/10 font-bold text-primary"
                        : "border-border/60 text-muted-foreground"
                    }`}
                  >
                    <span>{t.tier}</span>
                    <span className="font-black">{t.discount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality & Tolerance Specs */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>AICTE Makerspace Quality Guarantee</span>
              </div>
              <ul className="space-y-2 text-muted-foreground text-[11px] leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                  <span>±0.05mm precision verification via coordinate measuring probes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                  <span>Full batch sample pre-production approval before full-run machining.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                  <span>Direct laboratory GST tax invoices compliant with college grants.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

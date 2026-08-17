import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  Printer,
  ShieldCheck,
  Truck,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/faq")({
  component: Faq,
});

interface FAQItem {
  q: string;
  a: string;
  category: "3d" | "general" | "orders" | "bulk";
}

const FAQS: FAQItem[] = [
  {
    q: "Who is eligible to use the AICTE IDEA Lab facilities?",
    a: "All enrolled undergraduate and postgraduate students, PhD scholars, faculty researchers, and affiliated startup incubatees have full access to our makerspace equipment upon completing the initial lab safety orientation.",
    category: "general",
  },
  {
    q: "How do I claim the 15% Student Discount?",
    a: "Apply coupon code STUDENT15 at checkout. You can also upload your valid college student ID or roll number during checkout or in your Maker Profile to automatically unlock subsidized material rates.",
    category: "orders",
  },
  {
    q: "What 3D file formats are supported for fabrication quotes?",
    a: "Our slicers natively support .STEP, .STP, .STL, .OBJ, and .3MF for 3D printing, .DXF and .SVG for laser cutting, and Gerber .ZIP archives for PCB prototype etching.",
    category: "3d",
  },
  {
    q: "What is the typical turnaround time for custom 3D printing or CNC jobs?",
    a: "Standard 3D prints (FDM) are processed within 12 to 24 hours. Laser cutting and CNC machining jobs typically take 24 to 48 hours depending on queue depth and surface finish requirements.",
    category: "3d",
  },
  {
    q: "Can project teams or clubs place bulk fabrication orders?",
    a: "Yes! Teams building for hackathons, SAE BAJA, robocon, or research trials can use our /bulk-orders portal to receive volume discounts up to 35% off along with GST B2B tax invoicing.",
    category: "bulk",
  },
  {
    q: "Can I pick up my printed parts directly from the lab desk?",
    a: "Yes! You can choose 'Campus Pickup' at checkout to collect your finished components directly from Room 304, Innovation Block, Monday through Saturday between 08:00 AM and 08:00 PM.",
    category: "orders",
  },
];

function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCat, setSelectedCat] = useState<string>("all");

  const filteredFaqs =
    selectedCat === "all" ? FAQS : FAQS.filter((f) => f.category === selectedCat);

  return (
    <div className="min-h-screen bg-surface/30 pb-24">
      {/* Hero Header */}
      <section className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-black text-primary uppercase tracking-wider">
            <HelpCircle className="h-4 w-4" /> KNOWLEDGE BASE &amp; FAQS
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Find answers regarding lab access, 3D printing tolerances, student discounts, and
            institutional orders.
          </p>

          {/* Category Filter Chips */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Questions" },
              { id: "general", label: "Lab & Eligibility" },
              { id: "3d", label: "3D Print & Fabrication" },
              { id: "orders", label: "Orders & Discounts" },
              { id: "bulk", label: "Bulk & Grants" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                  selectedCat === cat.id
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion List */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-10">
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-muted/20"
                >
                  <span className="text-sm font-bold text-foreground">{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-primary shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 rounded-3xl border border-border bg-card p-6 sm:p-8 text-center space-y-3">
          <h3 className="text-base font-black text-foreground">Still have questions?</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Our lab staff is ready to help you with CAD files, slicing settings, or material
            selection.
          </p>
          <div className="pt-2">
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground font-bold text-xs rounded-xl px-5 py-2.5 cursor-pointer">
                Contact Lab Help Desk <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

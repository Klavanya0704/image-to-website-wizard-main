import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  ShieldCheck,
  Package,
  Layers,
  FileText,
  Phone,
  ArrowRight,
  Sparkles,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { inr } from "@/lib/format";

export const Route = createFileRoute("/track-order")({
  component: TrackOrder,
});

interface TrackingEvent {
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  active?: boolean;
}

interface OrderData {
  orderId: string;
  status: "placed" | "fabrication" | "quality_check" | "out_for_delivery" | "delivered";
  statusText: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  deliveryMethod: string;
  orderDate: string;
  estimatedDelivery: string;
  carrier: string;
  trackingNumber: string;
  items: {
    id: string;
    name: string;
    specs: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  events: TrackingEvent[];
}

const SAMPLE_ORDERS: Record<string, OrderData> = {
  "IDEA-948210": {
    orderId: "IDEA-948210",
    status: "fabrication",
    statusText: "Fabrication Processing",
    customerName: "Alex Johnson",
    email: "student.alex@innovation.edu",
    phone: "+91 98765 43210",
    address: "Room 304, Innovation Block, AICTE IDEA Lab Campus, Bengaluru 560001",
    deliveryMethod: "Express Makerspace Fulfillment",
    orderDate: "August 16, 2026",
    estimatedDelivery: "August 18, 2026",
    carrier: "IDEA Lab Internal Express Logistics",
    trackingNumber: "IDEA-EXP-7729104",
    items: [
      {
        id: "1",
        name: "Custom 3D Printed Robotic Gripper",
        specs: "PETG Carbon Black • 100% Infill • 0.12mm precision",
        quantity: 2,
        price: 1499,
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&q=80",
      },
      {
        id: "2",
        name: "Precision Laser Cut Acrylic Chassis",
        specs: "5mm Cast Optical Clear Acrylic • Flame Polished",
        quantity: 1,
        price: 899,
        image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=300&q=80",
      },
    ],
    events: [
      {
        title: "Order Placed & Payment Confirmed",
        description:
          "Payment of ₹3,897 verified via UPI. Design files logged into fabrication queue.",
        timestamp: "Aug 16, 2026 • 10:15 AM",
        completed: true,
      },
      {
        title: "CAD Slicing & Machine Assignment",
        description: "G-Code sliced for Dual-Extrusion CoreXY printer (Bed #04). Material loaded.",
        timestamp: "Aug 16, 2026 • 11:30 AM",
        completed: true,
      },
      {
        title: "Fabrication In Progress",
        description: "Currently printing layer 482 of 1150 at 245°C nozzle temperature.",
        timestamp: "Aug 16, 2026 • 02:45 PM",
        completed: true,
        active: true,
      },
      {
        title: "Quality Check & Dimensional Metrology",
        description:
          "Digital caliper verification and stress testing in accordance with ISO standards.",
        timestamp: "Estimated: Aug 17, 2026",
        completed: false,
      },
      {
        title: "Dispatched & Delivered",
        description: "Ready for desk handover at Room 304 or courier dispatch.",
        timestamp: "Estimated: Aug 18, 2026",
        completed: false,
      },
    ],
  },
  "IDEA-728190": {
    orderId: "IDEA-728190",
    status: "delivered",
    statusText: "Delivered Successfully",
    customerName: "Priya Sharma",
    email: "priya.sharma@research.edu",
    phone: "+91 91234 56789",
    address: "Electronics & Embedded Systems Lab, Block B, Bengaluru 560038",
    deliveryMethod: "Lab Campus Pickup",
    orderDate: "August 12, 2026",
    estimatedDelivery: "August 14, 2026",
    carrier: "Campus Courier Handover",
    trackingNumber: "IDEA-PKP-339182",
    items: [
      {
        id: "3",
        name: "Double-Sided PCB Prototype Kit (5 Boards)",
        specs: "FR4 1.6mm • HASL Lead-Free • Matte Green Soldermask",
        quantity: 1,
        price: 1250,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80",
      },
    ],
    events: [
      {
        title: "Order Placed & Payment Confirmed",
        description: "Gerber file validated through automated DRC check.",
        timestamp: "Aug 12, 2026 • 09:00 AM",
        completed: true,
      },
      {
        title: "PCB Chemical Etching & CNC Drilling",
        description: "Via holes drilled and solder mask cured under UV oven.",
        timestamp: "Aug 13, 2026 • 11:20 AM",
        completed: true,
      },
      {
        title: "Electrical Continuity & Flying Probe Test",
        description: "100% netlist electrical test passed without open/short defects.",
        timestamp: "Aug 13, 2026 • 04:30 PM",
        completed: true,
      },
      {
        title: "Packaged with ESD Anti-Static Shielding",
        description: "Vacuum sealed with moisture silica pack.",
        timestamp: "Aug 14, 2026 • 10:00 AM",
        completed: true,
      },
      {
        title: "Delivered to Lab Pickup Counter",
        description: "Handed over to Priya Sharma with verified Student ID.",
        timestamp: "Aug 14, 2026 • 02:15 PM",
        completed: true,
      },
    ],
  },
  "IDEA-552194": {
    orderId: "IDEA-552194",
    status: "quality_check",
    statusText: "Quality Check & Inspection",
    customerName: "Rohan Patel",
    email: "rohan.patel@makerlab.edu",
    phone: "+91 99887 76655",
    address: "Robotics Arena, AICTE Makerspace, Outer Ring Rd, Bengaluru",
    deliveryMethod: "Standard Express Courier",
    orderDate: "August 15, 2026",
    estimatedDelivery: "August 17, 2026",
    carrier: "BlueDart Express",
    trackingNumber: "BD-99182371",
    items: [
      {
        id: "4",
        name: "CNC Anodized Aluminum Motor Bracket",
        specs: "Aerospace Grade 6061-T6 Aluminum • Matte Black Anodize",
        quantity: 4,
        price: 2400,
        image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=300&q=80",
      },
    ],
    events: [
      {
        title: "Order Placed & CAM Toolpath Generation",
        description: "STEP model imported into 4-Axis CNC mill simulation.",
        timestamp: "Aug 15, 2026 • 02:00 PM",
        completed: true,
      },
      {
        title: "Precision High-Speed Milling",
        description: "Billet machining finished with 0.02mm surface roughness.",
        timestamp: "Aug 16, 2026 • 09:15 AM",
        completed: true,
      },
      {
        title: "Quality Check & Coordinate Measuring Machine (CMM)",
        description: "Undergoing CMM probe inspection for concentricity and thread depth.",
        timestamp: "Aug 16, 2026 • 03:30 PM",
        completed: true,
        active: true,
      },
      {
        title: "Packaging & Dispatch",
        description: "Awaiting courier pickup scan.",
        timestamp: "Estimated: Aug 17, 2026",
        completed: false,
      },
      {
        title: "Delivered",
        description: "Delivery to recipient address.",
        timestamp: "Estimated: Aug 17, 2026",
        completed: false,
      },
    ],
  },
};

function TrackOrder() {
  const [orderQuery, setOrderQuery] = useState("IDEA-948210");
  const [phoneEmailQuery, setPhoneEmailQuery] = useState("");
  const [currentOrder, setCurrentOrder] = useState<OrderData | null>(
    SAMPLE_ORDERS["IDEA-948210"] || null,
  );
  const [isSearching, setIsSearching] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const query = orderQuery.trim().toUpperCase();

    if (!query) {
      toast.error("Please enter a valid Order Reference ID.");
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const found = SAMPLE_ORDERS[query];
      if (found) {
        setCurrentOrder(found);
        toast.success(`Found order details for ${query}!`);
      } else {
        // Fallback demo order with generated status for user input
        const dynamicOrder: OrderData = {
          orderId: query,
          status: "fabrication",
          statusText: "Fabrication Processing",
          customerName: "Alex Johnson",
          email: phoneEmailQuery || "student.alex@innovation.edu",
          phone: "+91 98765 43210",
          address: "Room 304, Innovation Block, AICTE IDEA Lab Campus, Bengaluru",
          deliveryMethod: "Express Makerspace Delivery",
          orderDate: "August 16, 2026",
          estimatedDelivery: "August 19, 2026",
          carrier: "IDEA Lab Courier Express",
          trackingNumber: `EXP-${Math.floor(100000 + Math.random() * 900000)}`,
          items: [
            {
              id: "dyn-1",
              name: "Custom Prototype Component",
              specs: "Standard Lab Infill • Precision Certified",
              quantity: 1,
              price: 1850,
              image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&q=80",
            },
          ],
          events: [
            {
              title: "Order Placed & Payment Verified",
              description: "Order received in the AICTE central fabrication system.",
              timestamp: "Aug 16, 2026 • 10:00 AM",
              completed: true,
            },
            {
              title: "Engineering Review & Slicing",
              description: "Toolpaths and tolerance validation completed.",
              timestamp: "Aug 16, 2026 • 01:15 PM",
              completed: true,
            },
            {
              title: "Fabrication in Queue",
              description: "Queued for processing on high-precision makerspace machinery.",
              timestamp: "Aug 16, 2026 • 04:30 PM",
              completed: true,
              active: true,
            },
            {
              title: "Quality Check & Inspection",
              description: "Pending physical inspection.",
              timestamp: "Estimated: Tomorrow",
              completed: false,
            },
            {
              title: "Delivery to Recipient",
              description: "Scheduled for fulfillment.",
              timestamp: "Estimated: Aug 19, 2026",
              completed: false,
            },
          ],
        };
        setCurrentOrder(dynamicOrder);
        toast.success(`Tracking live status for ${query}`);
      }
    }, 600);
  };

  const calculateSubtotal = () => {
    if (!currentOrder) return 0;
    return currentOrder.items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-surface/30 pb-24">
      {/* Hero Header */}
      <section className="border-b border-border bg-card py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-black text-primary uppercase tracking-wider mb-3">
            <Truck className="h-4 w-4" /> Live Makerspace Tracking
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Track Your Fabrication Order
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
            Monitor slicing status, CNC mill progress, 3D printing stage, quality inspection, and
            courier delivery in real time.
          </p>

          {/* Search Lookup Bar */}
          <form
            onSubmit={handleTrack}
            className="mt-8 mx-auto max-w-3xl rounded-2xl border border-border bg-background p-3 shadow-lg flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-1 relative">
              <Package className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                required
                placeholder="Enter Order ID (e.g. IDEA-948210)"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface/50 pl-10 pr-3 py-2.5 text-xs font-mono font-bold tracking-wide focus:border-primary focus:outline-none"
              />
            </div>

            <div className="flex-1 relative">
              <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Email or Phone Number (optional)"
                value={phoneEmailQuery}
                onChange={(e) => setPhoneEmailQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface/50 pl-10 pr-3 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSearching}
              className="bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs px-8 py-3 rounded-xl shadow cursor-pointer uppercase tracking-wider shrink-0 flex items-center justify-center gap-2"
            >
              {isSearching ? (
                <span>Searching...</span>
              ) : (
                <>
                  <Search className="h-4 w-4" /> Track Status
                </>
              )}
            </Button>
          </form>

          {/* Quick Demo Test Pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="font-bold text-[11px]">Demo Sample Lookups:</span>
            {Object.keys(SAMPLE_ORDERS).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setOrderQuery(key);
                  setCurrentOrder(SAMPLE_ORDERS[key] || null);
                }}
                className={`px-2.5 py-1 rounded-full border text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  currentOrder?.orderId === key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:bg-muted text-foreground"
                }`}
              >
                {key} ({SAMPLE_ORDERS[key]?.statusText})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Order Status Display Section */}
      {currentOrder && (
        <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-10">
          <div className="space-y-6">
            {/* Top Order Summary Card */}
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-black text-foreground font-mono">
                      {currentOrder.orderId}
                    </h2>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                      {currentOrder.statusText}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Placed on{" "}
                    <span className="font-semibold text-foreground">{currentOrder.orderDate}</span>{" "}
                    • Fulfillment via{" "}
                    <span className="font-semibold text-foreground">
                      {currentOrder.deliveryMethod}
                    </span>
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
                    Estimated Delivery
                  </span>
                  <span className="text-base font-black text-price">
                    {currentOrder.estimatedDelivery}
                  </span>
                  <span className="text-[10px] text-muted-foreground block font-mono">
                    AWB: {currentOrder.trackingNumber}
                  </span>
                </div>
              </div>

              {/* 5-Stage Stepper Progress Bar */}
              <div className="py-8">
                <div className="relative">
                  {/* Background track line */}
                  <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-muted rounded-full" />
                  {/* Filled progress bar line */}
                  <div
                    className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-primary rounded-full transition-all duration-500"
                    style={{
                      width:
                        currentOrder.status === "placed"
                          ? "20%"
                          : currentOrder.status === "fabrication"
                            ? "50%"
                            : currentOrder.status === "quality_check"
                              ? "75%"
                              : "100%",
                    }}
                  />

                  {/* 5 Stepper Checkpoint Nodes */}
                  <div className="relative flex justify-between">
                    {[
                      { label: "Order Placed", icon: CheckCircle, stage: "placed" },
                      { label: "Fabrication", icon: Layers, stage: "fabrication" },
                      { label: "Quality Check", icon: ShieldCheck, stage: "quality_check" },
                      { label: "Out for Delivery", icon: Truck, stage: "out_for_delivery" },
                      { label: "Delivered", icon: Package, stage: "delivered" },
                    ].map((step, idx) => {
                      const stages = [
                        "placed",
                        "fabrication",
                        "quality_check",
                        "out_for_delivery",
                        "delivered",
                      ];
                      const currentIdx = stages.indexOf(currentOrder.status);
                      const isComplete = currentIdx >= idx;
                      const isActive = currentIdx === idx;
                      const Icon = step.icon;

                      return (
                        <div key={step.label} className="flex flex-col items-center">
                          <div
                            className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 transition-all ${
                              isComplete
                                ? "border-primary bg-primary text-primary-foreground shadow-md"
                                : "border-border bg-card text-muted-foreground"
                            } ${isActive ? "ring-4 ring-primary/20 scale-110" : ""}`}
                          >
                            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                          </div>
                          <span
                            className={`mt-2 text-[10px] sm:text-xs font-bold text-center max-w-[70px] sm:max-w-[100px] leading-tight ${
                              isComplete ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Tracking Timeline Log Details */}
              <div className="mt-4 pt-6 border-t border-border space-y-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                  Fabrication &amp; Dispatch Timeline Activity
                </h3>

                <div className="space-y-4">
                  {currentOrder.events.map((evt, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs">
                      <div
                        className={`h-2.5 w-2.5 rounded-full mt-1 shrink-0 ${
                          evt.active
                            ? "bg-primary ring-4 ring-primary/20 animate-pulse"
                            : evt.completed
                              ? "bg-success"
                              : "bg-muted-foreground/30"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className="font-bold text-foreground">{evt.title}</h4>
                          <span className="text-[11px] text-muted-foreground font-mono">
                            {evt.timestamp}
                          </span>
                        </div>
                        <p className="text-muted-foreground mt-0.5 leading-relaxed">
                          {evt.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Two-Column: Ordered Items & Lab Contact */}
            <div className="grid gap-6 md:grid-cols-12">
              {/* Ordered Items (7 cols) */}
              <div className="md:col-span-7 rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                  Ordered Components ({currentOrder.items.length})
                </h3>

                <div className="space-y-3 divide-y divide-border/60">
                  {currentOrder.items.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-xl border border-border object-cover bg-surface shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-foreground truncate">{item.name}</h4>
                        <p className="text-[10px] text-muted-foreground font-mono mt-0.5 truncate">
                          {item.specs}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-black text-price">{inr(item.price)}</span>
                          <span className="text-[10px] text-muted-foreground">
                            × {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-border flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-semibold">Subtotal</span>
                  <span className="font-black text-foreground">{inr(calculateSubtotal())}</span>
                </div>
              </div>

              {/* Delivery Details & Lab Support (5 cols) */}
              <div className="md:col-span-5 rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Destination &amp; Pickup Desk
                  </h3>

                  <div className="flex items-start gap-2.5 text-xs">
                    <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-foreground">{currentOrder.customerName}</p>
                      <p className="text-muted-foreground mt-0.5 leading-relaxed">
                        {currentOrder.address}
                      </p>
                      <p className="text-muted-foreground mt-0.5">{currentOrder.phone}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-muted/20 border border-border text-[11px] text-muted-foreground space-y-1">
                    <p className="font-bold text-foreground flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" /> AICTE IDEA Lab Desk
                    </p>
                    <p>
                      Room 304, Innovation Block. Operational Mon-Sat: 09:00 AM – 06:00 PM for
                      physical component inspection.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <Button
                    variant="outline"
                    onClick={() => toast.success("Invoice PDF generated and downloaded!")}
                    className="w-full text-xs font-bold py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Download className="h-3.5 w-3.5" /> Download Fabrication Invoice
                  </Button>
                  <Link
                    to="/contact"
                    className="w-full text-center py-2 text-xs font-bold text-primary hover:underline"
                  >
                    Contact Lab Instructor / Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

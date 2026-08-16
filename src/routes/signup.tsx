import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/signup")({
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("ECE");
  const [makerRole, setMakerRole] = useState<"student" | "researcher" | "faculty" | "startup">(
    "student",
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !studentId.trim() || !email.trim() || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please re-check.");
      return;
    }

    if (!agreed) {
      toast.error("Please agree to the AICTE IDEA Lab Safety Protocol.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(`Account created successfully for ${fullName}! Welcome to AICTE IDEA Lab.`);
      navigate({ to: "/login" });
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-surface/30 py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-xl">
        {/* Registration Card */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Join AICTE IDEA Lab
            </h1>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Register your maker profile to access 3D printers, laser cutters, CNC machines, and
              student component discounts.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Maker Role Chips */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Select Your Role
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "student", label: "Student Maker" },
                  { id: "researcher", label: "Researcher" },
                  { id: "faculty", label: "Faculty / Mentor" },
                  { id: "startup", label: "Incubatee" },
                ].map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setMakerRole(role.id as typeof makerRole)}
                    className={`py-2 px-2.5 rounded-xl border text-[11px] font-bold text-center transition-all cursor-pointer ${
                      makerRole === role.id
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border bg-surface/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Johnson"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background pl-9 pr-3 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Student ID / Roll No */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  College Roll No / Student ID *
                </label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1MS22EC042"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background pl-9 pr-3 py-2.5 text-xs font-mono font-bold uppercase focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Institutional Email */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Institutional / College Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex.j@engineering.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background pl-9 pr-3 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Department Selector */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Academic Department / Branch *
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background pl-9 pr-3 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none cursor-pointer"
                  >
                    <option value="ECE">Electronics &amp; Communication Engineering (ECE)</option>
                    <option value="MECH">Mechanical &amp; Mechatronics Engineering</option>
                    <option value="CSE">Computer Science &amp; Engineering (CSE)</option>
                    <option value="ROBOTICS">Robotics &amp; Automation</option>
                    <option value="AI_DS">Artificial Intelligence &amp; Data Science</option>
                    <option value="EEE">Electrical &amp; Electronics Engineering (EEE)</option>
                    <option value="AERO">Aeronautical &amp; Aerospace Engineering</option>
                    <option value="DESIGN">Product Design &amp; Applied Innovation</option>
                  </select>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background pl-9 pr-10 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background pl-9 pr-3 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Safety Protocol Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="accent-primary h-4 w-4 mt-0.5 rounded cursor-pointer shrink-0"
                />
                <span>
                  I agree to adhere to the{" "}
                  <span className="font-bold text-foreground underline">
                    AICTE IDEA Lab Safety Protocols
                  </span>{" "}
                  and Terms of Makerspace Machine Usage.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs sm:text-sm py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              {isSubmitting ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  Create Maker Account <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Login Link Footer */}
          <div className="text-center pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-primary hover:underline">
                Sign In to Lab Portal
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

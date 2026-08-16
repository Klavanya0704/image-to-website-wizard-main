import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("student.alex@innovation.edu");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Welcome back, Alex Johnson! Logged in as AICTE Verified Maker.");
      navigate({ to: "/" });
    }, 700);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-surface/30 py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Sign In to IDEA Lab
            </h1>
            <p className="text-xs text-muted-foreground">
              Access your saved designs, active fabrication jobs, and maker discounts.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                College / Institutional Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="student@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background pl-9 pr-3 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Password
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Password reset link sent to registered college email.");
                  }}
                  className="text-[11px] font-bold text-primary hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
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

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs sm:text-sm py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              {isSubmitting ? (
                <span>Verifying...</span>
              ) : (
                <>
                  Sign In <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Quick Demo Login Preset */}
          <div className="p-3.5 rounded-2xl bg-muted/20 border border-border text-center space-y-1">
            <p className="text-[11px] font-bold text-foreground flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Verified Student Preset
            </p>
            <p className="text-[10px] text-muted-foreground">
              Alex Johnson • ID: #IDEA-2026-BLR • 15% Student Discount Active
            </p>
          </div>

          <div className="text-center pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="font-bold text-primary hover:underline">
                Register as Maker
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UserPlus,
  Lock,
  Mail,
  User,
  Loader2,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type Step = "details" | "verify";

export default function CreateAccountPage() {
  const [step, setStep] = useState<Step>("details");

  // Step 1 fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 2 — OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [isSending, setIsSending] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const { register, state } = useAuth();
  const router = useRouter();

  // ── Step 1: validate + send OTP ──────────────────────────────────────────
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsSending(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to send code");
        return;
      }

      toast.success(`Code sent to ${email}`, {
        description: "Check your inbox — it expires in 10 minutes.",
      });
      setStep("verify");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  // ── Resend OTP ────────────────────────────────────────────────────────────
  const handleResend = async () => {
    setIsResending(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to resend code");
        return;
      }
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
      toast.success("New code sent!", { description: "Check your inbox." });
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  // ── OTP input handling ────────────────────────────────────────────────────
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // digits only
    const next = [...otp];
    next[index] = value.slice(-1); // one digit per box
    setOtp(next);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      otpRefs.current[5]?.focus();
    }
  };

  // ── Step 2: verify OTP + register ─────────────────────────────────────────
  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = otp.join("");
    if (code.length < 6) {
      toast.error("Please enter the full 6-digit code");
      return;
    }

    // Verify OTP first
    try {
      const verifyRes = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });
      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        toast.error(verifyData.error || "Invalid code");
        return;
      }
    } catch {
      toast.error("Network error. Please try again.");
      return;
    }

    // OTP verified — now register
    const result = await register(email, password, firstName, lastName);
    if (result.success) {
      toast.success(`Welcome to +234WKND, ${firstName}! 🎉`, {
        description: "Your account has been created successfully.",
        duration: 5000,
      });
      router.push("/");
    } else {
      toast.error(result.error || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          {/* ── STEP 1: Account Details ── */}
          {step === "details" && (
            <>
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF6542]/20 rounded-full mb-6">
                  <UserPlus className="w-8 h-8 text-[#FF6542]" />
                </div>
                <h1 className="text-4xl font-black text-[#FF6542] uppercase tracking-tighter mb-3">
                  Create Account
                </h1>
                <p className="text-base text-[#EFD6AC]/70 uppercase tracking-wide">
                  Join the +234WKND community
                </p>
              </div>

              <div className="relative bg-black/90 backdrop-blur-xl border border-[#FF6542]/20 rounded-3xl p-8 shadow-2xl">
                <div className="absolute top-0 left-0 w-20 h-20 bg-[#FF6542]/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#EFD6AC]/5 rounded-full blur-xl translate-x-1/2 translate-y-1/2" />

                <form
                  onSubmit={handleSendOTP}
                  className="relative z-10 space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="firstName"
                        className="text-[#EFD6AC] font-semibold flex items-center gap-2"
                      >
                        <User className="w-4 h-4" /> First Name
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/50 focus:border-[#FF6542] h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="lastName"
                        className="text-[#EFD6AC] font-semibold"
                      >
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/50 focus:border-[#FF6542] h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-[#EFD6AC] font-semibold flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" /> Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/50 focus:border-[#FF6542] h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-[#EFD6AC] font-semibold flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4" /> Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/50 focus:border-[#FF6542] h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-[#EFD6AC] font-semibold flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4" /> Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/50 focus:border-[#FF6542] h-12 rounded-xl"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-[#FF6542] text-white font-black hover:bg-[#FF6542]/90 h-12 rounded-xl text-base uppercase tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#FF6542]/25"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Code...
                      </>
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-[#FF6542]/20">
                  <p className="text-center text-sm text-[#EFD6AC]/60">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-[#FF6542] hover:text-[#FF6542]/80 font-semibold transition-colors"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ── STEP 2: Verify Email ── */}
          {step === "verify" && (
            <>
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF6542]/20 rounded-full mb-6">
                  <ShieldCheck className="w-8 h-8 text-[#FF6542]" />
                </div>
                <h1 className="text-4xl font-black text-[#FF6542] uppercase tracking-tighter mb-3">
                  Verify Email
                </h1>
                <p className="text-sm text-[#EFD6AC]/70 leading-relaxed">
                  We sent a 6-digit code to
                  <br />
                  <span className="text-[#FF6542] font-semibold">{email}</span>
                </p>
              </div>

              <div className="relative bg-black/90 backdrop-blur-xl border border-[#FF6542]/20 rounded-3xl p-8 shadow-2xl">
                <div className="absolute top-0 left-0 w-20 h-20 bg-[#FF6542]/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#EFD6AC]/5 rounded-full blur-xl translate-x-1/2 translate-y-1/2" />

                <form
                  onSubmit={handleVerifyAndRegister}
                  className="relative z-10 space-y-8"
                >
                  {/* OTP Boxes */}
                  <div className="space-y-3">
                    <Label className="text-[#EFD6AC] font-semibold text-center block">
                      Enter your code
                    </Label>
                    <div
                      className="flex justify-center gap-3"
                      onPaste={handleOtpPaste}
                    >
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          ref={(el) => {
                            otpRefs.current[i] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          className="w-12 h-14 text-center text-2xl font-black bg-black/50 border-2 border-[#FF6542]/20 text-[#EFD6AC] rounded-xl focus:border-[#FF6542] focus:outline-none focus:ring-0 transition-colors"
                        />
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={state.isLoading || otp.join("").length < 6}
                    className="w-full bg-[#FF6542] text-white font-black hover:bg-[#FF6542]/90 h-12 rounded-xl text-base uppercase tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#FF6542]/25 disabled:opacity-40"
                  >
                    {state.isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Verify & Create Account"
                    )}
                  </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-[#FF6542]/20 space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-center text-sm text-[#EFD6AC]/60">
                      Didn't receive the code?
                    </p>
                    <button
                      onClick={handleResend}
                      disabled={isResending}
                      className="flex items-center gap-1 text-sm text-[#FF6542] hover:text-[#FF6542]/80 font-semibold transition-colors disabled:opacity-50"
                    >
                      {isResending ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <RotateCcw className="w-3 h-3" />
                      )}
                      Resend
                    </button>
                  </div>
                  <p className="text-center">
                    <button
                      onClick={() => setStep("details")}
                      className="text-sm text-[#EFD6AC]/40 hover:text-[#EFD6AC]/70 transition-colors"
                    >
                      ← Back to details
                    </button>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

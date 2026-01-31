"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock, Mail, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, state } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      router.push("/");
    } else {
      setError(result.error || "Login failed");
    }
  };
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF6542]/20 rounded-full mb-6">
              <User className="w-8 h-8 text-[#FF6542]" />
            </div>
            <h1 className="text-4xl font-black text-[#FF6542] uppercase tracking-tighter mb-3">
              Welcome Back
            </h1>
            <p className="text-base text-[#EFD6AC]/70 uppercase tracking-wide">
              Sign in to your account
            </p>
          </div>

          {/* Form Card */}
          <div className="relative bg-black/90 backdrop-blur-xl border border-[#FF6542]/20 rounded-3xl p-8 shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-[#FF6542]/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#EFD6AC]/5 rounded-full blur-xl translate-x-1/2 translate-y-1/2" />

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-[#EFD6AC] font-semibold flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/50 focus:border-[#FF6542] focus:ring-[#FF6542]/20 h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-[#EFD6AC] font-semibold flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/50 focus:border-[#FF6542] focus:ring-[#FF6542]/20 h-12 rounded-xl"
                />
              </div>
              <Button
                type="submit"
                disabled={state.isLoading}
                className="w-full bg-[#FF6542] text-white font-black hover:bg-[#FF6542]/90 h-12 rounded-xl text-base uppercase tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#FF6542]/25"
              >
                {state.isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#FF6542]/20">
              <p className="text-center text-sm text-[#EFD6AC]/60">
                Don't have an account?{" "}
                <Link
                  href="/create-account"
                  className="text-[#FF6542] hover:text-[#FF6542]/80 font-semibold transition-colors"
                >
                  Create one here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

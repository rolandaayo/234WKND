import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Lock, Mail, User } from "lucide-react";
import Link from "next/link";

export default function CreateAccountPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-slate-900/20">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black/10 rounded-full mb-6">
              <UserPlus className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-3">
              Create Account
            </h1>
            <p className="text-base text-white/70 uppercase tracking-wide">
              Join the 234WKND community
            </p>
          </div>

          {/* Form Card */}
          <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-white/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-xl translate-x-1/2 translate-y-1/2" />

            <form className="relative z-10 space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-white font-semibold flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-black focus:ring-black/20 h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-white font-semibold flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-black focus:ring-black/20 h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-white font-semibold flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-black focus:ring-black/20 h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-white font-semibold flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-black focus:ring-black/20 h-12 rounded-xl"
                />
              </div>
              <Button className="w-full bg-white text-black font-black hover:bg-white/90 h-12 rounded-xl text-base uppercase tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/25">
                Create Account
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-center text-sm text-white/60">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-black hover:text-black/80 font-semibold transition-colors"
                >
                  Sign in here
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

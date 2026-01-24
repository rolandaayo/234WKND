"use client";

import { useState } from "react";
import { Send, Star, Clock, MapPin, Gift, Instagram, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function VIPPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const benefits = [
    {
      icon: Clock,
      title: "Early Access",
      description: "Get tickets 48 hours before public release",
    },
    {
      icon: MapPin,
      title: "Secret Locations",
      description: "Exclusive access to hidden venue announcements",
    },
    {
      icon: Gift,
      title: "VIP Perks",
      description: "Special discounts and surprise guest appearances",
    },
    {
      icon: Star,
      title: "Priority Entry",
      description: "Skip the lines with VIP fast-track access",
    },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="h-10 w-10 text-black" />
            </div>
            <h1 className="text-3xl font-black text-white mb-4">
              WELCOME TO THE VIP LIST! 🎉
            </h1>
            <p className="text-muted-foreground mb-6">
              You're now part of our exclusive community. Check your email for a
              special welcome gift!
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 blur-[100px] rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Party Visuals */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div
          className="absolute top-10 left-10 text-6xl animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          🎉
        </div>
        <div
          className="absolute top-20 right-20 text-4xl animate-bounce"
          style={{ animationDelay: "1.5s" }}
        >
          ✨
        </div>
        <div
          className="absolute bottom-20 left-20 text-5xl animate-bounce"
          style={{ animationDelay: "2.5s" }}
        >
          🎵
        </div>
        <div
          className="absolute bottom-10 right-10 text-4xl animate-bounce"
          style={{ animationDelay: "3s" }}
        >
          🔥
        </div>
        <div
          className="absolute top-1/2 left-10 text-3xl animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          💫
        </div>
        <div
          className="absolute top-1/3 right-10 text-5xl animate-bounce"
          style={{ animationDelay: "2s" }}
        >
          🎊
        </div>
      </div>

      <main className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <Link href="/" className="inline-block mb-8">
              <span className="text-2xl font-bold text-white">234WKND</span>
            </Link>

            {/* Hero Content */}
            <div className="mb-12">
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-none">
                JOIN THE
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent italic">
                  VIP LIST
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/80 mb-4 max-w-2xl mx-auto leading-relaxed">
                Be the first to know about exclusive events, secret locations,
                and get early access to the hottest parties in the city.
              </p>

              <p className="text-primary font-bold uppercase tracking-widest text-sm">
                Limited spots available • Join 2,847 VIPs
              </p>
            </div>

            {/* Email Signup */}
            <div className="mb-16">
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-transparent border-none text-white placeholder:text-white/60 focus:ring-0 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !email.trim()}
                    className="px-8 py-3 bg-primary text-black font-bold rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    {isSubmitting ? (
                      "Joining..."
                    ) : (
                      <>
                        Join VIP List
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-white/60 mt-3 text-center">
                  No spam, just exclusive party invites. Unsubscribe anytime.
                </p>
              </form>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-primary/30 hover:bg-white/10 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Logo */}
              <Link href="/" className="text-xl font-bold text-white">
                234WKND
              </Link>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="text-white/60 text-sm">
                  Follow for updates:
                </span>
                <a
                  href="https://instagram.com/234wknd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:border-primary hover:bg-primary hover:text-black"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="mailto:234wknd@gmail.com"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:border-primary hover:bg-primary hover:text-black"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>

              {/* Copyright */}
              <p className="text-white/60 text-sm">
                © 2026 234WKND. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

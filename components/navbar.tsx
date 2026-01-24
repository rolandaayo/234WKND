"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Experience" },
    { href: "/tickets", label: "Tickets" },
    { href: "/merch", label: "Shop" },
    { href: "/about", label: "Our Story" },
    { href: "/contact", label: "Support" },
    { href: "/vip", label: "Join VIP" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4",
        scrolled ? "py-3" : "py-6",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex h-14 max-w-7xl items-center justify-between px-6 rounded-full border transition-all duration-500",
          scrolled
            ? "bg-background/60 backdrop-blur-xl border-white/10 shadow-2xl"
            : "bg-transparent border-transparent",
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-xl font-bold tracking-widest text-white">
            234WKND
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button
            asChild
            variant="secondary"
            className="rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all duration-500 px-6"
          >
            <Link href="/tickets">Explore Events</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 backdrop-blur-sm border border-white/10 md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5 text-foreground" />
        </button>
      </nav>

      <div
        className={cn(
          "fixed inset-0 z-60 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-[85%] max-w-sm bg-background border-l border-border transition-transform duration-500 ease-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <span className="text-lg font-semibold">234WKND</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-4">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center px-6 py-4 text-foreground hover:bg-muted transition-all duration-300 delay-[calc(var(--index)*50ms)]",
                  isMobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0",
                )}
                style={{ "--index": i } as any}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="absolute bottom-6 left-6 right-6">
            <Button asChild className="w-full">
              <Link href="/tickets" onClick={() => setIsMobileMenuOpen(false)}>
                Get Tickets
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

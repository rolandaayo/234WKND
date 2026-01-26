"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, User, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Experience" },
    { href: "/tickets", label: "Tickets" },
    { href: "/merch", label: "Shop" },
    { href: "/about", label: "Our Story" },
    { href: "/contact", label: "Support" },
    { href: "/vip", label: "Join VIP" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      )}
    >
      <nav
        className={cn(
          "flex h-18 items-center justify-between bg-background border-b border-border shadow-lg transition-all duration-500",
        )}
      >
        {/* Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/50 backdrop-blur-sm border border-white/10 hover:bg-black hover:text-white transition-all duration-500"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5 text-foreground" />
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group absolute left-1/2 transform -translate-x-1/2"
        >
          <span
            className="text-xl font-bold tracking-widest text-white"
            style={{ fontFamily: "Ch" }}
          >
            234WKND
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-sm text-muted-foreground">
            NGN ₦ | Nigeria
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg bg-secondary/50 backdrop-blur-sm border border-white/10 hover:bg-black hover:text-white transition-all duration-500"
            onClick={() => setIsAuthModalOpen(true)}
          >
            <User className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg bg-secondary/50 backdrop-blur-sm border border-white/10 hover:bg-black hover:text-white transition-all duration-500"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-0 z-60 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-1/4 min-w-[280px] max-w-sm bg-background border-r border-border transition-transform duration-500 ease-out",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
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
            <div className="border-t border-border mt-4 pt-4">
              <Link
                href="/login"
                className={cn(
                  "flex items-center px-6 py-4 text-foreground hover:bg-muted transition-all duration-300 delay-[calc(var(--index)*50ms)]",
                  isMobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0",
                )}
                style={{ "--index": navLinks.length } as any}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="font-medium">Login</span>
              </Link>
              <Link
                href="/create-account"
                className={cn(
                  "flex items-center px-6 py-4 text-foreground hover:bg-muted transition-all duration-300 delay-[calc(var(--index)*50ms)]",
                  isMobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0",
                )}
                style={{ "--index": navLinks.length + 1 } as any}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="font-medium">Create Account</span>
              </Link>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="absolute bottom-6 left-6 right-6">
            <Button
              asChild
              className="w-full bg-white text-black hover:bg-white/90"
            >
              <Link href="/tickets" onClick={() => setIsMobileMenuOpen(false)}>
                Get Tickets
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="absolute right-4 top-20 w-96 max-w-[90vw] bg-white border border-gray-200 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-black">Your Cart</h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="p-6">
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">
                  Your cart is empty
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Add some items to get started
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-black">
                  Total: $0.00
                </span>
              </div>
              <Button
                className="w-full bg-black text-white hover:bg-gray-800 rounded-xl h-12 font-semibold"
                disabled
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsAuthModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-black mb-2">
                Welcome to 234WKND
              </h2>
              <p className="text-gray-600">Choose how you'd like to continue</p>
            </div>
            <div className="space-y-4">
              <Button
                asChild
                className="w-full bg-black text-white hover:bg-gray-800 rounded-xl h-12 font-semibold"
              >
                <Link href="/login" onClick={() => setIsAuthModalOpen(false)}>
                  Login to Your Account
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-2 border-black text-black hover:bg-black hover:text-white rounded-xl h-12 font-semibold"
              >
                <Link
                  href="/create-account"
                  onClick={() => setIsAuthModalOpen(false)}
                >
                  Create New Account
                </Link>
              </Button>
            </div>
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

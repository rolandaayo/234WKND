"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ArrowRight,
  User,
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/cart-context";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { state, updateQuantity, deleteItem, restoreItem, clearCart } =
    useCart();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tickets", label: "Tickets" },
    { href: "/merch", label: "Merch" },
    // { href: "/about", label: "Our Story" },
    { href: "/contact", label: "Support" },
    // { href: "/vip", label: "Join VIP" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      )}
    >
      <nav
        className={cn(
          "flex h-22 items-center px-4 justify-between bg-black border-b border-[#FF6542]/20 shadow-lg transition-all duration-500",
        )}
      >
        {/* Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF6542]/20 backdrop-blur-sm border border-[#FF6542]/30 hover:bg-[#FF6542] hover:text-white transition-all duration-500"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5 text-[#EFD6AC]" />
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group absolute left-1/2 transform -translate-x-1/2"
        >
          <span
            className="text-xl font-bold tracking-widest text-[#FF6542]"
            style={{ fontFamily: "Ch" }}
          >
            +234WKND
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-sm text-[#EFD6AC]/60">
            NGN ₦ | Nigeria
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg bg-[#FF6542]/20 backdrop-blur-sm border border-[#FF6542]/30 hover:bg-[#FF6542] hover:text-white transition-all duration-500"
            onClick={() => setIsAuthModalOpen(true)}
          >
            <User className="h-5 text-[#EFD6AC] w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg bg-[#FF6542]/20 backdrop-blur-sm border border-[#FF6542]/30 hover:bg-[#FF6542] hover:text-white transition-all duration-500 relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-5 text-[#EFD6AC] w-5" />
            {state.itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF6542] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {state.itemCount}
              </span>
            )}
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
            "absolute left-0 top-0 h-full w-1/4 min-w-[280px] max-w-sm bg-black border-r border-[#FF6542]/20 transition-transform duration-500 ease-out",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#FF6542]/20">
            <span
              className="text-lg text-[#FF6542] font-semibold"
              style={{ fontFamily: "Ch" }}
            >
              +234WKND
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-[#FF6542]/20 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-[#EFD6AC]" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-4">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center px-6 py-4 text-[#EFD6AC] hover:bg-[#FF6542]/20 transition-all duration-300 delay-[calc(var(--index)*50ms)]",
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
            <div className="border-t border-[#FF6542]/20 mt-4 pt-4">
              <Link
                href="/login"
                className={cn(
                  "flex items-center px-6 py-4 text-[#EFD6AC] hover:bg-[#FF6542]/20 transition-all duration-300 delay-[calc(var(--index)*50ms)]",
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
                  "flex items-center px-6 py-4 text-[#EFD6AC] hover:bg-[#FF6542]/20 transition-all duration-300 delay-[calc(var(--index)*50ms)]",
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
              className="w-full bg-[#FF6542] text-white hover:bg-[#FF6542]/80"
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
            className="absolute right-4 top-20 w-96 max-w-[90vw] bg-black border border-[#FF6542]/30 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#FF6542]/20">
              <h3 className="text-lg font-semibold text-[#FF6542]">
                Your Cart
              </h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-[#FF6542]/20 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-[#EFD6AC]" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="p-6">
              {state.items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="h-16 w-16 text-[#EFD6AC]/30 mx-auto mb-4" />
                  <p className="text-[#EFD6AC] text-lg font-medium">
                    Your cart is empty
                  </p>
                  <p className="text-[#EFD6AC]/60 text-sm mt-2">
                    Add some items to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {state.items.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-lg border transition-all",
                        item.deleted
                          ? "border-red-500/20 bg-red-500/5 opacity-50"
                          : "border-[#FF6542]/20 bg-[#FF6542]/5",
                      )}
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h4
                          className={cn(
                            "font-semibold text-sm",
                            item.deleted
                              ? "text-red-400 line-through"
                              : "text-[#EFD6AC]",
                          )}
                        >
                          {item.title}
                        </h4>
                        {item.date && (
                          <p className="text-xs text-[#EFD6AC]/60">
                            {item.date}
                          </p>
                        )}
                        <p
                          className={cn(
                            "text-sm font-bold",
                            item.deleted ? "text-red-400" : "text-[#FF6542]",
                          )}
                        >
                          ₦{item.price.toLocaleString()}
                        </p>
                      </div>

                      {!item.deleted ? (
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-6 h-6 rounded-full bg-[#FF6542]/20 hover:bg-[#FF6542]/40 text-[#EFD6AC] flex items-center justify-center text-sm"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-[#EFD6AC] font-bold text-sm w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-6 h-6 rounded-full bg-[#FF6542]/20 hover:bg-[#FF6542]/40 text-[#EFD6AC] flex items-center justify-center text-sm"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="w-6 h-6 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 flex items-center justify-center"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => restoreItem(item.id)}
                          className="w-8 h-8 rounded-full bg-green-500/20 hover:bg-green-500/40 text-green-400 flex items-center justify-center"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-[#FF6542]/20 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-[#FF6542]">
                  Total: ₦{state.total.toLocaleString()}
                </span>
                {state.items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-red-400 hover:text-red-300 underline"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
              <Button
                className="w-full bg-[#FF6542] text-white hover:bg-[#FF6542]/80 rounded-xl h-12 font-semibold"
                disabled={state.itemCount === 0}
              >
                Checkout ({state.itemCount} items)
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
          <div className="relative bg-black border border-[#FF6542]/30 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center mb-6">
              <h2
                className="text-2xl font-bold text-[#FF6542] mb-2"
                style={{ fontFamily: "Ch" }}
              >
                Welcome to +234WKND
              </h2>
              <p className="text-[#EFD6AC]/60">
                Choose how you'd like to continue
              </p>
            </div>
            <div className="space-y-4">
              <Button
                asChild
                className="w-full bg-[#FF6542]/20 text-[#EFD6AC] hover:bg-[#FF6542]/30 rounded-xl h-12 font-semibold"
              >
                <Link href="/login" onClick={() => setIsAuthModalOpen(false)}>
                  Login to Your Account
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-2 border-[#FF6542] text-[#FF6542] hover:bg-[#FF6542]/10 hover:text-[#FF6542] rounded-xl h-12 font-semibold"
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
              className="absolute top-4 right-4 text-[#EFD6AC]/60 hover:text-[#EFD6AC]"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

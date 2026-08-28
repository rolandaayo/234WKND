"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  Loader2,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";

export default function CartPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    fullName: "",
    phone: "",
  });
  const { state, updateQuantity, deleteItem, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!customerInfo.email || !customerInfo.fullName || !customerInfo.phone) {
      alert("Please fill in all customer information");
      return;
    }

    if (state.items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

      // Calculate total amount (assuming first item is the event)
      const eventId = state.items[0].id;
      const amount = state.total;

      const response = await fetch(
        `${API_BASE_URL}/api/payments/create-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: customerInfo.email,
            fullName: customerInfo.fullName,
            phone: customerInfo.phone,
            eventId,
            quantity: state.items[0].quantity,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        // Redirect to Paystack payment page
        window.location.href = data.authorization_url;
      } else {
        alert(data.error || "Failed to create payment");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to process payment");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-[#FF6542] uppercase tracking-tighter mb-2">
              Shopping Cart
            </h1>
            <p className="text-sm text-[#EFD6AC]/70 uppercase tracking-wide">
              Review your items and checkout
            </p>
          </div>

          {state.items.length === 0 ? (
            <div className="bg-black/50 border border-[#FF6542]/20 rounded-2xl p-12 text-center">
              <ShoppingCart className="h-16 w-16 text-[#EFD6AC]/30 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-[#EFD6AC] mb-2">
                Your cart is empty
              </h2>
              <p className="text-sm text-[#EFD6AC]/70 mb-6">
                Start adding items to your cart
              </p>
              <Button
                asChild
                className="bg-[#FF6542] text-white font-black hover:bg-[#FF6542]/90"
              >
                <Link href="/tickets">Browse Events</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {state.items.map((item) => (
                  <div
                    key={`${item.id}-${Math.random()}`}
                    className="bg-black/50 border border-[#FF6542]/20 rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-4">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-[#EFD6AC] mb-1">
                          {item.title}
                        </h3>
                        {item.date && (
                          <p className="text-sm text-[#EFD6AC]/60">
                            {item.date}
                          </p>
                        )}
                        {item.location && (
                          <p className="text-sm text-[#EFD6AC]/60">
                            {item.location}
                          </p>
                        )}
                        <p className="text-lg font-bold text-[#FF6542] mt-2">
                          ₦{item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-full bg-[#FF6542]/20 hover:bg-[#FF6542]/40 text-[#EFD6AC] flex items-center justify-center text-sm"
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
                            className="w-8 h-8 rounded-full bg-[#FF6542]/20 hover:bg-[#FF6542]/40 text-[#EFD6AC] flex items-center justify-center text-sm"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="w-8 h-8 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 flex items-center justify-center"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout Section */}
              <div className="space-y-6">
                {/* Customer Information */}
                <div className="bg-black/50 border border-[#FF6542]/20 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-[#EFD6AC] mb-4">
                    Customer Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-[#EFD6AC]">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/50"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fullName" className="text-[#EFD6AC]">
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        value={customerInfo.fullName}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }))
                        }
                        className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/50"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-[#EFD6AC]">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/50"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-black/50 border border-[#FF6542]/20 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-[#EFD6AC] mb-4">
                    Order Summary
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#EFD6AC]/70">
                        Subtotal ({state.itemCount} items)
                      </span>
                      <span className="text-[#EFD6AC]">
                        ₦{state.total.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#EFD6AC]/70">Service Fee</span>
                      <span className="text-[#EFD6AC]">₦500</span>
                    </div>
                    <div className="border-t border-[#FF6542]/20 pt-2 flex justify-between font-bold">
                      <span className="text-[#EFD6AC]">Total</span>
                      <span className="text-[#FF6542]">
                        ₦{(state.total + 500).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    disabled={isProcessing || state.itemCount === 0}
                    className="w-full bg-[#FF6542] text-white font-black hover:bg-[#FF6542]/90 h-12 rounded-xl"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Checkout (₦{(state.total + 500).toLocaleString()})
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

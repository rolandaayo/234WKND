"use client";

import type React from "react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  Ticket,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function CheckoutPage() {
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock event data - in a real app this would come from the API/database
  const event = {
    id: 1,
    title: "HEAT WAVE (Seasoned with SALT)",
    location: "Eti Osa, Lagos",
    date: "Dec 27, 2025 8:00 PM GMT+1",
    price: 10000,
    currency: "NGN",
    image: "/images/screenshot-202026-01-01-20at-209.png",
  };

  const subtotal = event.price * quantity;
  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const purchaser = {
      firstName: (formData.get("firstName") as string) || "",
      lastName: (formData.get("lastName") as string) || "",
      email: (formData.get("email") as string) || "",
      phone: (formData.get("phone") as string) || "",
    };

    setIsProcessing(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/payments/create-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: purchaser.email,
            fullName: `${purchaser.firstName} ${purchaser.lastName}`.trim(),
            phone: purchaser.phone,
            eventId: String(event.id),
            quantity,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok || !data.authorization_url) {
        throw new Error(data.error || "Failed to initialize payment");
      }
      window.location.href = data.authorization_url;
    } catch (err) {
      console.error("Checkout error:", err);
      alert(err instanceof Error ? err.message : "Failed to process payment");
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-background">
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                Checkout
              </h1>
              <p className="mt-2 text-muted-foreground">
                Complete your ticket purchase
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Checkout Form - Left Column */}
              <div className="space-y-6 lg:col-span-2">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Your Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            name="firstName"
                            required
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            name="lastName"
                            required
                            className="bg-background"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john.doe@example.com"
                          name="email"
                          required
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+234 800 000 0000"
                          name="phone"
                          required
                          className="bg-background"
                        />
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">
                          Ticket Quantity
                        </h3>
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(-1)}
                            disabled={quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center text-xl font-bold text-foreground">
                            {quantity}
                          </span>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(1)}
                            disabled={quantity >= 10}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <span className="text-sm text-muted-foreground">
                            (Max 10 per order)
                          </span>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">
                          Payment Information
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          You will complete payment securely on Paystack.
                        </p>

                        <div className="space-y-2">
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            name="cardName"
                            required
                            className="bg-background"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            name="cardNumber"
                            required
                            className="bg-background"
                          />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              name="expiry"
                              required
                              className="bg-background"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              name="cvv"
                              required
                              className="bg-background"
                            />
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isProcessing}
                        size="lg"
                        className="w-full bg-primary text-lg text-primary-foreground hover:bg-primary/90"
                      >
                        {isProcessing ? "Redirecting to Paystack..." : `Complete Purchase - ${event.currency} `}
                        {total.toLocaleString()}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary - Right Column */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20 bg-card">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="relative h-48 overflow-hidden rounded-lg">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground">
                          {event.title}
                        </h3>
                        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Ticket className="h-4 w-4" />
                            <span>
                              {quantity} Ticket{quantity > 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium text-foreground">
                          {event.currency} {subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Service Fee (5%)
                        </span>
                        <span className="font-medium text-foreground">
                          {event.currency} {serviceFee.toLocaleString()}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="font-semibold text-foreground">
                          Total
                        </span>
                        <span className="text-xl font-bold text-foreground">
                          {event.currency} {total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-lg bg-primary/10 p-4 text-sm text-muted-foreground">
                      <p className="font-medium text-foreground">
                        Secure Checkout
                      </p>
                      <p className="mt-1">
                        Your payment information is encrypted and secure.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

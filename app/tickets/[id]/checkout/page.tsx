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
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const purchaser = {
      firstName: (formData.get("firstName") as string) || "",
      lastName: (formData.get("lastName") as string) || "",
      email: (formData.get("email") as string) || "",
      phone: (formData.get("phone") as string) || "",
    };

    // Simple client-side order creation and persistence (mock)
    const orderId = `ORD_${Date.now().toString(36)}`;
    const order = {
      id: orderId,
      event: {
        id: event.id,
        title: event.title,
        image: event.image,
        location: event.location,
        date: event.date,
        price: event.price,
        currency: event.currency,
      },
      purchaser,
      quantity,
      subtotal,
      serviceFee,
      total,
      createdAt: new Date().toISOString(),
    };

    try {
      const raw = localStorage.getItem("orders");
      const orders = raw ? JSON.parse(raw) : [];
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));
      // Navigate to a success page with the order id
      router.push(`/tickets/${event.id}/checkout/success?orderId=${orderId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to save order locally. Please try again.");
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
                            required
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            placeholder="Doe"
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
                          Payment processing would be handled securely through a
                          payment gateway in the backend implementation.
                        </p>

                        <div className="space-y-2">
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            required
                            className="bg-background"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
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
                              required
                              className="bg-background"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              required
                              className="bg-background"
                            />
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-primary text-lg text-primary-foreground hover:bg-primary/90"
                      >
                        Complete Purchase - {event.currency}{" "}
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

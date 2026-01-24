"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  ArrowLeft,
  Mail,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export async function generateStaticParams() {
  return [{ id: "1" }];
}

// Mock event data - replace with actual data fetching
const eventData = {
  id: "1",
  title: "A Weekend Experience",
  description:
    "Join us for an unforgettable weekend filled with music, culture, and exclusive experiences. This premium event brings together the best of Lagos nightlife with world-class entertainment.",
  location: "Amore Garden, Lagos",
  fullAddress: "123 Victoria Island, Lagos, Nigeria",
  date: "April 5, 2026",
  time: "8:00 PM GMT+1",
  price: 10000,
  currency: "NGN",
  image: "/placeholder.jpg",
  capacity: 500,
  sold: 342,
  category: "VIP Experience",
  features: [
    "Premium open bar",
    "Exclusive VIP lounge access",
    "Meet & greet with artists",
    "Professional photography",
    "Complimentary dinner",
    "Private parking",
  ],
  organizer: "234WKND Events",
  tags: ["Music", "Culture", "VIP", "Exclusive"],
};

export default function TicketDetailPage() {
  const params = useParams();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Details, 2: Info, 3: Payment

  const handleProceedToPayment = async () => {
    if (!email || !fullName || !phone) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      // Call server API instead of client API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001"}/api/payments/create-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            fullName,
            phone,
            eventId: params.id,
            amount: eventData.price,
          }),
        },
      );

      const data = await response.json();

      if (data.authorization_url) {
        // Redirect to Paystack payment page
        window.location.href = data.authorization_url;
      }
    } catch (error) {
      console.error("Payment initialization failed:", error);
      alert("Failed to initialize payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const spotsLeft = eventData.capacity - eventData.sold;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/tickets">
                <ArrowLeft className="h-4 w-4" />
                Back to Events
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Event Details */}
            <div className="space-y-6">
              {/* Event Image */}
              <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-muted-foreground">Event Image</span>
                </div>
              </div>

              {/* Event Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{eventData.category}</Badge>
                  <Badge
                    variant="outline"
                    className="text-orange-600 border-orange-600"
                  >
                    {spotsLeft} spots left
                  </Badge>
                </div>

                <h1 className="text-3xl font-bold">{eventData.title}</h1>

                <p className="text-muted-foreground leading-relaxed">
                  {eventData.description}
                </p>

                {/* Event Details Grid */}
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{eventData.date}</p>
                      <p className="text-sm text-muted-foreground">Date</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{eventData.time}</p>
                      <p className="text-sm text-muted-foreground">Time</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{eventData.location}</p>
                      <p className="text-sm text-muted-foreground">
                        {eventData.fullAddress}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">
                        {eventData.sold}/{eventData.capacity}
                      </p>
                      <p className="text-sm text-muted-foreground">Attendees</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Features */}
                <div>
                  <h3 className="font-semibold mb-3">What's Included</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {eventData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {eventData.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:sticky lg:top-24 h-fit">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Book Your Spot</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        {eventData.currency} {eventData.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        per person
                      </div>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Secure your exclusive access to this premium experience
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="text-center py-8">
                        <h3 className="text-lg font-semibold mb-2">
                          Ready to Join?
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Click below to proceed with your booking
                        </p>
                        <Button
                          onClick={() => setStep(2)}
                          className="w-full"
                          size="lg"
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Your ticket QR code will be sent to this email
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+234 xxx xxx xxxx"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Ticket Price</span>
                          <span>
                            {eventData.currency}{" "}
                            {eventData.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Service Fee</span>
                          <span>{eventData.currency} 500</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>
                            {eventData.currency}{" "}
                            {(eventData.price + 500).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setStep(1)}
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={handleProceedToPayment}
                          disabled={isLoading}
                          className="flex-1 gap-2"
                        >
                          <CreditCard className="h-4 w-4" />
                          {isLoading ? "Processing..." : "Pay Now"}
                        </Button>
                      </div>

                      <div className="text-xs text-muted-foreground text-center">
                        Secure payment powered by Paystack
                      </div>
                    </div>
                  )}

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-4 border-t">
                    <Mail className="h-4 w-4" />
                    <span>QR code ticket delivered instantly via email</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

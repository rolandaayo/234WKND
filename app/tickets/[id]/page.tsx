"use client";

import { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface TicketEvent {
  _id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  price: number;
  image: string;
  capacity: string;
  tag: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function TicketDetailPage() {
  const params = useParams();
  const [event, setEvent] = useState<TicketEvent | null>(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Details, 2: Info + Payment

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${API}/api/ticket-events`);
        const data = await res.json();
        if (res.ok && data.events) {
          const found = data.events.find(
            (e: TicketEvent) => e._id === params.id,
          );
          if (found) {
            setEvent(found);
          }
        }
      } catch (err) {
        console.error("Failed to fetch event:", err);
      } finally {
        setLoadingEvent(false);
      }
    };
    fetchEvent();
  }, [params.id]);

  const handleProceedToPayment = async () => {
    if (!email || !fullName || !phone) {
      alert("Please fill in all required fields");
      return;
    }

    if (!event) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${API}/api/payments/create-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          fullName,
          phone,
          eventId: params.id,
          amount: event.price,
        }),
      });

      const data = await response.json();

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        alert(data.error || "Failed to initialize payment. Please try again.");
      }
    } catch (error) {
      console.error("Payment initialization failed:", error);
      alert("Failed to initialize payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingEvent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF6542]" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col bg-black">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#FF6542] mb-4">
              Event Not Found
            </h1>
            <Button asChild className="bg-[#FF6542] text-white">
              <Link href="/tickets">Back to Events</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              asChild
              className="gap-2 text-[#EFD6AC] hover:text-[#FF6542] hover:bg-[#FF6542]/10"
            >
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
              <div className="aspect-video rounded-xl overflow-hidden bg-black border border-[#FF6542]/20">
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#FF6542]/20 to-[#EFD6AC]/10 flex items-center justify-center">
                    <span className="text-[#EFD6AC]/40">Event Image</span>
                  </div>
                )}
              </div>

              {/* Event Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-[#FF6542]/20 text-[#FF6542] border-[#FF6542]/30">
                    {event.tag || "Event"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-[#EFD6AC]/60 border-[#EFD6AC]/20"
                  >
                    {event.capacity}
                  </Badge>
                </div>

                <h1 className="text-3xl font-black text-white">
                  {event.title}
                </h1>

                <p className="text-[#EFD6AC]/70 leading-relaxed">
                  {event.description}
                </p>

                {/* Event Details Grid */}
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-[#FF6542]" />
                    <div>
                      <p className="font-medium text-[#EFD6AC]">{event.date}</p>
                      <p className="text-sm text-[#EFD6AC]/50">Date</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#FF6542]" />
                    <div>
                      <p className="font-medium text-[#EFD6AC]">
                        {event.location}
                      </p>
                      <p className="text-sm text-[#EFD6AC]/50">Location</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-[#FF6542]" />
                    <div>
                      <p className="font-medium text-[#EFD6AC]">
                        {event.capacity}
                      </p>
                      <p className="text-sm text-[#EFD6AC]/50">Capacity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:sticky lg:top-24 h-fit">
              <Card className="bg-black border border-[#FF6542]/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-[#EFD6AC]">
                    <span>Book Your Spot</span>
                    <div className="text-right">
                      <div className="text-2xl font-black text-[#FF6542]">
                        ₦{event.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-[#EFD6AC]/50">
                        per person
                      </div>
                    </div>
                  </CardTitle>
                  <CardDescription className="text-[#EFD6AC]/50">
                    Secure your exclusive access to this premium experience
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="text-center py-8">
                        <h3 className="text-lg font-semibold mb-2 text-[#EFD6AC]">
                          Ready to Join?
                        </h3>
                        <p className="text-[#EFD6AC]/50 mb-4">
                          Click below to proceed with your booking
                        </p>
                        <Button
                          onClick={() => setStep(2)}
                          className="w-full bg-[#FF6542] text-white hover:bg-[#FF6542]/80 font-bold rounded-xl h-12"
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
                        <Label htmlFor="fullName" className="text-[#EFD6AC]/80">
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/40 focus:border-[#FF6542] h-12 rounded-xl"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#EFD6AC]/80">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/40 focus:border-[#FF6542] h-12 rounded-xl"
                          required
                        />
                        <p className="text-xs text-[#EFD6AC]/40">
                          Your ticket QR code will be sent to this email
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[#EFD6AC]/80">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+234 xxx xxx xxxx"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/40 focus:border-[#FF6542] h-12 rounded-xl"
                          required
                        />
                      </div>

                      <Separator className="bg-[#FF6542]/20" />

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-[#EFD6AC]/70">
                          <span>Ticket Price</span>
                          <span>₦{event.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-[#EFD6AC]/70">
                          <span>Service Fee</span>
                          <span>₦500</span>
                        </div>
                        <Separator className="bg-[#FF6542]/20" />
                        <div className="flex justify-between font-bold text-[#EFD6AC]">
                          <span>Total</span>
                          <span className="text-[#FF6542]">
                            ₦{(event.price + 500).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setStep(1)}
                          className="flex-1 border-[#FF6542]/30 text-[#EFD6AC] hover:bg-[#FF6542]/10 rounded-xl"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={handleProceedToPayment}
                          disabled={isLoading}
                          className="flex-1 gap-2 bg-[#FF6542] text-white hover:bg-[#FF6542]/80 font-bold rounded-xl"
                        >
                          <CreditCard className="h-4 w-4" />
                          {isLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            "Pay Now"
                          )}
                        </Button>
                      </div>

                      <div className="text-xs text-[#EFD6AC]/40 text-center">
                        Secure payment powered by Paystack
                      </div>
                    </div>
                  )}

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 text-xs text-[#EFD6AC]/40 pt-4 border-t border-[#FF6542]/10">
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

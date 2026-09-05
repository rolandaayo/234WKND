"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Users,
  Loader2,
  Ticket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/cart-context";

interface TicketEvent {
  _id: string;
  title: string;
  date: string;
  location: string;
  price: number;
  description: string;
  image: string;
  capacity: string;
  tag: string;
}

const TAKWABAY_EVENT = {
  title: "Takwabay Experience",
  price: 15000,
  description:
    "A memorable Takwabay experience featuring music, culture, and entertainment from daylight to after dark.",
};

const FALLBACK_EVENT: TicketEvent = {
  _id: "1",
  title: TAKWABAY_EVENT.title,
  location: "Undisclosed Location",
  date: "APR 25, 2026",
  price: TAKWABAY_EVENT.price,
  image: "/images/img-02.jpg",
  description: TAKWABAY_EVENT.description,
  capacity: "Limited Spots",
  tag: "Hot Event",
};

export default function TicketsPage() {
  const [events, setEvents] = useState<TicketEvent[]>([]);
  const [loadingItems, setLoadingItems] = useState<{ [key: string]: boolean }>(
    {},
  );
  const { addItem } = useCart();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const res = await fetch(`${API}/api/ticket-events`);
        const data = await res.json();
        if (res.ok && data.events?.length > 0) {
          setEvents(
            data.events.map((event: TicketEvent) => ({
              ...event,
              ...TAKWABAY_EVENT,
            })),
          );
        } else {
          setEvents([FALLBACK_EVENT]);
        }
      } catch {
        setEvents([FALLBACK_EVENT]);
      }
    };
    fetchEvents();
  }, []);

  const handleAddToCart = (event: TicketEvent) => {
    setLoadingItems((prev) => ({ ...prev, [event._id]: true }));
    addItem({
      id: event._id,
      title: event.title,
      price: event.price,
      image: event.image,
      date: event.date,
      location: event.location,
    });
    setTimeout(
      () => setLoadingItems((prev) => ({ ...prev, [event._id]: false })),
      1000,
    );
  };

  const featured = events[0];

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />

      <main className="flex-1 pt-20 pb-16 overflow-hidden">
        {/* Hero Section */}
        <section className="relative px-6 py-12 md:py-16 max-w-6xl mx-auto">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6542] opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#EFD6AC] opacity-10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-[1px] w-8 bg-[#FF6542]" />
                <span className="text-[#EFD6AC] font-bold uppercase tracking-[0.2em] text-xs">
                  The Experience
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-[#FF6542] italic">
                SECURE YOUR
                <br />
                TICKET
              </h1>
              <p className="text-base text-[#EFD6AC] opacity-70 leading-relaxed mb-8 max-w-lg">
                Join the most exclusive weekend experience. Limited spots
                available for the culture.
              </p>
              <Button
                size="default"
                className="rounded-full bg-[#FF6542] hover:bg-[#FF6542]/80 text-white font-bold h-12 px-6"
              >
                Get Tickets
              </Button>
            </div>

            {featured && (
              <div className="relative w-full md:w-1/2 aspect-square group max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF6542]/20 to-amber-200/20 rounded-2xl blur-lg" />
                <div className="relative h-full w-full rounded-2xl overflow-hidden border border-[#FF6542]/20 bg-black">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${featured.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 p-4 backdrop-blur-md bg-black/50 border border-[#FF6542]/20 rounded-xl max-w-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <Ticket className="h-3 w-3 text-[#FF6542]" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#EFD6AC]">
                        Available Now
                      </span>
                    </div>
                    <h3 className="font-bold text-base mb-1 text-white">
                      {featured.title}
                    </h3>
                    <p className="text-xs text-[#EFD6AC]/60 mb-3">
                      {featured.date} • {featured.location}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-[#FF6542]">
                        ₦{featured.price.toLocaleString()}
                      </span>
                      <button className="h-7 w-7 rounded-full bg-[#FF6542] flex items-center justify-center text-white">
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Events Section */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-3 text-[#FF6542]">
                THE WKND EXPERIENCE
              </h2>
              <p className="text-[#EFD6AC]/60">
                Your ticket to the ultimate Takwabay experience.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="group relative flex flex-col bg-black/30 rounded-2xl border border-[#FF6542]/20 overflow-hidden transition-all hover:border-[#FF6542]/40 hover:shadow-xl hover:shadow-[#FF6542]/5"
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 aspect-video lg:aspect-square relative overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700"
                      style={{ backgroundImage: `url(${event.image})` }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-full bg-[#FF6542] text-white text-[9px] font-black uppercase tracking-widest">
                        {event.tag}
                      </span>
                    </div>
                  </div>
                  <div className="lg:w-1/2 p-8 lg:p-12">
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="h-5 w-5 text-[#FF6542]" />
                      <span className="text-base font-medium text-[#EFD6AC]">
                        {event.date}
                      </span>
                    </div>
                    <h3 className="font-bold text-2xl lg:text-3xl mb-4 text-white group-hover:text-[#FF6542] transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-[#EFD6AC]/70 mb-6 leading-relaxed">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-6 mb-8">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#FF6542]" />
                        <span className="text-sm text-[#EFD6AC]">
                          {event.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-[#FF6542]" />
                        <span className="text-sm text-[#EFD6AC]">
                          {event.capacity}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-black text-[#FF6542]">
                          ₦{event.price.toLocaleString()}
                        </span>
                        <span className="text-[#EFD6AC]/60 ml-2 text-sm">
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleAddToCart(event)}
                          disabled={loadingItems[event._id]}
                          className="bg-[#FF6542] text-white hover:bg-[#FF6542]/80 font-bold px-6 py-2 rounded-full"
                        >
                          {loadingItems[event._id] ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Adding...
                            </>
                          ) : (
                            "Add to Cart"
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          className="border-[#FF6542] text-[#FF6542] hover:bg-[#FF6542] hover:text-white rounded-full px-6 py-2 gap-2"
                          asChild
                        >
                          <a href={`/tickets/${event._id}`}>
                            Buy Now <ArrowRight className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-12 max-w-6xl mx-auto">
          <div className="relative bg-gradient-to-br from-black via-black to-[#FF6542]/10 rounded-2xl p-8 md:p-12 border border-[#FF6542]/20 overflow-hidden text-center">
            <div className="relative z-10">
              <h2 className="text-xl md:text-3xl font-black tracking-tighter mb-3 text-[#FF6542]">
                WEEKEND MODE: ACTIVATED
              </h2>
              <p className="text-sm md:text-base text-[#EFD6AC]/70 mb-4 max-w-2xl mx-auto">
                Join leading culture enthusiasts who trust 234 WKND to deliver
                exceptional experiences.
              </p>
              <button className="px-6 py-2 rounded-full bg-[#FF6542] text-white font-bold hover:bg-[#FF6542]/90 transition-all text-sm">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

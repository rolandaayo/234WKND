import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Ticket,
  Users,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function TicketsPage() {
  const events = [
    {
      id: 1,
      title: "A Weekend Experience",
      location: "Lagos, Nigeria",
      date: "Apr 5, 2026 8:00 PM GMT+1",
      price: "NGN 10,000",
      image: "/placeholder.jpg", // Add your event image here
      description:
        "Join us for an unforgettable weekend experience featuring the best in music, culture, and entertainment.",
      venue: "Amore Garden",
      capacity: "Limited Spots",
      tag: "Hot Event",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-20 pb-16 bg-background overflow-hidden">
        {/* Hero Section */}
        <section className="relative px-6 py-12 md:py-16 max-w-6xl mx-auto">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-white" />
                <span className="text-white font-bold uppercase tracking-[0.2em] text-xs">
                  The Experience
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent italic">
                SECURE YOUR
                <br />
                ACCESS
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Join the most exclusive cultural events. Premium experiences for
                the discerning weekend warrior.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="default"
                  className="rounded-full bg-white hover:bg-white/80 text-black font-bold h-12 px-6"
                >
                  View All Events
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="rounded-full border-white/10 hover:bg-white/5 h-12 px-6 bg-transparent"
                >
                  VIP Access
                </Button>
              </div>
            </div>

            <div className="relative w-full md:w-1/2 aspect-square group max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-700" />
              <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10 bg-card">
                {/* Add your hero image here */}
                <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 p-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl max-w-xs animate-fade-up">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-3 w-3 text-white fill-white" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white">
                      Next Event
                    </span>
                  </div>
                  <h3 className="font-bold text-base mb-1">
                    A Weekend Experience
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    April 5, 2026 • Amore Garden, Lagos
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-white">NGN 10,000</span>
                    <button className="h-7 w-7 rounded-full bg-white flex items-center justify-center text-black">
                      <Ticket className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="px-6 py-12 max-w-6xl mx-auto">
          <div className="mb-8"></div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4 uppercase">
              UPCOMING EVENTS
            </h2>
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Curated experiences for the culture.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["All", "Music", "Culture", "VIP"].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 hover:bg-white/5 transition-colors"
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Events List */}
          <div className="grid gap-6">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/tickets/${event.id}`}
                className="group block"
              >
                <div className="bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-white/10">
                  <div className="flex flex-col md:flex-row">
                    {/* Event Image */}
                    <div className="md:w-80 aspect-video md:aspect-square relative overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/20 flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">
                          Event Image
                        </span>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-2 py-1 rounded-full bg-red-500 text-white text-[8px] font-black uppercase tracking-widest">
                          {event.tag}
                        </span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 p-6 md:p-8">
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Calendar className="h-4 w-4 text-white" />
                            <span className="text-sm font-medium text-muted-foreground">
                              {event.date}
                            </span>
                          </div>

                          <h3 className="text-xl md:text-2xl font-black tracking-tighter mb-3 group-hover:text-white transition-colors">
                            {event.title}
                          </h3>

                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {event.description}
                          </p>

                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-white" />
                              <span className="text-sm font-medium">
                                {event.venue}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-white" />
                              <span className="text-sm font-medium">
                                {event.capacity}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div>
                            <span className="text-2xl font-black text-white">
                              {event.price}
                            </span>
                            <span className="text-sm text-muted-foreground ml-2">
                              per person
                            </span>
                          </div>
                          <Button className="rounded-full gap-2 group-hover:gap-3 transition-all">
                            Get Tickets
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        {/* VIP Experience CTA */}
        <section className="px-6 py-12 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-background via-background to-white/20 rounded-2xl p-8 md:p-12 border border-white/5 relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 relative z-10 italic">
              VIP EXPERIENCE
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10">
              Elevate your weekend with exclusive access, premium amenities, and
              unforgettable moments reserved for our VIP community.
            </p>
            <div className="flex flex-wrap gap-4 justify-center relative z-10">
              <Button
                size="lg"
                className="rounded-full bg-white hover:bg-white/80 text-black font-bold h-12 px-8"
              >
                Join VIP List
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/20 hover:bg-white/5 text-white h-12 px-8 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

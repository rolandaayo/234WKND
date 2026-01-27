"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Sparkles, Star, Loader2 } from "lucide-react";
import Link from "next/link";
import { ChatWidget } from "@/components/chat-widget";

export default function HomePage() {
  const [isLoadingTickets, setIsLoadingTickets] = useState(false);
  const [isLoadingAddToCart, setIsLoadingAddToCart] = useState(false);
  const [isLoadingBuyNow, setIsLoadingBuyNow] = useState(false);
  const upcomingEvent = [
    {
      id: 1,
      title: "A WKND Experience",
      location: "Undisclosed Location",
      date: "APR 25, 2026",
      image: "/placeholder.jpg", // Add your image here
      attendees: "Limited Spots",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full blur-lg animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-1/4 w-20 h-20 bg-white/10 rounded-full blur-md animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-1/3 w-28 h-28 bg-white/5 rounded-full blur-xl animate-bounce"
          style={{ animationDelay: "3s" }}
        ></div>

        {/* Floating Stars */}
        <Star
          className="absolute top-32 left-1/3 w-4 h-4 text-white/30 animate-spin"
          style={{ animationDuration: "8s" }}
        />
        <Sparkles
          className="absolute top-60 right-1/4 w-5 h-5 text-white/40 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        <Star
          className="absolute bottom-60 left-1/2 w-3 h-3 text-white/30 animate-spin"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />
        <Sparkles
          className="absolute bottom-32 right-1/2 w-4 h-4 text-white/20 animate-pulse"
          style={{ animationDelay: "3.5s" }}
        />
      </div>

      <Navbar />

      <main className="flex-1 relative z-10">
        {/* Hero Section with Background Image */}
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url(/images/bg-01.jpg)" }}
            />
            <div className="absolute inset-0 bg-black/60" />

            {/* Moving Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,0.05)_25px,rgba(255,255,255,0.05)_26px,transparent_27px,transparent_99px,rgba(255,255,255,0.05)_100px),linear-gradient(rgba(255,255,255,0.05)_24px,transparent_25px,transparent_26px,rgba(255,255,255,0.05)_27px,rgba(255,255,255,0.05)_99px,transparent_100px)] bg-[length:100px_100px] animate-grid-move"></div>
            </div>
          </div>

          <div className="relative z-10 mx-auto max-w-6xl w-full px-4 pt-16">
            <div className="flex flex-col items-center text-center">
              <span
                className="inline-block px-3 py-1 rounded-full border border-white/30 bg-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-white mb-6 backdrop-blur-sm animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                Global Experience Platform
              </span>
              <h1
                className="text-balance text-4xl font-black tracking-tighter text-white sm:text-6xl lg:text-7xl leading-[0.9] uppercase mb-6 animate-fade-in-up"
                style={{
                  animationDelay: "0.4s",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                A Weekend
                <br />
                <span
                  className="text-white italic animate-glow"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  Experience
                </span>
              </h1>
              <p
                className="mt-4 max-w-lg text-pretty text-xs font-medium leading-relaxed text-white/80 uppercase tracking-wide animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                Curating the world's most exclusive cultural events. From
                underground raves to high-art festivals.
              </p>
              <div
                className="mt-8 flex flex-col items-center gap-4 sm:flex-row animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <Button
                  size="lg"
                  className="h-12 px-8 rounded-full bg-[#21473c] text-[#f3b965] font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/25 animate-bounce"
                  style={{
                    animationDuration: "2s",
                    animationIterationCount: "infinite",
                  }}
                  disabled={isLoadingTickets}
                  onClick={() => {
                    setIsLoadingTickets(true);
                    // Simulate loading delay
                    setTimeout(() => {
                      window.location.href = "/tickets";
                    }, 1500);
                  }}
                >
                  {isLoadingTickets ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Get Tickets"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Scrolling Ticker */}
        <section className="relative bg-black border-y border-white/10 overflow-hidden">
          <div className="flex animate-scroll-left">
            <div className="flex items-center gap-8 whitespace-nowrap py-4" style={{ fontFamily: "Ch" }}>
              {[
                "Weekend Mode: Activated",
                "Worldwide Weekend Culture",
                "From Daylight to After Dark",
                "234WKND",
                "Weekend Frequency",
                "Global Soundscape",
                "Sunset to After Hours",
                "234WKND",
                "No Curfew Energy",
                "Borders Off. Volume Up.",
                "Day Party Into Night Madness",
                "234WKND",
              ].map((text, index) => (
                <span
                  key={index}
                  className="text-white font-black text-lg uppercase tracking-wider flex items-center gap-8"
                >
                  {text}
                  <span className="text-white">•</span>
                </span>
              ))}
            </div>
            <div
              className="flex items-center gap-8 whitespace-nowrap py-4"
              aria-hidden="true"
            >
              {[
                "Weekend Energy",
                "Global Weekends",
                "A Day Into The Night Party",
                "234WKND",
                "Weekend Energy",
                "Global Weekends",
                "A Day Into The Night Party",
                "234WKND",
                "Weekend Energy",
                "Global Weekends",
                "A Day Into The Night Party",
                "234WKND",
              ].map((text, index) => (
                <span
                  key={index}
                  className="text-white font-black text-lg uppercase tracking-wider flex items-center gap-8"
                >
                  {text}
                  <span className="text-white">•</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Event Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 bg-[#21473c] relative overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px] animate-float"></div>
          </div>

          <div className="mx-auto max-w-7xl relative z-10">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-black tracking-tighter text-[#f3b965] uppercase sm:text-4xl leading-none mb-3 animate-slide-in-left">
                Upcoming Event
              </h2>
              <p className="text-1xl font-bold uppercase tracking-widest text-foreground leading-loose animate-slide-in-right">
                Don't miss our next unforgettable experience
              </p>
            </div>

            {/* Event Container */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
              {/* Upcoming Event Card */}
              <div className="group relative w-full max-w-xs lg:max-w-sm animate-float-up">
                <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-white border border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10">
                  {/* Event Image */}
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url(/images/img-02.jpg)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white via-white/50 to-white opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-border-glow"></div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block px-2 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[8px] font-black text-white uppercase tracking-widest animate-pulse">
                        UPCOMING
                      </span>
                      <span className="flex items-center gap-1 text-[8px] font-bold text-white/60 uppercase tracking-widest">
                        <Users
                          className="h-2.5 w-2.5 animate-bounce"
                          style={{ animationDelay: "1s" }}
                        />{" "}
                        {upcomingEvent[0].attendees}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-white leading-none uppercase tracking-tighter mb-2">
                      {upcomingEvent[0].title}
                    </h3>
                    <div className="flex items-center gap-3 text-[9px] font-bold text-white/60 uppercase tracking-widest">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-2.5 w-2.5 animate-pulse" />{" "}
                        {upcomingEvent[0].location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar
                          className="h-2.5 w-2.5 animate-pulse"
                          style={{ animationDelay: "0.5s" }}
                        />{" "}
                        {upcomingEvent[0].date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <button className="rounded-full border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 bg-transparent px-6 py-2 text-sm font-bold hover:scale-105 hover:shadow-lg">
                    View Details
                  </button>
                </div>
              </div>

              {/* Engine Room Details */}
              <div className="w-full max-w-xs lg:max-w-sm aspect-3/4 animate-slide-in-right flex flex-col">
                <div className="flex-1 pt-4">
                  <h2 className="text-2xl font-black text-white uppercase mb-2">
                    A WKND EXPERIENCE
                  </h2>
                  <p className="text-xl pt-4 font-bold text-white mb-6">
                    Early Bird ₦7,000.00 NGN
                  </p>
                  <p className="text-sm text-white/60 mb-4">Tickets</p>
                  <p className="text-sm text-white/60 mb-6">
                    RSVP Variant sold out or unavailable General Admission 1
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm text-white/60">
                      Quantity (1 in cart)
                    </span>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm">
                        -
                      </button>
                      <span className="text-white font-bold">1</span>
                      <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm">
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="pb-4">
                  <div className="flex gap-3 mb-4">
                    <Button
                      className="bg-white text-black hover:bg-white/80 font-bold"
                      disabled={isLoadingAddToCart}
                      onClick={() => {
                        setIsLoadingAddToCart(true);
                        setTimeout(() => setIsLoadingAddToCart(false), 2000);
                      }}
                    >
                      {isLoadingAddToCart ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        "Add to cart"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white hover:text-black"
                      disabled={isLoadingBuyNow}
                      onClick={() => {
                        setIsLoadingBuyNow(true);
                        setTimeout(() => setIsLoadingBuyNow(false), 2000);
                      }}
                    >
                      {isLoadingBuyNow ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Buy it now"
                      )}
                    </Button>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="ghost"
                      className="text-white/60 hover:text-white"
                    >
                      Share
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-white/60 hover:text-white"
                    >
                      View full details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Community Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 animate-gradient-shift" />
            <div className="absolute inset-0 bg-black/70" />

            {/* Animated Particles */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full animate-float-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 4}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 mx-auto max-w-4xl w-full px-4 text-center">
            <h2 className="text-4xl font-black tracking-tighter text-white uppercase sm:text-5xl leading-none mb-6 animate-slide-in-up">
              Be Part Of Our
              <br />
              <span className="text-white italic animate-glow">Community</span>
            </h2>
            <p
              className="text-base text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              Join thousands of event enthusiasts who stay connected with the
              latest updates, exclusive offers, and behind-the-scenes content
              from the world's most exciting events.
            </p>

            {/* Newsletter Signup */}
            <div
              className="max-w-md mx-auto animate-slide-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-2 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-xs transition-all duration-300 focus:scale-105 focus:shadow-lg focus:shadow-primary/10"
                />
                <Button
                  size="sm"
                  className="px-3 py-1.5 rounded-full bg-white text-black font-bold hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-pulse-glow text-xs"
                >
                  Join Community
                </Button>
              </div>
              <p className="text-xs text-white/60 mt-3 uppercase tracking-wide">
                No spam, just the good stuff. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Chat Widget */}
      <ChatWidget />
    </div>
  );
}

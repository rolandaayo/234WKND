"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageCircle, Building2, Users } from "lucide-react";
import type React from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export default function SponsorsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io("http://localhost:3001");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    socketInstance.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socketInstance.close();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert("Thank you for your interest! We'll get back to you soon.");
      setIsSubmitting(false);
    }, 1000);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: "sponsor",
        timestamp: new Date().toISOString(),
      };
      socket.emit("message", message);
      setNewMessage("");
    }
  };

  const benefits = [
    {
      icon: Building2,
      title: "Brand Visibility",
      description:
        "Premium placement across all event materials and digital platforms",
    },
    {
      icon: Users,
      title: "Audience Reach",
      description: "Connect with 50,000+ engaged event enthusiasts",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-20 pb-8 md:pb-16 bg-background overflow-hidden">
        {/* Hero Section */}
        <section className="relative px-6 py-8 md:py-16 max-w-6xl mx-auto">
          <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-primary/20 blur-[40px] md:blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-secondary/20 blur-[40px] md:blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-[1px] w-6 md:w-8 bg-accent" />
              <span className="text-accent font-bold uppercase tracking-[0.2em] text-xs">
                Partnership
              </span>
              <span className="h-[1px] w-6 md:w-8 bg-accent" />
            </div>
            <h1 className="text-3xl md:text-6xl font-black tracking-tighter mb-4 md:mb-6 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
              PARTNER WITH
              <br />
              <span className="italic">234 WKND</span>
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
              Join us in creating unforgettable experiences. Connect with our
              vibrant community.
            </p>
          </div>
        </section>

        {/* Live Chat Section - Moved to Top */}
        <section className="px-6 py-8 md:py-12 max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-700" />
            <Card className="relative bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl font-bold justify-center">
                  <MessageCircle className="h-5 w-5 text-accent" />
                  <span className="bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                    Live Chat with Our Team
                  </span>
                  <span className="ml-auto h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-green-500 animate-pulse" />
                </CardTitle>
                <p className="text-muted-foreground text-center text-sm">
                  {isConnected
                    ? "Connected - Chat in real-time"
                    : "Connecting..."}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Messages Display */}
                  <div className="h-48 md:h-64 overflow-y-auto border border-white/10 rounded-xl p-3 bg-black/20 backdrop-blur-sm">
                    {messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground text-center text-sm">
                          👋 Hi! Start a conversation with our team
                        </p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={`mb-2 ${message.sender === "sponsor" ? "text-right" : "text-left"}`}
                        >
                          <div
                            className={`inline-block p-2 rounded-lg max-w-xs text-sm ${
                              message.sender === "sponsor"
                                ? "bg-primary text-black"
                                : "bg-white/10 text-white backdrop-blur-sm"
                            }`}
                          >
                            {message.text}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Message Input */}
                  <form onSubmit={sendMessage} className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      disabled={!isConnected}
                      className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/60 focus:border-accent focus:ring-accent/20 text-sm"
                    />
                    <button
                      type="submit"
                      disabled={!isConnected || !newMessage.trim()}
                      className="h-9 w-9 rounded-full bg-accent text-black hover:bg-accent/90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <Send className="h-3 w-3" />
                    </button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Benefits Section - 2 per row */}
        <section className="px-6 py-8 md:py-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="group relative bg-card/30 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-primary/10 mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-base md:text-lg text-white mb-2 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sponsorship Form */}
        <section className="px-6 py-8 md:py-12 max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-700" />
            <Card className="relative bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg md:text-xl font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent text-center">
                  Become a Sponsor
                </CardTitle>
                <p className="text-muted-foreground text-center text-sm">
                  Tell us about your brand
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <Label
                        htmlFor="companyName"
                        className="text-white/90 text-sm"
                      >
                        Company Name
                      </Label>
                      <Input
                        id="companyName"
                        placeholder="Your Company"
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/60 focus:border-primary focus:ring-primary/20 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="contactPerson"
                        className="text-white/90 text-sm"
                      >
                        Contact Person
                      </Label>
                      <Input
                        id="contactPerson"
                        placeholder="John Doe"
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/60 focus:border-primary focus:ring-primary/20 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-white/90 text-sm">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@company.com"
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/60 focus:border-primary focus:ring-primary/20 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="phone" className="text-white/90 text-sm">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+234 800 000 0000"
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/60 focus:border-primary focus:ring-primary/20 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="message" className="text-white/90 text-sm">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your sponsorship goals..."
                      rows={3}
                      required
                      className="resize-none bg-white/5 border-white/20 text-white placeholder:text-white/60 focus:border-primary focus:ring-primary/20 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-10 md:h-11 px-6 rounded-full bg-primary text-black font-bold hover:bg-primary/90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Submit Inquiry
                        <Send className="h-3 w-3" />
                      </>
                    )}
                  </button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-8 md:py-12 max-w-6xl mx-auto">
          <div className="relative bg-gradient-to-br from-secondary via-background to-primary/20 rounded-2xl p-6 md:p-8 border border-white/5 overflow-hidden text-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
            <div className="relative z-10">
              <h2 className="text-xl md:text-3xl font-black tracking-tighter mb-3 md:mb-4 bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent">
                READY TO PARTNER?
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 max-w-2xl mx-auto">
                Join leading brands who trust 234 WKND to deliver exceptional
                experiences.
              </p>
              <button className="px-6 md:px-8 py-2 md:py-2.5 rounded-full bg-accent text-black font-bold hover:bg-accent/90 transition-all duration-300 hover:scale-105 text-sm">
                Get Started Today
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

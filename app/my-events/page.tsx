"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Edit,
  Trash2,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  maxAttendees?: number;
  category: string;
  imageUrl?: string;
  status: string;
  createdAt: string;
}

export default function MyEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { state } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!state.isLoading && !state.isAuthenticated) {
      router.push("/login");
    }
  }, [state.isLoading, state.isAuthenticated, router]);

  // Fetch user's events
  useEffect(() => {
    const fetchEvents = async () => {
      if (!state.token) return;

      try {
        const API_BASE_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

        const response = await fetch(`${API_BASE_URL}/api/events/my-events`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setEvents(data.events);
        } else {
          setError(data.error || "Failed to fetch events");
        }
      } catch (error) {
        console.error("Fetch events error:", error);
        setError("Network error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (state.isAuthenticated && state.token) {
      fetchEvents();
    }
  }, [state.isAuthenticated, state.token]);

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

      const response = await fetch(`${API_BASE_URL}/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });

      if (response.ok) {
        setEvents(events.filter((event) => event._id !== eventId));
      } else {
        const data = await response.json();
        setError(data.error || "Failed to delete event");
      }
    } catch (error) {
      console.error("Delete event error:", error);
      setError("Network error. Please try again.");
    }
  };

  if (state.isLoading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF6542]" />
      </div>
    );
  }

  if (!state.isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-4xl font-black text-[#FF6542] uppercase tracking-tighter mb-3">
                My Events
              </h1>
              <p className="text-base text-[#EFD6AC]/70 uppercase tracking-wide">
                Manage your created events
              </p>
            </div>
            <Link href="/create-event">
              <Button className="bg-[#FF6542] text-white font-black hover:bg-[#FF6542]/90 h-12 px-6 rounded-xl text-base uppercase tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#FF6542]/25">
                <Plus className="w-5 h-5 mr-2" />
                Create Event
              </Button>
            </Link>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {events.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF6542]/20 rounded-full mb-6">
                <Calendar className="w-8 h-8 text-[#FF6542]" />
              </div>
              <h2 className="text-2xl font-bold text-[#EFD6AC] mb-4">
                No Events Yet
              </h2>
              <p className="text-[#EFD6AC]/60 mb-8">
                You haven't created any events. Start by creating your first
                event!
              </p>
              <Link href="/create-event">
                <Button className="bg-[#FF6542] text-white font-black hover:bg-[#FF6542]/90 h-12 px-8 rounded-xl text-base uppercase tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#FF6542]/25">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Event
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="relative bg-black/90 backdrop-blur-xl border border-[#FF6542]/20 rounded-3xl p-6 shadow-2xl hover:border-[#FF6542]/40 transition-all duration-300"
                >
                  {/* Event Image */}
                  {event.imageUrl && (
                    <div className="mb-4 rounded-xl overflow-hidden">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  )}

                  {/* Event Details */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-bold text-[#FF6542] line-clamp-2">
                        {event.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          event.status === "published"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>

                    <p className="text-[#EFD6AC]/70 text-sm line-clamp-3">
                      {event.description}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-[#EFD6AC]/80">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#EFD6AC]/80">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#EFD6AC]/80">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      {event.maxAttendees && (
                        <div className="flex items-center gap-2 text-[#EFD6AC]/80">
                          <Users className="w-4 h-4" />
                          <span>Max {event.maxAttendees} attendees</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#FF6542]/20">
                      <span className="text-lg font-bold text-[#FF6542]">
                        ₦{event.price.toLocaleString()}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#FF6542]/20 text-[#EFD6AC] hover:bg-[#FF6542]/10 hover:border-[#FF6542]/40"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteEvent(event._id)}
                          className="border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

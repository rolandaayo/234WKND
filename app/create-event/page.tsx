"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Users,
  Loader2,
  Plus,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [category, setCategory] = useState("general");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { state } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!state.isLoading && !state.isAuthenticated) {
      router.push("/login");
    }
  }, [state.isLoading, state.isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!title || !description || !date || !time || !location || !price) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    try {
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

      const response = await fetch(`${API_BASE_URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify({
          title,
          description,
          date,
          time,
          location,
          price: parseFloat(price),
          maxAttendees: maxAttendees ? parseInt(maxAttendees) : null,
          category,
          imageUrl: imageUrl || null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/my-events");
      } else {
        setError(data.error || "Failed to create event");
      }
    } catch (error) {
      console.error("Create event error:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (state.isLoading) {
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
        <div className="mx-auto max-w-2xl">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF6542]/20 rounded-full mb-6">
              <Plus className="w-8 h-8 text-[#FF6542]" />
            </div>
            <h1 className="text-4xl font-black text-[#FF6542] uppercase tracking-tighter mb-3">
              Create Event
            </h1>
            <p className="text-base text-[#EFD6AC]/70 uppercase tracking-wide">
              Share your event with the community
            </p>
          </div>

          {/* Form Card */}
          <div className="relative bg-black/90 backdrop-blur-xl border border-[#FF6542]/20 rounded-3xl p-8 shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-[#FF6542]/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#EFD6AC]/5 rounded-full blur-xl translate-x-1/2 translate-y-1/2" />

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[#EFD6AC] font-semibold">
                  Event Title *
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter event title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/50 focus:border-[#FF6542] focus:ring-[#FF6542]/20 h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-[#EFD6AC] font-semibold"
                >
                  Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your event"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/50 focus:border-[#FF6542] focus:ring-[#FF6542]/20 rounded-xl min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="date"
                    className="text-[#EFD6AC] font-semibold flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] focus:border-[#FF6542] focus:ring-[#FF6542]/20 h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="time"
                    className="text-[#EFD6AC] font-semibold flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    Time *
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] focus:border-[#FF6542] focus:ring-[#FF6542]/20 h-12 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="location"
                  className="text-[#EFD6AC] font-semibold flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Location *
                </Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="Event location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/50 focus:border-[#FF6542] focus:ring-[#FF6542]/20 h-12 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="price"
                    className="text-[#EFD6AC] font-semibold flex items-center gap-2"
                  >
                    <DollarSign className="w-4 h-4" />
                    Price (₦) *
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/50 focus:border-[#FF6542] focus:ring-[#FF6542]/20 h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="maxAttendees"
                    className="text-[#EFD6AC] font-semibold flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    Max Attendees
                  </Label>
                  <Input
                    id="maxAttendees"
                    type="number"
                    placeholder="Unlimited"
                    value={maxAttendees}
                    onChange={(e) => setMaxAttendees(e.target.value)}
                    className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/50 focus:border-[#FF6542] focus:ring-[#FF6542]/20 h-12 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="category"
                  className="text-[#EFD6AC] font-semibold"
                >
                  Category
                </Label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black/50 border border-[#FF6542]/20 text-[#EFD6AC] focus:border-[#FF6542] focus:ring-[#FF6542]/20 h-12 rounded-xl px-3"
                >
                  <option value="general">General</option>
                  <option value="music">Music</option>
                  <option value="culture">Culture</option>
                  <option value="nightlife">Nightlife</option>
                  <option value="art">Art</option>
                  <option value="food">Food & Drinks</option>
                  <option value="networking">Networking</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="imageUrl"
                  className="text-[#EFD6AC] font-semibold"
                >
                  Event Image URL
                </Label>
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/50 focus:border-[#FF6542] focus:ring-[#FF6542]/20 h-12 rounded-xl"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FF6542] text-white font-black hover:bg-[#FF6542]/90 h-12 rounded-xl text-base uppercase tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#FF6542]/25"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Event...
                  </>
                ) : (
                  "Create Event"
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

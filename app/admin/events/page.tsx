"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calendar,
  MapPin,
  Users,
  Loader2,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface TicketEvent {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  capacity: string;
  image: string;
  tag: string;
  createdAt: string;
}

const EMPTY_FORM = {
  title: "",
  date: "",
  location: "",
  price: "",
  description: "",
  image: "",
  capacity: "Limited Spots",
  tag: "Event",
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<TicketEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { state: authState, getToken } = useAuth();
  const router = useRouter();

  // ── Auth guard: must be logged-in admin ──────────────────────────────────
  useEffect(() => {
    if (authState.isLoading) return; // wait for hydration
    if (!authState.isAuthenticated) {
      router.push("/login");
      return;
    }
    if (!authState.user?.isAdmin) {
      router.push("/");
      toast.error("Access denied. Admins only.");
    }
  }, [authState.isLoading, authState.isAuthenticated, authState.user, router]);

  // ── Fetch ticket events ──────────────────────────────────────────────────
  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API}/api/ticket-events`);
      const data = await res.json();
      if (res.ok) setEvents(data.events || []);
      else toast.error(data.error || "Failed to load events");
    } catch {
      toast.error("Network error. Could not load events.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authState.isAuthenticated && authState.user?.isAdmin) {
      fetchEvents();
    }
  }, [authState.isAuthenticated, authState.user]);

  // ── Create / Update ──────────────────────────────────────────────────────
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.price) {
      toast.error("Title, date, and price are required.");
      return;
    }

    setIsSaving(true);
    const token = getToken();
    const url = editingId
      ? `${API}/api/ticket-events/${editingId}`
      : `${API}/api/ticket-events`;
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, price: parseFloat(form.price) }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(editingId ? "Event updated." : "Event created.");
        setShowForm(false);
        setEditingId(null);
        setForm(EMPTY_FORM);
        await fetchEvents();
      } else {
        toast.error(data.error || "Save failed.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const token = getToken();
    try {
      const res = await fetch(`${API}/api/ticket-events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Event deleted.");
        setEvents((prev) => prev.filter((e) => e._id !== id));
      } else {
        toast.error(data.error || "Delete failed.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setDeletingId(null);
    }
  };

  // ── Edit prefill ─────────────────────────────────────────────────────────
  const startEdit = (event: TicketEvent) => {
    setForm({
      title: event.title,
      date: event.date,
      location: event.location,
      price: String(event.price),
      description: event.description,
      image: event.image || "",
      capacity: event.capacity || "Limited Spots",
      tag: event.tag || "Event",
    });
    setEditingId(event._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Loading / access-denied states ──────────────────────────────────────
  if (authState.isLoading || (authState.isAuthenticated && isLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF6542]" />
      </div>
    );
  }

  if (!authState.isAuthenticated || !authState.user?.isAdmin) return null;

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          {/* ── Header ── */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-4xl font-black text-[#FF6542] uppercase tracking-tighter mb-1">
                Ticket Events
              </h1>
              <p className="text-[#EFD6AC]/50 text-sm uppercase tracking-wide">
                {events.length} event{events.length !== 1 ? "s" : ""} · Admin
                only
              </p>
            </div>
            <Button
              onClick={() => {
                setEditingId(null);
                setForm(EMPTY_FORM);
                setShowForm((v) => !v);
              }}
              className="bg-[#FF6542] hover:bg-[#FF6542]/80 text-white font-bold rounded-xl h-11 px-5"
            >
              {showForm ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  New Event
                </>
              )}
            </Button>
          </div>

          {/* ── Create / Edit Form ── */}
          {showForm && (
            <form
              onSubmit={handleSave}
              className="mb-10 bg-black/80 border border-[#FF6542]/20 rounded-2xl p-8 space-y-5"
            >
              <h2 className="text-xl font-bold text-[#FF6542] mb-2">
                {editingId ? "Edit Event" : "Create New Event"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[#EFD6AC]/80">Title *</Label>
                  <Input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="THE WET SKY PARTY x +234WKND"
                    className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/30 focus:border-[#FF6542] h-11 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[#EFD6AC]/80">Date *</Label>
                  <Input
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    placeholder="DEC 11, 2026"
                    className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/30 focus:border-[#FF6542] h-11 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[#EFD6AC]/80">Location</Label>
                  <Input
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    placeholder="Undisclosed Location, Lagos"
                    className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/30 focus:border-[#FF6542] h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[#EFD6AC]/80">Price (₦) *</Label>
                  <Input
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    placeholder="15000"
                    className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/30 focus:border-[#FF6542] h-11 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[#EFD6AC]/80">Capacity</Label>
                  <Input
                    value={form.capacity}
                    onChange={(e) =>
                      setForm({ ...form, capacity: e.target.value })
                    }
                    placeholder="Limited Spots"
                    className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/30 focus:border-[#FF6542] h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[#EFD6AC]/80">Tag</Label>
                  <Input
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    placeholder="Hot Event"
                    className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/30 focus:border-[#FF6542] h-11 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[#EFD6AC]/80">Image URL</Label>
                <Input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="/images/img-02.jpg"
                  className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/30 focus:border-[#FF6542] h-11 rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[#EFD6AC]/80">Description</Label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Describe the experience…"
                  rows={3}
                  className="w-full bg-black/50 border border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/30 focus:border-[#FF6542] rounded-xl px-3 py-2 text-sm outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-[#FF6542] hover:bg-[#FF6542]/80 text-white font-bold rounded-xl h-11 px-6"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      {editingId ? "Update Event" : "Create Event"}
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setForm(EMPTY_FORM);
                  }}
                  className="text-[#EFD6AC]/60 hover:text-[#EFD6AC] rounded-xl h-11"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {/* ── Events list ── */}
          {events.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF6542]/20 rounded-full mb-6">
                <Calendar className="w-8 h-8 text-[#FF6542]" />
              </div>
              <h2 className="text-2xl font-bold text-[#EFD6AC] mb-3">
                No ticket events yet
              </h2>
              <p className="text-[#EFD6AC]/50 mb-8">
                Create your first event to start selling tickets.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="flex flex-col sm:flex-row gap-4 bg-black/60 border border-[#FF6542]/20 rounded-2xl p-6 hover:border-[#FF6542]/40 transition-colors"
                >
                  {/* Image */}
                  {event.image && (
                    <div className="sm:w-32 sm:h-32 w-full h-40 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-white truncate">
                        {event.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-[#FF6542]/20 text-[#FF6542] text-xs font-bold uppercase tracking-wide flex-shrink-0">
                        {event.tag}
                      </span>
                    </div>
                    <p className="text-[#EFD6AC]/60 text-sm mb-3 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#EFD6AC]/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#FF6542]" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#FF6542]" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#FF6542]" />
                        {event.capacity}
                      </span>
                    </div>
                  </div>

                  {/* Price + actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between gap-3 sm:ml-4 flex-shrink-0">
                    <span className="text-xl font-black text-[#FF6542]">
                      ₦{event.price.toLocaleString()}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => startEdit(event)}
                        className="bg-[#FF6542]/10 hover:bg-[#FF6542]/20 text-[#EFD6AC] border border-[#FF6542]/20 rounded-lg h-8 px-3"
                      >
                        <Pencil className="w-3.5 h-3.5 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        disabled={deletingId === event._id}
                        onClick={() => {
                          toast("Delete this event?", {
                            description: event.title,
                            duration: 6000,
                            action: {
                              label: "Delete",
                              onClick: () => handleDelete(event._id),
                            },
                            cancel: { label: "Cancel", onClick: () => {} },
                          });
                        }}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg h-8 px-3"
                      >
                        {deletingId === event._id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </Button>
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

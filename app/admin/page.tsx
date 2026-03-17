"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Ticket,
  MessageSquare,
  DollarSign,
  RefreshCw,
  Send,
  CheckCircle,
  Clock,
  Download,
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

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
interface MerchItem {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  tag: string;
}
interface Message {
  _id: string;
  text: string;
  sender: string;
  email?: string;
  timestamp: string;
  replied: boolean;
}
interface Payment {
  _id: string;
  reference: string;
  email: string;
  amount: number;
  status: string;
  createdAt: string;
}
interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
}

const EMPTY_TICKET = {
  title: "",
  date: "",
  location: "",
  price: "",
  description: "",
  image: "",
  capacity: "Limited Spots",
  tag: "Hot Event",
};
const EMPTY_MERCH = {
  name: "",
  price: "",
  category: "Apparel",
  image: "",
  description: "",
  tag: "",
};

export default function AdminPage() {
  const { state: authState } = useAuth();

  // Data state
  const [ticketEvents, setTicketEvents] = useState<TicketEvent[]>([]);
  const [merch, setMerch] = useState<MerchItem[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTickets: 0,
    totalRevenue: 0,
    pendingMessages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Ticket form state
  const [ticketForm, setTicketForm] = useState(EMPTY_TICKET);
  const [editingTicket, setEditingTicket] = useState<string | null>(null);
  const [ticketLoading, setTicketLoading] = useState(false);

  // Merch form state
  const [merchForm, setMerchForm] = useState(EMPTY_MERCH);
  const [editingMerch, setEditingMerch] = useState<string | null>(null);
  const [merchLoading, setMerchLoading] = useState(false);

  // Message reply state
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    await Promise.allSettled([
      fetchTicketEvents(),
      fetchMerch(),
      fetchMessages(),
      fetchPayments(),
      fetchUsers(),
      fetchStats(),
    ]);
    setLoading(false);
  };

  const fetchTicketEvents = async () => {
    try {
      const res = await fetch(`${API}/api/ticket-events`);
      const data = await res.json();
      if (res.ok) setTicketEvents(data.events || []);
    } catch {}
  };

  const fetchMerch = async () => {
    try {
      const res = await fetch(`${API}/api/merch`);
      const data = await res.json();
      if (res.ok) setMerch(data.items || []);
    } catch {}
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API}/api/admin/messages`);
      const data = await res.json();
      if (data.success) setMessages(data.messages || []);
    } catch {}
  };

  const fetchPayments = async () => {
    try {
      const res = await fetch(`${API}/api/admin/payments`);
      const data = await res.json();
      if (data.success) setPayments(data.payments || []);
    } catch {}
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API}/api/admin/users`);
      const data = await res.json();
      if (data.success) setUsers(data.users || []);
    } catch {}
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API}/api/admin/stats`);
      const data = await res.json();
      if (data.success) setStats(data.stats);
    } catch {}
  };

  // ---- Ticket CRUD ----
  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTicketLoading(true);
    const method = editingTicket ? "PUT" : "POST";
    const url = editingTicket
      ? `${API}/api/ticket-events/${editingTicket}`
      : `${API}/api/ticket-events`;
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify({
          ...ticketForm,
          price: parseFloat(ticketForm.price),
        }),
      });
      if (res.ok) {
        setTicketForm(EMPTY_TICKET);
        setEditingTicket(null);
        fetchTicketEvents();
      }
    } catch {}
    setTicketLoading(false);
  };

  const handleEditTicket = (event: TicketEvent) => {
    setEditingTicket(event._id);
    setTicketForm({
      title: event.title,
      date: event.date,
      location: event.location,
      price: event.price.toString(),
      description: event.description,
      image: event.image,
      capacity: event.capacity,
      tag: event.tag,
    });
  };

  const handleDeleteTicket = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await fetch(`${API}/api/ticket-events/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${authState.token}` },
    });
    fetchTicketEvents();
  };

  // ---- Merch CRUD ----
  const handleMerchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMerchLoading(true);
    const method = editingMerch ? "PUT" : "POST";
    const url = editingMerch
      ? `${API}/api/merch/${editingMerch}`
      : `${API}/api/merch`;
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify({
          ...merchForm,
          price: parseFloat(merchForm.price),
        }),
      });
      if (res.ok) {
        setMerchForm(EMPTY_MERCH);
        setEditingMerch(null);
        fetchMerch();
      }
    } catch {}
    setMerchLoading(false);
  };

  const handleEditMerch = (item: MerchItem) => {
    setEditingMerch(item._id);
    setMerchForm({
      name: item.name,
      price: item.price.toString(),
      category: item.category,
      image: item.image,
      description: item.description,
      tag: item.tag,
    });
  };

  const handleDeleteMerch = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    await fetch(`${API}/api/merch/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${authState.token}` },
    });
    fetchMerch();
  };

  // ---- Message reply ----
  const sendReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;
    setSendingReply(true);
    try {
      await fetch(`${API}/api/admin/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messageId: selectedMessage._id,
          replyText,
          recipientEmail: selectedMessage.email,
        }),
      });
      setReplyText("");
      setSelectedMessage(null);
      fetchMessages();
    } catch {}
    setSendingReply(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF6542]" />
      </div>
    );
  }

  const inputCls =
    "bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/40 focus:border-[#FF6542] h-10 rounded-lg";
  const labelCls = "text-[#EFD6AC]/80 text-sm font-semibold";

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-[#FF6542] uppercase tracking-tighter">
                Admin Dashboard
              </h1>
              <p className="text-[#EFD6AC]/60 text-sm mt-1">
                Manage your 234WKND platform
              </p>
            </div>
            <Button
              onClick={fetchAll}
              className="bg-[#FF6542]/20 border border-[#FF6542]/30 text-[#EFD6AC] hover:bg-[#FF6542]/30 gap-2"
            >
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Users", value: stats.totalUsers, icon: Users },
              {
                label: "Tickets Sold",
                value: stats.totalTickets,
                icon: Ticket,
              },
              {
                label: "Revenue",
                value: `₦${stats.totalRevenue.toLocaleString()}`,
                icon: DollarSign,
              },
              {
                label: "Pending Msgs",
                value: stats.pendingMessages,
                icon: MessageSquare,
              },
            ].map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="bg-black border border-[#FF6542]/20 rounded-2xl p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#EFD6AC]/60 text-xs font-semibold uppercase tracking-wide">
                    {label}
                  </span>
                  <Icon className="h-4 w-4 text-[#FF6542]" />
                </div>
                <div className="text-2xl font-black text-[#FF6542]">
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#EFD6AC]/40" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/40 focus:border-[#FF6542]"
            />
          </div>

          <Tabs defaultValue="tickets" className="space-y-6">
            <TabsList className="bg-black border border-[#FF6542]/20 grid w-full grid-cols-5">
              {["tickets", "merch", "messages", "payments", "users"].map(
                (tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="text-[#EFD6AC]/60 data-[state=active]:bg-[#FF6542] data-[state=active]:text-white uppercase text-xs font-bold tracking-wide"
                  >
                    {tab}
                  </TabsTrigger>
                ),
              )}
            </TabsList>

            {/* ---- TICKETS TAB ---- */}
            <TabsContent value="tickets">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Form */}
                <div className="bg-black border border-[#FF6542]/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-black text-[#FF6542] uppercase">
                      {editingTicket ? "Edit Event" : "Add Event"}
                    </h2>
                    {editingTicket && (
                      <button
                        onClick={() => {
                          setEditingTicket(null);
                          setTicketForm(EMPTY_TICKET);
                        }}
                        className="text-[#EFD6AC]/40 hover:text-[#EFD6AC]"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <form onSubmit={handleTicketSubmit} className="space-y-3">
                    <div>
                      <Label className={labelCls}>Title *</Label>
                      <Input
                        value={ticketForm.title}
                        onChange={(e) =>
                          setTicketForm({
                            ...ticketForm,
                            title: e.target.value,
                          })
                        }
                        className={inputCls}
                        placeholder="Event title"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className={labelCls}>Date *</Label>
                        <Input
                          value={ticketForm.date}
                          onChange={(e) =>
                            setTicketForm({
                              ...ticketForm,
                              date: e.target.value,
                            })
                          }
                          className={inputCls}
                          placeholder="APR 25, 2026"
                          required
                        />
                      </div>
                      <div>
                        <Label className={labelCls}>Price (₦) *</Label>
                        <Input
                          type="number"
                          value={ticketForm.price}
                          onChange={(e) =>
                            setTicketForm({
                              ...ticketForm,
                              price: e.target.value,
                            })
                          }
                          className={inputCls}
                          placeholder="7000"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label className={labelCls}>Location</Label>
                      <Input
                        value={ticketForm.location}
                        onChange={(e) =>
                          setTicketForm({
                            ...ticketForm,
                            location: e.target.value,
                          })
                        }
                        className={inputCls}
                        placeholder="Undisclosed Location"
                      />
                    </div>
                    <div>
                      <Label className={labelCls}>Image URL</Label>
                      <Input
                        value={ticketForm.image}
                        onChange={(e) =>
                          setTicketForm({
                            ...ticketForm,
                            image: e.target.value,
                          })
                        }
                        className={inputCls}
                        placeholder="/images/img-02.jpg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className={labelCls}>Capacity</Label>
                        <Input
                          value={ticketForm.capacity}
                          onChange={(e) =>
                            setTicketForm({
                              ...ticketForm,
                              capacity: e.target.value,
                            })
                          }
                          className={inputCls}
                          placeholder="Limited Spots"
                        />
                      </div>
                      <div>
                        <Label className={labelCls}>Tag</Label>
                        <Input
                          value={ticketForm.tag}
                          onChange={(e) =>
                            setTicketForm({
                              ...ticketForm,
                              tag: e.target.value,
                            })
                          }
                          className={inputCls}
                          placeholder="Hot Event"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className={labelCls}>Description</Label>
                      <Textarea
                        value={ticketForm.description}
                        onChange={(e) =>
                          setTicketForm({
                            ...ticketForm,
                            description: e.target.value,
                          })
                        }
                        className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/40 focus:border-[#FF6542] rounded-lg min-h-[80px]"
                        placeholder="Event description"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={ticketLoading}
                      className="w-full bg-[#FF6542] text-white hover:bg-[#FF6542]/80 font-bold rounded-xl h-10"
                    >
                      {ticketLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : editingTicket ? (
                        "Update Event"
                      ) : (
                        "Add Event"
                      )}
                    </Button>
                  </form>
                </div>

                {/* List */}
                <div className="bg-black border border-[#FF6542]/20 rounded-2xl p-6">
                  <h2 className="text-lg font-black text-[#FF6542] uppercase mb-5">
                    Events ({ticketEvents.length})
                  </h2>
                  <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                    {ticketEvents.length === 0 && (
                      <p className="text-[#EFD6AC]/40 text-sm text-center py-8">
                        No events yet. Add one!
                      </p>
                    )}
                    {ticketEvents
                      .filter((e) =>
                        e.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()),
                      )
                      .map((event) => (
                        <div
                          key={event._id}
                          className="flex items-center gap-3 p-4 border border-[#FF6542]/10 rounded-xl hover:border-[#FF6542]/30 transition-colors"
                        >
                          {event.image && (
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-[#EFD6AC] text-sm truncate">
                              {event.title}
                            </p>
                            <p className="text-[#EFD6AC]/50 text-xs">
                              {event.date} • ₦{event.price.toLocaleString()}
                            </p>
                            <p className="text-[#EFD6AC]/40 text-xs truncate">
                              {event.location}
                            </p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleEditTicket(event)}
                              className="p-2 rounded-lg bg-[#FF6542]/10 hover:bg-[#FF6542]/20 text-[#FF6542]"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteTicket(event._id)}
                              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ---- MERCH TAB ---- */}
            <TabsContent value="merch">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Form */}
                <div className="bg-black border border-[#FF6542]/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-black text-[#FF6542] uppercase">
                      {editingMerch ? "Edit Item" : "Add Item"}
                    </h2>
                    {editingMerch && (
                      <button
                        onClick={() => {
                          setEditingMerch(null);
                          setMerchForm(EMPTY_MERCH);
                        }}
                        className="text-[#EFD6AC]/40 hover:text-[#EFD6AC]"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <form onSubmit={handleMerchSubmit} className="space-y-3">
                    <div>
                      <Label className={labelCls}>Name *</Label>
                      <Input
                        value={merchForm.name}
                        onChange={(e) =>
                          setMerchForm({ ...merchForm, name: e.target.value })
                        }
                        className={inputCls}
                        placeholder="Product name"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className={labelCls}>Price (₦) *</Label>
                        <Input
                          type="number"
                          value={merchForm.price}
                          onChange={(e) =>
                            setMerchForm({
                              ...merchForm,
                              price: e.target.value,
                            })
                          }
                          className={inputCls}
                          placeholder="15000"
                          required
                        />
                      </div>
                      <div>
                        <Label className={labelCls}>Category *</Label>
                        <select
                          value={merchForm.category}
                          onChange={(e) =>
                            setMerchForm({
                              ...merchForm,
                              category: e.target.value,
                            })
                          }
                          className="w-full bg-black/50 border border-[#FF6542]/20 text-[#EFD6AC] focus:border-[#FF6542] h-10 rounded-lg px-3 text-sm"
                        >
                          {["Apparel", "Accessories", "Bundles", "Limited"].map(
                            (c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ),
                          )}
                        </select>
                      </div>
                    </div>
                    <div>
                      <Label className={labelCls}>Image URL</Label>
                      <Input
                        value={merchForm.image}
                        onChange={(e) =>
                          setMerchForm({ ...merchForm, image: e.target.value })
                        }
                        className={inputCls}
                        placeholder="/merch/product-01.jpg"
                      />
                    </div>
                    <div>
                      <Label className={labelCls}>Tag</Label>
                      <Input
                        value={merchForm.tag}
                        onChange={(e) =>
                          setMerchForm({ ...merchForm, tag: e.target.value })
                        }
                        className={inputCls}
                        placeholder="New Arrival"
                      />
                    </div>
                    <div>
                      <Label className={labelCls}>Description</Label>
                      <Textarea
                        value={merchForm.description}
                        onChange={(e) =>
                          setMerchForm({
                            ...merchForm,
                            description: e.target.value,
                          })
                        }
                        className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/40 focus:border-[#FF6542] rounded-lg min-h-[80px]"
                        placeholder="Product description"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={merchLoading}
                      className="w-full bg-[#FF6542] text-white hover:bg-[#FF6542]/80 font-bold rounded-xl h-10"
                    >
                      {merchLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : editingMerch ? (
                        "Update Item"
                      ) : (
                        "Add Item"
                      )}
                    </Button>
                  </form>
                </div>

                {/* List */}
                <div className="bg-black border border-[#FF6542]/20 rounded-2xl p-6">
                  <h2 className="text-lg font-black text-[#FF6542] uppercase mb-5">
                    Merch Items ({merch.length})
                  </h2>
                  <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                    {merch.length === 0 && (
                      <p className="text-[#EFD6AC]/40 text-sm text-center py-8">
                        No merch yet. Add some!
                      </p>
                    )}
                    {merch
                      .filter((m) =>
                        m.name.toLowerCase().includes(searchTerm.toLowerCase()),
                      )
                      .map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center gap-3 p-4 border border-[#FF6542]/10 rounded-xl hover:border-[#FF6542]/30 transition-colors"
                        >
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-[#EFD6AC] text-sm truncate">
                              {item.name}
                            </p>
                            <p className="text-[#EFD6AC]/50 text-xs">
                              ₦{item.price.toLocaleString()} • {item.category}
                            </p>
                            {item.tag && (
                              <span className="text-[9px] font-bold uppercase tracking-widest text-[#FF6542]">
                                {item.tag}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleEditMerch(item)}
                              className="p-2 rounded-lg bg-[#FF6542]/10 hover:bg-[#FF6542]/20 text-[#FF6542]"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteMerch(item._id)}
                              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ---- MESSAGES TAB ---- */}
            <TabsContent value="messages">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-black border border-[#FF6542]/20 rounded-2xl p-6">
                  <h2 className="text-lg font-black text-[#FF6542] uppercase mb-5">
                    Messages
                  </h2>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {messages
                      .filter((m) =>
                        m.text.toLowerCase().includes(searchTerm.toLowerCase()),
                      )
                      .map((msg) => (
                        <div
                          key={msg._id}
                          onClick={() => setSelectedMessage(msg)}
                          className={`p-4 border rounded-xl cursor-pointer transition-colors ${selectedMessage?._id === msg._id ? "border-[#FF6542]/60 bg-[#FF6542]/10" : "border-[#FF6542]/10 hover:border-[#FF6542]/30"}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-[#EFD6AC] text-sm">
                              {msg.sender}
                            </span>
                            {msg.replied ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Clock className="h-4 w-4 text-[#FF6542]" />
                            )}
                          </div>
                          <p className="text-[#EFD6AC]/60 text-xs line-clamp-2">
                            {msg.text}
                          </p>
                          {msg.email && (
                            <p className="text-[#EFD6AC]/40 text-xs mt-1">
                              {msg.email}
                            </p>
                          )}
                        </div>
                      ))}
                    {messages.length === 0 && (
                      <p className="text-[#EFD6AC]/40 text-sm text-center py-8">
                        No messages yet.
                      </p>
                    )}
                  </div>
                </div>
                <div className="bg-black border border-[#FF6542]/20 rounded-2xl p-6">
                  <h2 className="text-lg font-black text-[#FF6542] uppercase mb-5">
                    Reply
                  </h2>
                  {selectedMessage ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-[#FF6542]/5 border border-[#FF6542]/10 rounded-xl">
                        <p className="text-[#EFD6AC] text-sm">
                          {selectedMessage.text}
                        </p>
                        <p className="text-[#EFD6AC]/40 text-xs mt-2">
                          From:{" "}
                          {selectedMessage.email || selectedMessage.sender}
                        </p>
                      </div>
                      <Textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply..."
                        rows={4}
                        className="bg-black/50 border-[#FF6542]/20 text-[#EFD6AC] placeholder:text-[#EFD6AC]/40 focus:border-[#FF6542] rounded-xl"
                      />
                      <Button
                        onClick={sendReply}
                        disabled={sendingReply || !replyText.trim()}
                        className="w-full bg-[#FF6542] text-white hover:bg-[#FF6542]/80 font-bold rounded-xl h-10 gap-2"
                      >
                        <Send className="h-4 w-4" />
                        {sendingReply ? "Sending..." : "Send Reply"}
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-[#EFD6AC]/40">
                      <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-40" />
                      <p className="text-sm">Select a message to reply</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* ---- PAYMENTS TAB ---- */}
            <TabsContent value="payments">
              <div className="bg-black border border-[#FF6542]/20 rounded-2xl p-6">
                <h2 className="text-lg font-black text-[#FF6542] uppercase mb-5">
                  Payments
                </h2>
                <div className="space-y-3">
                  {payments.length === 0 && (
                    <p className="text-[#EFD6AC]/40 text-sm text-center py-8">
                      No payments yet.
                    </p>
                  )}
                  {payments.map((p) => (
                    <div
                      key={p._id}
                      className="flex items-center justify-between p-4 border border-[#FF6542]/10 rounded-xl"
                    >
                      <div>
                        <p className="font-bold text-[#EFD6AC] text-sm">
                          ₦{p.amount.toLocaleString()}
                        </p>
                        <p className="text-[#EFD6AC]/50 text-xs">{p.email}</p>
                        <p className="text-[#EFD6AC]/40 text-xs">
                          Ref: {p.reference}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${p.status === "success" ? "bg-green-500/20 text-green-400" : p.status === "pending" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}
                        >
                          {p.status}
                        </span>
                        <p className="text-[#EFD6AC]/40 text-xs mt-1">
                          {new Date(p.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* ---- USERS TAB ---- */}
            <TabsContent value="users">
              <div className="bg-black border border-[#FF6542]/20 rounded-2xl p-6">
                <h2 className="text-lg font-black text-[#FF6542] uppercase mb-5">
                  Users ({users.length})
                </h2>
                <div className="space-y-3">
                  {users.length === 0 && (
                    <p className="text-[#EFD6AC]/40 text-sm text-center py-8">
                      No users yet.
                    </p>
                  )}
                  {users
                    .filter(
                      (u) =>
                        (u.fullName || "")
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        u.email
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()),
                    )
                    .map((u) => (
                      <div
                        key={u._id}
                        className="flex items-center justify-between p-4 border border-[#FF6542]/10 rounded-xl"
                      >
                        <div>
                          <p className="font-bold text-[#EFD6AC] text-sm">
                            {u.fullName}
                          </p>
                          <p className="text-[#EFD6AC]/50 text-xs">{u.email}</p>
                          {u.phone && (
                            <p className="text-[#EFD6AC]/40 text-xs">
                              {u.phone}
                            </p>
                          )}
                        </div>
                        <p className="text-[#EFD6AC]/40 text-xs">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}

"use client";

import { useState } from "react";
import { ShoppingBag, ChevronRight, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";

const merchItems = [
  {
    id: 2,
    name: "WKND Heritage Hoodie",
    price: 45000,
    category: "Apparel",
    image: "/merch/product-02.jpg",
    description: "Heavyweight fleece with orange accents.",
    tag: "Limited Edition",
  },
  {
    id: 3,
    name: "Global Tour Tote",
    price: 8000,
    category: "Accessories",
    image: "/merch/product-03.jpg",
    description: "Eco-friendly canvas for the global traveler.",
    tag: "New Arrival",
  },
  {
    id: 4,
    name: "Event Essentials Kit",
    price: 12000,
    category: "Bundles",
    image: "/merch/product-04.jpg",
    description: "Everything you need for a weekend of vibes.",
    tag: "Exclusive",
  },
  {
    id: 5,
    name: "Weekend Warrior Tee",
    price: 18000,
    category: "Apparel",
    image: "/merch/product-05.jpg",
    description: "Soft cotton blend with iconic 234WKND branding.",
    tag: "Popular",
  },
];

export default function MerchPage() {
  const [loadingItems, setLoadingItems] = useState<{ [key: number]: boolean }>(
    {},
  );
  const { addItem } = useCart();

  const handleQuickAdd = (item: (typeof merchItems)[0]) => {
    setLoadingItems((prev) => ({ ...prev, [item.id]: true }));

    addItem({
      id: item.id.toString(),
      title: item.name,
      price: item.price,
      image: item.image,
    });

    setTimeout(() => {
      setLoadingItems((prev) => ({ ...prev, [item.id]: false }));
    }, 1000);
  };
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />

      <main className="flex-1 pt-20 pb-16 overflow-hidden">
        {/* Hero Section */}
        <section className="relative px-6 py-12 md:py-16 max-w-6xl mx-auto">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6542]/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#EFD6AC]/20 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-[1px] w-8 bg-[#FF6542]" />
                <span className="text-[#EFD6AC] font-bold uppercase tracking-[0.2em] text-xs">
                  The Collection
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-[#FF6542] italic">
                WEAR THE
                <br />
                WKND
              </h1>
              <p className="text-base text-[#EFD6AC]/70 leading-relaxed mb-8 max-w-lg">
                Exclusive pieces designed for the global 234 community. Premium
                materials meet heritage aesthetics.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="default"
                  className="rounded-full bg-[#FF6542] hover:bg-[#FF6542]/80 text-white font-bold h-12 px-6"
                >
                  Explore All
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="rounded-full border-[#FF6542]/30 hover:bg-[#FF6542]/10 text-[#FF6542] h-12 px-6 bg-transparent"
                >
                  View Lookbook
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-3">
                ESSENTIAL PIECES
              </h2>
              <p className="text-muted-foreground">
                Curated drops for every vibe.
              </p>
            </div>
            <div className="flex gap-2">
              {["All", "Apparel", "Accessories", "Limited"].map((tab) => (
                <button
                  key={tab}
                  className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 hover:border-white transition-all"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {merchItems.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col bg-[#FF6542] rounded-2xl border border-[#FF6542]/20 overflow-hidden transition-all hover:border-[#FF6542]/40 hover:shadow-xl hover:shadow-[#FF6542]/10"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 rounded-full bg-black/80 backdrop-blur-sm text-[9px] font-black uppercase tracking-widest text-white">
                      {item.tag}
                    </span>
                  </div>
                  <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Button
                      onClick={() => handleQuickAdd(item)}
                      disabled={loadingItems[item.id]}
                      className="w-full rounded-lg bg-[#FF6542] text-white hover:bg-[#FF6542]/80 font-bold h-10 text-sm"
                    >
                      {loadingItems[item.id] ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        "Quick Add +"
                      )}
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/80 mb-2">
                    {item.category}
                  </p>
                  <h3 className="font-bold text-lg mb-2 text-white group-hover:text-white transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-white/70 line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-black text-white">
                      ₦{item.price.toLocaleString()}
                    </span>
                    <Link
                      href={`/merch/${item.id}`}
                      className="text-white/80 hover:text-white"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Shipping CTA */}
        <section className="px-6 py-12 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-secondary via-background to-primary/20 rounded-2xl p-8 md:p-12 border border-white/5 relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 relative z-10 italic">
              WORLDWIDE SHIPPING
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10">
              From Lagos to London, New York to Tokyo. We bring the 234 WKND
              experience directly to your doorstep.
            </p>
            <Button
              size="lg"
              className="rounded-full bg-accent hover:bg-accent/80 text-black font-bold h-12 px-8 relative z-10"
            >
              Track Your Order
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

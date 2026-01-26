import { ShoppingBag, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";

const merchItems = [
  {
    id: 1,
    name: "234 Signature Cap",
    price: 15000,
    category: "Accessories",
    image: "/placeholder.jpg", // Add your image here
    description: "Premium cotton with gold embroidered 234 logo.",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "WKND Heritage Hoodie",
    price: 45000,
    category: "Apparel",
    image: "/placeholder.jpg", // Add your image here
    description: "Heavyweight fleece with orange accents.",
    tag: "Limited Edition",
  },
  {
    id: 3,
    name: "Global Tour Tote",
    price: 8000,
    category: "Accessories",
    image: "/placeholder.jpg", // Add your image here
    description: "Eco-friendly canvas for the global traveler.",
    tag: "New Arrival",
  },
  {
    id: 4,
    name: "Event Essentials Kit",
    price: 12000,
    category: "Bundles",
    image: "/placeholder.jpg", // Add your image here
    description: "Everything you need for a weekend of vibes.",
    tag: "Exclusive",
  },
];

export default function MerchPage() {
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
                <span className="h-[1px] w-8 bg-white" />
                <span className="text-white font-bold uppercase tracking-[0.2em] text-xs">
                  The Collection
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-r from-foreground via-white to-foreground bg-clip-text text-transparent italic">
                WEAR THE
                <br />
                WKND
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Exclusive pieces designed for the global 234 community. Premium
                materials meet heritage aesthetics.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="default"
                  className="rounded-full bg-white hover:bg-white/80 text-black font-bold h-12 px-6"
                >
                  Explore All
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="rounded-full border-white/10 hover:bg-white/5 h-12 px-6 bg-transparent"
                >
                  View Lookbook
                </Button>
              </div>
            </div>

            <div className="relative w-full md:w-1/2 aspect-square group max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-700" />
              <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10 bg-card">
                {/* Add your hero image here */}
                <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 p-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl max-w-xs animate-fade-up">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-3 w-3 text-white fill-white" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white">
                      Limited Drop
                    </span>
                  </div>
                  <h3 className="font-bold text-base mb-1">Heritage 234 Cap</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Crafted from 100% premium gabardine.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-white">₦15,000</span>
                    <button className="h-7 w-7 rounded-full bg-white flex items-center justify-center text-black">
                      <ShoppingBag className="h-3 w-3" />
                    </button>
                  </div>
                </div>
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
                className="group relative flex flex-col bg-card rounded-2xl border border-white/5 overflow-hidden transition-all hover:border-white/30 hover:shadow-xl hover:shadow-white/5"
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
                    <span className="px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[9px] font-black uppercase tracking-widest text-black">
                      {item.tag}
                    </span>
                  </div>
                  <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Button className="w-full rounded-lg bg-white text-black hover:bg-white/80 hover:text-black font-bold h-10 text-sm">
                      Quick Add +
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    {item.category}
                  </p>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-white transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-black text-white">
                      ₦{item.price.toLocaleString()}
                    </span>
                    <Link
                      href={`/merch/${item.id}`}
                      className="text-muted-foreground hover:text-white"
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

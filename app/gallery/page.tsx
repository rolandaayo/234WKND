import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Sparkles, Camera } from "lucide-react";
import Link from "next/link";

export default function GalleryPage() {
  // Mock gallery images - replace with actual images
  const galleryImages = [
    {
      id: 1,
      src: "/placeholder.jpg",
      title: "Weekend Energy",
      category: "Events",
    },
    {
      id: 2,
      src: "/placeholder.jpg",
      title: "Global Weekends",
      category: "Events",
    },
    {
      id: 3,
      src: "/placeholder.jpg",
      title: "Night Party",
      category: "Events",
    },
    {
      id: 4,
      src: "/placeholder.jpg",
      title: "VIP Experience",
      category: "VIP",
    },
    {
      id: 5,
      src: "/placeholder.jpg",
      title: "Music Festival",
      category: "Events",
    },
    {
      id: 6,
      src: "/placeholder.jpg",
      title: "Cultural Showcase",
      category: "Events",
    },
    {
      id: 7,
      src: "/placeholder.jpg",
      title: "Exclusive Access",
      category: "VIP",
    },
    {
      id: 8,
      src: "/placeholder.jpg",
      title: "Weekend Vibes",
      category: "Events",
    },
    {
      id: 9,
      src: "/placeholder.jpg",
      title: "Night Life",
      category: "Events",
    },
    {
      id: 10,
      src: "/placeholder.jpg",
      title: "Premium Experience",
      category: "VIP",
    },
    {
      id: 11,
      src: "/placeholder.jpg",
      title: "Art & Culture",
      category: "Events",
    },
    {
      id: 12,
      src: "/placeholder.jpg",
      title: "Weekend Memories",
      category: "Events",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-accent/10 rounded-full blur-lg animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-1/4 w-20 h-20 bg-secondary/10 rounded-full blur-md animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <Navbar />

      <main className="flex-1 relative z-10 pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-[9px] font-black uppercase tracking-[0.2em] text-primary mb-6 backdrop-blur-sm">
                <Camera className="h-3 w-3" />
                Gallery
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase mb-4">
                Capture The
                <br />
                <span className="text-accent italic">Moment</span>
              </h1>
              <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto uppercase tracking-wide">
                Relive the energy, the vibes, and the unforgettable experiences
                from our weekend events
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <Button
                variant="outline"
                className="rounded-full border-white/20 text-white hover:bg-white/10 hover:border-primary transition-all"
              >
                All
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-white/20 text-white hover:bg-white/10 hover:border-primary transition-all"
              >
                Events
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-white/20 text-white hover:bg-white/10 hover:border-primary transition-all"
              >
                VIP
              </Button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className="group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 cursor-pointer"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Placeholder Background */}
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="h-12 w-12 text-primary/50 mx-auto mb-2" />
                      <span className="text-muted-foreground text-sm">
                        {image.title}
                      </span>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="mb-2">
                        <span className="inline-block px-2 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-[8px] font-black text-primary uppercase tracking-widest">
                          {image.category}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-lg uppercase tracking-tighter">
                        {image.title}
                      </h3>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <div className="inline-flex flex-col items-center gap-6 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 border border-primary/20 backdrop-blur-sm">
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter">
                  Want to See More?
                </h2>
                <p className="text-sm text-white/70 uppercase tracking-wide max-w-md">
                  Join our community to get exclusive access to event photos
                  and behind-the-scenes content
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-primary text-black font-black hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                  >
                    <Link href="/vip">Join VIP</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <Link href="/tickets">Get Tickets</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  // Mock cart items - replace with actual cart data
  const cartItems: any[] = [];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
              Shopping Cart
            </h1>
            <p className="text-sm text-white/70 uppercase tracking-wide">
              Review your items
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-card border border-white/10 rounded-2xl p-12 text-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Your cart is empty</h2>
              <p className="text-sm text-white/70 mb-6">
                Start adding items to your cart
              </p>
              <Button asChild className="bg-primary text-black font-black hover:bg-primary/90">
                <Link href="/tickets">Browse Events</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Cart items would go here */}
              <div className="bg-card border border-white/10 rounded-2xl p-6">
                <p className="text-white/70">Cart items will appear here</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}


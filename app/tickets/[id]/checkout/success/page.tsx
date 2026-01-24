"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  return [{ id: "1" }];
}

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get("orderId");
  const [order, setOrder] = useState<any | null>(null);

  useEffect(() => {
    if (!orderId) return;
    try {
      const raw = localStorage.getItem("orders");
      const orders = raw ? JSON.parse(raw) : [];
      const found = orders.find((o: any) => o.id === orderId);
      setOrder(found || null);
    } catch (err) {
      console.error(err);
      setOrder(null);
    }
  }, [orderId]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-background">
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-lg bg-card p-8 text-center">
              <h1 className="text-3xl font-bold">Purchase Complete</h1>
              <p className="mt-2 text-muted-foreground">
                Thank you for your purchase.
              </p>

              {!order && (
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground">
                    Order not found. It may not have been saved.
                  </p>
                  <div className="mt-4 flex justify-center">
                    <Link href="/tickets">
                      <Button>Back to Events</Button>
                    </Link>
                  </div>
                </div>
              )}

              {order && (
                <div className="mt-6 space-y-6">
                  <div className="mx-auto w-48 h-48 relative overflow-hidden rounded-lg">
                    <Image
                      src={order.event.image || "/placeholder.svg"}
                      alt={order.event.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">
                      {order.event.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {order.event.location} — {order.event.date}
                    </p>
                  </div>

                  <div className="rounded-lg border border-border p-4 text-left">
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-mono mt-1">{order.id}</p>

                    <div className="mt-3 flex justify-between">
                      <span>Quantity</span>
                      <span className="font-semibold">{order.quantity}</span>
                    </div>
                    <div className="mt-1 flex justify-between">
                      <span>Total</span>
                      <span className="font-semibold">
                        {order.event.currency} {order.total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <Link href="/tickets">
                      <Button variant="secondary">Back to Events</Button>
                    </Link>
                    <Button
                      onClick={() => {
                        // simple download of the order as JSON
                        const blob = new Blob(
                          [JSON.stringify(order, null, 2)],
                          { type: "application/json" },
                        );
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `${order.id}.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                    >
                      Download Receipt
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

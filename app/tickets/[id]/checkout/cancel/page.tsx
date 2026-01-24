"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-background">
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-lg bg-card p-8 text-center">
              <h1 className="text-3xl font-bold">Payment Cancelled</h1>
              <p className="mt-2 text-muted-foreground">
                Your payment was cancelled. No charges were made.
              </p>
              <div className="mt-6 flex justify-center">
                <Link href="/tickets">
                  <Button>Back to Events</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

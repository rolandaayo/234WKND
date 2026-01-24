"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type EventItem = {
  id: number;
  title: string;
  price: number | string;
  currency: string;
  image?: string;
};

export default function AddToCart({ item }: { item: EventItem }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    try {
      const raw = localStorage.getItem("cart");
      const cart = raw ? JSON.parse(raw) : [];
      // simple cart item
      const cartItem = { ...item, quantity: 1 };
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error(err);
      alert("Could not add to cart");
    }
  };

  return (
    <div>
      <Button
        onClick={handleAdd}
        size="lg"
        variant="default"
        className="w-full"
      >
        {added ? "Added" : "Add to Cart"}
      </Button>
    </div>
  );
}

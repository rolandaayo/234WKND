import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from "@/contexts/cart-context";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "+234WKND",
  description: "Global Weekends. Activated Worldwide 🌍",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`font-sans antialiased`}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0a0a0a",
              border: "1px solid rgba(255,101,66,0.3)",
              color: "#EFD6AC",
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}

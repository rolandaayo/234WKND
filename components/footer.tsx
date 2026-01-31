import Link from "next/link";
import { Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com/234wknd",
      label: "Instagram",
    },
    { icon: Mail, href: "mailto:234wknd@gmail.com", label: "Email" },
  ];

  return (
    <footer className="border-t border-[#FF6542]/20 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span
                className="text-2xl font-bold text-[#FF6542]"
                style={{ fontFamily: "Ch" }}
              >
                +234WKND
              </span>
            </Link>
          </div>

          {/* Social Links - Middle */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#FF6542]/30 bg-[#FF6542]/10 text-[#EFD6AC] transition-all hover:border-[#FF6542] hover:bg-[#FF6542] hover:text-white backdrop-blur-sm"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Get Tickets Button */}
          <div className="flex items-center">
            <Button
              asChild
              size="lg"
              className="h-12 px-8 rounded-full bg-[#FF6542] text-white font-bold transition-transform hover:scale-105 hover:bg-[#FF6542]/80"
            >
              <Link href="/tickets">Get Tickets</Link>
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-[#FF6542]/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p
              className="text-sm text-[#EFD6AC]/60"
              style={{ fontFamily: "Ch" }}
            >
              &copy; {new Date().getFullYear()} +234WKND. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-sm text-[#EFD6AC]/60 transition-colors hover:text-[#EFD6AC]"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-sm text-[#EFD6AC]/60 transition-colors hover:text-[#EFD6AC]"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-sm text-[#EFD6AC]/60 transition-colors hover:text-[#EFD6AC]"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

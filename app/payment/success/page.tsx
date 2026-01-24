"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Mail, Download, Calendar, MapPin } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const reference = searchParams.get("reference");

    if (reference) {
      verifyPayment(reference);
    } else {
      setError("No payment reference found");
      setIsVerifying(false);
    }
  }, [searchParams]);

  const verifyPayment = async (reference: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001"}/api/payments/verify-payment/${reference}`,
      );
      const data = await response.json();

      if (data.success) {
        setPaymentData(data.data);
        // Trigger QR code generation and email sending
        await generateAndSendTicket(data.data);
      } else {
        setError(data.error || "Payment verification failed");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      setError("Failed to verify payment");
    } finally {
      setIsVerifying(false);
    }
  };

  const generateAndSendTicket = async (payment: any) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001"}/api/payments/generate-ticket`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentReference: payment.reference,
            email: payment.customer.email,
            eventId: payment.metadata.eventId,
            fullName: payment.metadata.fullName,
          }),
        },
      );
    } catch (error) {
      console.error("Ticket generation error:", error);
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <h2 className="text-xl font-semibold mb-2">
                    Verifying Payment
                  </h2>
                  <p className="text-muted-foreground">
                    Please wait while we confirm your payment...
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <div className="text-red-500 mb-4">
                    <svg
                      className="h-12 w-12 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-red-600">
                    Payment Error
                  </h2>
                  <p className="text-muted-foreground mb-4">{error}</p>
                  <Button asChild>
                    <Link href="/tickets">Back to Events</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl text-green-600">
                Payment Successful!
              </CardTitle>
              <CardDescription>
                Your ticket has been confirmed and is being processed
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {paymentData && (
                <>
                  {/* Payment Details */}
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold">Payment Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Reference:
                        </span>
                        <p className="font-mono">{paymentData.reference}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Amount:</span>
                        <p className="font-semibold">
                          ₦{(paymentData.amount / 100).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <p>{paymentData.customer.email}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date:</span>
                        <p>
                          {new Date(paymentData.paid_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold">Event Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                          A Weekend Experience - April 5, 2026
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm">Amore Garden, Lagos</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Next Steps */}
              <div className="space-y-4">
                <h3 className="font-semibold">What's Next?</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Check Your Email</p>
                      <p className="text-sm text-muted-foreground">
                        Your ticket with QR code will be sent to your email
                        within 5 minutes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Download className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Save Your Ticket</p>
                      <p className="text-sm text-muted-foreground">
                        Download and save the QR code to your phone for easy
                        access at the event
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button asChild className="flex-1">
                  <Link href="/tickets">Browse More Events</Link>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>

              {/* Support */}
              <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Need help? Contact us at{" "}
                  <a
                    href="mailto:support@234wknd.com"
                    className="text-primary hover:underline"
                  >
                    support@234wknd.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

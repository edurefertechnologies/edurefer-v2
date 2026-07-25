"use client";

import { useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentButtonProps {
  slug: string;
}

export default function PaymentButton({
  slug,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Razorpay SDK must be loaded
      if (typeof window.Razorpay === "undefined") {
        alert(
          "Payment service is not available. Please refresh the page and try again."
        );

        return;
      }

      // Create order on our server
      const response = await fetch("/api/orders/create", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          slug,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          data.error ||
          "Unable to create payment order."
        );

        return;
      }

      const options = {
        key: data.key,
        amount: data.razorpayAmount,
        currency: data.currency,

        name: "Edurefer Technologies LLP",
        description: "Course Purchase",

        order_id: data.razorpayOrderId,

        handler: async function (
          response: any
        ) {
          try {
            const verifyResponse = await fetch(
              "/api/razorpay/verify",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify({
                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,
                }),
              }
            );

            const result =
              await verifyResponse.json();

            if (
              verifyResponse.ok &&
              result.success
            ) {
              const courseSlug =
                result.courseSlug || slug;

              window.location.href =
                `/payment/success?course=${encodeURIComponent(
                  courseSlug
                )}`;

              return;
            }

            alert(
              result.error ||
              "Payment verification failed."
            );
          } catch (error) {
            console.error(
              "PAYMENT_VERIFY_CLIENT_ERROR:",
              error
            );

            alert(
              "Payment was received, but verification could not be completed. Please contact support if the course does not appear in your account."
            );
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response: any) {
          console.error(
            "RAZORPAY_PAYMENT_FAILED:",
            response.error
          );

          setLoading(false);

          window.location.href =
            `/payment/failed?course=${encodeURIComponent(
              slug
            )}`;
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "PAYMENT_CLIENT_ERROR:",
        error
      );

      alert(
        "Something went wrong while starting the payment."
      );

      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={loading}
      className="w-full rounded-lg bg-white py-3 text-lg font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading
        ? "Processing..."
        : "Proceed to Payment"}
    </button>
  );
}
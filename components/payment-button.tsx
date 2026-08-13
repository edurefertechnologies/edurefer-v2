"use client";

import { useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentButtonProps {
  slug: string;
  type?: "COURSE" | "PDF" | "AI_CREDITS" | "PACKAGE";
}

export default function PaymentButton({
  slug,
  type = "COURSE",
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      if (typeof window.Razorpay === "undefined") {
        alert(
          "Payment service is not available. Please refresh the page and try again."
        );
        return;
      }

      const endpoint =
        type === "COURSE"
          ? "/api/orders/create"
          : "/api/orders/create-product";

      const body =
        type === "COURSE"
          ? { slug }
          : { slug, type };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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

        description:
          type === "COURSE"
            ? "Course Purchase"
            : type === "PDF"
              ? "PDF Purchase"
              : type === "AI_CREDITS"
                ? "AI Credits Purchase"
                : "Package Purchase",

        order_id: data.razorpayOrderId,

        handler: async function (
          response: any
        ) {
          try {
            const verifyResponse =
              await fetch(
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
              if (type === "COURSE") {
                const courseSlug =
                  result.courseSlug ||
                  slug;

                window.location.href =
                  `/payment/success?course=${encodeURIComponent(
                    courseSlug
                  )}`;
              } else {
                window.location.href =
                  `/payment/success?order=${encodeURIComponent(
                    result.orderId || data.orderId
                  )}`;
              }

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
              "Payment was received, but verification could not be completed. Please contact support."
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
            `/payment/failed?order=${encodeURIComponent(
              data.orderId
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
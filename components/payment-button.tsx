"use client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentButtonProps {
  slug: string;
}

export default function PaymentButton({ slug }: PaymentButtonProps) {
  const handlePayment = async () => {
    try {
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.error || "Unable to create order.");
        return;
      }

      const options = {
        key: data.key,
        amount: data.razorpayAmount,
        currency: data.currency,
        name: "Edurefer Technologies LLP",
        description: "Course Purchase",
        order_id: data.razorpayOrderId,

        handler: async function (response: any) {
          try {
            const verifyResponse = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const result = await verifyResponse.json();

            if (result.success) {
              window.location.href = "/payment/success";
            } else {
              alert(result.error || "Payment verification failed.");
            }
          } catch (error) {
            console.error(error);
            alert("Verification failed.");
          }
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full rounded-lg bg-white py-3 text-lg font-semibold text-black transition hover:bg-gray-200"
    >
      Proceed to Payment
    </button>
  );
}
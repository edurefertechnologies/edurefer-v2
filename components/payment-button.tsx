"use client";

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
  const handlePayment = async () => {
    try {
      const response = await fetch("/api/razorpay/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
      });

      const data = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Edurefer Technologies LLP",
        description: data.course.title,
        order_id: data.order.id,

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
              alert("✅ Payment Verified Successfully");
              console.log(result);
            } else {
              alert("❌ Payment Verification Failed");
              console.error(result);
            }
          } catch (error) {
            console.error(error);
            alert("Something went wrong");
          }
        },

        prefill: {
          name: "",
          email: "",
          contact: "",
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
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
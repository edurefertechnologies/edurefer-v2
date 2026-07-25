import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PaymentButton from "@/components/payment-button";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CheckoutPage({
  params,
}: Props) {
  const { slug } = await params;

  const course = await prisma.course.findUnique({
    where: {
      slug,
    },
    include: {
      product: true,
    },
  });

  if (!course) {
    notFound();
  }

  const originalPrice = Number(course.product.price);

  const sellingPrice =
    course.product.discountPrice !== null &&
      Number(course.product.discountPrice) > 0 &&
      Number(course.product.discountPrice) < originalPrice
      ? Number(course.product.discountPrice)
      : originalPrice;

  const discount = originalPrice - sellingPrice;

  return (
    <div className="container mx-auto max-w-5xl py-10">
      <h1 className="text-4xl font-bold">
        Checkout
      </h1>

      <div className="mt-8 rounded-xl border p-6">
        <h2 className="text-2xl font-semibold">
          {course.title}
        </h2>

        <p className="mt-2 text-muted-foreground">
          {course.description}
        </p>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between">
            <span>Course Price</span>

            <span>
              ₹{originalPrice.toLocaleString()}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>

              <span>
                -₹{discount.toLocaleString()}
              </span>
            </div>
          )}

          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">
                Total
              </span>

              <div className="text-right">
                <span className="text-2xl font-bold">
                  ₹{sellingPrice.toLocaleString()}
                </span>

                {discount > 0 && (
                  <span className="ml-2 text-sm text-muted-foreground line-through">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="pt-5">
            <PaymentButton slug={course.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
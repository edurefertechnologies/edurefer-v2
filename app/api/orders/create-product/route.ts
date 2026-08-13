export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getRazorpay } from "@/lib/razorpay";
import { getSession } from "@/lib/auth-server";
import { generateOrderNumber } from "@/lib/order";

export async function POST(req: Request) {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { slug, type } = await req.json();

    if (!slug || !type) {
      return NextResponse.json(
        {
          success: false,
          error: "Product details are required.",
        },
        { status: 400 }
      );
    }

    let name = "";
    let originalPrice = 0;
    let sellingPrice = 0;

    let productId: string | null = null;
    let packageId: string | null = null;

    /*
     * PRODUCT
     */

    if (
      type === "PDF" ||
      type === "AI_CREDITS"
    ) {
      const product =
        await prisma.product.findFirst({
          where: {
            slug,
            type,
            status: "PUBLISHED",
            isDeleted: false,
          },
        });

      if (!product) {
        return NextResponse.json(
          {
            success: false,
            error: "Product not found.",
          },
          { status: 404 }
        );
      }

      productId = product.id;
      name = product.name;

      originalPrice =
        Number(product.price);

      sellingPrice =
        product.discountPrice !== null &&
        Number(product.discountPrice) > 0 &&
        Number(product.discountPrice) <
          originalPrice
          ? Number(product.discountPrice)
          : originalPrice;
    }

    /*
     * PACKAGE
     */

    else if (type === "PACKAGE") {
      const pkg =
        await prisma.package.findFirst({
          where: {
            slug,
            status: "PUBLISHED",
          },
        });

      if (!pkg) {
        return NextResponse.json(
          {
            success: false,
            error: "Package not found.",
          },
          { status: 404 }
        );
      }

      packageId = pkg.id;
      name = pkg.name;

      originalPrice =
        Number(pkg.price);

      sellingPrice =
        pkg.discountPrice !== null &&
        Number(pkg.discountPrice) > 0 &&
        Number(pkg.discountPrice) <
          originalPrice
          ? Number(pkg.discountPrice)
          : originalPrice;
    }

    else {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid purchase type.",
        },
        { status: 400 }
      );
    }

    const discount =
      originalPrice - sellingPrice;

    /*
     * CREATE ORDER
     */

    const result =
      await prisma.$transaction(
        async (tx) => {
          const order =
            await tx.order.create({
              data: {
                orderNumber:
                  generateOrderNumber(),

                userId:
                  session.user.id,

                subtotal:
                  originalPrice,

                discount,

                tax: 0,

                total:
                  sellingPrice,

                currency: "INR",
              },
            });

          await tx.orderItem.create({
            data: {
              orderId: order.id,

              productId,

              packageId,

              quantity: 1,

              unitPrice:
                sellingPrice,

              totalPrice:
                sellingPrice,
            },
          });

          const payment =
            await tx.payment.create({
              data: {
                orderId: order.id,

                amount:
                  sellingPrice,

                currency: "INR",
              },
            });

          return {
            order,
            payment,
          };
        },
        {
          timeout: 15000,
        }
      );

    /*
     * RAZORPAY
     */

    const razorpay =
      getRazorpay();

    const razorpayOrder =
      await razorpay.orders.create({
        amount: Math.round(
          sellingPrice * 100
        ),

        currency: "INR",

        receipt:
          result.order.orderNumber,

        notes: {
          orderId:
            result.order.id,

          userId:
            session.user.id,

          productId:
            productId ?? "",

          packageId:
            packageId ?? "",

          type,
        },
      });

    await prisma.payment.update({
      where: {
        id: result.payment.id,
      },

      data: {
        razorpayOrderId:
          razorpayOrder.id,
      },
    });

    return NextResponse.json({
      success: true,

      orderId:
        result.order.id,

      razorpayOrderId:
        razorpayOrder.id,

      razorpayAmount:
        razorpayOrder.amount,

      currency:
        razorpayOrder.currency,

      key:
        process.env
          .NEXT_PUBLIC_RAZORPAY_KEY_ID,

      name,
    });
  } catch (error) {
    console.error(
      "CREATE_PRODUCT_ORDER_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
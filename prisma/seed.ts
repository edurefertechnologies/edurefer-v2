import {
  PrismaClient,
  ProductStatus,
  ProductType,
  CourseStatus,
  CourseLevel,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const product = await prisma.product.create({
    data: {
      name: "Full Stack Web Development",
      slug: "full-stack-web-development",
      description:
        "Complete Full Stack Development course using HTML, CSS, JavaScript, React, Next.js, Node.js and PostgreSQL.",
      shortDescription:
        "Become a Job Ready Full Stack Developer.",
      sku: "FSWD-001",
      type: ProductType.COURSE,
      status: ProductStatus.PUBLISHED,
      price: "49999.00",
      currency: "INR",
      isFeatured: true,
      publishedAt: new Date(),
    },
  });

  const course = await prisma.course.create({
    data: {
      productId: product.id,
      title: "Full Stack Web Development",
      slug: "full-stack-web-development",
      description:
        "Master Full Stack Web Development with real-world projects.",
      level: CourseLevel.BEGINNER,
      duration: "6 Months",
      status: CourseStatus.PUBLISHED,
    },
  });

  const htmlModule = await prisma.courseModule.create({
    data: {
      courseId: course.id,
      title: "HTML & CSS",
      sortOrder: 1,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        moduleId: htmlModule.id,
        title: "Introduction",
        sortOrder: 1,
        duration: 15,
        isPreview: true,
      },
      {
        moduleId: htmlModule.id,
        title: "HTML Basics",
        sortOrder: 2,
        duration: 30,
      },
      {
        moduleId: htmlModule.id,
        title: "CSS Fundamentals",
        sortOrder: 3,
        duration: 45,
      },
    ],
  });

  console.log("✅ Database seeded successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
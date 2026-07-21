import type {
  Course,
  Product,
  Enrollment,
  CourseModule,
  Lesson,
} from "@prisma/client";

type ProductForUI = Omit<Product, "price" | "discountPrice"> & {
  price: number;
  discountPrice: number | null;
};

export type CourseCardType = Course & {
  product: ProductForUI;
  enrollments: Enrollment[];
};

export type CourseDetailsType = Course & {
  product: ProductForUI;
  enrollments: Enrollment[];
  modules: (CourseModule & {
    lessons: Lesson[];
  })[];
};
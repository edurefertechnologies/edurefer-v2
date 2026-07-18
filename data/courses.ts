export type CourseLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export interface Course {
  slug: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: CourseLevel;
  students: number;
  rating: number;
  price: number;
  category: string;
  featured: boolean;
}

export const courses: Course[] = [
  {
    slug: "full-stack-development",
    title: "Full Stack Development",
    description:
      "Become a professional Full Stack Developer using modern technologies.",
    image: "/courses/fullstack.jpg",
    duration: "24 Weeks",
    level: "Beginner",
    students: 1250,
    rating: 4.9,
    price: 2999,
    category: "Development",
    featured: true,
  },
  {
    slug: "python-ai",
    title: "Python & AI",
    description:
      "Learn Python, Automation, Machine Learning and AI.",
    image: "/courses/python.jpg",
    duration: "20 Weeks",
    level: "Intermediate",
    students: 900,
    rating: 4.8,
    price: 4999,
    category: "AI",
    featured: true,
  },
  {
    slug: "java-backend",
    title: "Java Backend",
    description:
      "Master Java, Spring Boot and Enterprise Development.",
    image: "/courses/java.jpg",
    duration: "22 Weeks",
    level: "Intermediate",
    students: 780,
    rating: 4.9,
    price: 6999,
    category: "Backend",
    featured: true,
  },
];
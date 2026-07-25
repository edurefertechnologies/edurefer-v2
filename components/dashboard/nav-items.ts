import {
  BookOpen,
  Brain,
  CreditCard,
  GraduationCap,
  Home,
  Package,
  Settings,
  User,
  Users,
} from "lucide-react";

export const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Courses",
    href: "/courses",
    icon: BookOpen,
  },
  {
    title: "My Courses",
    href: "/my-courses",
    icon: GraduationCap,
  },
  {
    title: "AI Assistant",
    href: "/ai",
    icon: Brain,
  },
  {
    title: "Wallet",
    href: "/wallet",
    icon: CreditCard,
  },
  {
    title: "Referrals",
    href: "/referrals",
    icon: Users,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: Package,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
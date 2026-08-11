import {
  Bell,
  BookOpen,
  Bookmark,
  GraduationCap,
  Brain,
  CreditCard,
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
    title: "Saved Courses",
    href: "/saved-courses",
    icon: Bookmark,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "My Learning",
    href: "/my-courses",
    icon: GraduationCap,
  },
  {
    title: "AI Assistant",
    href: "/assistant",
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
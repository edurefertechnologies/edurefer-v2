import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaInstagram as Instagram,
  FaLinkedin as Linkedin,
} from "react-icons/fa6";

import Logo from "@/components/common/logo";
import Container from "./container";

const quickLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Courses",
    href: "/courses",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Placements",
    href: "/placements",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

const courseLinks = [
  {
    title: "Full Stack Development",
    href: "/courses/full-stack",
  },
  {
    title: "Python Development",
    href: "/courses/python",
  },
  {
    title: "Java Development",
    href: "/courses/java",
  },
  {
    title: "Artificial Intelligence",
    href: "/courses/ai",
  },
];

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/edurefer_official",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/edurefertechnologies",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/40 backdrop-blur-xl">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-4">
          {/* Company */}
          <div>
            <Logo />

            <p className="mt-5 text-sm text-muted-foreground leading-7">
              Learn. Build. Get Certified. Get Hired.
            </p>

            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ icon: Icon, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-xl border border-border p-2 transition hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="mb-5 font-semibold">
              Popular Courses
            </h3>

            <ul className="space-y-3">
              {courseLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-semibold">
              Contact
            </h3>

            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 text-primary" />

                <p>
                  Pune, Maharashtra
                </p>
              </div>

              <div className="flex gap-3">
                <Phone className="h-5 w-5 text-primary" />

                <p>+91 9607522003</p>
              </div>

              <div className="flex gap-3">
                <Mail className="h-5 w-5 text-primary" />

                <p>solutions@edurefertech.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} Edurefer. All rights reserved.
          </p>

          <p>
            Powered by{" "}
            <span className="font-medium text-primary">
              ITE Tech Solutions
            </span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
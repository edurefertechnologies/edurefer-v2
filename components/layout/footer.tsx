import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";

import {
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import Logo from "@/components/common/logo";

export default function Footer() {
  return (
    <footer className="min-h-[400px] bg-red-500 border-4 border-yellow-400">
      <div className="container-custom py-16">

        {/* Main Footer */}
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">

          {/* Brand */}
          <div className="space-y-6">

            <Logo />

            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              Learn. Build. Get Certified. Get Hired.
              <br />
              AI-powered learning designed to help students
              build industry-ready skills and grow their careers.
            </p>

            <div className="space-y-3 text-sm text-muted-foreground">

              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span>
                  Pune, Maharashtra, India
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>
                  +91 96075 22003
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>
                  solutions@edurefertech.com
                </span>
              </div>

            </div>

          </div>

          {/* Platform */}
          <div>

            <h3 className="mb-6 font-semibold">
              Platform
            </h3>

            <ul className="space-y-4">

              <li>
                <Link
                  href="/courses"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Courses
                </Link>
              </li>

              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Pricing
                </Link>
              </li>

              <li>
                <Link
                  href="/my-courses"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  My Learning
                </Link>
              </li>

              <li>
                <Link
                  href="/assistant"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  AI Assistant
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Digital Products
                </Link>
              </li>

            </ul>

          </div>

          {/* Resources */}
          <div>

            <h3 className="mb-6 font-semibold">
              Resources
            </h3>

            <ul className="space-y-4">

              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/refund"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Refund Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>

            </ul>

          </div>

          {/* Connect */}
          <div>

            <h3 className="mb-6 font-semibold">
              Connect With Us
            </h3>

            <p className="mb-5 max-w-xs text-sm leading-6 text-muted-foreground">
              Stay connected with Edurefer for new courses,
              career resources and learning updates.
            </p>

            <div className="flex gap-3">
              <Link
                href="https://www.instagram.com/edurefer_official/"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
              >
                <FaInstagram className="h-4 w-4" />
              </Link>

              <Link
                href="https://www.linkedin.com/company/edurefer-technologies/"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </Link>

            </div>

            {/* Developer */}
            <div className="mt-8 rounded-2xl border border-border bg-muted/30 p-5">

              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Designed & Developed by
              </p>

              <a
                href="https://itetechsolutions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-base font-semibold transition-colors hover:text-primary"
              >
                ITE Tech Solutions
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <p className="mt-1 text-xs text-muted-foreground">
                Software Development • IT Solutions • AI/ML • Cloud Solutions
              </p>

            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} Edurefer Technologies.
            All rights reserved.
          </p>

          <div className="flex items-center gap-6">

            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-primary"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-primary"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="transition-colors hover:text-primary"
            >
              Contact
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}
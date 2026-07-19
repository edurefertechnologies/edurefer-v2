import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { FaInstagram, FaFacebook, FaLinkedinIn }  from "react-icons/fa";

import Logo from "@/components/common/logo";
import { navigation } from "@/lib/navigation";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-custom py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Company */}
          <div className="space-y-5">
            <Logo />

            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Learn. Build. Get Certified. Get Hired.
              <br />
              AI-powered learning platform designed to help students build
              industry-ready skills.
            </p>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Pune, Maharashtra
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +91 XXXXX XXXXX
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                support@edurefer.com
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 font-semibold">
              Navigation
            </h3>

            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-5 font-semibold">
              Resources
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-primary"
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-primary"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-5 font-semibold">
              Connect
            </h3>

            <div className="flex gap-3">
              <Link
                href="#"
                className="rounded-xl border border-border p-3 transition hover:bg-muted"
              >
                <FaFacebook className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="rounded-xl border border-border p-3 transition hover:bg-muted"
              >
                <FaInstagram className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="rounded-xl border border-border p-3 transition hover:bg-muted"
              >
                <FaLinkedinIn className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} Edurefer. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-primary"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="hover:text-primary"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="hover:text-primary"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
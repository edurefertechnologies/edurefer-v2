import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes safely.
 *
 * Example:
 * cn("p-4", isActive && "bg-green-500")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency in INR.
 *
 * Example:
 * ₹12,500
 */
export function formatCurrency(
  amount: number,
  locale = "en-IN",
  currency = "INR"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format numbers.
 *
 * Example:
 * 1200 -> 1,200
 */
export function formatNumber(
  value: number,
  locale = "en-IN"
) {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Format date.
 *
 * Example:
 * 12 Jul 2026
 */
export function formatDate(
  date: Date | string,
  locale = "en-IN"
) {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Generate URL-friendly slug.
 */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

/**
 * Estimate reading time.
 *
 * Average reading speed:
 * 200 words/minute
 */
export function calculateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Truncate text.
 */
export function truncate(
  text: string,
  length = 120
) {
  if (text.length <= length) return text;

  return `${text.substring(0, length)}...`;
}

/**
 * Delay helper.
 */
export function sleep(ms: number) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}

/**
 * Generate random ID.
 * (Not for cryptographic use.)
 */
export function generateId(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  return Array.from({ length }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
}
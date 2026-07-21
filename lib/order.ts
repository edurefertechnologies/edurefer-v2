export function generateOrderNumber() {
  const date = new Date();

  const yyyy = date.getFullYear();

  const mm = String(date.getMonth() + 1).padStart(2, "0");

  const dd = String(date.getDate()).padStart(2, "0");

  const random = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  return `EDR-${yyyy}${mm}${dd}-${random}`;
}
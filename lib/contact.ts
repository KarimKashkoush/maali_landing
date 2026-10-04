export function whatsappLink(number: string, message: string) {
  const normalized = number.replace(/[\s()+-]/g, "");
  if (!/^[1-9]\d{7,14}$/.test(normalized)) return null;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

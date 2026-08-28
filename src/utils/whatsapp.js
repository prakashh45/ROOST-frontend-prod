export function openWhatsApp(message) {
  const phone = "919999999999"; // ROOST WhatsApp number

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

export function buildGuestStayMessage({
  property,
  checkIn,
  checkOut,
  nights,
  room,
  bed,
  guest,
  total,
}) {
  return `Hello ROOST 👋

I want to know more about my stay.

🏠 Property: ${property || "ROOST"}

📅 Check-in: ${checkIn || "-"}
📅 Check-out: ${checkOut || "-"}
🌙 Nights: ${nights || "-"}

🛏️ Room: ${room || "-"}
🛏️ Bed: ${bed || "-"}

👤 Guest: ${guest?.name || "-"}
📧 Email: ${guest?.email || "-"}
📱 Phone: ${guest?.phone || "-"}

💰 Total: ₹${total || "-"}
    
Please help me with my booking.`;
}
"use server";

export type BookingState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitBookingForm(
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const checkIn = formData.get("checkIn")?.toString().trim();
  const checkOut = formData.get("checkOut")?.toString().trim();
  const adults = Number(formData.get("adults") ?? 0);
  const children = Number(formData.get("children") ?? 0);
  const roomType = formData.get("roomType")?.toString().trim() || "Any / not specified";
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();

  if (!checkIn || !checkOut || !name || !email || !phone) {
    return { status: "error", message: "Please fill in all required fields." };
  }

  if (!Number.isFinite(adults) || adults < 1) {
    return { status: "error", message: "At least one adult is required." };
  }

  if (!Number.isFinite(children) || children < 0) {
    return { status: "error", message: "Children count cannot be negative." };
  }

  if (checkOut <= checkIn) {
    return { status: "error", message: "Check-out must be after check-in." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Check-in: ${checkIn}`,
    `Check-out: ${checkOut}`,
    `Adults: ${adults}`,
    `Children: ${children}`,
    `Room type: ${roomType}`,
  ].join("\n");

  try {
    // ponytail: same SMTP path as contact — swap provider in one place later if needed
    const smtpHost = process.env.SMTP_HOST;

    if (smtpHost) {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: (Number(process.env.SMTP_PORT) || 587) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_USER || `"Tea Tot Website" <noreply@teatot.co.ke>`,
        replyTo: `"${name}" <${email}>`,
        to: process.env.CONTACT_EMAIL || "info@teatot.co.ke",
        subject: `[Booking] ${name} — ${checkIn} to ${checkOut}`,
        text: body,
      });
    } else {
      console.log("[Booking Form]", body);
    }

    return {
      status: "success",
      message: "Thank you! We've received your booking request and will confirm shortly.",
    };
  } catch (err) {
    console.error("[Booking Form Error]", err);
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}

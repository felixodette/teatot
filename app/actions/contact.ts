"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitContactForm(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const subject = formData.get("subject")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !subject || !message) {
    return { status: "error", message: "All fields are required." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  if (message.length < 10) {
    return { status: "error", message: "Message must be at least 10 characters." };
  }

  try {
    // ponytail: SMTP sending isolated here. Swap for Resend/SendGrid/Mailgun
    // by replacing the body of this try block. No UI changes needed.
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
        from: `"${name}" <${email}>`,
        to: process.env.CONTACT_EMAIL || "info@teatot.co.ke",
        subject: `[Contact] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      });
    } else {
      // No SMTP configured — log submission for development
      console.log("[Contact Form]", { name, email, subject, message });
    }

    return { status: "success", message: "Thank you! We'll be in touch shortly." };
  } catch (err) {
    console.error("[Contact Form Error]", err);
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}

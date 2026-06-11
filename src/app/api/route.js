import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cleanEmailHeader(value) {
  return String(value || "")
    .replace(/[\r\n]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

export async function POST(request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          message: "Nama, email, dan pesan wajib diisi.",
        },
        {
          status: 400,
        },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          message: "Format email tidak valid.",
        },
        {
          status: 400,
        },
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        {
          message: "Nama terlalu panjang. Maksimal 100 karakter.",
        },
        {
          status: 400,
        },
      );
    }

    if (message.length > 3000) {
      return NextResponse.json(
        {
          message: "Pesan terlalu panjang. Maksimal 3000 karakter.",
        },
        {
          status: 400,
        },
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

    if (!gmailUser || !gmailAppPassword || !receiverEmail) {
      return NextResponse.json(
        {
          message:
            "Konfigurasi email server belum lengkap. Periksa GMAIL_USER, GMAIL_APP_PASSWORD, dan CONTACT_RECEIVER_EMAIL.",
        },
        {
          status: 500,
        },
      );
    }

    if (!isValidEmail(gmailUser) || !isValidEmail(receiverEmail)) {
      return NextResponse.json(
        {
          message:
            "Konfigurasi email server tidak valid. Periksa format GMAIL_USER dan CONTACT_RECEIVER_EMAIL.",
        },
        {
          status: 500,
        },
      );
    }

    const senderName = cleanEmailHeader(name);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    await transporter.sendMail({
      from: `"${senderName} via Website Portfolio" <${gmailUser}>`,
      to: receiverEmail,
      replyTo: `"${senderName}" <${email}>`,
      subject: `${senderName} mengirim pesan dari Website Portfolio`,
      text: `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2 style="margin: 0 0 16px;">Pesan Baru dari Website Portfolio</h2>

          <p style="margin: 0 0 8px;">
            <strong>Nama:</strong> ${safeName}
          </p>

          <p style="margin: 0 0 16px;">
            <strong>Email:</strong> ${safeEmail}
          </p>

          <div style="padding: 16px; border-radius: 12px; background: #f3f4f6; border: 1px solid #e5e7eb;">
            <strong>Pesan:</strong>
            <p style="margin: 12px 0 0;">${safeMessage}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      {
        message: "Pesan berhasil dikirim ke Gmail.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("CONTACT_EMAIL_ERROR:", error);

    return NextResponse.json(
      {
        message: "Pesan gagal dikirim. Coba lagi nanti.",
      },
      {
        status: 500,
      },
    );
  }
}

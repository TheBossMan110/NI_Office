// Local dev server to test /api/contact endpoint
// Run: node dev-server.js

import express from "express";
import { createServer as createViteServer } from "vite";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env file
config({ path: resolve(__dirname, ".env") });

async function startServer() {
  const app = express();
  app.use(express.json());

  // ── API route (mirrors api/contact.js) ──
  app.post("/api/contact", async (req, res) => {
    const { name, company, email, phone, service, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Name, email, and phone are required." });
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

    if (!brevoApiKey || !receiverEmail) {
      console.error("❌ Missing BREVO_API_KEY or CONTACT_RECEIVER_EMAIL in .env");
      return res.status(500).json({ error: "Server configuration error. Check .env file." });
    }

    console.log("📧 Sending email via Brevo...");
    console.log(`   To: ${receiverEmail}`);
    console.log(`   From: ${name} <${email}>`);

    const emailPayload = {
      sender: { name: "NI Office Website", email: "no-reply@nioffice.com" },
      to: [{ email: receiverEmail, name: "NI Office" }],
      replyTo: { email, name },
      subject: `New Enquiry from ${name}${service ? ` — ${service}` : ""}`,
      htmlContent: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #0057FF, #3b82f6); padding: 28px 32px;">
            <h1 style="color: white; margin: 0; font-size: 22px;">📩 New Contact Form Submission</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">NI For Office Equipment Trading Co. LLC</p>
          </div>
          <div style="padding: 28px 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; width: 130px;">Full Name</td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">${name}</td></tr>
              <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px;">Company</td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">${company || "N/A"}</td></tr>
              <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px;">Email</td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">${email}</td></tr>
              <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px;">Phone</td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">${phone}</td></tr>
              ${service ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px;">Service</td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">${service}</td></tr>` : ""}
            </table>
            ${message ? `<div style="margin-top: 20px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;"><p style="margin: 0 0 8px; color: #64748b; font-size: 13px;">Message</p><p style="margin: 0; color: #1e293b; line-height: 1.6;">${message}</p></div>` : ""}
          </div>
          <div style="padding: 16px 32px; background: #f1f5f9; text-align: center; font-size: 12px; color: #94a3b8;">Sent from nioffice.com contact form</div>
        </div>
      `,
    };

    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "api-key": brevoApiKey,
        },
        body: JSON.stringify(emailPayload),
      });

      if (response.ok) {
        console.log("✅ Email sent successfully!");
        return res.status(200).json({ success: true });
      } else {
        const errorData = await response.json();
        console.error("❌ Brevo API error:", JSON.stringify(errorData, null, 2));
        return res.status(500).json({ error: errorData.message || "Failed to send email." });
      }
    } catch (error) {
      console.error("❌ Network error:", error.message);
      return res.status(500).json({ error: "Failed to send email." });
    }
  });

  // ── Vite dev server as middleware ──
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);

  const PORT = 5173;
  app.listen(PORT, () => {
    console.log("");
    console.log("  ╔══════════════════════════════════════════╗");
    console.log("  ║  🚀 NI Office Dev Server Running!        ║");
    console.log(`  ║  🌐 http://localhost:${PORT}               ║`);
    console.log("  ║  📧 /api/contact endpoint is LIVE         ║");
    console.log("  ╚══════════════════════════════════════════╝");
    console.log("");
  });
}

startServer().catch(console.error);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, company, email, phone, service, message } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Name, email, and phone are required." });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

  if (!resendApiKey || !receiverEmail) {
    console.error("Missing RESEND_API_KEY or CONTACT_RECEIVER_EMAIL env vars");
    return res.status(500).json({ error: "Server configuration error." });
  }

  const senderEmail = process.env.SENDER_EMAIL || "onboarding@resend.dev";

  const emailPayload = {
    from: `${name} (via Website) <${senderEmail}>`,
    to: [receiverEmail],
    reply_to: email,
    subject: `New Enquiry from ${name}${service ? ` — ${service}` : ""}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0057FF, #3b82f6); padding: 28px 32px;">
          <h1 style="color: white; margin: 0; font-size: 22px;">📩 New Contact Form Submission</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">NI For Office Equipment Trading Co. LLC</p>
        </div>
        <div style="padding: 28px 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; width: 130px;">Full Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px;">Company</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">${company || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;"><a href="tel:${phone}" style="color: #2563eb;">${phone}</a></td>
            </tr>
            ${service ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px;">Service</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">${service}</td>
            </tr>` : ""}
          </table>
          ${message ? `
          <div style="margin-top: 24px; padding: 20px; background: white; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            <p style="margin: 0 0 10px; color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">User Response / Message</p>
            <p style="margin: 0; color: #1e293b; line-height: 1.6; white-space: pre-wrap; font-size: 15px;">${message}</p>
          </div>
          ` : ""}
        </div>
        <div style="padding: 16px 32px; background: #f1f5f9; text-align: center; font-size: 12px; color: #94a3b8;">
          Sent from nioffice.com contact form
        </div>
      </div>
    `,
  };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const errorData = await response.json();
      console.error("Resend API error:", JSON.stringify(errorData));
      return res.status(500).json({ error: errorData.message || "Failed to send email." });
    }
  } catch (error) {
    console.error("Network error:", error);
    return res.status(500).json({ error: "Failed to send email." });
  }
}

import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import path from "path"

// Local API plugin — handles /api/contact during `npm run dev`
function localApiPlugin() {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        for await (const chunk of req) {
          body += chunk;
        }

        const { name, company, email, phone, service, message } = JSON.parse(body);

        if (!name || !email || !phone) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Name, email, and phone are required.' }));
          return;
        }

        const resendApiKey = process.env.RESEND_API_KEY;
        const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

        if (!resendApiKey || !receiverEmail) {
          console.error('❌ Missing RESEND_API_KEY or CONTACT_RECEIVER_EMAIL in .env');
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Server config error. Check .env file.' }));
          return;
        }

        const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';

        console.log('📧 Sending email via Resend...');
        console.log(`   📤 From (Label): ${name} (via Website)`);
        console.log(`   📥 To (Recipient): ${receiverEmail}`);
        console.log(`   ✉️  Visitor Email: ${email}`);
        console.log(`   ↩️  Reply-To: ${email}`);
        console.log(`   ⚡ Actual Sender: ${senderEmail}`);

        const emailPayload = {
          from: `${name} (via Website) <${senderEmail}>`,
          to: [receiverEmail],
          reply_to: email,
          subject: `New Enquiry from ${name}${service ? ` — ${service}` : ''}`,
          html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
              <div style="background: linear-gradient(135deg, #0057FF, #3b82f6); padding: 28px 32px;">
                <h1 style="color: white; margin: 0; font-size: 22px;">📩 New Contact Form Submission</h1>
                <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">NI For Office Equipment Trading Co. LLC</p>
              </div>
              <div style="padding: 28px 32px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; width: 130px;">Full Name</td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">${name}</td></tr>
                  <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px;">Company</td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">${company || 'N/A'}</td></tr>
                  <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px;">Email</td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td></tr>
                  <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px;">Phone</td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;"><a href="tel:${phone}" style="color: #2563eb;">${phone}</a></td></tr>
                  ${service ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px;">Service</td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">${service}</td></tr>` : ''}
                </table>
                ${message ? `
                <div style="margin-top: 24px; padding: 20px; background: white; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                  <p style="margin: 0 0 10px; color: #64748b; font-size: 12px; font-weight: 700; uppercase; letter-spacing: 0.05em;">USER RESPONSE / MESSAGE</p>
                  <p style="margin: 0; color: #1e293b; line-height: 1.6; white-space: pre-wrap; font-size: 15px;">${message}</p>
                </div>
                ` : ''}
              </div>
              <div style="padding: 16px 32px; background: #f1f5f9; text-align: center; font-size: 12px; color: #94a3b8;">Sent from nioffice.com contact form</div>
            </div>
          `,
        };

        try {
          const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailPayload),
          });

          res.setHeader('Content-Type', 'application/json');

          if (response.ok) {
            console.log('✅ Email sent successfully!');
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true }));
          } else {
            const errorData = await response.json();
            console.error('❌ Resend API error:', JSON.stringify(errorData, null, 2));
            res.statusCode = 500;
            res.end(JSON.stringify({ error: errorData.message || 'Failed to send email.' }));
          }
        } catch (error) {
          console.error('❌ Network error:', error.message);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Failed to send email.' }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [
      localApiPlugin(),
      react(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
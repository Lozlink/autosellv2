import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

let client: SESClient | null = null;

function getSESClient() {
  if (!client) {
    const region = process.env.AWS_SES_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error('Missing AWS SES environment variables');
    }

    client = new SESClient({
      region,
      credentials: { accessKeyId, secretAccessKey },
    });
  }
  return client;
}

export interface QuoteEmailData {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: string;
  vehicle_description: string;
  message: string;
  vin_or_reg: string;
}

export async function sendQuoteEmail(data: QuoteEmailData): Promise<void> {
  const sesClient = getSESClient();
  const fromEmail = process.env.SES_FROM_EMAIL;
  const toEmail = process.env.SES_TO_EMAIL;

  if (!fromEmail || !toEmail) {
    throw new Error('Missing SES_FROM_EMAIL or SES_TO_EMAIL environment variables');
  }

  const htmlBody = `
    <h2>New Quote Request from Auto-Sell.ai</h2>
    <hr />
    <h3>Contact Details</h3>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email || 'Not provided'}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Postcode:</strong> ${data.postcode}</p>
    <hr />
    <h3>Vehicle Details</h3>
    <p><strong>Make:</strong> ${data.vehicle_make}</p>
    <p><strong>Model:</strong> ${data.vehicle_model}</p>
    <p><strong>Year:</strong> ${data.vehicle_year}</p>
    <p><strong>Rego/VIN:</strong> ${data.vin_or_reg || 'N/A'}</p>
    <p><strong>Description:</strong> ${data.vehicle_description || 'N/A'}</p>
    <hr />
    <h3>Message</h3>
    <p>${data.message || 'No additional message'}</p>
  `;

  const command = new SendEmailCommand({
    Source: fromEmail,
    Destination: {
      ToAddresses: [toEmail],
    },
    Message: {
      Subject: {
        Data: `New Quote Request: ${data.vehicle_year} ${data.vehicle_make} ${data.vehicle_model}`,
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: htmlBody,
          Charset: 'UTF-8',
        },
      },
    },
  });

  await sesClient.send(command);
}

/**
 * Send a friendly branded confirmation to the customer who just submitted the
 * enquiry form. Designed to be called non-blocking — if it throws (e.g. SES
 * outage, missing email field), the caller should swallow it so the seller's
 * lead is still saved and the team notification still goes out.
 */
export async function sendCustomerConfirmationEmail(data: QuoteEmailData): Promise<void> {
  if (!data.email || !data.email.includes('@')) return;

  const sesClient = getSESClient();
  const fromEmail = process.env.SES_FROM_EMAIL;
  if (!fromEmail) throw new Error('Missing SES_FROM_EMAIL environment variable');

  const firstName = (data.name || '').split(' ')[0] || 'there';

  // Build a customer-facing description of the vehicle. The form falls back to
  // literal placeholder strings ("Unknown", "Pending lookup", "Rego ABC123")
  // when AutoGrab can't enrich a rego in time — surfacing those in an email
  // reads terrible ("Unknown Rego ABC123 Pending lookup"). Strip them out and
  // degrade gracefully to either the bare rego or a generic phrase.
  const PLACEHOLDERS = new Set(['', 'Unknown', 'Pending lookup', 'N/A']);
  const isMakePlaceholder = (s: string) =>
    PLACEHOLDERS.has(s) || /^Rego\s+/i.test(s);
  const cleanYear  = PLACEHOLDERS.has(data.vehicle_year || '')  ? '' : (data.vehicle_year  || '').trim();
  const cleanMake  = isMakePlaceholder(data.vehicle_make || '') ? '' : (data.vehicle_make  || '').trim();
  const cleanModel = PLACEHOLDERS.has(data.vehicle_model || '') ? '' : (data.vehicle_model || '').trim();
  const parts = [cleanYear, cleanMake, cleanModel].filter(Boolean);

  let carLine: string;
  if (parts.length > 0) {
    carLine = parts.join(' ');
  } else if (data.vin_or_reg && data.vin_or_reg !== 'manual_entry') {
    carLine = `vehicle (rego ${data.vin_or_reg.toUpperCase()})`;
  } else {
    carLine = 'your car';
  }

  const htmlBody = `<!DOCTYPE html>
<html lang="en-AU"><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#FBF6EC;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1f2937;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FBF6EC;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(15,23,42,0.06);">
        <tr><td style="background:#2B303A;padding:24px 32px;">
          <a href="https://www.auto-sell.ai" style="display:inline-block;background:#ffffff;padding:6px 12px;border-radius:8px;text-decoration:none;line-height:0;">
            <img src="https://www.auto-sell.ai/brand-guideline/autosell-logo/PNG/1%20(1).png" alt="Auto-Sell.ai" height="36" style="display:block;height:36px;width:auto;border:0;outline:none;"/>
          </a>
          <h1 style="margin:14px 0 0 0;font-size:22px;color:#ffffff;font-weight:800;">We&rsquo;ve got your enquiry, ${firstName}.</h1>
          <div style="height:3px;background:#FFC325;margin:18px -32px -24px -32px;"></div>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <p style="margin:0 0 14px 0;font-size:15px;line-height:1.65;color:#374151;">
            Thanks for sending us the details on your <strong style="color:#111827;">${carLine}</strong>. One of our team will be in touch within 30 minutes during business hours with your free, no-obligation AI-powered valuation.
          </p>
          <p style="margin:0 0 14px 0;font-size:15px;line-height:1.65;color:#374151;">
            If you accept the offer, we&rsquo;ll arrange a free pickup at a time that suits you and pay you on the spot via OSKO — funds in your bank account in seconds.
          </p>
          <div style="margin:24px 0;padding:18px 20px;background:#FFFAEB;border:1px solid rgba(255,195,37,0.28);border-radius:10px;">
            <div style="font-size:11px;font-weight:700;letter-spacing:0.16em;color:#92560A;text-transform:uppercase;margin-bottom:8px;">What happens next</div>
            <ol style="margin:0;padding-left:18px;font-size:14px;line-height:1.65;color:#374151;">
              <li>We review the vehicle details you submitted.</li>
              <li>You get a fair, data-backed valuation in your inbox within 30 minutes.</li>
              <li>Accept the offer online &mdash; or walk away, zero pressure.</li>
              <li>We collect the car and pay via OSKO the same day.</li>
            </ol>
          </div>
          <p style="margin:0 0 6px 0;font-size:14px;color:#6b7280;">Need to talk to us in the meantime?</p>
          <p style="margin:0 0 20px 0;font-size:16px;font-weight:700;color:#111827;">
            <a href="tel:0492858699" style="color:#111827;text-decoration:none;">&#9742;&nbsp;0492 858 699</a> &middot; open 7 days
          </p>
          <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.55;">
            You&rsquo;re receiving this because you submitted an enquiry at <a href="https://www.auto-sell.ai" style="color:#92560A;">auto-sell.ai</a>. No marketing follow-up &mdash; just your valuation.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const textBody = `Hi ${firstName},

Thanks for sending us the details on your ${carLine}. Our team will be in touch within 30 minutes during business hours with your free, no-obligation AI-powered valuation.

What happens next:
  1. We review the vehicle details you submitted.
  2. You get a fair, data-backed valuation within 30 minutes.
  3. Accept the offer online — or walk away, zero pressure.
  4. We collect the car and pay via OSKO the same day.

Need to talk to us in the meantime? Call 0492 858 699 (open 7 days).

— The Auto-Sell.ai team
https://www.auto-sell.ai`;

  const command = new SendEmailCommand({
    Source: `Auto-Sell.ai <${fromEmail}>`,
    Destination: { ToAddresses: [data.email] },
    Message: {
      Subject: {
        Data: `We've got your enquiry, ${firstName} — your Auto-Sell.ai valuation is on the way`,
        Charset: 'UTF-8',
      },
      Body: {
        Html: { Data: htmlBody, Charset: 'UTF-8' },
        Text: { Data: textBody, Charset: 'UTF-8' },
      },
    },
  });

  await sesClient.send(command);
}

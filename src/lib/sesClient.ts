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

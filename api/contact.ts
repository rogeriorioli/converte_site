import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, message } = req.body;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error('Missing RESEND_API_KEY environment variable.');
    return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
  }

  const resend = new Resend(apiKey);

  try {
    console.log('Receiving lead form:', { name, email });
    
    // 1. Save to Audience
    try {
      await resend.contacts.create({
        email,
        firstName: name,
        unsubscribed: false,
        audienceId: '52b77564-1d9c-4151-9d01-de941f87ce99',
      });
      console.log('Lead saved to audience successfully.');
    } catch (contactError: any) {
      console.error('Error saving to Resend audience:', contactError);
      // We'll continue even if audience save fails, or you can choose to return 500
    }

    // 2. Send email notification
    await resend.emails.send({
      from: 'Converte Global <onboarding@resend.dev>',
      to: 'crorioli81@gmail.com',
      subject: `Novo Lead: ${name}`,
      html: `
        <h1>Novo Lead Recebido</h1>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Mensagem:</strong><br/>${message}</p>
      `,
    });
    console.log('Notification email sent successfully.');

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Resend API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to process contact form', 
      details: error.message 
    });
  }
}

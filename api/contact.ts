import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, message } = req.body;

  try {
    // 1. Save to Audience
    await resend.contacts.create({
      email,
      firstName: name,
      unsubscribed: false,
      audienceId: '52b77564-1d9c-4151-9d01-de941f87ce99',
    });

    // 2. Send email notification
    await resend.emails.send({
      from: 'Converte Global <onboarding@resend.dev>',
      to: 'crorioli81@gmail.com',
      subject: `Novo Lead: ${name}`,
      html: `
        <h1>Novo Lead Recebido </h1>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Mensagem:</strong><br/>${message}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Vercel API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

import express from 'express';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/contact', async (req, res) => {
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
        <h1>Novo Lead Recebido</h1>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Mensagem:</strong><br/>${message}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !phone) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    // 1. Save to Audience (Contacts)
    await resend.contacts.create({
      email,
      firstName: name,
      unsubscribed: false,
      audienceId: '52b77564-1d9c-4151-9d01-de941f87ce99',
    });

    // 2. Send notification email to you
    await resend.emails.send({
      from: 'Converte LEAD <emails@mails.convertesites.com.br>',
      to: 'crorioli81@gmail.com',
      subject: 'Novo Lead: ' + name,
      html: `
        <h1>Novo Lead Recebido</h1>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Mensagem:</strong><br/>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error('Error in contact form:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

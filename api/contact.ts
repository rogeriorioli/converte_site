import { Resend } from "resend";

type ContactClient = Pick<Resend, "emails" | "contacts">;

export function createContactHandler(
  createClient: (key: string) => ContactClient = (key) => new Resend(key),
) {
  return async function handler(req: any, res: any) {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const body = req.body;
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return res.status(400).json({ error: "Invalid contact details" });
    }
    const fields = ["name", "email", "phone", "message"] as const;
    if (fields.some((field) => typeof body[field] !== "string")) {
      return res.status(400).json({ error: "Invalid contact details" });
    }
    const name = body.name.trim();
    const email = body.email.trim();
    const phone = body.phone.trim();
    const message = body.message.trim();
    if (
      name.length < 2 ||
      name.length > 100 ||
      /[\r\n]/.test(name) ||
      email.length > 180 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      phone.length > 25 ||
      phone.replace(/\D/g, "").length < 8 ||
      message.length < 10 ||
      message.length > 5200
    ) {
      return res.status(400).json({ error: "Invalid contact details" });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey)
      return res.status(500).json({ error: "Contact service unavailable" });

    try {
      const resend = createClient(apiKey);
      const { data, error } = await resend.emails.send({
        from: "Converte LEAD <emails@mails.convertesites.com.br>",
        to: "crorioli81@gmail.com",
        replyTo: email,
        subject: `Novo Lead: ${name}`,
        text: `Novo contato pelo site da Converte\n\nNome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\n\n${message}`,
      });
      if (error || !data?.id) {
        console.error("Contact notification rejected by email provider.");
        return res
          .status(502)
          .json({ error: "Failed to process contact form" });
      }

      // A notification already accepted by the provider must not be reported as
      // failed if saving the contact separately is temporarily unavailable.
      let audienceTimer: ReturnType<typeof setTimeout> | undefined;
      try {
        const contact = await Promise.race([
          resend.contacts.create({
            email,
            firstName: name,
            unsubscribed: false,
            audienceId: "52b77564-1d9c-4151-9d01-de941f87ce99",
          }),
          new Promise<null>((resolve) => {
            audienceTimer = setTimeout(() => resolve(null), 1000);
          }),
        ]);
        if (!contact || contact.error)
          console.error("Contact audience update failed.");
      } catch {
        console.error("Contact audience update failed.");
      } finally {
        if (audienceTimer) clearTimeout(audienceTimer);
      }
      return res.status(200).json({ success: true });
    } catch {
      console.error("Contact notification failed.");
      return res.status(502).json({ error: "Failed to process contact form" });
    }
  };
}

export default createContactHandler();

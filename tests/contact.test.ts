import assert from "node:assert/strict";
import { after, test } from "node:test";
import { createContactHandler } from "../api/contact";

const previousKey = process.env.RESEND_API_KEY;
process.env.RESEND_API_KEY = "test-only-not-a-real-key";
after(() => {
  if (previousKey === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = previousKey;
});

const valid = {
  name: "Teste de formulário",
  email: "teste@example.com",
  phone: "(48) 90000-0000",
  message: "Interesse: Aplicações web\n\nPrecisamos de um portal de pedidos.",
};

async function request(
  options: {
    method?: string;
    body?: unknown;
    result?: unknown;
    throws?: boolean;
    audienceFails?: boolean;
    audiencePending?: boolean;
  } = {},
) {
  let status = 0;
  let body: any;
  const sent: any[] = [];
  const headers: Record<string, string> = {};
  const client = {
    emails: {
      send: async (email: unknown) => {
        sent.push(email);
        if (options.throws) throw new Error("Offline");
        return options.result ?? { data: { id: "test-email-id" }, error: null };
      },
    },
    contacts: {
      create: async () => {
        if (options.audiencePending) return new Promise(() => {});
        if (options.audienceFails) throw new Error("Audience unavailable");
        return { data: { id: "test-contact" }, error: null };
      },
    },
  };
  const handler = createContactHandler(() => client as any);
  const res = {
    setHeader: (key: string, value: string) => {
      headers[key] = value;
    },
    status: (value: number) => {
      status = value;
      return res;
    },
    json: (value: unknown) => {
      body = value;
      return res;
    },
  };
  await handler(
    {
      method: options.method ?? "POST",
      body: options.body === undefined ? valid : options.body,
    },
    res,
  );
  return { status, body, sent, headers };
}

test("rejects unsupported methods without sending an email", async () => {
  const result = await request({ method: "GET" });
  assert.equal(result.status, 405);
  assert.equal(result.headers.Allow, "POST");
  assert.equal(result.sent.length, 0);
});

test("rejects missing, malformed and oversized details before calling the provider", async () => {
  for (const body of [
    null,
    [],
    {},
    { ...valid, email: "invalid" },
    { ...valid, name: "a\nInjected" },
    { ...valid, phone: "invalid" },
    { ...valid, message: "x".repeat(5201) },
  ]) {
    const result = await request({ body });
    assert.equal(result.status, 400);
    assert.equal(result.sent.length, 0);
  }
});

test("returns success only when the email provider accepts the notification", async () => {
  const result = await request();
  assert.equal(result.status, 200);
  assert.deepEqual(result.body, { success: true });
  assert.equal(result.sent[0].replyTo, valid.email);
  assert.ok(result.sent[0].text.includes("Aplicações web"));
  assert.equal(result.sent[0].html, undefined);
});

test("does not report provider rejection or network failure as success", async () => {
  for (const options of [
    { result: { data: null, error: { message: "Rejected" } } },
    { throws: true },
  ]) {
    const result = await request(options);
    assert.equal(result.status, 502);
    assert.equal(result.body.success, undefined);
  }
});

test("does not fail an accepted notification when the audience update fails", async () => {
  const result = await request({ audienceFails: true });
  assert.equal(result.status, 200);
  assert.deepEqual(result.body, { success: true });
});

test(
  "returns success within a bounded time when an optional audience update stalls",
  { timeout: 3000 },
  async () => {
    const started = Date.now();
    const result = await request({ audiencePending: true });
    assert.equal(result.status, 200);
    assert.deepEqual(result.body, { success: true });
    assert.ok(Date.now() - started < 2500);
  },
);

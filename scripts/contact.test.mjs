import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/contact.js";
function response() {
  return {
    code: 200,
    headers: {},
    setHeader(k, v) {
      this.headers[k] = v;
    },
    status(code) {
      this.code = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}
const valid = {
  name: "Test Person",
  email: "test@example.com",
  message: "A meaningful project inquiry.",
};
function request(body = valid, extra = {}) {
  return {
    method: "POST",
    headers: {
      host: "portfolio.test",
      origin: "https://portfolio.test",
      "content-type": "application/json",
      "x-forwarded-for": crypto.randomUUID(),
    },
    body,
    ...extra,
  };
}
test("rejects unsupported methods and cross-origin posts", async () => {
  for (const [req, code] of [
    [request(valid, { method: "GET" }), 405],
    [
      request(valid, {
        headers: { host: "portfolio.test", origin: "https://other.test" },
      }),
      403,
    ],
  ]) {
    const res = response();
    await handler(req, res);
    assert.equal(res.code, code);
  }
});
test("validates fields and content type before delivery", async () => {
  for (const req of [
    request({ ...valid, email: "bad" }),
    request({ ...valid, message: "short" }),
    request({ ...valid, name: " " }),
    request({ ...valid, message: "x".repeat(4001) }),
  ]) {
    const res = response();
    await handler(req, res);
    assert.equal(res.code, 400);
  }
  const res = response();
  await handler(
    request(valid, { headers: { "content-type": "text/plain" } }),
    res,
  );
  assert.equal(res.code, 415);
});
test("honeypot is accepted without outbound delivery", async () => {
  const res = response();
  await handler(request({ ...valid, website: "spam" }), res);
  assert.deepEqual(res.body, { ok: true });
});
test("missing server credentials returns actionable unavailable status", async () => {
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_CHAT_ID;
  const res = response();
  await handler(request(), res);
  assert.equal(res.code, 503);
});
test("sends plain text through the server and validates upstream response", async () => {
  const original = globalThis.fetch;
  process.env.TELEGRAM_BOT_TOKEN = "test-only";
  process.env.TELEGRAM_CHAT_ID = "test-only";
  let sent;
  globalThis.fetch = async (_url, options) => {
    sent = JSON.parse(options.body);
    return { ok: true, json: async () => ({ ok: true }) };
  };
  try {
    const res = response();
    await handler(request({ ...valid, name: "*Test*" }), res);
    assert.equal(res.code, 200);
    assert.equal(sent.parse_mode, undefined);
    assert.match(sent.text, /\*Test\*/);
    globalThis.fetch = async () => ({
      ok: true,
      json: async () => ({ ok: false }),
    });
    const failed = response();
    await handler(request(), failed);
    assert.equal(failed.code, 502);
  } finally {
    globalThis.fetch = original;
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
  }
});
test("limits repeated submissions per instance", async () => {
  const req = request();
  for (let i = 0; i < 5; i++) await handler(req, response());
  const res = response();
  await handler(req, res);
  assert.equal(res.code, 429);
  assert.ok(res.headers["Retry-After"]);
});

test("rejects malformed payloads and excessive fields", async () => {
  for (const body of [
    null,
    "text",
    {},
    { ...valid, name: "x".repeat(101) },
    { ...valid, email: "a".repeat(255) + "@test.com" },
    { ...valid, message: "x".repeat(3501) },
  ]) {
    const res = response();
    await handler(request(body), res);
    assert.equal(res.code, 400);
  }
});
test("upstream exceptions return generic errors without leaking credentials", async () => {
  const original = globalThis.fetch;
  process.env.TELEGRAM_BOT_TOKEN = "test-only";
  process.env.TELEGRAM_CHAT_ID = "test-only";
  globalThis.fetch = async () => {
    throw new Error("test-only");
  };
  try {
    const res = response();
    await handler(request(), res);
    assert.equal(res.code, 502);
    assert.equal(JSON.stringify(res.body).includes("test-only"), false);
    assert.equal(res.headers["Cache-Control"], "no-store");
  } finally {
    globalThis.fetch = original;
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
  }
});
test("maximum valid message stays below Telegram text limit", async () => {
  const original = globalThis.fetch;
  process.env.TELEGRAM_BOT_TOKEN = "test-only";
  process.env.TELEGRAM_CHAT_ID = "test-only";
  let text = "";
  globalThis.fetch = async (_url, options) => {
    text = JSON.parse(options.body).text;
    return { ok: true, json: async () => ({ ok: true }) };
  };
  try {
    const res = response();
    await handler(
      request({
        name: "a".repeat(100),
        email: "a".repeat(240) + "@example.com",
        message: "x".repeat(3500),
      }),
      res,
    );
    assert.equal(res.code, 200);
    assert.ok(text.length < 4096);
  } finally {
    globalThis.fetch = original;
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
  }
});

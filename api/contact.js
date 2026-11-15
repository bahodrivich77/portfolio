/** Vercel Node function. Tokens are server-only; never use VITE_ for secrets. */
const requests = new Map();
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  const origin = req.headers.origin;
  const host = req.headers.host;
  if (origin) {
    try {
      if (new URL(origin).host !== host)
        return res.status(403).json({ error: "Invalid origin" });
    } catch {
      return res.status(403).json({ error: "Invalid origin" });
    }
  }
  if (!String(req.headers["content-type"] || "").startsWith("application/json"))
    return res.status(415).json({ error: "Expected JSON" });
  const body = req.body;
  if (!body || typeof body !== "object")
    return res.status(400).json({ error: "Invalid request" });
  const { name, email, message, website } = body;
  if (website) return res.status(200).json({ ok: true });
  if (
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.length > 100 ||
    typeof email !== "string" ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== "string" ||
    message.trim().length < 10 ||
    message.length > 3500
  )
    return res.status(400).json({ error: "Invalid fields" });
  const now = Date.now();
  for (const [key, value] of requests)
    if (value.reset < now) requests.delete(key);
  // Best-effort per-instance limit; use a durable edge rate limit for high traffic.
  const ip = String(req.headers["x-forwarded-for"] || "unknown")
    .split(",")[0]
    .trim();
  const previous = requests.get(ip);
  if (previous && previous.count >= 5) {
    res.setHeader(
      "Retry-After",
      String(Math.ceil((previous.reset - now) / 1000)),
    );
    return res.status(429).json({ error: "Please try again later" });
  }
  requests.set(ip, {
    count: (previous?.count || 0) + 1,
    reset: previous?.reset || now + 600000,
  });
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId)
    return res.status(503).json({ error: "Contact service is not configured" });
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(10000),
        body: JSON.stringify({
          chat_id: chatId,
          text: `Portfolio message\n\nName: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
        }),
      },
    );
    const result = await response.json();
    if (!response.ok || !result.ok)
      return res.status(502).json({ error: "Delivery failed" });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: "Delivery unavailable" });
  }
}

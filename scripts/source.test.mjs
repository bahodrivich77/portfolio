import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? files(join(dir, entry.name)) : join(dir, entry.name),
  );
}
test("browser source contains no Telegram credential references or bot URLs", () => {
  for (const path of files("src")) {
    const source = readFileSync(path, "utf8");
    assert.doesNotMatch(
      source,
      /VITE_BOT_TOKEN|VITE_CHAT_ID|api\.telegram\.org\/bot|TELEGRAM_BOT_TOKEN/,
    );
  }
});
test("all translation locales preserve project content and use consistent shape", async () => {
  const { translations } = await import("../src/i18n/translations.js");
  function shape(value) {
    return Array.isArray(value)
      ? value.map(shape)
      : value && typeof value === "object"
        ? Object.fromEntries(
            Object.entries(value).map(([key, item]) => [key, shape(item)]),
          )
        : typeof value;
  }
  assert.deepEqual(shape(translations.uz), shape(translations.en));
  assert.deepEqual(shape(translations.ru), shape(translations.en));
  for (const locale of Object.values(translations))
    assert.equal(locale.projects.items.length, 3);
});
test("canonical, favicon, and sitemap point to actual resources", () => {
  const html = readFileSync("index.html", "utf8");
  assert.match(html, /href="\/favicon.svg"/);
  assert.match(html, /rel="canonical" href="https:\/\/mirkarim.uz\/"/);
  assert.doesNotMatch(
    readFileSync("public/sitemap.xml", "utf8"),
    /\/en|\/uz|\/ru/,
  );
  assert.ok(readFileSync("public/favicon.svg", "utf8").includes("<svg"));
});

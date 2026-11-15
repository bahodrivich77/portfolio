import { readFileSync } from "node:fs";
let failed = false;
for (const device of ["mobile", "desktop"]) {
  const report = JSON.parse(
    readFileSync(`lighthouse-results/${device}.report.json`, "utf8"),
  );
  const scores = Object.fromEntries(
    Object.entries(report.categories).map(([key, value]) => [
      key,
      Math.round(value.score * 100),
    ]),
  );
  const metrics = Object.fromEntries(
    [
      "first-contentful-paint",
      "largest-contentful-paint",
      "total-blocking-time",
      "cumulative-layout-shift",
      "speed-index",
    ].map((key) => [key, report.audits[key].displayValue]),
  );
  console.log(JSON.stringify({ device, scores, metrics }, null, 2));
  if (
    ["performance", "accessibility", "best-practices", "seo"].some(
      (key) => scores[key] < 95,
    )
  )
    failed = true;
}
if (failed) {
  console.error(
    "A required Lighthouse category is below the 95 target. Inspect the uploaded reports.",
  );
  process.exitCode = 1;
}

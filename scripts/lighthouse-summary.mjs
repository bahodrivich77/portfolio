import { readFileSync } from "node:fs";
const required = ["performance", "accessibility", "best-practices", "seo"];
const median = (values) =>
  [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
let failed = false;
for (const device of ["mobile", "desktop"]) {
  const names =
    device === "mobile" ? ["mobile-1", "mobile-2", "mobile-3"] : ["desktop"];
  const samples = names.map((name) => {
    const report = JSON.parse(
      readFileSync(`lighthouse-results/${name}.report.json`, "utf8"),
    );
    return {
      sample: name,
      scores: Object.fromEntries(
        Object.entries(report.categories).map(([key, value]) => [
          key,
          Math.round(value.score * 100),
        ]),
      ),
      metrics: Object.fromEntries(
        [
          "first-contentful-paint",
          "largest-contentful-paint",
          "total-blocking-time",
          "cumulative-layout-shift",
          "speed-index",
        ].map((key) => [key, report.audits[key].displayValue]),
      ),
    };
  });
  const scores = Object.fromEntries(
    required.map((key) => [
      key,
      key === "performance"
        ? median(samples.map((sample) => sample.scores[key]))
        : Math.min(...samples.map((sample) => sample.scores[key])),
    ]),
  );
  console.log(
    JSON.stringify(
      {
        device,
        methodology:
          device === "mobile"
            ? "median performance from three cold runs; minimum other required categories"
            : "single cold run",
        scores,
        samples,
      },
      null,
      2,
    ),
  );
  if (required.some((key) => scores[key] < 95)) failed = true;
}
if (failed) {
  console.error(
    "A required Lighthouse category is below the 95 target. Inspect all uploaded reports.",
  );
  process.exitCode = 1;
}

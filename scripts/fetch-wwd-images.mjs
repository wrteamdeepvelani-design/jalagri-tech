/**
 * Downloads free Pexels stock images for the What-We-Do pages (services,
 * maintenance, outlets, manufacturing, trading) into page-specific folders.
 * The irrigation-and-landscaping page's images are NOT touched.
 *
 * Pexels licence: free to use, no attribution required.
 * Run: node scripts/fetch-wwd-images.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = "public/images/what-we-do";

// [destination (relative to ROOT), pexelsId, width, height]
const JOBS = [
  // ---------------- SERVICES (grid + detail + mask) ----------------
  ["services/hero.jpg", 20854824, 1280, 594],
  ["services/grid-1.jpg", 11174201, 800, 600], // Survey
  ["services/grid-2.jpg", 9751100, 800, 600], // Design
  ["services/grid-3.jpg", 29560008, 800, 600], // Installation
  ["services/grid-4.jpg", 7994649, 800, 600], // Consultation
  ["services/t1-a.jpg", 34247810, 800, 600],
  ["services/t1-b.jpg", 11174190, 800, 600],
  ["services/t2-a.jpg", 36930873, 800, 600],
  ["services/t2-b.jpg", 32938346, 800, 600],
  ["services/t3-a.jpg", 35366710, 800, 600],
  ["services/t3-b.jpg", 20527522, 800, 600],
  ["services/t4-a.jpg", 31673795, 800, 600],
  ["services/t4-b.jpg", 35366701, 800, 600],

  // ---------------- MAINTENANCE (impact + detail + stats) ----------------
  ["maintenance/hero.jpg", 5163420, 1280, 594],
  ["maintenance/impact.jpg", 5163432, 1280, 600],
  ["maintenance/stats.jpg", 6728933, 1000, 1000],
  ["maintenance/t1-a.jpg", 5163426, 800, 600],
  ["maintenance/t1-b.jpg", 5163422, 800, 600],
  ["maintenance/t2-a.jpg", 6728925, 800, 600],
  ["maintenance/t2-b.jpg", 5163419, 800, 600],
  ["maintenance/t3-a.jpg", 5163429, 800, 600],
  ["maintenance/t3-b.jpg", 16327475, 800, 600],
  ["maintenance/t4-a.jpg", 29821815, 800, 600],
  ["maintenance/t4-b.jpg", 34861784, 800, 600],
  ["maintenance/t5-a.jpg", 37305278, 800, 600],
  ["maintenance/t5-b.jpg", 25324586, 800, 600],

  // ---------------- OUTLETS (grid + detail + mask) ----------------
  ["outlets/o-hero.jpg", 6508556, 1280, 594],
  ["outlets/o-grid-1.jpg", 6508425, 800, 600],
  ["outlets/o-grid-2.jpg", 6777855, 800, 600],
  ["outlets/o-grid-3.jpg", 6508965, 800, 600],
  ["outlets/o-grid-4.jpg", 12096571, 800, 600],
  ["outlets/o-t1-a.jpg", 6508827, 800, 600],
  ["outlets/o-t1-b.jpg", 11678302, 800, 600],
  ["outlets/o-t2-a.jpg", 6511177, 800, 600],
  ["outlets/o-t2-b.jpg", 2460945, 800, 600],
  ["outlets/o-t3-a.jpg", 32938348, 800, 600],
  ["outlets/o-t3-b.jpg", 32918609, 800, 600],
  ["outlets/o-t4-a.jpg", 28254609, 800, 600],
  ["outlets/o-t4-b.jpg", 29556194, 800, 600],

  // ---------------- MANUFACTURING (cards + stats + detail + mask) ----------------
  ["manufacturing/m-hero.jpg", 7178310, 1280, 594],
  ["manufacturing/m-stats.jpg", 6937714, 1000, 1000],
  ["manufacturing/m-t1-a.jpg", 36676746, 800, 600],
  ["manufacturing/m-t1-b.jpg", 18740763, 800, 600],
  ["manufacturing/m-t2-a.jpg", 37226176, 800, 600],
  ["manufacturing/m-t2-b.jpg", 34718930, 800, 600],
  ["manufacturing/m-t3-a.jpg", 34718922, 800, 600],
  ["manufacturing/m-t3-b.jpg", 6034676, 800, 600],

  // ---------------- TRADING (grid + impact + detail) ----------------
  ["trading/hero.jpg", 17180355, 1280, 594],
  ["trading/grid-1.jpg", 29301874, 800, 600], // Pipes
  ["trading/grid-2.jpg", 9658236, 800, 600], // Fertilizers
  ["trading/grid-3.jpg", 30839537, 800, 600], // Seeds
  ["trading/impact.jpg", 14845870, 1280, 600],
];

let ok = 0,
  fail = 0;
for (const [rel, id, w, h] of JOBS) {
  const dest = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const url =
    `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg` +
    `?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 4000) throw new Error(`too small (${buf.length}b)`);
    fs.writeFileSync(dest, buf);
    console.log(`OK   ${rel.padEnd(28)} ${(buf.length / 1024).toFixed(0)}KB`);
    ok++;
  } catch (e) {
    console.log(`FAIL ${rel.padEnd(28)} ${e.message}`);
    fail++;
  }
}
console.log(`\nDone: ${ok} downloaded, ${fail} failed.`);

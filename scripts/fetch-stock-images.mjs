/**
 * Downloads free Pexels stock images for the irrigation-and-landscaping page
 * and writes them to public/images/what-we-do/. Keeps the "By the Numbers"
 * image (irrigation-2.png) untouched. Originals are backed up once to
 * public/images/what-we-do/_original-backup/ so the change is reversible.
 *
 * Pexels licence: free to use, no attribution required.
 * Run: node scripts/fetch-stock-images.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = "public/images/what-we-do";
const BACKUP = path.join(ROOT, "_original-backup");

// [destination, pexelsId, width, height]
const JOBS = [
  // Irrigation (landscape 1280x594)
  ["irrigation/irrigation-1.jpg", 17765487, 1280, 594], // hero — sprinkler farm
  ["irrigation/irrigation-2.jpg", 10606633, 1280, 594], // drip irrigation
  ["irrigation/irrigation-3.jpg", 29396001, 1280, 594], // drip irrigation crops
  ["irrigation/irrigation-4.jpg", 31231190, 1280, 594], // sprinkler field
  // Landscaping (landscape 1040x488)
  ["landscaping/landscaping-1.jpg", 33162373, 1040, 488], // landscaped garden
  ["landscaping/landscaping-2.jpg", 37639780, 1040, 488], // garden
  ["landscaping/landscaping-3.jpg", 10772470, 1040, 488], // stone pathway
  ["landscaping/landscaping-4.jpg", 32959283, 1040, 488], // pathway
  // Landscaping larger (1032x774)
  ["landscaping/landscaping-5.jpg", 35115306, 1032, 774], // garden
  ["landscaping/landscaping-6.jpg", 32759035, 1032, 774], // garden
  // Miyawaki forest (1032x774)
  ["miyawaki/miyawaki-1.jpg", 12067501, 1032, 774], // lush forest
  ["miyawaki/miyawaki-2.jpg", 13291279, 1032, 774], // forest
];

fs.mkdirSync(BACKUP, { recursive: true });

let ok = 0,
  fail = 0;

for (const [rel, id, w, h] of JOBS) {
  const dest = path.join(ROOT, rel);
  const url =
    `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg` +
    `?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

  // Back up the original once.
  const backupPath = path.join(BACKUP, rel.replace("/", "__"));
  if (fs.existsSync(dest) && !fs.existsSync(backupPath)) {
    fs.copyFileSync(dest, backupPath);
  }

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 5000) throw new Error(`too small (${buf.length}b)`);
    fs.writeFileSync(dest, buf);
    console.log(`OK   ${rel.padEnd(34)} ${(buf.length / 1024).toFixed(0)}KB`);
    ok++;
  } catch (e) {
    console.log(`FAIL ${rel.padEnd(34)} ${e.message}`);
    fail++;
  }
}

console.log(`\nDone: ${ok} downloaded, ${fail} failed. Backups in ${BACKUP}`);

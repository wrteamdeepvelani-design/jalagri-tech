/**
 * Downloads 3 wide mask banners, then rewrites the image paths in each
 * What-We-Do page JSON to point at the freshly-downloaded page-specific
 * stock images. Irrigation-and-landscaping JSON is left untouched.
 *
 * Run: node scripts/wire-wwd-images.mjs
 */
import fs from "node:fs";
import path from "node:path";

const IMG_ROOT = "public/images/what-we-do";
const DATA_ROOT = "src/data/what-we-do";

// --- 1. download wide mask banners ---
const MASKS = [
  ["services/mask.jpg", 10605816],
  ["outlets/mask.jpg", 27624218],
  ["manufacturing/mask.jpg", 34182297],
];
for (const [rel, id] of MASKS) {
  const dest = path.join(IMG_ROOT, rel);
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=340`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log(`mask OK  ${rel} ${(buf.length / 1024).toFixed(0)}KB`);
  } catch (e) {
    console.log(`mask FAIL ${rel} ${e.message}`);
  }
}

// --- 2. remap JSON image paths ---
const P = (rel) => "/images/what-we-do/" + rel;
const MAP = {
  services: {
    hero: P("services/hero.jpg"),
    grid: [1, 2, 3, 4].map((n) => P(`services/grid-${n}.jpg`)),
    thumbs: [1, 2, 3, 4].map((n) => [P(`services/t${n}-a.jpg`), P(`services/t${n}-b.jpg`)]),
    mask: P("services/mask.jpg"),
  },
  maintenance: {
    hero: P("maintenance/hero.jpg"),
    impact: P("maintenance/impact.jpg"),
    stats: P("maintenance/stats.jpg"),
    thumbs: [1, 2, 3, 4, 5].map((n) => [P(`maintenance/t${n}-a.jpg`), P(`maintenance/t${n}-b.jpg`)]),
  },
  outlets: {
    hero: P("outlets/o-hero.jpg"),
    grid: [1, 2, 3, 4].map((n) => P(`outlets/o-grid-${n}.jpg`)),
    thumbs: [1, 2, 3, 4].map((n) => [P(`outlets/o-t${n}-a.jpg`), P(`outlets/o-t${n}-b.jpg`)]),
    mask: P("outlets/mask.jpg"),
  },
  manufacturing: {
    hero: P("manufacturing/m-hero.jpg"),
    stats: P("manufacturing/m-stats.jpg"),
    thumbs: [1, 2, 3].map((n) => [P(`manufacturing/m-t${n}-a.jpg`), P(`manufacturing/m-t${n}-b.jpg`)]),
    mask: P("manufacturing/mask.jpg"),
  },
  trading: {
    hero: P("trading/hero.jpg"),
    grid: [1, 2, 3].map((n) => P(`trading/grid-${n}.jpg`)),
    impact: P("trading/impact.jpg"),
  },
};

for (const [slug, m] of Object.entries(MAP)) {
  const file = path.join(DATA_ROOT, `${slug}.json`);
  const d = JSON.parse(fs.readFileSync(file, "utf8"));

  if (m.hero) d.heroImage = m.hero;
  if (m.mask && "maskImage" in d) d.maskImage = m.mask;
  if (m.impact && d.impact) d.impact.background = m.impact;
  if (m.stats && d.statistics) d.statistics.image = m.stats;
  if (m.grid && Array.isArray(d.gridCards))
    d.gridCards.forEach((c, i) => {
      if (m.grid[i]) c.image = m.grid[i];
    });
  if (m.thumbs && Array.isArray(d.topics))
    d.topics.forEach((t, i) => {
      if (Array.isArray(t.thumbnails) && t.thumbnails.length && m.thumbs[i]) {
        t.thumbnails = m.thumbs[i].slice(0, t.thumbnails.length);
      }
    });

  fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
  console.log(`wired ${slug}.json`);
}
console.log("Done.");

/**
 * Self-check: dining teaser matches coffee/pizza rate card “from” prices.
 * Run: node scripts/check-dining-menu.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const raw = JSON.parse(readFileSync(join(root, "framer-local/cms/dining-menu.json"), "utf8"));

const expect = {
  "margherita-pizza": 600,
  "chicken-bbq-pizza": 600,
  "meat-deluxe-pizza": 650,
  cappuccino: 200,
  latte: 200,
  mocha: 220,
};

let failed = 0;
for (const [slug, price] of Object.entries(expect)) {
  const item = raw.items.find((i) => i._slug === slug);
  const got = item?.Price?.value;
  if (got !== price) {
    console.error(`FAIL ${slug}: got ${got}, want ${price}`);
    failed++;
  } else {
    console.log(`ok ${slug} from ${price}`);
  }
}

if (Object.keys(expect).length !== 6) {
  console.error("FAIL expect map size");
  failed++;
}
if (raw.items.filter((i) => !i._draft).length !== 6) {
  console.error("FAIL need exactly 6 live items");
  failed++;
}

if (failed) process.exit(1);
console.log("dining menu teaser ok");

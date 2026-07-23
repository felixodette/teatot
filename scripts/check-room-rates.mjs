/**
 * Self-check: B&B single/double rates match rate card.
 * Run: node scripts/check-room-rates.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const raw = JSON.parse(readFileSync(join(root, "framer-local/cms/rooms.json"), "utf8"));

const expect = {
  "classic-room": [4700, 6400],
  "family-room": [4700, 6400],
  "deluxe-room": [6200, 7400],
  "junior-suite": [7200, 8900],
};

let failed = 0;
for (const [slug, [single, dbl]] of Object.entries(expect)) {
  const item = raw.items.find((i) => i._slug === slug && i._draft !== true);
  const gotS = item?.["Price Single"]?.value;
  const gotD = item?.["Price Double"]?.value;
  const from = item?.["Price Per Night"]?.value;
  if (gotS !== single || gotD !== dbl || from !== single) {
    console.error(`FAIL ${slug}: got single=${gotS} double=${gotD} from=${from}, want ${single}/${dbl}`);
    failed++;
  } else {
    console.log(`ok ${slug} ${single}/${dbl}`);
  }
}

if (failed) process.exit(1);
console.log("room rates ok");

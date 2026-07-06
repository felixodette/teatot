#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { createHash } from "node:crypto";

const CMS_DIR = "framer-local/cms";
const OUT_DIR = "public/images";
const MANIFEST_DIR = "migration";
const MAX_RETRIES = 3;
const VALID_IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif"]);

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

function discover() {
  const files = readdirSync(CMS_DIR).filter((f) => f.endsWith(".json"));
  const found = [];
  const seen = new Set();

  for (const file of files) {
    const data = JSON.parse(readFileSync(join(CMS_DIR, file), "utf-8"));
    const collection = data.collection;
    const collectionSlug = slugify(collection);

    if (!data.items) continue;

    for (const item of data.items) {
      const itemSlug = item._slug || item._id;

      for (const [fieldName, field] of Object.entries(item)) {
        if (fieldName.startsWith("_")) continue;
        if (field?.type !== "image" || !field?.value?.url) continue;

        const { url, id, altText } = field.value;
        if (seen.has(url)) continue;
        seen.add(url);

        found.push({
          originalUrl: url,
          filename: id || url.split("/").pop(),
          collection: collectionSlug,
          itemSlug,
          altText: altText || "",
          fieldName,
        });
      }
    }
  }

  return found;
}

async function downloadOne(url, dest) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      writeFileSync(dest, buf);
      return true;
    } catch (err) {
      if (attempt === MAX_RETRIES) {
        console.error(`    \x1b[31m✗\x1b[0m Failed after ${MAX_RETRIES} attempts: ${err.message}`);
        return false;
      }
      const wait = attempt * 1000;
      console.log(`    ↻ Retry ${attempt}/${MAX_RETRIES} in ${wait}ms...`);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
}

async function downloadAll(images) {
  let downloaded = 0;
  let failed = 0;

  for (const img of images) {
    const dir = join(OUT_DIR, img.collection);
    mkdirSync(dir, { recursive: true });

    const dest = join(dir, img.filename);
    const localPath = `/${join("images", img.collection, img.filename)}`;
    img.localPath = localPath;

    process.stdout.write(`  ↓ ${img.collection}/${img.filename} ... `);
    const ok = await downloadOne(img.originalUrl, dest);

    if (ok) {
      downloaded++;
      console.log("\x1b[32mOK\x1b[0m");
    } else {
      failed++;
      img.error = "download failed";
    }
  }

  return { downloaded, failed };
}

function verify(images) {
  const results = [];

  for (const img of images) {
    if (img.error) {
      results.push({ ...img, valid: false, reason: img.error });
      continue;
    }

    const filePath = join(OUT_DIR, img.collection, img.filename);
    const stat = statSync(filePath, { throwIfNoEntry: false });

    if (!stat || stat.size === 0) {
      results.push({ ...img, valid: false, reason: "empty file" });
      continue;
    }

    const ext = extname(img.filename).toLowerCase();
    if (!VALID_IMAGE_EXTS.has(ext)) {
      results.push({ ...img, valid: false, reason: `unknown extension: ${ext}` });
      continue;
    }

    const hash = createHash("sha256").update(readFileSync(filePath)).digest("hex");

    results.push({
      ...img,
      valid: true,
      sha256: hash,
      sizeBytes: stat.size,
    });
  }

  return results;
}

function writeManifest(verified, stats) {
  mkdirSync(MANIFEST_DIR, { recursive: true });

  const manifest = {
    generatedAt: new Date().toISOString(),
    totalImages: verified.length,
    downloaded: stats.downloaded,
    failed: stats.failed,
    images: verified.map((img) => ({
      originalUrl: img.originalUrl,
      localPath: img.localPath,
      collection: img.collection,
      itemSlug: img.itemSlug,
      altText: img.altText,
      sha256: img.sha256 || null,
      sizeBytes: img.sizeBytes || 0,
    })),
  };

  writeFileSync(join(MANIFEST_DIR, "image-manifest.json"), JSON.stringify(manifest, null, 2));

  const rewriteMap = {};
  for (const img of verified) {
    if (img.valid) rewriteMap[img.originalUrl] = img.localPath;
  }
  writeFileSync(join(MANIFEST_DIR, "url-rewrite-map.json"), JSON.stringify(rewriteMap, null, 2));

  const byCollection = {};
  for (const img of verified) {
    byCollection[img.collection] = (byCollection[img.collection] || 0) + 1;
  }

  const lines = [
    "# Image Migration Report",
    "",
    `Generated: ${manifest.generatedAt}`,
    "",
    "## Summary",
    "",
    `| Metric | Count |`,
    `|--------|-------|`,
    `| Total discovered | ${manifest.totalImages} |`,
    `| Downloaded | ${stats.downloaded} |`,
    `| Failed | ${stats.failed} |`,
    `| Verified valid | ${verified.filter((i) => i.valid).length} |`,
    "",
    "## By Collection",
    "",
    `| Collection | Images |`,
    `|------------|--------|`,
    ...Object.entries(byCollection).map(([c, n]) => `| ${c} | ${n} |`),
    "",
    "## Image Details",
    "",
    ...verified.map((img) => {
      const status = img.valid ? "OK" : `FAILED (${img.reason})`;
      const size = img.sizeBytes ? `${(img.sizeBytes / 1024).toFixed(1)} KB` : "—";
      return `- **${img.collection}/${img.filename}** — ${status}, ${size}`;
    }),
    "",
  ];

  writeFileSync(join(MANIFEST_DIR, "image-report.md"), lines.join("\n"));
}

async function main() {
  console.log("\n\x1b[1m━━━ Asset Migration Pipeline ━━━\x1b[0m\n");

  console.log("\x1b[36m[1/5] Discovery\x1b[0m");
  const images = discover();
  console.log(`  Found ${images.length} unique images across ${[...new Set(images.map((i) => i.collection))].length} collections\n`);

  if (images.length === 0) {
    console.log("  Nothing to download. Exiting.");
    return;
  }

  console.log("\x1b[36m[2/5] Download\x1b[0m");
  const stats = await downloadAll(images);
  console.log(`\n  ${stats.downloaded} downloaded, ${stats.failed} failed\n`);

  console.log("\x1b[36m[3/5] Verify\x1b[0m");
  const verified = verify(images);
  const validCount = verified.filter((i) => i.valid).length;
  const invalidCount = verified.filter((i) => !i.valid).length;
  console.log(`  ${validCount} valid, ${invalidCount} invalid\n`);

  console.log("\x1b[36m[4/5] Generate Manifest\x1b[0m");
  writeManifest(verified, stats);
  console.log(`  → ${MANIFEST_DIR}/image-manifest.json`);
  console.log(`  → ${MANIFEST_DIR}/image-report.md\n`);

  console.log("\x1b[36m[5/5] URL Rewrite Map\x1b[0m");
  console.log(`  → ${MANIFEST_DIR}/url-rewrite-map.json\n`);

  const icon = stats.failed === 0 ? "\x1b[32m✓\x1b[0m" : "\x1b[33m⚠\x1b[0m";
  console.log(`${icon} Migration complete: ${stats.downloaded}/${images.length} images\n`);
}

main().catch((err) => {
  console.error("\x1b[31mFatal:\x1b[0m", err);
  process.exit(1);
});

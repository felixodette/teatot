#!/usr/bin/env node
/** Local fallback: build + stage. Prefer git push → GitHub Actions or cPanel .cpanel.yml. */
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

console.log("▸ Building Next.js (standalone)…");
execSync("npm run build", { cwd: root, stdio: "inherit" });
execSync("node scripts/stage-standalone.mjs", { cwd: root, stdio: "inherit" });

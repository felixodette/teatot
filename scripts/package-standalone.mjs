#!/usr/bin/env node
/**
 * Build Next.js standalone output and stage it for cPanel upload.
 * Output: deploy/development/ (upload entire folder to public_html/development)
 */
import { cpSync, mkdirSync, rmSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const standalone = resolve(root, ".next/standalone");
const outDir = resolve(root, "deploy/development");

console.log("▸ Building Next.js (standalone)…");
execSync("npm run build", { cwd: root, stdio: "inherit" });

if (!statSync(resolve(standalone, "server.js")).isFile()) {
  console.error("✗ Missing .next/standalone/server.js — is output: 'standalone' set?");
  process.exit(1);
}

console.log("▸ Packaging deploy/development…");
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

cpSync(standalone, outDir, { recursive: true });
cpSync(resolve(root, ".next/static"), resolve(outDir, ".next/static"), {
  recursive: true,
});
cpSync(resolve(root, "public"), resolve(outDir, "public"), { recursive: true });

// ponytail: Passenger watches tmp/restart.txt to reload after deploy
mkdirSync(resolve(outDir, "tmp"), { recursive: true });

console.log(`✓ Ready: ${outDir}`);
console.log("  Upload this folder to public_html/development on cPanel.");

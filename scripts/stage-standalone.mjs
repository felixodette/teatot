#!/usr/bin/env node
/**
 * Stage .next/standalone + static + public into deploy/development/.
 * Run after `npm run build`.
 */
import { cpSync, mkdirSync, rmSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const standalone = resolve(root, ".next/standalone");
const outDir = resolve(root, "deploy/development");

if (!statSync(resolve(standalone, "server.js")).isFile()) {
  console.error("✗ Missing .next/standalone/server.js — run npm run build first");
  process.exit(1);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

cpSync(standalone, outDir, { recursive: true });
cpSync(resolve(root, ".next/static"), resolve(outDir, ".next/static"), {
  recursive: true,
});
cpSync(resolve(root, "public"), resolve(outDir, "public"), { recursive: true });
mkdirSync(resolve(outDir, "tmp"), { recursive: true });

console.log(`✓ Staged: ${outDir}`);

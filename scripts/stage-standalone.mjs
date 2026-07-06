#!/usr/bin/env node
/**
 * Stage production build for cPanel (CloudLinux Node.js Selector).
 * Uploads .next + package-lock; server uses virtualenv node_modules after Run NPM Install.
 */
import { cpSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "deploy/development");
const nextDir = resolve(root, ".next");

if (!statSync(resolve(nextDir, "BUILD_ID")).isFile()) {
  console.error("✗ Missing .next/BUILD_ID — run npm run build first");
  process.exit(1);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const cachePath = `${sep}.next${sep}cache${sep}`;
cpSync(nextDir, resolve(outDir, ".next"), {
  recursive: true,
  filter: (src) => !src.includes(cachePath) && !src.endsWith(`${sep}.next${sep}cache`),
});
cpSync(resolve(root, "public"), resolve(outDir, "public"), { recursive: true });
cpSync(resolve(root, "scripts/cpanel-server.js"), resolve(outDir, "server.js"));
cpSync(resolve(root, "config/passenger-development.htaccess"), resolve(outDir, ".htaccess"));
cpSync(resolve(root, "package-lock.json"), resolve(outDir, "package-lock.json"));
mkdirSync(resolve(outDir, "tmp"), { recursive: true });

const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
writeFileSync(
  resolve(outDir, "package.json"),
  JSON.stringify(
    {
      name: pkg.name,
      version: pkg.version,
      private: true,
      engines: { node: ">=22" },
      scripts: { start: "node server.js" },
      dependencies: pkg.dependencies,
    },
    null,
    2,
  ),
);

console.log(`✓ Staged: ${outDir}`);
console.log("  On cPanel: Run NPM Install → Restart app");

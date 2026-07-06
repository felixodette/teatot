#!/usr/bin/env node
/**
 * Stage .next/standalone + static + public into deploy/development/.
 * CloudLinux/cPanel forbids a physical node_modules in app root — Run NPM Install on server.
 */
import { cpSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
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
cpSync(resolve(root, "config/passenger-development.htaccess"), resolve(outDir, ".htaccess"));
mkdirSync(resolve(outDir, "tmp"), { recursive: true });

// CloudLinux Node.js Selector owns node_modules via symlink — must not upload a real folder
rmSync(resolve(outDir, "node_modules"), { recursive: true, force: true });

const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
writeFileSync(
  resolve(outDir, "package.json"),
  JSON.stringify(
    {
      name: pkg.name,
      version: pkg.version,
      private: true,
      scripts: { start: "node server.js" },
      dependencies: pkg.dependencies,
    },
    null,
    2,
  ),
);

console.log(`✓ Staged: ${outDir} (no node_modules — run NPM Install on cPanel)`);

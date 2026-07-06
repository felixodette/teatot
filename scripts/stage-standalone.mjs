#!/usr/bin/env node
/**
 * Stage production build for cPanel (CloudLinux Node.js Selector).
 * Installs runtime deps in CI and uploads them to the virtualenv via FTP —
 * no server-side npm install (avoids ENOTEMPTY / OOM on shared hosting).
 */
import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const target = process.argv[2] || "development";
const outDir = resolve(root, "deploy", target);
const venvDir = resolve(root, "deploy", "venv-node_modules");
const nextDir = resolve(root, ".next");
const lock = JSON.parse(readFileSync(resolve(root, "package-lock.json"), "utf8"));

function pinned(name) {
  return lock.packages[`node_modules/${name}`]?.version;
}

const runtimeDeps = {
  next: pinned("next"),
  react: pinned("react"),
  "react-dom": pinned("react-dom"),
  nodemailer: pinned("nodemailer"),
};

for (const [name, version] of Object.entries(runtimeDeps)) {
  if (!version) {
    console.error(`✗ Could not pin ${name} from package-lock.json`);
    process.exit(1);
  }
}

if (!statSync(resolve(nextDir, "BUILD_ID")).isFile()) {
  console.error("✗ Missing .next/BUILD_ID — run npm run build first");
  process.exit(1);
}

function installRuntimeDeps() {
  const prodDir = resolve(root, "deploy", ".prod-install");
  rmSync(prodDir, { recursive: true, force: true });
  mkdirSync(prodDir, { recursive: true });
  writeFileSync(
    resolve(prodDir, "package.json"),
    JSON.stringify({ name: "teatot", private: true, dependencies: runtimeDeps }, null, 2),
  );
  cpSync(resolve(root, "config/cpanel.npmrc"), resolve(prodDir, ".npmrc"));

  console.log("▸ npm install --omit=dev (CI only, for virtualenv upload)");
  const result = spawnSync("npm", ["install", "--omit=dev"], {
    cwd: prodDir,
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);

  rmSync(venvDir, { recursive: true, force: true });
  cpSync(resolve(prodDir, "node_modules"), venvDir, { recursive: true });
  rmSync(prodDir, { recursive: true, force: true });
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
mkdirSync(resolve(outDir, "tmp"), { recursive: true });

writeFileSync(
  resolve(outDir, "package.json"),
  JSON.stringify(
    {
      name: "teatot",
      version: "0.1.0",
      private: true,
      scripts: { start: "node server.js" },
      dependencies: runtimeDeps,
    },
    null,
    2,
  ),
);

installRuntimeDeps();

console.log(`✓ Staged app: ${outDir}`);
console.log(`✓ Staged virtualenv deps: ${venvDir}`);
console.log(`  FTP venv target: nodevenv/public_html/${target}/22/lib/node_modules/`);
console.log("  On cPanel after deploy: Restart app only (no Run NPM Install)");

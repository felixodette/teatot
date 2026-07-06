#!/usr/bin/env node

/**
 * Milestone 0 — cPanel Hosting Validation
 *
 * Upload this single file to your cPanel server and run:
 *   node validate-hosting.mjs
 *
 * Zero dependencies. Reports pass/fail for every requirement
 * the Next.js standalone build needs.
 */

import { execSync } from "node:child_process";
import { createServer } from "node:http";
import { resolve } from "node:path";
import { existsSync, writeFileSync, mkdirSync } from "node:fs";
import { createConnection } from "node:net";

const REQUIRED_NODE_MAJOR = 20;
const results = [];

function check(name, pass, detail = "") {
  const status = pass ? "PASS" : "FAIL";
  results.push({ name, status, detail });
  const icon = pass ? "\x1b[32m✓\x1b[0m" : "\x1b[31m✗\x1b[0m";
  console.log(`  ${icon} ${name}${detail ? ` — ${detail}` : ""}`);
  return pass;
}

function run(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8", timeout: 10_000 }).trim();
  } catch {
    return null;
  }
}

async function testPort(host, port, timeoutMs = 5000) {
  return new Promise((resolve) => {
    const sock = createConnection({ host, port }, () => {
      sock.destroy();
      resolve(true);
    });
    sock.on("error", () => resolve(false));
    sock.setTimeout(timeoutMs, () => {
      sock.destroy();
      resolve(false);
    });
  });
}

async function testHttpServer() {
  return new Promise((resolve) => {
    const server = createServer((_, res) => {
      res.writeHead(200);
      res.end("ok");
    });
    server.on("error", () => resolve(false));
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      fetch(`http://127.0.0.1:${port}`)
        .then((r) => r.text())
        .then((body) => {
          server.close();
          resolve(body === "ok");
        })
        .catch(() => {
          server.close();
          resolve(false);
        });
    });
    setTimeout(() => {
      server.close();
      resolve(false);
    }, 5000);
  });
}

// ── Run checks ──────────────────────────────────────────────

console.log("\n╔══════════════════════════════════════════════╗");
console.log("║   Milestone 0 — cPanel Hosting Validation   ║");
console.log("╚══════════════════════════════════════════════╝\n");

// 1. Node.js version
console.log("▸ Node.js Runtime");
const nodeVersion = process.versions.node;
const nodeMajor = parseInt(nodeVersion.split(".")[0], 10);
check("Node.js version", nodeMajor >= REQUIRED_NODE_MAJOR, `v${nodeVersion} (need ≥${REQUIRED_NODE_MAJOR})`);
check("ESM support", typeof import.meta.url === "string");
check("fetch() available", typeof globalThis.fetch === "function");

// 2. npm
console.log("\n▸ Package Manager");
const npmVersion = run("npm --version");
check("npm available", !!npmVersion, npmVersion ? `v${npmVersion}` : "not found");

// 3. File system
console.log("\n▸ File System");
const testDir = resolve(".__hosting_test__");
try {
  mkdirSync(testDir, { recursive: true });
  writeFileSync(resolve(testDir, "test.txt"), "ok");
  check("Write to filesystem", true);
} catch (e) {
  check("Write to filesystem", false, e.message);
}
try {
  execSync(`rm -rf "${testDir}"`);
} catch {}

// 4. HTTP server
console.log("\n▸ HTTP Server");
const httpOk = await testHttpServer();
check("Can bind HTTP port", httpOk, httpOk ? "loopback test passed" : "server bind failed");

// 5. Environment variables
console.log("\n▸ Environment Variables");
check("Can read env vars", typeof process.env === "object", `HOME=${process.env.HOME || "(unset)"}`);
const hasPath = !!process.env.PATH;
check("PATH is set", hasPath);

// 6. SMTP connectivity
console.log("\n▸ SMTP Connectivity");
const smtpLocal = await testPort("127.0.0.1", 25);
check("Local SMTP (port 25)", smtpLocal, smtpLocal ? "localhost:25 reachable" : "not listening — use external SMTP or cPanel email");
const smtp587 = await testPort("127.0.0.1", 587);
check("Local SMTP (port 587)", smtp587, smtp587 ? "localhost:587 reachable" : "not listening — check cPanel mail config");

// 7. DNS resolution
console.log("\n▸ Network");
let dnsOk = false;
try {
  const res = await fetch("https://httpbin.org/get", { signal: AbortSignal.timeout(5000) });
  dnsOk = res.ok;
} catch {}
check("Outbound HTTPS", dnsOk, dnsOk ? "can reach external APIs" : "outbound requests blocked or timed out");

// 8. Process info
console.log("\n▸ Process Info");
const v8 = await import("node:v8");
const heapStats = v8.getHeapStatistics();
const heapLimitMB = Math.round(heapStats.heap_size_limit / 1024 / 1024);
check("V8 heap limit", heapLimitMB >= 128, `${heapLimitMB} MB (Next.js needs ~128 MB minimum)`);
check("Architecture", true, `${process.arch} / ${process.platform}`);
const cpus = run("nproc") || run("sysctl -n hw.ncpu");
if (cpus) check("CPU cores", true, cpus);

// 9. Process manager hints
console.log("\n▸ Process Manager");
const passenger = run("passenger --version") || run("which passenger");
check("Passenger detected", !!passenger, passenger || "not found — check cPanel Node.js App Manager instead");
const pm2 = run("pm2 --version") || run("which pm2");
check("PM2 detected", !!pm2, pm2 || "not found — not required if Passenger is available");

// ── Summary ─────────────────────────────────────────────────

const passed = results.filter((r) => r.status === "PASS").length;
const failed = results.filter((r) => r.status === "FAIL").length;
const total = results.length;

console.log("\n══════════════════════════════════════════════");
console.log(`  Results: ${passed}/${total} passed, ${failed} failed`);

const critical = results.filter(
  (r) => r.status === "FAIL" && ["Node.js version", "Write to filesystem", "Can bind HTTP port"].includes(r.name)
);

if (critical.length === 0) {
  console.log("\x1b[32m  ✓ Hosting environment is compatible with Next.js standalone deployment.\x1b[0m");
} else {
  console.log("\x1b[31m  ✗ Critical failures detected — see above.\x1b[0m");
  for (const c of critical) {
    console.log(`    → ${c.name}: ${c.detail}`);
  }
}

// Write machine-readable report
const report = {
  timestamp: new Date().toISOString(),
  nodeVersion,
  platform: process.platform,
  arch: process.arch,
  results,
  verdict: critical.length === 0 ? "COMPATIBLE" : "INCOMPATIBLE",
};

const reportPath = resolve("hosting-validation-report.json");
writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\n  Report saved to: ${reportPath}`);
console.log("");

/**
 * cPanel / CloudLinux startup — extracts CI-shipped deps, then runs Next.js.
 */
const path = require("path");
const fs = require("fs");
const http = require("http");
const crypto = require("crypto");
const { execFileSync } = require("child_process");
const Module = require("module");

const dir = path.join(__dirname);
process.chdir(dir);
process.env.NODE_ENV = "production";

const home = process.env.HOME || "";
const rel = path.relative(path.join(home, "public_html"), dir).replace(/\\/g, "/");
const nodeMajor = process.version.match(/^v(\d+)/)?.[1] || "22";
const venvModules = path.join(home, "nodevenv", "public_html", rel, nodeMajor, "lib", "node_modules");
const tarball = path.join(dir, "tmp", "node_modules.tar.gz");
const shaFile = path.join(dir, "tmp", ".deps-sha256");
const extractedMarker = path.join(venvModules, ".teatot-deps-sha256");

function readSha(file) {
  try {
    return fs.readFileSync(file, "utf8").trim();
  } catch {
    return "";
  }
}

function ensureVirtualenvDeps() {
  const wantSha = readSha(shaFile);
  const haveSha = readSha(extractedMarker);
  const hasNext = fs.existsSync(path.join(venvModules, "next"));

  if (hasNext && wantSha && wantSha === haveSha) return;

  if (!fs.existsSync(tarball)) {
    if (hasNext) return;
    console.error("Missing tmp/node_modules.tar.gz and no next in virtualenv.");
    process.exit(1);
  }

  console.log("Extracting node_modules to CloudLinux virtualenv…");
  fs.rmSync(venvModules, { recursive: true, force: true });
  fs.mkdirSync(venvModules, { recursive: true });
  execFileSync("tar", ["-xzf", tarball, "-C", venvModules], { stdio: "inherit" });

  const sha = wantSha || crypto.createHash("sha256").update(fs.readFileSync(tarball)).digest("hex");
  fs.writeFileSync(extractedMarker, sha);
  console.log("Virtualenv deps ready.");
}

ensureVirtualenvDeps();

const localNext = path.join(dir, "node_modules", "next");
if (!fs.existsSync(localNext) && fs.existsSync(path.join(venvModules, "next"))) {
  Module.globalPaths.unshift(venvModules);
}

const port = parseInt(process.env.PORT, 10) || 3000;
const hostname = process.env.HOSTNAME || "0.0.0.0";

const next = require("next");
const app = next({ dev: false, dir });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    http
      .createServer((req, res) => handle(req, res))
      .listen(port, hostname, () => {
        console.log(`Next.js ready on http://${hostname}:${port}`);
      });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

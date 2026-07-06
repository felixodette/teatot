/**
 * cPanel / CloudLinux startup — uses node_modules symlink from Run NPM Install.
 */
const path = require("path");
const fs = require("fs");
const http = require("http");
const Module = require("module");

const dir = path.join(__dirname);
process.chdir(dir);
process.env.NODE_ENV = "production";

// ponytail: LiteSpeed lsnode sometimes misses the CloudLinux node_modules symlink
const home = process.env.HOME || "";
const venvModules = path.join(home, "nodevenv/public_html/development/22/lib/node_modules");
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

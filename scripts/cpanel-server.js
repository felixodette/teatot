/**
 * cPanel / CloudLinux startup — uses node_modules from virtualenv (after Run NPM Install).
 * Not the Next.js standalone server.js.
 */
const path = require("path");
const http = require("http");

const dir = path.join(__dirname);
process.chdir(dir);
process.env.NODE_ENV = "production";

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

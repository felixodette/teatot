# Deployment — Tea Tot Hotels (cPanel)

## Branch → environment

| Branch    | URL                    | cPanel path                  |
|-----------|------------------------|------------------------------|
| `develop` | https://dev.teatot.co.ke | `public_html/development`  |
| `main`    | https://www.teatot.co.ke | `public_html/production`   |

Production setup is identical; only paths, subdomain, and env vars change.

---

## One-time cPanel setup (development)

### 1. Subdomain

1. cPanel → **Domains** → **Create A New Domain** (or Subdomains)
2. Domain: `dev.teatot.co.ke`
3. Document root: `public_html/development`
4. Enable **SSL** (AutoSSL or Let's Encrypt)

### 2. Node.js application

1. cPanel → **Setup Node.js App** → **Create Application**
2. Settings:

   | Field | Value |
   |-------|-------|
   | Node.js version | 22.x |
   | Application mode | Production |
   | Application root | `public_html/development` |
   | Application URL | `dev.teatot.co.ke` |
   | Application startup file | `server.js` |

3. Click **Create**

### 3. Environment variables

In the Node.js app → **Environment variables**:

| Variable | Development value |
|----------|-------------------|
| `NODE_ENV` | `production` |
| `NEXT_PUBLIC_SITE_URL` | `https://dev.teatot.co.ke` |
| `CONTACT_EMAIL` | `info@teatot.co.ke` |
| `SMTP_HOST` | (cPanel mail host, e.g. `mail.teatot.co.ke`) |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | (mailbox user) |
| `SMTP_PASSWORD` | (mailbox password) |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` | (optional) |

Passenger sets `PORT` automatically — do not hardcode it.

### 4. Git deployment (recommended)

1. cPanel → **Git Version Control** → **Create**
2. Clone URL: `https://github.com/felixodette/teatot.git`
3. Repository path: e.g. `repositories/teatot`
4. Checkout branch: **`develop`**
5. Enable **Pull and Deploy** → deploy path: `public_html/development`
6. The repo includes `.cpanel.yml` which builds and copies the standalone output on each deploy.

If `npm run build` fails on the server (memory limit), use **manual deploy** below.

---

## Deploy development site

### Option A — Git push (auto-deploy)

```bash
git checkout develop
git push origin develop
```

Then in cPanel → Git → **Pull or Deploy** (or wait for webhook if configured).

Restart the Node.js app if pages look stale.

### Option B — Manual package + upload

```bash
npm run package:dev
```

This creates `deploy/development/` with everything Passenger needs:

- `server.js` (startup file)
- `node_modules/` (traced dependencies)
- `.next/` (server + static)
- `public/` (images)

Upload the **contents** of `deploy/development/` to `public_html/development/` (File Manager or SFTP). Overwrite existing files.

Then cPanel → Node.js App → **Restart**.

---

## Post-deploy checks

1. https://dev.teatot.co.ke/ — home page loads
2. https://dev.teatot.co.ke/rooms — room listing
3. https://dev.teatot.co.ke/sitemap.xml — URLs use `dev.teatot.co.ke`
4. Contact form (if SMTP configured)

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| 503 / app not running | Node.js App → Restart; check `server.js` exists in app root |
| Missing CSS/JS | Ensure `.next/static/` was copied (see `package:dev`) |
| Wrong canonical URLs | Set `NEXT_PUBLIC_SITE_URL=https://dev.teatot.co.ke` and rebuild |
| Build OOM on server | Use `npm run package:dev` locally, upload via File Manager |
| Images broken | Confirm `public/` folder uploaded; try `images.unoptimized: true` in `next.config.ts` |

Passenger reload: `touch public_html/development/tmp/restart.txt`

---

## Production (later)

Repeat the same steps with:

- Branch: `main`
- Path: `public_html/production`
- URL: `www.teatot.co.ke`
- `NEXT_PUBLIC_SITE_URL=https://www.teatot.co.ke`

Update `.cpanel.yml` deploy path or maintain a production-specific workflow when ready.

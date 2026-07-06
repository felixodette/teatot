# Deployment — Tea Tot Hotels (cPanel)

## Branch → environment

| Branch    | URL                      | cPanel path                | Build trigger        |
|-----------|--------------------------|----------------------------|----------------------|
| `develop` | https://dev.teatot.co.ke   | `public_html/development`  | push → GitHub Actions |
| `main`    | https://www.teatot.co.ke   | `public_html/production`   | push → GitHub Actions |

**Compiling happens on git push** — GitHub Actions runs `npm ci`, `npm run build`, stages the standalone output, and uploads via FTP. You never need to build locally for deploy.

---

## One-time setup

### 1. GitHub repository secrets

Repo → **Settings** → **Secrets and variables** → **Actions** → New repository secret:

| Secret | Value |
|--------|-------|
| `CPANEL_FTP_HOST` | FTP host (e.g. `ftp.teatot.co.ke` or server IP) |
| `CPANEL_FTP_USER` | cPanel username |
| `CPANEL_FTP_PASSWORD` | cPanel password (or FTP account password) |

Create/find FTP credentials in cPanel → **FTP Accounts** (main account works).

### 2. Subdomain (development)

1. cPanel → **Domains** → create **dev.teatot.co.ke**
2. Document root: `public_html/development`
3. Enable SSL (AutoSSL)

### 3. Node.js application (development)

cPanel → **Setup Node.js App** → **Create Application**:

| Field | Value |
|-------|-------|
| Node.js version | 22.x |
| Application mode | Production |
| Application root | `public_html/development` |
| Application URL | `dev.teatot.co.ke` |
| Application startup file | `server.js` |

### 4. Environment variables (cPanel Node.js app)

Set in the Node.js app UI (runtime — not baked into the GitHub build except `NEXT_PUBLIC_*`):

| Variable | Development |
|----------|-------------|
| `NODE_ENV` | `production` |
| `NEXT_PUBLIC_SITE_URL` | `https://dev.teatot.co.ke` |
| `CONTACT_EMAIL` | `info@teatot.co.ke` |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASSWORD` | (when contact form needed) |

`NEXT_PUBLIC_SITE_URL` is also set in `.github/workflows/deploy-develop.yml` at **build** time so sitemap/OG tags are correct.

---

## Deploy (development)

```bash
git checkout develop
git push origin develop
```

GitHub Actions (`.github/workflows/deploy-develop.yml`) will:

1. `npm ci` + `npm run build`
2. Stage standalone output to `deploy/development/`
3. FTP upload to `public_html/development/`

Watch progress: GitHub → **Actions** tab.

After first deploy, restart the Node.js app in cPanel if needed.

---

## Alternative: cPanel Git pull (build on server)

If you prefer building on the cPanel server instead of GitHub Actions:

1. cPanel → **Git Version Control** → clone `https://github.com/felixodette/teatot.git`, branch **`develop`**
2. Enable **Pull and Deploy** (`.cpanel.yml` runs `scripts/cpanel-deploy.sh`)

This runs `npm run build` on the server — may fail on low-memory hosting. GitHub Actions is the recommended path.

---

## Post-deploy checks

1. https://dev.teatot.co.ke/
2. https://dev.teatot.co.ke/rooms
3. https://dev.teatot.co.ke/sitemap.xml — URLs should use `dev.teatot.co.ke`

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| GitHub Action fails at FTP | Check secrets; confirm `public_html/development` exists |
| 503 after deploy | cPanel → Node.js App → Restart |
| Missing CSS/JS | Re-run workflow; confirm `.next/static` uploaded |
| Wrong URLs in sitemap | `NEXT_PUBLIC_SITE_URL` in workflow env, then re-push |
| Build OOM on cPanel git | Use GitHub Actions instead of server-side build |

Passenger reload: `touch public_html/development/tmp/restart.txt`

---

## Production (when ready)

Push to `main` — `.github/workflows/deploy-production.yml` deploys to `public_html/production` with `NEXT_PUBLIC_SITE_URL=https://www.teatot.co.ke`. Repeat Node.js app setup for `www.teatot.co.ke`.

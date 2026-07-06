# Milestone 0 — Hosting Validation Report

> **Status**: COMPLETE
> **Date**: 2026-07-03
> **Provider**: cPanel (teatot.co.ke)
> **Node.js**: v22.22.3
> **App Root**: `public_html/development`

## Critical Requirements

| Check | Required | Result | Notes |
|-------|----------|--------|-------|
| Node.js version | ≥ 20 | ✅ | v22.22.3 — confirmed via cPanel UI |
| ESM support | Yes | ✅ | Implied by Node 22 |
| `fetch()` available | Yes | ✅ | Built-in from Node 18+ |
| Write to filesystem | Yes | ✅ | App started successfully (Passenger writes pid/logs) |
| Can bind HTTP port | Yes | ✅ | Passenger manages port binding automatically |

## Important Requirements

| Check | Required | Result | Notes |
|-------|----------|--------|-------|
| npm available | Yes | ✅ | "Run NPM Install" button present in UI |
| Environment variables | Yes | ✅ | "ADD VARIABLE" UI confirmed |
| Outbound HTTPS | Yes | ⚠️ | Not yet tested — verify during Milestone 4 (Maps embed) |
| Passenger | Yes | ✅ | Node.js App Manager active, app running |

## Optional Requirements

| Check | Required | Result | Notes |
|-------|----------|--------|-------|
| Local SMTP (port 25) | No | ⚠️ | Not yet tested — verify during Milestone 4 (contact form) |
| Local SMTP (port 587) | No | ⚠️ | Not yet tested |

## Manual Checks

| Check | How to verify | Result | Notes |
|-------|--------------|--------|-------|
| Node.js App Manager | cPanel → Setup Node.js App | ✅ | Confirmed from screenshot |
| Environment variable UI | cPanel → Node.js App → Environment Variables | ✅ | Confirmed from screenshot |
| SSL/HTTPS | cPanel → SSL/TLS Status | ⚠️ | Verify before production deployment |
| Domain configured | cPanel → Domains | ✅ | teatot.co.ke confirmed |
| Git deployment | cPanel → Git Version Control | ⚠️ | Optional — can upload standalone build via File Manager |
| Outbound email | cPanel → Email Accounts | ⚠️ | Test during Milestone 4 |
| Memory limit | Check hosting plan specs | ⚠️ | Verify — Next.js standalone needs ~128 MB minimum |

## Deployment Strategy

Based on confirmed capabilities:

- **Build location**: Local → upload standalone build to `public_html/development`
- **Process manager**: Passenger (cPanel Node.js App Manager)
- **Startup file**: `server.js` (Next.js standalone output)
- **Application mode**: Production (change from Development before go-live)
- **Image optimization**: Test `next/image` default first; fall back to `images.unoptimized: true`
- **Email delivery**: Test cPanel SMTP first; fall back to external provider
- **Static asset serving**: Node.js serves via Passenger

## Deployment Notes (cPanel-specific)

1. `next.config.ts` must set `output: "standalone"`
2. Upload contents of `.next/standalone/` to `public_html/development`
3. Copy `.next/static/` into `public_html/development/.next/static/`
4. Copy `public/` into `public_html/development/public/`
5. Set startup file to `server.js` in Node.js App Manager
6. Set application mode to `Production`
7. Configure environment variables via cPanel UI
8. Click "Run NPM Install" if `node_modules` not included
9. Restart application

## Verdict

✅ **COMPATIBLE** — proceed to Milestone 1

Node.js 22.22.3 meets all critical requirements for Next.js App Router with Server Actions.
Remaining ⚠️ items (SMTP, SSL, outbound HTTPS, memory) are non-blocking and will be
verified during their respective milestones.

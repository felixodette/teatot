---
name: prdaa-delivery-audit
description: >-
  Dual-angle product delivery assurance audit — client gate (PRDAA: requirements
  vs built, gaps, acceptance verdict) plus internal surplus gate (reuse leverage,
  over-delivery, gap-close effort). Use when auditing implementation against PRD,
  proposal, contract, scope, wireframes, old site/HTML, design files, or live
  product; when the user asks for PRDAA, delivery assurance, requirements
  traceability, client acceptance, implementation audit, or an internal view of
  what was already built beyond the brief.
---

# PRDAA Dual-Angle Delivery Audit

Run **both** reporting angles by default. Never collapse them into one mixed report.

| Angle | Stance | Question | Default verdict bias |
|-------|--------|----------|----------------------|
| **A — Client gate** | Client advocate | Does delivered product satisfy agreed requirements? | Skeptical; “NEEDS WORK” until evidence |
| **B — Internal surplus** | Delivery-team advocate | What do we already own, and how cheaply do we close remaining gaps? | Constructive; deletion over reinvention |

If the user asks for only one angle, run that angle alone and note the other was skipped.

## Inputs (collect before scoring)

Require or discover:

- Client artifacts: PRD, proposal, scope, contract, stories, designs, wireframes, PDF plans, old site/HTML
- Delivered: repo(s), live URL(s), CMS/data, APIs, schema, tests, deploy config, existing audits

**Never invent requirements.** Ambiguities → flag as Open, with evidence of the ambiguity.

Announce: `Using prdaa-delivery-audit — dual-angle delivery assurance.`

## Operating principles (both angles)

- Never assume. Never trust docs alone — verify in code and/or live HTTP.
- Every status needs evidence (path, URL + status code, CMS field, screenshot note).
- Distinguish fact vs opinion.
- Prefer measurable conclusions.
- Challenge ambiguities; surface hidden risks.
- Maximize business value, minimize implementation risk, improve maintainability.

## Phase checklist

Copy and track:

```
PRDAA Dual Audit
- [ ] 0 Inputs inventoried (client + delivered)
- [ ] 1 Business requirement matrix (from client artifacts only)
- [ ] 2 Product reconstruction (intended)
- [ ] 3 Implementation discovery (built — FE/BE/data/infra/security/tests)
- [ ] 4 Traceability matrix (every req → status + evidence)
- [ ] 5 Angle A report (client gate)
- [ ] 6 Angle B report (internal surplus) — separate artifact
- [ ] 7 Cross-read (A vs B narrative; no contradiction of facts)
- [ ] 8 Optional PDF export
```

Detailed phase definitions: [client-gate.md](client-gate.md)  
Internal methodology: [internal-surplus.md](internal-surplus.md)  
PDF export: [pdf-export.md](pdf-export.md)

## Status vocabulary (traceability)

Use exactly these statuses:

| Status | Meaning |
|--------|---------|
| ✅ Fully Implemented | Meets requirement with evidence |
| 🟡 Partially Implemented | Material piece missing or incomplete |
| ❌ Missing | No material delivery |
| ⚠ Incorrect | Built differently / wrong vs requirement |
| 🚫 Scope Creep | Built but not requested |
| 💡 Better Than Requested | Exceeds ask in a client-valuable way |
| 🔓 Open | Client decision / ambiguity unresolved |

Every row: Requirement ID · Requirement · Business Value · Priority · Evidence · Files/URLs · Status · Quality · Confidence · Gap · Recommendation · Owner · Effort · Risk

## Dual output contract

Produce **two separate artifacts** (canvas preferred for tables; markdown/PDF ok if asked):

1. **Client gate** — filename pattern `prdaa-*-client-gate`  
   Verdict one of: Ready for Client Acceptance · Ready with Minor Revisions · Significant Rework Required · Not Ready for Client Review · Production Ready · Enterprise Grade · World Class

2. **Internal surplus** — filename pattern `*-internal-surplus`  
   Focus: similarity map, surplus list, leverage % on remaining gaps, “what not to rebuild”, effort XS/S/M

Do not put surplus celebration inside the client gate. Do not soften client gaps inside the internal report’s fact table — same evidence, different interpretation.

### Canvas

When producing analytical tables/scorecards, use a Cursor canvas (`*.canvas.tsx` under the workspace canvases dir). Import only from `cursor/canvas`. One canvas per angle.

### Scorecards

**Angle A** (1–10 each, with justification): Business Alignment, Requirements Coverage, Architecture, Backend, Frontend, Database, UX, Accessibility, Performance, Security, Maintainability, Testing, Documentation, Deployment, Production Readiness, Code Quality, Scalability, Technical Debt, Innovation, Overall Delivery.

Also report: Overall Delivery /100 · Requirements Coverage % · Production Readiness % · Business Value Delivered % · Client Satisfaction Prediction % · Confidence %.

**Angle B**: Asset readiness · Surplus value · Close-the-brief speed · IA alignment today · Conversion stack · Test harness · Gap-close leverage % · Est. time to brief-green.

## Live verification minimum

For each claimed page/feature:

1. Repo route or component exists  
2. Live HTTP status (or explicit “not deployed”)  
3. Nav/IA string match if nav was specified  

Prefer `curl`/browser tools with network as needed. Sandbox 403 → retry with network.

## Anti-patterns

- Single blended “everything is fine / everything is broken” report
- Scoring Views Draft IA as done because content exists elsewhere (e.g. Explore = blog cards)
- Inventing M-Pesa / booking-engine requirements not in artifacts
- Recommending rebuilds when Angle B shows >70% reuse leverage
- Trusting internal docs (parity/conversion) as acceptance proof without live check

## After audit

Offer next step: implement Angle B’s XS/S items, or export PDFs — do not start coding unless asked.

# Angle B — Internal Surplus Gate

Delivery-team advocate. Same facts as Angle A; different question.

## Purpose

Answer: **What do we already own, and how do we close remaining client gaps without rebuilding?**

Keep client interest by showing a credible path to acceptance. Keep team interest by preventing scope thrash and celebrating surplus that reduces risk.

## When this angle matters

- Dual-repo / multi-site deliveries
- Migrations (Framer → Next, HTML → app) where platform exceeds a restructuring PDF
- After a harsh Angle A verdict — sequence the fix without demoralizing rebuilds
- Stakeholders ask “how much is left?” or “did we overbuild?”

## Method

### 1. Three-source similarity map

Score overlap (0–100 heuristic, state method):

| Pair | Meaning |
|------|---------|
| Old/reference product ↔ Built | Functional continuity |
| Client plan/PRD ↔ Built | Brief alignment |
| Old/reference ↔ Client plan | How much the plan is IA vs greenfield |
| Reusable assets ↔ Remaining Angle A gaps | Gap-close leverage |

### 2. Capability convergence table

Per capability: Old · Client ask · Built · Reuse (Complete / High / Medium / Low)

Reuse **High** means content or components exist; only composition/IA missing (e.g. Explore content as blog posts but no `/explore` route).

### 3. Surplus inventory (Better Than Requested + unrequested value)

For each surplus:

- Item
- Vs client ask (what was requested instead / nothing)
- Business or engineering value
- Keep / cross-link / hide from client-facing IA

Do not list surplus as “done” for a missing Angle A requirement.

### 4. Leverage on remaining gaps

For each open Critical/High (and material Medium) from Angle A:

| Remaining gap | Already in hand | Effort | Leverage % |
|---------------|-----------------|--------|------------|
| … | files, routes, CMS, patterns | XS / S / M | 0–100 |

Effort: **XS** &lt; 2h · **S** &lt; 1 day · **M** &lt; 3 days · **L** larger (rare if leverage high)

### 5. What not to rebuild

Explicit anti-rebuild list grounded in surplus (e.g. do not rebuild Dining if `/dining` + menu subsite exist — only teaser/IA).

### 6. Dual narrative

| Client gate says | Internal gate says |
|------------------|--------------------|
| Significant Rework / gaps | Thin delta / IA sprint |
| Missing Explore | Content ready — assemble page |
| Incorrect nav | Single-file reorder |

Facts must match Angle A. Interpretation may differ.

## Output format (Angle B)

```
# What We Already Own (executive)
# Similarity Map
# Capability Convergence
# Delivered Beyond the Brief
# Leverage on Remaining Gaps
# Asset Inventory (sites/modules)
# Internal vs Client Narrative
# What Not to Rebuild
# Internal Scorecard
# Recommended Internal Posture
```

Internal scorecard (1–10): Asset readiness · Surplus value · Close-the-brief speed · IA alignment today · Conversion stack · Test harness · plus Gap-close leverage % and Est. time to brief-green.

## Separation rule

- Separate canvas/file from Angle A
- Filename contains `internal-surplus` or `internal-delivery`
- Never use Angle B to overturn an Angle A ❌ Missing — only to show reuse path

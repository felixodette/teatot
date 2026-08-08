# PDF export

When the user asks to export an audit to PDF:

1. Write a print-ready HTML sibling under `docs/` (or user-specified path) mirroring the canvas/report content — no emoji decoration; A4; tables + stats.
2. Render with headless Chrome:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf="/absolute/path/OUT.pdf" \
  "file:///absolute/path/IN.html"
```

3. Verify: `file OUT.pdf` shows PDF; `pdfinfo` or page count if available.
4. If Chrome fails in sandbox, re-run with full permissions (`all`).
5. Return the PDF path. Keep HTML source unless user asks to delete.
6. Export **each angle separately** if both exist (`*-client-gate.pdf`, `*-internal-surplus.pdf`).

Fallbacks: `npx` puppeteer only if Chrome path missing; do not invent incomplete PDFs.

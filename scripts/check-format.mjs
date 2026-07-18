// Tiny self-check for money formatting (run: node scripts/check-format.mjs)
import assert from "node:assert/strict";

function formatMoney(amount, currency = "Ksh ") {
  return `${currency}${amount.toLocaleString("en-KE")}`;
}
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").trim();
}

assert.equal(formatMoney(5297), "Ksh 5,297");
assert.equal(formatMoney(13875, "Ksh "), "Ksh 13,875");
assert.equal(stripHtml("<p>Twin beds, AC</p>"), "Twin beds, AC");
console.log("check-format: ok");

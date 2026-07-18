/** Format KE hotel prices for display (e.g. Ksh 5,297). */
export function formatMoney(amount: number, currency = "Ksh "): string {
  return `${currency}${amount.toLocaleString("en-KE")}`;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

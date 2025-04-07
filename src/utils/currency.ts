/**
 * Formats a number as a Canadian Dollar amount
 * @param {number} amount - The amount to format
 * @returns {string} Formatted amount with CAD currency symbol
 */
export function formatCAD(amount: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a number as currency with specified options
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: 'CAD')
 * @param {string} locale - Locale code (default: 'en-CA')
 * @returns {string} Formatted currency amount
 */
export function formatCurrency(
  amount: number,
  currency: string = "CAD",
  locale: string = "en-CA"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// KAIRO Landing Page Constants

// Cal.com event slug — public link of the demo event.
// Example: "getkairo/demo" or "getkairoaiacademy/30min".
// Public-only. Never put CAL_API_KEY here. Override via NEXT_PUBLIC_CAL_LINK in .env.local.
export const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || "getkairoaiacademy/kairo-demo"
export const CAL_NAMESPACE = process.env.NEXT_PUBLIC_CAL_NAMESPACE || "kairo-demo"

// Backward-compat aliases used across the landing for the primary CTA.
// They now point to the Cal.com modal trigger logic, not Calendly.
export const AUDIT_CTA_URL = `https://cal.com/${CAL_LINK}`

// Pricing anchors (value anchoring — never the headline)
export const BETA_PRICE = "US$149"
export const RECOVERY_PRICE = "US$295"

// CTA labels
export const CTA_PRIMARY = "Agendar demo"
export const CTA_PRIMARY_SHORT = "Agendar demo"

// Re-export trackEvent from tracking module to avoid duplicate definitions.
export { trackEvent } from "./tracking"

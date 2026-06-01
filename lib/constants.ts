// KAIRO Landing Page Constants

// Calendly URL for the Free Hidden Revenue Audit (primary CTA across landing).
export const AUDIT_CTA_URL = "https://calendly.com/getkairoaiacademy/delegar-setup-al-equipo"
// Alias preferred in lead-capture flow.
export const CALENDLY_AUDIT_URL = AUDIT_CTA_URL

// Pricing anchors (value anchoring — never the headline)
export const BETA_PRICE = "US$149"
export const RECOVERY_PRICE = "US$295"

// CTA labels
export const CTA_PRIMARY = "Agendar auditoría gratuita"
export const CTA_PRIMARY_SHORT = "Agendar auditoría"

// Re-export trackEvent from tracking module to avoid duplicate definitions.
export { trackEvent } from "./tracking"

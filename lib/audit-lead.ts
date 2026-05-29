// Audit lead capture — saves a lead to the API (with localStorage fallback)
// and builds the Calendly redirect URL with optional prefill.
// Designed so the user is NEVER blocked by a save failure.

import { CALENDLY_AUDIT_URL } from "./constants"
import { getLandingSignals } from "./tracking"

export type ClinicType =
  | "dental"
  | "estetica"
  | "dermatologica"
  | "medicina_estetica"
  | "ortodoncia"
  | "implantes"
  | "otro"

export type ConversationVolume = "bajo" | "medio" | "alto"

export interface AuditLeadInput {
  fullName: string
  clinicName: string
  contact: string
  clinicType: ClinicType
  usesWhatsapp: boolean
  monthlyConversationVolume: ConversationVolume
  mainProblem?: string
  ctaLocation: string
}

export interface AuditLeadRecord extends AuditLeadInput {
  sourcePage: string
  timeOnPageBeforeClick: number
  scrollDepth: number
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  createdAt: string
}

const LOCAL_KEY = "kairo_audit_leads_v1"

function enrich(input: AuditLeadInput): AuditLeadRecord {
  const s = getLandingSignals()
  return {
    ...input,
    sourcePage: s.sourcePage,
    timeOnPageBeforeClick: s.timeOnPageMs,
    scrollDepth: s.scrollDepthPct,
    utm_source: s.utm.utm_source,
    utm_medium: s.utm.utm_medium,
    utm_campaign: s.utm.utm_campaign,
    utm_content: s.utm.utm_content,
    utm_term: s.utm.utm_term,
    createdAt: new Date().toISOString(),
  }
}

function persistLocal(record: AuditLeadRecord) {
  if (typeof window === "undefined") return
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    const prev = raw ? (JSON.parse(raw) as AuditLeadRecord[]) : []
    prev.push(record)
    localStorage.setItem(LOCAL_KEY, JSON.stringify(prev.slice(-25)))
  } catch {
    /* swallow — never block UX */
  }
}

export async function saveAuditLead(
  input: AuditLeadInput,
): Promise<{ ok: boolean; record: AuditLeadRecord; error?: string }> {
  const record = enrich(input)
  // Always persist locally as a safety net.
  persistLocal(record)

  try {
    const res = await fetch("/api/audit-leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      // Short timeout via AbortSignal so a slow endpoint never blocks Calendly.
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) {
      return { ok: false, record, error: `HTTP ${res.status}` }
    }
    return { ok: true, record }
  } catch (err) {
    return { ok: false, record, error: err instanceof Error ? err.message : "unknown" }
  }
}

export function buildCalendlyUrl(input?: Pick<AuditLeadInput, "fullName" | "contact">): string {
  if (!input) return CALENDLY_AUDIT_URL
  const url = new URL(CALENDLY_AUDIT_URL)
  if (input.fullName) url.searchParams.set("name", input.fullName)
  // Calendly's email prefill only works if contact looks like an email.
  if (input.contact && /\S+@\S+\.\S+/.test(input.contact)) {
    url.searchParams.set("email", input.contact)
  }
  return url.toString()
}
